"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";
import { useMotionPreference } from "./motion-preference";

// Nothing is hidden in CSS while waiting for JavaScript or an observer callback.
// Finite compositor animations return to the visible, server-rendered state.
export function MotionManager() {
  const pathname = usePathname();
  const { enabled } = useMotionPreference();
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 961px) and (hover: hover) and (pointer: fine)");
    const seen = new WeakSet<Element>();
    let dispose = () => {};
    const configure = () => {
      dispose();
      if (!enabled || reduce.matches || typeof IntersectionObserver === "undefined") return;
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver(entries => {
        const groupCounts = new Map<Element | null, number>();
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          if (seen.has(element) || typeof element.animate !== "function") return;
          seen.add(element);
          const index = groupCounts.get(element.parentElement) ?? 0;
          groupCounts.set(element.parentElement, index + 1);
          const animation = element.animate(
            [{ opacity: 0, transform: "translate3d(0, 28px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
            { duration: 760, delay: Math.min(index * 75, 225), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          animation.oncancel = () => animations.delete(animation);
        });
      }, { threshold: 0, rootMargin: "0px 0px 40px 0px" });
      document.querySelectorAll<HTMLElement>(".reveal").forEach(element => {
        if (element.getBoundingClientRect().top < innerHeight) seen.add(element);
        else observer.observe(element);
      });
      const depthElements = [...document.querySelectorAll<HTMLElement>("[data-depth]")];
      const ambientElements = [...document.querySelectorAll<HTMLElement>(".ambient-motion")];
      const ambientObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => (entry.target as HTMLElement).dataset.onScreen = String(entry.isIntersecting));
      });
      ambientElements.forEach(element => ambientObserver.observe(element));
      const visibleDepth = new Set<HTMLElement>();
      let frame = 0;
      const update = () => {
        frame = 0;
        const max = document.documentElement.scrollHeight - innerHeight;
        const positions = [...visibleDepth].map(element => {
          const box = element.getBoundingClientRect();
          const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - box.top - box.height / 2) / ((innerHeight + box.height) / 2)));
          return { element, y: progress * 20 };
        });
        document.documentElement.style.setProperty("--scroll-progress", String(max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0));
        positions.forEach(({ element, y }) => element.style.setProperty("--depth-y", `${y.toFixed(2)}px`));
      };
      const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
      const depthObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visibleDepth.add(entry.target as HTMLElement);
          else visibleDepth.delete(entry.target as HTMLElement);
        });
        queue();
      }, { rootMargin: "80px" });
      if (desktop.matches) depthElements.forEach(element => depthObserver.observe(element));
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue, { passive: true });
      queue();
      dispose = () => {
        observer.disconnect();
        depthObserver.disconnect();
        ambientObserver.disconnect();
        animations.forEach(animation => animation.cancel());
        window.removeEventListener("scroll", queue);
        window.removeEventListener("resize", queue);
        cancelAnimationFrame(frame);
        depthElements.forEach(element => element.style.removeProperty("--depth-y"));
        ambientElements.forEach(element => { delete element.dataset.onScreen; });
      };
    };
    configure();
    reduce.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    return () => {
      dispose();
      reduce.removeEventListener("change", configure);
      desktop.removeEventListener("change", configure);
    };
  }, [pathname, enabled]);
  return <div className="reading-progress" aria-hidden="true" />;
}

export function Film({
  name,
  mobileName,
  poster,
  label,
  className = "",
  priority = false,
  suspended = false,
}: {
  name: string;
  mobileName?: string;
  poster: string;
  label: string;
  className?: string;
  priority?: boolean;
  suspended?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sourceName, setSourceName] = useState(name);
  const { enabled } = useMotionPreference();
  const manualPause = useRef(false);
  const playbackWanted = useRef(false);
  // Choose before lazy playback starts; resizing never restarts a playing film.
  useEffect(() => {
    setSourceName(mobileName && matchMedia("(max-width: 680px)").matches ? mobileName : name);
  }, [name, mobileName]);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const canPlay = () =>
      enabled &&
      !suspended &&
      !media.matches &&
      !connection?.saveData &&
      !manualPause.current &&
      !document.hidden;
    let inView = false;
    const sync = () => {
      playbackWanted.current = inView && canPlay();
      if (inView && canPlay()) {
        setAllowed(true);
        if (node.getAttribute("src")) node.play().catch(() => setPaused(true));
      } else node.pause();
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0.12 },
    );
    observer?.observe(node);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
      playbackWanted.current = false;
      node.pause();
    };
  }, [enabled, suspended]);
  useEffect(() => {
    if (allowed && playbackWanted.current)
      video.current?.play().catch(() => setPaused(true));
  }, [allowed, sourceName]);
  function toggle() {
    const node = video.current;
    if (!node) return;
    if (node.paused) {
      manualPause.current = false;
      playbackWanted.current = true;
      setAllowed(true);
      if (failed) { setFailed(false); node.load(); }
      if (node.getAttribute("src")) node.play().catch(() => setPaused(true));
    } else {
      manualPause.current = true;
      node.pause();
    }
  }
  return (
    <div className={`film ${ready ? "is-ready" : ""} ${className}`}>
      <img className="film-fallback" src={`/media/${poster}.webp?v=20260922c`} width="1120" height="630" alt="" aria-hidden="true" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
      <video
        ref={video}
        poster={`/media/${poster}.webp?v=20260922c`}
        src={allowed ? `/media/${sourceName}.mp4` : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onPlaying={() => { setReady(true); setFailed(false); }}
        onError={() => { setReady(false); setFailed(true); setPaused(true); }}
      />
      <button
        type="button"
        onClick={toggle}
        className="film-control"
        aria-label={failed ? "Retry video" : paused ? "Play visual animation" : "Pause visual animation"}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>{failed ? "Retry film" : paused ? "Play film" : "Pause film"}</span>
      </button>
    </div>
  );
}
