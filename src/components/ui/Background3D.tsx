'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  vz: number;
  s: number;
  color: string;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const frame = useRef(0);
  const isLight = useRef(false);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    // ── Detect theme ──────────────────────────────────────────────
    const detectTheme = () => {
      isLight.current = document.documentElement.getAttribute('data-theme') === 'light';
    };
    detectTheme();

    // Watch for theme switches
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const mobile = window.innerWidth < 768;
    const COUNT = mobile ? 80 : 160;
    const FOCAL = 500;
    const MAX_Z = 800;
    const LINK_DIST = 210;

    let W = cv.width = window.innerWidth;
    let H = cv.height = window.innerHeight;

    const mkP = (): Particle => {
      const isPurple = Math.random() > 0.6;
      return {
        x: (Math.random() - 0.5) * W * 2.5,
        y: (Math.random() - 0.5) * H * 2.5,
        z: Math.random() * MAX_Z,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.7,
        s: Math.random() * 2.2 + 0.6,
        // Dark mode: bright cyan/purple. Light mode: deeper, richer variants
        color: isPurple ? '139, 92, 246' : '0, 212, 255',
      };
    };

    let pts: Particle[] = Array.from({ length: COUNT }, mkP);
    pts.forEach(p => { p.baseX = p.x; p.baseY = p.y; });

    const onResize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    const onMouse = (e: MouseEvent) => { mouse.current.tx = e.clientX; mouse.current.ty = e.clientY; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, { passive: true });

    const tick = () => {
      const light = isLight.current;

      // ── Background fill: dark space vs light sky ──────────────
      ctx.fillStyle = light ? '#f0f4ff' : '#030306';
      ctx.fillRect(0, 0, W, H);

      // ── In light mode draw a very subtle radial vignette ──────
      if (light) {
        const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
        vignette.addColorStop(0, 'rgba(220, 235, 255, 0)');
        vignette.addColorStop(1, 'rgba(180, 210, 240, 0.3)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, W, H);
      }

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.08;

      const mX = mouse.current.x - W / 2;
      const mY = mouse.current.y - H / 2;

      pts.forEach(p => {
        p.baseX += p.vx;
        p.baseY += p.vy;
        p.z += p.vz;

        if (p.z > MAX_Z) { p.z = 1; p.baseX = (Math.random() - 0.5) * W * 2.5; p.baseY = (Math.random() - 0.5) * H * 2.5; }
        if (p.z < 1) { p.z = MAX_Z; }

        const bx = W * 1.5, by = H * 1.5;
        if (p.baseX > bx) p.baseX = -bx;
        if (p.baseX < -bx) p.baseX = bx;
        if (p.baseY > by) p.baseY = -by;
        if (p.baseY < -by) p.baseY = by;

        const par = p.z / MAX_Z;
        const targetX = p.baseX;
        const targetY = p.baseY;

        const dx = p.baseX - mX;
        const dy = p.baseY - mY;
        const dist = Math.hypot(dx, dy);

        const forceRadius = 250;
        if (dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          const push = force * 60 * (1 - par);
          p.x = p.baseX + (dx / dist) * push;
          p.y = p.baseY + (dy / dist) * push;
        } else {
          p.x += (targetX - p.x) * 0.1;
          p.y += (targetY - p.y) * 0.1;
        }
      });

      const mapped = pts.map(p => {
        const sc = FOCAL / (FOCAL + p.z);
        const parallaxX = (mouse.current.x - W / 2) * (1 - p.z / MAX_Z) * 0.05;
        const parallaxY = (mouse.current.y - H / 2) * (1 - p.z / MAX_Z) * 0.05;
        return {
          p,
          sx: (p.x + parallaxX) * sc + W / 2,
          sy: (p.y + parallaxY) * sc + H / 2,
          sc,
        };
      });

      // ── Draw Connections ───────────────────────────────────────
      // In light mode use lower opacity so lines don't overpower the light bg
      ctx.lineWidth = 0.75;
      for (let i = 0; i < mapped.length; i++) {
        for (let j = i + 1; j < mapped.length; j++) {
          const a = mapped[i];
          const b = mapped[j];
          const dx3 = a.p.x - b.p.x;
          const dy3 = a.p.y - b.p.y;
          const dz3 = a.p.z - b.p.z;
          const d3 = Math.hypot(dx3, dy3, dz3);

          if (d3 < LINK_DIST) {
            const baseOpacity = light ? 0.22 : 0.38;
            const opacity = (1 - d3 / LINK_DIST) * baseOpacity * Math.min(a.sc, b.sc);
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            const grad = ctx.createLinearGradient(a.sx, a.sy, b.sx, b.sy);
            grad.addColorStop(0, `rgba(${a.p.color}, ${opacity.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${b.p.color}, ${opacity.toFixed(3)})`);
            ctx.strokeStyle = grad;
            ctx.stroke();
          }
        }
      }

      // ── Draw Nodes ─────────────────────────────────────────────
      mapped.forEach(({ p, sx, sy, sc }) => {
        const r = Math.max(0.4, p.s * sc * 1.25);
        // In light mode nodes are more opaque so they're visible against white
        const opacity = light
          ? 0.45 + sc * 0.55
          : 0.22 + sc * 0.68;

        const glowRadius = r * (light ? 4 : 6.5);
        const glowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        glowGrad.addColorStop(0, `rgba(${p.color}, ${(opacity * (light ? 0.5 : 0.6)).toFixed(3)})`);
        glowGrad.addColorStop(0.4, `rgba(${p.color}, ${(opacity * 0.15).toFixed(3)})`);
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${opacity.toFixed(3)})`;
        ctx.fill();
      });

      frame.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
