"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Services", "/#services"],
  ["About Shana", "/about"],
  ["Media", "/media"],
  ["Gallery", "/gallery"],
  ["Journal", "/journal"],
  ["Contact", "/#contact"],
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [touching, setTouching] = useState(false);
  const orb = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  function placeOrb(clientX: number, clientY: number) {
    if (!orb.current) return;
    orb.current.style.transform = `translate3d(${clientX - 105}px, ${clientY - 125}px, 0)`;
  }

  return (
    <div className="mobileMenuRoot">
      <button className="menuTrigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu-panel">
        <span>Menu</span><i aria-hidden="true">☰</i>
      </button>
      {open && <div
        className={`menuVeil ${touching ? "isTouching" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onPointerDown={(event) => { placeOrb(event.clientX, event.clientY); setTouching(true); }}
        onPointerMove={(event) => { if (event.pointerType === "touch" || event.buttons) { placeOrb(event.clientX, event.clientY); setTouching(true); } }}
        onPointerUp={() => setTouching(false)}
        onPointerCancel={() => setTouching(false)}
      >
        <div ref={orb} className="touchAura" aria-hidden="true" />
        <section className="menuPage" id="mobile-menu-panel">
          <div className="menuTop"><span>Aura About You</span><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Close navigation">Close</button></div>
          <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
          <p>Portland, Oregon<br/>In-person and remote sessions</p>
        </section>
      </div>}
    </div>
  );
}
