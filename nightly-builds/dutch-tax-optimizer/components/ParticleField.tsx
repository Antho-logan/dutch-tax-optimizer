"use client";

import { useEffect } from "react";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 30 }: ParticleFieldProps) {
  useEffect(() => {
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle) => {
      const el = particle as HTMLElement;
      const size = Math.random() * 12 + 4;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;

      el.style.cssText = `
        --size: ${size}px;
        --duration: ${duration}s;
        --delay: ${delay}s;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
      `;
    });
  }, []);

  return (
    <div className="particle-field">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}
