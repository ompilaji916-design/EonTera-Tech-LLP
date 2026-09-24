// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Catalog } from "./catalog";
import { Finder } from "./finder";
import { EnquiryForm } from "./enquiry-form";
import { Header } from "./header";
import { Faq } from "./disclosure";
import { PortfolioShowcase } from "./portfolio-showcase";
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});
describe("interactive static pages", () => {
  it("filters and searches the catalogue with a recoverable empty state", () => {
    render(<Catalog />);
    expect(screen.getByRole("status").textContent).toContain(
      "4 product categories",
    );
    fireEvent.click(screen.getByRole("button", { name: "Below ground" }));
    expect(screen.getByRole("status").textContent).toContain(
      "1 product category",
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Search products" }), {
      target: { value: "no-such-product" },
    });
    expect(screen.getByText("No matching categories.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("status").textContent).toContain(
      "4 product categories",
    );
  });
  it("completes the finder and preserves selections when going back", () => {
    render(<Finder />);
    fireEvent.click(screen.getByRole("button", { name: /Basement/ }));
    expect(document.activeElement?.textContent).toBe(
      "What is the current situation?",
    );
    fireEvent.click(screen.getByRole("button", { name: /Active leakage/ }));
    fireEvent.click(screen.getByRole("button", { name: /Residential/ }));
    expect(
      screen.getByRole("heading", { name: "Basement Protection" }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Explore solution" })
        .getAttribute("href"),
    ).toBe("/solutions#basement");
    expect(
      screen
        .getByRole("link", { name: "Discuss my project" })
        .getAttribute("href"),
    ).toContain("Basement%20Protection");
    fireEvent.click(screen.getByRole("button", { name: /Edit project type/ }));
    expect(
      screen
        .getByRole("button", { name: /Residential/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /Commercial/ }));
    fireEvent.click(screen.getByRole("button", { name: "Start again" }));
    expect(
      screen.getByRole("heading", { name: "What do you need to protect?" }),
    ).toBeTruthy();
  });
  it("prepares an email with query context and never reports a server submission", () => {
    window.history.replaceState(
      null,
      "",
      "/contact/?interest=Basement%20protection",
    );
    render(<EnquiryForm />);
    expect(
      (screen.getByLabelText("Interested in") as HTMLInputElement).value,
    ).toBe("Basement protection");
    fireEvent.change(screen.getByLabelText("Full name *"), {
      target: { value: "Review Tester" },
    });
    fireEvent.change(screen.getByLabelText("Email address *"), {
      target: { value: "review@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Project details *"), {
      target: { value: "Please discuss this basement application." },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Prepare enquiry" }));
    expect(
      screen.getByRole("heading", { name: "Your email draft is ready." }),
    ).toBeTruthy();
    const link = screen
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href")!;
    expect(link.startsWith("mailto:doshijesika73@gmail.com?")).toBe(true);
    expect(decodeURIComponent(link)).toContain("review@example.com");
    expect(screen.queryByText("Enquiry sent")).toBeNull();
    fireEvent.change(screen.getByLabelText("Full name *"), {
      target: { value: "Updated Tester" },
    });
    expect(screen.queryByRole("link", { name: "Open email app" })).toBeNull();
  });
  it("rejects an unchecked consent through programmatic submission", () => {
    render(<EnquiryForm />);
    fireEvent.change(screen.getByLabelText("Full name *"), {
      target: { value: "Review Tester" },
    });
    fireEvent.change(screen.getByLabelText("Email address *"), {
      target: { value: "review@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Project details *"), {
      target: { value: "Please discuss this roof application." },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Prepare enquiry" }).closest("form")!,
    );
    expect(screen.getByRole("alert").textContent).toContain("confirm");
    expect(screen.queryByRole("link", { name: "Open email app" })).toBeNull();
  });
  it("opens and dismisses navigation using Escape and restores focus", () => {
    render(<Header />);
    const open = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(open);
    expect(open.getAttribute("aria-expanded")).toBe("true");
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(open, { key: "Escape" });
    expect(open.getAttribute("aria-expanded")).toBe("false");
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(open);
    const company = screen.getByRole("button", { name: "Company" });
    fireEvent.click(company);
    expect(company.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(company, { key: "Escape" });
    expect(company.getAttribute("aria-expanded")).toBe("false");
  });
  it("opens the industry menu and restores focus when Escape dismisses it", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Industries" });
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "Residential" }).getAttribute("href")).toBe("/industries/#residential");
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("link", { name: "Residential" })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("keeps collapsed answers inert through repeated opening and closing", () => {
    render(<Faq items={[["Where can membranes be used?", "From basement to terrace."]]} />);
    const trigger = screen.getByRole("button", { name: /Where can membranes/ });
    const panel = document.getElementById(trigger.getAttribute("aria-controls")!)!;
    expect(panel.hasAttribute("inert")).toBe(true);
    fireEvent.click(trigger);
    expect(panel.hasAttribute("inert")).toBe(false);
    expect(panel.getAttribute("aria-hidden")).toBe("false");
    fireEvent.click(trigger);
    expect(panel.hasAttribute("inert")).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
  it("browses the product showcase by keyboard and disables the final next control", () => {
    render(<PortfolioShowcase />);
    const track = screen.getByLabelText(/Product categories. Use left/);
    Object.defineProperty(track, "clientWidth", { value: 900 });
    Object.defineProperty(track, "scrollWidth", { value: 3900 });
    [...track.children].forEach((card, i) => Object.defineProperty(card, "offsetLeft", { value: i * 1000 }));
    const scroll = vi.fn(({ left }) => {
      track.scrollLeft = left;
      fireEvent.scroll(track);
    });
    Object.defineProperty(track, "scrollTo", { value: scroll });
    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(scroll).toHaveBeenLastCalledWith({ left: 1000, behavior: "smooth" });
    fireEvent.click(screen.getByRole("button", { name: "Next product category" }));
    fireEvent.click(screen.getByRole("button", { name: "Next product category" }));
    expect((screen.getByRole("button", { name: "Next product category" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("button", { name: "Previous product category" }).hasAttribute("disabled")).toBe(false);
  });
});
