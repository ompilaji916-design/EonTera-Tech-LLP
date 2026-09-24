// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { MotionManager } from "./motion";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it("never hides content when animation or observer support is unavailable", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.stubGlobal("IntersectionObserver", undefined);
  const { container } = render(<><MotionManager /><article className="reveal">Readable without animation</article></>);
  const content = container.querySelector("article")!;
  expect(content.className).toBe("reveal");
  expect(content.style.opacity).toBe("");
  expect(content.hidden).toBe(false);
});

it("cancels active reveals immediately when reduced motion is enabled", () => {
  const changes: Array<() => void> = [];
  const media = { matches: false, addEventListener: (_: string, callback: () => void) => changes.push(callback), removeEventListener: vi.fn() };
  vi.stubGlobal("matchMedia", () => media);
  const observers: Array<IntersectionObserverCallback> = [];
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { observers.push(callback); }
    observe() {} unobserve() {} disconnect() {}
  });
  vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
  const cancel = vi.fn();
  const animate = vi.fn(() => ({ cancel, onfinish: null, oncancel: null }));
  Object.defineProperty(Element.prototype, "animate", { value: animate, configurable: true, writable: true });
  const { container } = render(<><MotionManager /><article className="reveal">Image and copy remain available</article></>);
  const content = container.querySelector("article")!;
  const bounds = content.getBoundingClientRect();
  act(() => observers[0]([{ target: content, isIntersecting: true, boundingClientRect: bounds, intersectionRatio: 1, intersectionRect: bounds, rootBounds: null, time: 0 }], {} as IntersectionObserver));
  expect(animate).toHaveBeenCalledOnce();
  act(() => { media.matches = true; changes[0](); });
  expect(cancel).toHaveBeenCalled();
  expect(content.style.opacity).toBe("");
  expect(content.className).toBe("reveal");
  delete (Element.prototype as Partial<Element>).animate;
});
