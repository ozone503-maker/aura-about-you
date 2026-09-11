"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  ["Book a Session", "/book", "violet"],
  ["Aura Photography", "/aura-photography", "blue"],
  ["Reiki", "/reiki", "green"],
  ["Hypnosis", "/hypnosis", "indigo"],
  ["Energy Clearing", "/energy-clearing", "red"],
  ["Private Events", "/private-events", "orange"],
  ["About Shana", "/about", "violet"],
  ["Media", "/media", "yellow"],
  ["Gallery", "/gallery", "yellow"],
  ["Journal", "/journal", "indigo"],
  ["Contact", "/#contact", "violet"],
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const orb = useRef<HTMLDivElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (open && root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  useEffect(() => {
    const place = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !orb.current) return;
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      const page = document.querySelector("main");
      if (page) {
        const pageStyle = getComputedStyle(page);
        orb.current.style.setProperty("--orb-bright", pageStyle.getPropertyValue("--tone-bright").trim() || "#b439d0");
        orb.current.style.setProperty("--orb-mid", pageStyle.getPropertyValue("--tone-mid").trim() || "#521ebe");
      }
      orb.current.style.transform = `translate3d(${touch.clientX - 140}px, ${touch.clientY - 155}px, 0)`;
      orb.current.classList.add("isVisible");
    };
    const fade = () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => orb.current?.classList.remove("isVisible"), 180);
    };
    window.addEventListener("touchstart", place, { passive: true });
    window.addEventListener("touchmove", place, { passive: true });
    window.addEventListener("touchend", fade, { passive: true });
    window.addEventListener("touchcancel", fade, { passive: true });
    return () => {
      window.removeEventListener("touchstart", place);
      window.removeEventListener("touchmove", place);
      window.removeEventListener("touchend", fade);
      window.removeEventListener("touchcancel", fade);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  return (
    <div className="mobileMenuRoot" ref={root}>
      {mounted && createPortal(<div ref={orb} className="pageTouchAura" aria-hidden="true" />, document.body)}
      <button
        className="menuTrigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
      >
        <span>Menu</span><i aria-hidden="true">{open ? "×" : "☰"}</i>
      </button>
      {open && (
        <nav className="menuDropdown" id="mobile-menu-panel" aria-label="Mobile navigation">
          {links.map(([label, href, tone]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              <i className={`menuTone toneDot-${tone}`} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
