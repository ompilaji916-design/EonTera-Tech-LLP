"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export function AnalyticsBridge() {
  const pathname = usePathname();
  useEffect(() => {
    track("page_view", { path: pathname });
    const product = document.querySelector<HTMLElement>("[data-product-view]")?.dataset.productView;
    if (product) track("product_view", { product });
  }, [pathname]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      const label = (target.textContent || "").trim().slice(0, 120);
      if (href.startsWith("tel:")) track("phone_click", { href, label });
      else if (href.startsWith("mailto:")) track("email_click", { href, label });
      else if (target.hasAttribute("download")) {
        track("download", { href, label });
        track("resource_download", { href, label });
      } else if (href.includes("/contact")) track("contact_click", { href, label });
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);
  return null;
}
