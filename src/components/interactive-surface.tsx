"use client";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import { useMotionPreference } from "./motion-preference";

/** Restrained pointer depth; touch scrolling keeps its normal behaviour. */
export function InteractiveSurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });
  const { enabled } = useMotionPreference();
  function reset() {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    const node = element.current;
    if (!node) return;
    node.removeAttribute("data-hovering");
    for (const key of ["--surface-x", "--surface-y", "--turn-x", "--turn-y"]) node.style.removeProperty(key);
  }
  useEffect(() => { if (!enabled) reset(); return reset; }, [enabled]);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse" || typeof requestAnimationFrame !== "function" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    point.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = element.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const x = Math.max(0, Math.min(1, (point.current.x - box.left) / box.width));
      const y = Math.max(0, Math.min(1, (point.current.y - box.top) / box.height));
      node.dataset.hovering = "true";
      node.style.setProperty("--surface-x", `${x * 100}%`);
      node.style.setProperty("--surface-y", `${y * 100}%`);
      node.style.setProperty("--turn-x", `${(0.5 - y) * 3}deg`);
      node.style.setProperty("--turn-y", `${(x - 0.5) * 3}deg`);
    });
  }
  return <div ref={element} className={`interactive-surface ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>{children}<span className="surface-sheen" aria-hidden="true" /></div>;
}
