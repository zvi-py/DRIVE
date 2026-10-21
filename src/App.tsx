import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CopyCodeModal } from './components/CopyCodeModal.tsx';
import { RedTeamWorkflowModal } from './components/RedTeamWorkflowModal.tsx';
import { DocsModal } from './components/DocsModal.tsx';
import { AgentDetailModal, AgentType } from './components/AgentDetailModal.tsx';
import { DriveBrowserWorkspace } from './components/DriveBrowserWorkspace.tsx';
import { ResearchPaperModal } from './components/ResearchPaperModal.tsx';
import { CheckCircle2, ShieldAlert, Sparkles, Terminal, ArrowRight, ArrowDown, FileText, ExternalLink } from 'lucide-react';

export default function App() {
  const [enteredResearchArea, setEnteredResearchArea] = useState(false);
  const [paperModalOpen, setPaperModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [redTeamModalOpen, setRedTeamModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blurCanvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const jumpToProgress = (targetP: number, smooth = true) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetP * maxScroll, behavior: smooth ? 'smooth' : 'auto' });
  };

  const scrollToResearchArea = () => {
    const el = document.getElementById('research-area');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const $ = (s: string) => document.querySelector(s) as HTMLElement | null;
    const sm = (a: number, b: number, x: number) => {
      x = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return x * x * (3 - 2 * x);
    };

    let P = 0, T = 0, mx = 0, my = 0;
    const rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const scr = () => {
      T = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (navRef.current) {
        navRef.current.classList.toggle('s', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', scr, { passive: true });
    scr();

    const onPointerMove = (e: MouseEvent) => {
      mx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
      my = e.clientY / Math.max(1, window.innerHeight) - 0.5;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Video-exact Beat configuration leading to the FINAL STAGE (Multi-Agent Constellation)
    const BT: [HTMLElement | null, number, number, number, number, number?][] = [
      [$('#b0'), -0.1, 0, 0.12, 0.18],
      [$('#b1'), 0.22, 0.28, 0.38, 0.44],
      [$('#b2'), 0.44, 0.50, 0.58, 0.64],
      [$('#bs'), 0.52, 0.56, 0.60, 0.64],
      [$('#b3'), 0.64, 0.70, 0.76, 0.82],
      // Final Stage: Multi-Agent Constellation cards stay visible permanently once reached
      [$('#ag0'), 0.80, 0.85, 2.0, 3.0],
      [$('#ag1'), 0.81, 0.86, 2.0, 3.0],
      [$('#ag2'), 0.82, 0.87, 2.0, 3.0],
      [$('#paper-cta'), 0.83, 0.89, 2.0, 3.0],
    ];

    const gl = glowRef.current;

    // Text Scrambler identical to reference engine
    const SC = 'abcdefghijklmnopqrstuvwxyz#/<>_';
    function scm(el: HTMLElement) {
      if (!el) return;
      const ws: [Text, string][] = [];
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n: Text | null;
      while ((n = w.nextNode() as Text | null)) {
        ws.push([n, n.data]);
      }
      const t0 = performance.now();
      function f() {
        const k = Math.min(1, (performance.now() - t0) / 900);
        ws.forEach(([node, orig]) => {
          if (node.isConnected) {
            node.data = orig.replace(/\S/g, (c, i) =>
              i / orig.length < k ? c : SC[(Math.random() * SC.length) | 0]
            );
          }
        });
        if (k < 1) requestAnimationFrame(f);
      }
      f();
    }

    function ui() {
      BT.forEach(([e, a, b, c, d]) => {
        if (!e) return;
        const o = sm(a, b, P) * (1 - sm(c, d, P));
        e.style.opacity = `${o}`;
        const hd = e.querySelector('h1,h2') as HTMLElement | null;
        if (hd) {
          const elAny = e as unknown as { _s?: number };
          if (o > 0.15 && !elAny._s) {
            elAny._s = 1;
            scm(hd);
          }
          if (o < 0.02) elAny._s = 0;
        }
        if (e.id === 'paper-cta') {
          e.style.opacity = `${o}`;
          e.style.transform = `translateX(-50%) translateY(${(1 - o) * 20}px)`;
          e.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
          return;
        }
        e.style.filter = `blur(${(1 - o) * 8}px)`;
        const t = e.id === 'b4' ? 'translateX(-50%) ' : '';
        e.style.transform = `${t}translateY(${(1 - o) * 24}px)`;
        e.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
      });

      if (gl) {
        gl.style.opacity = `${sm(0.78, 0.88, P) * 0.7}`;
      }
    }

    let R: THREE.WebGLRenderer | null = null;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
        if (!R.getContext()) throw 0;
      } catch {
        document.body.classList.add('nogl');
      }
    }

    let animId: number;

    if (R && canvas) {
      const N = window.innerWidth < 760 ? 350 : 700;
      const S = 54;
      const W = (S + 1) * 2;
      const V = N * W;
      const aT = new Float32Array(V);
      const aD = new Float32Array(V);
      const aS = new Float32Array(V * 3);
      const ix = new Uint16Array(N * S * 6);
      let k = 0, q = 0;

      for (let i = 0; i < N; i++) {
        const a = Math.random(), b = Math.random(), c = Math.random(), b0 = k;
        for (let j = 0; j <= S; j++) {
          for (let e = 0; e < 2; e++) {
            aT[k] = j / S;
            aD[k] = e ? 1 : -1;
            aS.set([a, b, c], k * 3);
            k++;
          }
        }
        for (let j = 0; j < S; j++) {
          const o = b0 + j * 2;
          ix.set([o, o + 1, o + 2, o + 1, o + 3, o + 2], q);
          q += 6;
        }
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(V * 3), 3));
      g.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
      g.setAttribute('aD', new THREE.BufferAttribute(aD, 1));
      g.setAttribute('aS', new THREE.BufferAttribute(aS, 3));
      g.setIndex(new THREE.BufferAttribute(ix, 1));

      const U = {
        uP: { value: 0 },
        uTm: { value: 0 },
        uAsp: { value: 1 },
      };

      const m = new THREE.ShaderMaterial({
        uniforms: U,
        transparent: true,
        depthTest: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          attribute float aT, aD;
          attribute vec3 aS;
          uniform float uP, uTm, uAsp;
          varying float vA, vD;
          varying vec3 vC;

          mat2 rot(float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c);
          }

          vec3 P(float t, vec3 s) {
            // Scene 1: Comet fiber bundle fanning to the right (Hero 0:00 - 0:03)
            float sp = pow(t, 1.7);
            float aa = (s.x - 0.5) * 2.0;
            vec3 A = vec3(-10.0 + 19.0 * t * (1.0 - 0.5 * abs(aa) * t), aa * 8.0 * pow(t, 1.9) + sin(t * 3.0 + s.z * 6.283) * 0.6 * t, (s.y - 0.5) * 5.0 * sp);
            A.xy = rot(-0.12 * smoothstep(0.06, 0.2, uP)) * A.xy;

            // Scene 2: Magnetic loops & traveling pulse wave (0:04 - 0:07)
            float sg = s.z > 0.5 ? 1.0 : -1.0;
            float sn = sin(t * 3.14159);
            vec3 B = vec3(mix(-9.0, 9.0, t), sg * (0.5 + s.x * 2.6) * sn * 1.5, (s.y - 0.5) * 3.0 * sn);

            // Scene 3: Focused horizontal laser beam (0:08 - 0:09)
            vec3 C = vec3(mix(-11.0, 11.0, t), (s.x - 0.5) * 0.1, (s.y - 0.5) * 0.1);

            // Scene 4: Diagonal beam rotated at 1.05 rad (0:09 - 0:11)
            vec3 D = C;
            D.xy = rot(1.05) * D.xy;

            // Scene 5: Twisting hyperboloid hourglass lattice (0:12 - 0:15)
            float w = abs(t - 0.5) * 2.0;
            float rd = 0.15 + 5.2 * pow(w, 1.4);
            float an = s.x * 6.2832 + (t - 0.5) * (s.z > 0.5 ? 4.0 : -4.0);
            vec3 E = vec3(mix(-10.0, 10.0, t), rd * sin(an) * 0.8, rd * cos(an));

            // THE FINAL STAGE: Tri-Agent Constellation Cluster (Master, Experiment, Writing Agents & Hub)
            int g = int(floor(s.z * 2.999));
            vec2 ag = g == 0 ? vec2(0.0, 3.4) : (g == 1 ? vec2(-6.6, -2.6) : vec2(6.6, -2.6));
            float an2 = s.x * 6.2832;
            vec3 T = vec3(mix(ag, vec2(0.0, -0.4), pow(t, 0.9)) + vec2(cos(an2), sin(an2)) * (0.15 + s.y) * pow(1.0 - t, 0.7), (s.y - 0.5) * 0.5);

            vec3 p = A;
            p = mix(p, B, smoothstep(0.18, 0.30, uP));
            p = mix(p, C, smoothstep(0.38, 0.48, uP));
            p = mix(p, D, smoothstep(0.50, 0.60, uP));
            p = mix(p, E, smoothstep(0.64, 0.74, uP));
            p = mix(p, T, smoothstep(0.78, 0.88, uP));

            p.z += sin(t * 6.0 + uTm * 0.5 + s.y * 9.0) * 0.15;
            p.y += sin(t * 4.0 + uTm * 0.4 + s.x * 9.0) * 0.06;
            return p;
          }

          void main() {
            float t = aT;
            vec3 s = aS;
            float e = t > 0.98 ? -0.015 : 0.015;
            vec3 p = P(t, s), q = P(t + e, s);
            mat4 M = projectionMatrix * modelViewMatrix;
            vec4 c0 = M * vec4(p, 1.0), c1 = M * vec4(q, 1.0);
            vec2 d = (c1.xy / c1.w - c0.xy / c0.w) * vec2(uAsp, 1.0);
            d = normalize(d + vec2(1e-6)) * sign(e);
            vec2 n = vec2(-d.y, d.x) / vec2(uAsp, 1.0);
            float wd = mix(0.0022, 0.0085, s.y * s.y) * (0.55 + 0.45 * sin(t * 3.14159));
            gl_Position = c0;
            gl_Position.xy += n * aD * wd * c0.w;

            int g = int(floor(s.z * 2.999));
            float h = mix(mix(0.0, 0.5, smoothstep(0.18, 0.30, uP)), 1.0, smoothstep(0.78, 0.88, uP));
            float hot = pow(max(0.0, 1.0 - abs(t - h) * 2.2), 2.2);

            vec3 col = mix(vec3(0.23, 0.12, 0.66), vec3(0.72, 0.61, 1.0), clamp(hot * 1.4 + s.x * 0.25, 0.0, 1.0));
            col = mix(col, vec3(0.85, 0.78, 1.0), hot * hot * 0.3);

            // In the Final Stage (Multi-Agent Constellation), illuminate strands with dedicated agent colors
            float ta = smoothstep(0.78, 0.88, uP);
            vec3 gc = g == 0 ? vec3(0.75, 0.62, 1.0) : (g == 1 ? vec3(0.3, 0.55, 1.0) : vec3(0.2, 0.88, 0.82));
            col = mix(col, gc * (0.7 + hot * 0.7), ta * 0.9);

            float pu = smoothstep(0.96, 1.0, sin(t * 9.0 - uTm * 0.9 + s.y * 60.0) * 0.5 + 0.5);
            vA = (0.075 + 0.3 * hot) * smoothstep(0.0, 0.05, t) * smoothstep(1.0, 0.88, t) + pu * 0.35 * smoothstep(0.0, 0.1, t);
            vA *= 1.0 + 1.2 * smoothstep(0.78, 0.88, uP);
            vC = col;
            vD = aD;
          }
        `,
        fragmentShader: `
          varying float vA, vD;
          varying vec3 vC;
          void main() {
            gl_FragColor = vec4(vC * (1.0 + 0.6 * (1.0 - abs(vD))), vA * (1.0 - vD * vD));
          }
        `,
      });

      const mesh = new THREE.Mesh(g, m);
      mesh.frustumCulled = false;
      const sc = new THREE.Scene();
      const grp = new THREE.Group();
      grp.add(mesh);
      sc.add(grp);

      // Bioluminescent floating bokeh particles
      const pn = 90;
      const pp = new Float32Array(pn * 3);
      const ps = new Float32Array(pn);
      for (let i = 0; i < pn; i++) {
        pp.set([(Math.random() * 1.8 - 0.2) * 10, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6], i * 3);
        ps[i] = Math.random();
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
      pg.setAttribute('aR', new THREE.BufferAttribute(ps, 1));
      const pts = new THREE.Points(
        pg,
        new THREE.ShaderMaterial({
          uniforms: U,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          vertexShader: `
            attribute float aR;
            uniform float uP, uTm;
            varying float vO;
            void main() {
              vec3 p = position;
              p.y += sin(uTm * 0.3 + aR * 20.0) * 0.4;
              p.x += cos(uTm * 0.2 + aR * 30.0) * 0.3;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = (14.0 + aR * 46.0) * (12.0 / -mv.z);
              vO = (0.08 + 0.22 * aR) * smoothstep(0.06, 0.16, uP) * (1.0 - smoothstep(0.55, 0.70, uP));
              gl_Position = projectionMatrix * mv;
            }
          `,
          fragmentShader: `
            varying float vO;
            void main() {
              float d = length(gl_PointCoord - 0.5) * 2.0;
              gl_FragColor = vec4(0.62, 0.5, 1.0, vO * smoothstep(1.0, 0.2, d));
            }
          `,
        })
      );
      pts.frustumCulled = false;
      grp.add(pts);

      const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      const bc = blurCanvasRef.current;
      const bx = bc ? bc.getContext('2d') : null;
      let bw = 0, bh = 0;

      function rs() {
        if (!R || !bc) return;
        const w = Math.max(1, window.innerWidth);
        const h = Math.max(1, window.innerHeight);
        U.uAsp.value = w / h;
        R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        R.setSize(w, h);
        cam.aspect = w / h;
        cam.position.z = 12 * Math.max(1, 1.25 / cam.aspect);
        cam.updateProjectionMatrix();
        bw = bc.width = Math.max(1, Math.ceil(w / 4));
        bh = bc.height = Math.max(1, Math.ceil(h / 4));
      }
      window.addEventListener('resize', rs);
      rs();

      const loop = (t: number) => {
        animId = requestAnimationFrame(loop);
        P += (T - P) * 0.08;
        U.uP.value = P;
        U.uTm.value = rm ? 0 : t / 1000;

        grp.rotation.y += (mx * 0.25 - grp.rotation.y) * 0.05;
        grp.rotation.x += (my * 0.12 - grp.rotation.x) * 0.05;

        R.render(sc, cam);
        if (bx && bc && canvas && bw > 0 && bh > 0 && canvas.width > 0 && canvas.height > 0) {
          try {
            bx.clearRect(0, 0, bw, bh);
            bx.drawImage(canvas, 0, 0, bw, bh);
          } catch {
            // handle zero dimension canvas drawImage gracefully
          }
        }
        ui();
      };
      loop(0);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('scroll', scr);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', rs);
        R?.dispose();
      };
    } else {
      const fallbackLoop = () => {
        animId = requestAnimationFrame(fallbackLoop);
        P += (T - P) * 0.1;
        ui();
      };
      fallbackLoop();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('scroll', scr);
        window.removeEventListener('pointermove', onPointerMove);
      };
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'ArrowDown' || e.code === 'PageDown' || e.code === 'Space') {
        e.preventDefault();
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const currentP = window.scrollY / maxScroll;
        jumpToProgress(Math.min(1, currentP + 0.25));
      } else if (e.code === 'ArrowUp' || e.code === 'PageUp') {
        e.preventDefault();
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const currentP = window.scrollY / maxScroll;
        jumpToProgress(Math.max(0, currentP - 0.25));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Primary WebGL canvas */}
      <canvas id="c" ref={canvasRef} aria-label="Animated field of glowing research strands" />

      {/* Offscreen bloom canvas */}
      <canvas id="bl" ref={blurCanvasRef} aria-hidden="true" />

      {/* Radiant Iris glow */}
      <div id="gl" ref={glowRef} />

      {/* Navigation bar — Clean Typography: Just 'DRIVE' (no logo icon) as requested */}
      <nav id="nv" ref={navRef}>
        <div
          className="text-xl font-bold tracking-wider font-heading text-white select-none cursor-pointer hover:text-violet-300 transition-colors"
          onClick={() => jumpToProgress(0)}
          onDoubleClick={() => setCopyModalOpen(true)}
          title="DRIVE — Deep Research Intelligence & Verification Engine (Double click to view source code)"
        >
          DRIVE
        </div>

        <ul>
          <li>
            <a
              href="/assets/aistudio/DRIVE_Research_Paper_Final_310ecd38.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
              title="Open DRIVE Documentation (14-Page Technical Paper)"
            >
              Documentation
            </a>
          </li>
        </ul>
      </nav>

      {/* Beat 0: Hero Section (0:00 - 0:03) */}
      <section className="beat" id="b0">
        <div className="eb">Autonomous Research</div>
        <h1>
          Research That<br />Proves Itself.
        </h1>
        <p>
          DRIVE is an autonomous research platform where Research, Experiment and Writing agents investigate, challenge and synthesize — and nothing ships unless every number is verified.
        </p>
        <button
          className="btn"
          onClick={() => jumpToProgress(1.0)}
        >
          Explore Agents <i></i>
        </button>
        <a
          href="/assets/aistudio/DRIVE_Research_Paper_Final_310ecd38.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn g"
          style={{ textDecoration: 'none' }}
        >
          Documentation
        </a>
      </section>

      {/* Beat 1: About the Platform (0:04 - 0:07) */}
      <section className="beat" id="b1">
        <div className="eb">About the Platform</div>
        <h2>
          One Platform.<br />Endless Research Possibilities.
        </h2>
        <p>
          Research, Experiment and Writing agents never chat. They share one file-based contract, so every result is timestamped, traceable and replayable.
        </p>
      </section>

      {/* Beat 2: The Problem (0:08 - 0:11) */}
      <section className="beat" id="b2">
        <div className="eb">The Problem</div>
        <h2>
          AI Research Is Fluent.<br />It Isn&apos;t Always True.
        </h2>
        <p>
          Unsourced numbers, silent guesses and unreviewed claims slip into reports under deadline pressure. We make it verifiable.
        </p>
      </section>

      {/* Beat Solution 1 (0:12 - 0:14) */}
      <section
        className="beat"
        id="bs"
        style={{ left: '50%', top: '14vh', marginLeft: '-200px', width: '400px', textAlign: 'center' }}
      >
        <p style={{ margin: '0 auto' }}>
          By separating roles, replacing chat with files and gating every claim, DRIVE removes the guesswork from research.
        </p>
      </section>

      {/* Beat Solution 2 (0:14 - 0:17) */}
      <section className="beat" id="b3">
        <div className="eb">The Solution</div>
        <h2>
          The Future of Verified<br />Research Starts Here.
        </h2>
        <p>Every guessed value is blocked at the gate until it is measured, file-backed and traced.</p>
      </section>

      {/* THE FINAL STAGE: Multi-Agent Constellation Cards (DRIVE Architecture) */}
      <div
        className="ag cursor-pointer"
        id="ag0"
        onClick={() => setSelectedAgent('research')}
        title="Click to inspect Research Agent"
      >
        <i>DISCOVERS & INVESTIGATES</i>
        <b>Research Agent</b>
        <p>Breaks the question into research tasks, runs experiments/searches, gathers evidence, and investigates the problem.</p>
      </div>

      <div
        className="ag cursor-pointer"
        id="ag1"
        onClick={() => setSelectedAgent('experiment')}
        title="Click to inspect Experiment Agent"
      >
        <i>CHALLENGES & VALIDATES</i>
        <b>Experiment Agent</b>
        <p>Tests the initial findings, searches for counter-evidence, detects failures/contradictions, and decides what needs further investigation.</p>
      </div>

      <div
        className="ag cursor-pointer"
        id="ag2"
        onClick={() => setSelectedAgent('writing')}
        title="Click to inspect Writing Agent"
      >
        <i>SYNTHESIZES & REPORTS</i>
        <b>Writing Agent</b>
        <p>Turns the verified research into a structured final report, connects claims to evidence, and maintains the research/decision record.</p>
      </div>

      {/* FINAL STAGE: DOCUMENTATION ACCESS (PERFECTLY CENTERED, EXACT SAME FONT AND STYLE, NO ICONS/EMOJIS) */}
      <div
        className="fixed z-35 flex flex-col items-center pointer-events-auto"
        id="paper-cta"
        style={{
          left: '50%',
          bottom: '7.5vh',
          transform: 'translateX(-50%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <a
          href="/assets/aistudio/DRIVE_Research_Paper_Final_310ecd38.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn g"
          style={{
            marginRight: 0,
            textDecoration: 'none',
            fontSize: '9.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Documentation
        </a>
      </div>

      {/* ENTERED RESEARCH AREA DASHBOARD (BLACK DOTTED THEME MATCHING REFERENCE IMAGE) */}
      {enteredResearchArea && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black animate-in fade-in duration-300">
          <DriveBrowserWorkspace onBackToIntro={() => setEnteredResearchArea(false)} />
        </div>
      )}

      {/* Interactive Agent Inspector Modal */}
      <AgentDetailModal
        agentType={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onOpenPipeline={() => {
          setSelectedAgent(null);
          setRedTeamModalOpen(true);
        }}
      />

      {/* Interactive Red-Team Verification Pipeline Runner */}
      <RedTeamWorkflowModal
        isOpen={redTeamModalOpen}
        onClose={() => setRedTeamModalOpen(false)}
      />

      {/* DRIVE Architecture Documentation Modal */}
      <DocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

      {/* Drive-AR Research Paper Viewer Modal */}
      <ResearchPaperModal
        isOpen={paperModalOpen}
        onClose={() => setPaperModalOpen(false)}
      />

      {/* Source Code Modal */}
      <CopyCodeModal isOpen={copyModalOpen} onClose={() => setCopyModalOpen(false)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs shadow-xl animate-in fade-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 450vh scroll driver track for the cinematic intro sequence */}
      <div style={{ height: '450vh' }} />
    </>
  );
}
