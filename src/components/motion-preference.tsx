"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Waves, Pause } from "lucide-react";

const MotionContext = createContext({ enabled: true, systemReduced: false, toggle: () => {} });
export const useMotionPreference = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const enabled = !paused && !systemReduced;
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    return () => { delete document.documentElement.dataset.motion; };
  }, [enabled]);
  return <MotionContext.Provider value={{ enabled, systemReduced, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}

export function MotionToggle() {
  const { enabled, systemReduced, toggle } = useMotionPreference();
  return (
    <button type="button" className="motion-toggle" disabled={systemReduced} onClick={toggle} aria-pressed={enabled}
      aria-label={systemReduced ? "Motion follows your reduced-motion setting" : enabled ? "Pause decorative motion" : "Enable decorative motion"}>
      {enabled ? <Waves size={13} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      <span>{enabled ? "Motion on" : "Motion off"}</span>
    </button>
  );
}
