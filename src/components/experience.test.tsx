// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Film } from "./motion";
import { MotionProvider, MotionToggle } from "./motion-preference";
import { IndustryExplorer } from "./industry-explorer";
import { FilmViewer } from "./film-viewer";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({ default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a> }));

let reduced = false;
let mobile = false;
let playing: WeakSet<HTMLMediaElement>;
let observers: Array<{ callback: IntersectionObserverCallback; targets: Set<Element>; active: boolean }>;
function visible(element: Element, inView: boolean) {
  act(() => observers.filter(observer => observer.active && observer.targets.has(element)).forEach(observer => {
    observer.callback([{ target: element, isIntersecting: inView } as IntersectionObserverEntry], {} as IntersectionObserver);
  }));
}

beforeEach(() => {
  reduced = false; mobile = false; playing = new WeakSet(); observers = [];
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("prefers-reduced-motion") ? reduced : query.includes("max-width: 680px") ? mobile : false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.stubGlobal("IntersectionObserver", class {
    item: typeof observers[number];
    constructor(callback: IntersectionObserverCallback) { this.item = { callback, targets: new Set(), active: true }; observers.push(this.item); }
    observe(element: Element) { this.item.targets.add(element); }
    unobserve(element: Element) { this.item.targets.delete(element); }
    disconnect() { this.item.active = false; }
  });
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(function (this: HTMLMediaElement) { return !playing.has(this); });
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) { playing.add(this); this.dispatchEvent(new Event("play")); this.dispatchEvent(new Event("playing")); return Promise.resolve(); });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) { if (playing.delete(this)) this.dispatchEvent(new Event("pause")); });
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  // jsdom has no native modal implementation; browser focus trapping is not
  // simulated by these tests, which verify our open/close lifecycle only.
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = true; }) });
  Object.defineProperty(HTMLDialogElement.prototype, "close", { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = false; }) });
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals();
  delete (HTMLDialogElement.prototype as Partial<HTMLDialogElement>).showModal;
  delete (HTMLDialogElement.prototype as Partial<HTMLDialogElement>).close;
  delete (navigator as Navigator & { connection?: unknown }).connection;
});

