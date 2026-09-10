"use client";

import { useEffect, useRef, useState } from "react";

export default function AuraSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setHasEntered(window.sessionStorage.getItem("aura-frequency-entered") === "true");
  }, []);

  async function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.38;
      try {
        await audio.play();
        window.sessionStorage.setItem("aura-frequency-entered", "true");
        setHasEntered(true);
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={`auraSound ${playing ? "isPlaying" : ""}`}>
      <audio
        ref={audioRef}
        src="/audio/seamless-healing-resonance.mp3"
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={playing ? "Pause Seamless Healing Resonance" : "Play Seamless Healing Resonance"}
        aria-pressed={playing}
      >
        <span className="soundGlyph" aria-hidden="true">
          {playing ? <><i /><i /><i /></> : "▶"}
        </span>
        <span className="soundWords">
          <small>{playing ? "Now resonating" : hasEntered ? "Return to the frequency" : "Enter the frequency"}</small>
          <strong>{playing ? "Seamless Healing Resonance" : "Sound on"}</strong>
        </span>
      </button>
    </div>
  );
}
