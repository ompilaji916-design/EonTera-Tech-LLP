"use client";
import { useEffect, useRef, useState } from "react";
import { Download, X, ArrowUpRight } from "lucide-react";

const chapters = [
  { label: "Foundation", time: 0.1, number: "01" },
  { label: "Structure", time: 3.2, number: "02" },
  { label: "Roof & terrace", time: 8.1, number: "03" },
];

export function FilmViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (!open) {
      player.current?.pause();
      if (node.open) node.close();
      setReady(false); setTime(0); setFailed(false);
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!node.open) node.showModal();
    return () => { document.body.style.overflow = previous; player.current?.pause(); };
  }, [open]);
  function jump(seconds: number) {
    if (!player.current || !ready) return;
    player.current.currentTime = Math.min(seconds, player.current.duration || seconds);
    setTime(seconds);
    player.current.play().catch(() => {});
  }
  const active = time >= chapters[2].time ? 2 : time >= chapters[1].time ? 1 : 0;
  return (
    <dialog ref={dialog} className="film-dialog" aria-labelledby="film-dialog-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="film-dialog-inner">
        <div className="film-dialog-heading">
          <div><p className="eyebrow"><span />THE PROTECTION JOURNEY</p><h2 id="film-dialog-title">From the ground <em>up.</em></h2></div>
          <button className="film-dialog-close" type="button" onClick={onClose} aria-label="Close film"><X size={22} /></button>
        </div>
        <video ref={player} className="feature-film" src={open ? "/media/eontera-film.mp4" : undefined} poster="/media/eontera-film-poster.webp?v=20260922c"
          controls autoPlay={open} muted playsInline preload="metadata" aria-label="Conceptual EonTera building journey from foundation to roof"
          onLoadedMetadata={() => setReady(true)} onTimeUpdate={() => setTime(player.current?.currentTime || 0)} onError={() => setFailed(true)} />
        {failed && <p className="film-error" role="status">The film could not play here. You can download it below.</p>}
        <div className="film-chapters" aria-label="Film chapters">
          {chapters.map((chapter, index) => <button type="button" key={chapter.label} disabled={!ready} onClick={() => jump(chapter.time)} aria-pressed={active === index}><span>{chapter.number}</span><strong>{chapter.label}</strong><ArrowUpRight size={17} /></button>)}
        </div>
        <div className="film-dialog-footer"><p>Conceptual architectural visual.</p><a href="/media/eontera-film.mp4" download="EonTera-Film.mp4"><Download size={14} />Download film</a></div>
      </div>
    </dialog>
  );
}