describe("video loading and visitor motion preferences", () => {
  it("loads the small mobile loop only when visible and pauses when it leaves view", () => {
    mobile = true;
    const { container } = render(<Film name="eontera-journey" mobileName="eontera-journey-mobile" poster="eontera-film-poster" label="Building journey" priority />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("src")).toBeNull();
    expect(container.querySelector(".film-fallback")?.getAttribute("src")).toContain("eontera-film-poster.webp");
    visible(video, true);
    expect(video.getAttribute("src")).toBe("/media/eontera-journey-mobile.mp4");
    expect(video.paused).toBe(false);
    expect(container.querySelector(".film")?.classList.contains("is-ready")).toBe(true);
    visible(video, false);
    expect(video.paused).toBe(true);
  });

  it.each(["reduced motion", "data saving"])("uses the poster without fetching a background film for %s", preference => {
    if (preference === "reduced motion") reduced = true;
    else Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
    const { container } = render(<MotionProvider><MotionToggle /><Film name="eontera-journey" poster="eontera-film-poster" label="Building journey" /></MotionProvider>);
    const video = container.querySelector("video")!;
    visible(video, true);
    expect(video.getAttribute("src")).toBeNull();
    expect(video.play).not.toHaveBeenCalled();
    if (reduced) {
      expect(document.documentElement.dataset.motion).toBe("off");
      expect((screen.getByRole("button", { name: "Motion follows your reduced-motion setting" }) as HTMLButtonElement).disabled).toBe(true);
    }
  });

  it("pauses decorative video with the global switch and resumes only when visible", () => {
    const { container } = render(<MotionProvider><MotionToggle /><Film name="eontera-journey" poster="eontera-film-poster" label="Building journey" /></MotionProvider>);
    const video = container.querySelector("video")!;
    visible(video, true);
    expect(video.paused).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Pause decorative motion" }));
    expect(document.documentElement.dataset.motion).toBe("off");
    expect(video.paused).toBe(true);
    visible(video, true);
    expect(video.paused).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Enable decorative motion" }));
    expect(document.documentElement.dataset.motion).toBe("on");
    expect(video.paused).toBe(true);
    visible(video, true);
    expect(video.paused).toBe(false);
  });

  it("keeps the poster on a media error and allows retry", () => {
    const { container } = render(<Film name="eontera-journey" poster="eontera-film-poster" label="Building journey" />);
    const video = container.querySelector("video")!;
    visible(video, true);
    act(() => { playing.delete(video); fireEvent.error(video); });
    expect(container.querySelector(".film")?.classList.contains("is-ready")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Retry video" }));
    expect(video.load).toHaveBeenCalledOnce();
    expect(video.paused).toBe(false);
  });

  it("pauses background playback while the full film is open", () => {
    const { container, rerender } = render(<Film name="eontera-journey" poster="eontera-film-poster" label="Building journey" />);
    const video = container.querySelector("video")!;
    visible(video, true);
    rerender(<Film name="eontera-journey" poster="eontera-film-poster" label="Building journey" suspended />);
    visible(video, true);
    expect(video.paused).toBe(true);
  });
});

describe("industry previews", () => {
  it("keeps the current image visible until the requested image loads", () => {
    const { container } = render(<IndustryExplorer />);
    const image = container.querySelector("#industry-image-2") as HTMLImageElement;
    Object.defineProperty(image, "complete", { value: false, configurable: true });
    fireEvent.click(screen.getByRole("tab", { name: /Infrastructure/ }));
    expect(container.querySelector(".industry-frame.is-current")?.id).toBe("industry-image-1");
    fireEvent.load(image);
    expect(container.querySelector(".industry-frame.is-current")?.id).toBe("industry-image-2");
    expect(screen.getByRole("link", { name: "Explore infrastructure" }).getAttribute("href")).toBe("/industries/#infrastructure");
  });

  it("moves tab focus with the keyboard and recovers from a failed preview", () => {
    const { container } = render(<IndustryExplorer />);
    const image = container.querySelector("#industry-image-2") as HTMLImageElement;
    Object.defineProperty(image, "complete", { value: false, configurable: true });
    const tab = screen.getByRole("tab", { name: /Commercial/ });
    tab.focus(); fireEvent.keyDown(tab, { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: /Infrastructure/ }));
    expect(screen.getByRole("tab", { name: /Infrastructure/ }).getAttribute("aria-selected")).toBe("true");
    fireEvent.error(image);
    expect(container.querySelector(".industry-frame.is-current")?.id).toBe("industry-image-1");
    expect(screen.getByRole("status").textContent).toContain("previous preview is still available");
    expect(screen.getByRole("link", { name: "Explore commercial" })).toBeTruthy();
  });
});

describe("full film viewer", () => {
  it("opens a modal with working chapters and releases scroll locking when closed", () => {
    const close = vi.fn();
    const { container, rerender } = render(<FilmViewer open={false} onClose={close} />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("src")).toBeNull();
    rerender(<FilmViewer open onClose={close} />);
    expect(screen.getByRole("dialog").hasAttribute("open")).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(video.getAttribute("src")).toBe("/media/eontera-film.mp4");
    expect((screen.getByRole("button", { name: /Roof & terrace/ }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.loadedMetadata(video);
    fireEvent.click(screen.getByRole("button", { name: /Roof & terrace/ }));
    expect(video.currentTime).toBe(8.1);
    expect(video.play).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /Roof & terrace/ }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Close film" }));
    expect(close).toHaveBeenCalled();
    rerender(<FilmViewer open={false} onClose={close} />);
    expect(document.body.style.overflow).toBe("");
    expect(video.paused).toBe(true);
    expect(video.getAttribute("src")).toBeNull();
  });

  it("handles native Escape cancellation and leaves a download available on playback failure", () => {
    const close = vi.fn();
    const { container } = render(<FilmViewer open onClose={close} />);
    fireEvent.error(container.querySelector("video")!);
    expect(screen.getByRole("status").textContent).toContain("download it below");
    expect(screen.getByRole("link", { name: "Download film" }).getAttribute("href")).toBe("/media/eontera-film.mp4");
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: false }));
    expect(close).toHaveBeenCalled();
  });
});
