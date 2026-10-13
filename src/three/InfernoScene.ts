import * as THREE from "three";
import { simplex3 } from "./noise.glsl";

/**
 * Where the core sits for a given section. x/y are fractions of the
 * visible half-width/half-height (-1..1), scale is relative to the
 * smaller viewport half-extent, intensity drives glow + ember brightness.
 */
export interface CorePose {
  x: number;
  y: number;
  scale: number;
  intensity: number;
}

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
varying float vDisp;
varying vec3 vViewPos;
varying vec3 vObjPos;
${simplex3}
void main() {
  vec3 p = position;
  float n = snoise(p * uFreq + vec3(0.0, uTime * 0.22, uTime * 0.12));
  n += 0.45 * snoise(p * uFreq * 2.2 - vec3(uTime * 0.31));
  float d = n * uAmp;
  vDisp = n;
  vObjPos = p;
  vec3 displaced = p + normalize(p) * d;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const coreFragment = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
varying float vDisp;
varying vec3 vViewPos;
varying vec3 vObjPos;
${simplex3}

vec3 heatRamp(float t) {
  vec3 crust  = vec3(0.025, 0.010, 0.008);
  vec3 ember  = vec3(0.42, 0.045, 0.012);
  vec3 orange = vec3(1.0, 0.30, 0.05);
  vec3 gold   = vec3(1.0, 0.78, 0.42);
  vec3 c = mix(crust, ember, smoothstep(0.15, 0.55, t));
  c = mix(c, orange, smoothstep(0.55, 0.82, t));
  c = mix(c, gold, smoothstep(0.86, 1.0, t));
  return c;
}

void main() {
  vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  vec3 V = normalize(-vViewPos);
  float ndv = max(dot(N, V), 0.0);
  float fres = pow(1.0 - ndv, 2.6);

  // Lava veins: thin bright seams where a second noise field crosses zero
  float vn = snoise(vObjPos * 2.6 + vec3(uTime * 0.08, -uTime * 0.05, 0.0));
  float vein = 1.0 - smoothstep(0.0, 0.07, abs(vn));
  vein *= smoothstep(-0.3, 0.4, vDisp);

  float heat = clamp(vDisp * 0.5 + 0.5, 0.0, 1.0);
  heat = pow(heat, 1.6);

  vec3 L = normalize(vec3(-0.5, 0.8, 0.6));
  float diff = max(dot(N, L), 0.0);
  vec3 base = vec3(0.05, 0.03, 0.028) * (0.35 + diff * 0.9);

  vec3 emit = heatRamp(heat) * (0.55 + 0.9 * uIntensity);
  emit += vec3(1.0, 0.45, 0.1) * vein * (0.9 + uIntensity);
  vec3 rim = vec3(1.0, 0.36, 0.08) * fres * (0.6 + 1.4 * uIntensity);

  vec3 col = base + emit + rim;
  col = col / (1.0 + col * 0.35);
  gl_FragColor = vec4(col, 1.0);
}
`;

const haloVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const haloFragment = /* glsl */ `
uniform float uIntensity;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(1.0 - smoothstep(0.0, 1.0, d), 2.4);
  vec3 col = mix(vec3(1.0, 0.22, 0.04), vec3(1.0, 0.55, 0.2), a);
  gl_FragColor = vec4(col, a * 0.55 * uIntensity);
}
`;

const emberVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uScroll;
uniform float uSize;
attribute float aSeed;
varying float vSeed;
varying float vFade;
void main() {
  vec3 p = position;
  float speed = 0.18 + aSeed * 0.55;
  float span = 12.0;
  float y = p.y + uTime * speed + uScroll * (0.4 + aSeed * 1.2);
  y = mod(y + span * 0.5, span) - span * 0.5;
  p.y = y;
  p.x += sin(uTime * 0.6 + aSeed * 40.0) * 0.25 + sin(y * 0.8 + aSeed * 10.0) * 0.18;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.6 + aSeed * 1.8) * uPixelRatio * (8.0 / -mv.z);
  vSeed = aSeed;
  vFade = smoothstep(span * 0.5, span * 0.2, abs(y));
}
`;

const emberFragment = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
varying float vSeed;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  float flicker = 0.55 + 0.45 * sin(uTime * (2.0 + vSeed * 6.0) + vSeed * 50.0);
  vec3 col = mix(vec3(1.0, 0.3, 0.05), vec3(1.0, 0.75, 0.35), vSeed);
  gl_FragColor = vec4(col, core * core * flicker * vFade * (0.35 + 0.65 * uIntensity));
}
`;

const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

export class InfernoScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  private last = 0;
  private group = new THREE.Group();
  private spinner = new THREE.Group();
  private shell: THREE.LineSegments;
  private ring: THREE.Points;
  private coreMat: THREE.ShaderMaterial;
  private haloMat: THREE.ShaderMaterial;
  private emberMat: THREE.ShaderMaterial;
  private raf = 0;
  private time = 0;
  private running = false;
  private reduced: boolean;

  private pose: CorePose = { x: 0.45, y: 0, scale: 1, intensity: 1 };
  private target: CorePose = { x: 0.45, y: 0, scale: 1, intensity: 1 };
  private pointer = new THREE.Vector2();
  private pointerSmooth = new THREE.Vector2();
  private velocity = 0;
  private scroll = 0;
  private scrollSmooth = 0;
  private intro = 0;

  constructor(private canvas: HTMLCanvasElement, opts: { mobile: boolean; reducedMotion: boolean }) {
    this.reduced = opts.reducedMotion;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 1.75));
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.set(0, 0, 9);

    // Molten core
    const detail = opts.mobile ? 28 : 56;
    this.coreMat = new THREE.ShaderMaterial({
      vertexShader: coreVertex,
      fragmentShader: coreFragment,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.16 },
        uFreq: { value: 1.25 },
        uIntensity: { value: 1 },
      },
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1, detail), this.coreMat);
    this.spinner.add(core);

    // Wireframe cage around the core
    this.shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 1)),
      new THREE.LineBasicMaterial({ color: 0xff6a2b, transparent: true, opacity: 0.16, depthWrite: false })
    );
    this.spinner.add(this.shell);

    // Orbiting ring of points
    const ringCount = opts.mobile ? 160 : 260;
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2;
      const r = 1.95 + (Math.random() - 0.5) * 0.08;
      ringPos[i * 3] = Math.cos(a) * r;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      ringPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    this.ring = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({ color: 0xffa060, size: 0.028, transparent: true, opacity: 0.75, depthWrite: false })
    );
    this.ring.rotation.set(1.15, 0, 0.35);
    this.spinner.add(this.ring);

    // Soft glow billboard behind the core
    this.haloMat = new THREE.ShaderMaterial({
      vertexShader: haloVertex,
      fragmentShader: haloFragment,
      uniforms: { uIntensity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 5.6), this.haloMat);
    halo.position.z = -1.2;
    this.group.add(halo);

    this.group.add(this.spinner);
    this.scene.add(this.group);

    // Rising embers across the whole viewport
    const count = opts.mobile ? 420 : 1100;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -6 + Math.random() * 8;
      seed[i] = Math.random();
    }
    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    emberGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    this.emberMat = new THREE.ShaderMaterial({
      vertexShader: emberVertex,
      fragmentShader: emberFragment,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
        uScroll: { value: 0 },
        uSize: { value: opts.mobile ? 3.2 : 4.2 },
        uIntensity: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.scene.add(new THREE.Points(emberGeo, this.emberMat));

    this.resize();
  }

  /** Visible half-extents of the z=0 plane. */
  private halfExtents() {
    const halfH = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    return { halfW: halfH * this.camera.aspect, halfH };
  }

  resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  setPose(p: CorePose) {
    this.target = p;
  }

  setPointer(nx: number, ny: number) {
    this.pointer.set(nx, ny);
  }

  /** Lenis scroll position (px) and velocity (px/frame). */
  setScroll(y: number, velocity: number) {
    this.scroll = y;
    this.velocity = velocity;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      this.frame();
    };
    loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private frame() {
    const now = performance.now();
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.time += dt * (this.reduced ? 0.15 : 1);
    this.intro = Math.min(1, this.intro + dt * 0.6);
    const introEase = 1 - Math.pow(1 - this.intro, 3);

    const t = this.target;
    const p = this.pose;
    p.x = damp(p.x, t.x, 2.6, dt);
    p.y = damp(p.y, t.y, 2.6, dt);
    p.scale = damp(p.scale, t.scale, 2.6, dt);
    p.intensity = damp(p.intensity, t.intensity, 2.2, dt);

    const { halfW, halfH } = this.halfExtents();
    const unit = Math.min(halfW, halfH) * 0.55;
    this.group.position.set(p.x * halfW, p.y * halfH, 0);
    this.group.scale.setScalar(Math.max(0.001, p.scale * unit * introEase));

    this.pointerSmooth.x = damp(this.pointerSmooth.x, this.pointer.x, 3, dt);
    this.pointerSmooth.y = damp(this.pointerSmooth.y, this.pointer.y, 3, dt);
    this.spinner.rotation.y = this.time * 0.12 + this.pointerSmooth.x * 0.5;
    this.spinner.rotation.x = -this.pointerSmooth.y * 0.35 + Math.sin(this.time * 0.2) * 0.1;
    this.shell.rotation.y = -this.time * 0.18;
    this.shell.rotation.z = this.time * 0.07;
    this.ring.rotation.y = this.time * 0.25;

    // Scroll velocity agitates the surface
    const agitation = this.reduced ? 0 : Math.min(Math.abs(this.velocity) * 0.012, 0.22);
    const amp = this.coreMat.uniforms.uAmp;
    amp.value = damp(amp.value, 0.16 + agitation, 6, dt);

    this.scrollSmooth = damp(this.scrollSmooth, this.scroll, 5, dt);

    this.coreMat.uniforms.uTime.value = this.time;
    this.coreMat.uniforms.uIntensity.value = p.intensity;
    this.haloMat.uniforms.uIntensity.value = p.intensity * introEase;
    this.emberMat.uniforms.uTime.value = this.time;
    this.emberMat.uniforms.uScroll.value = this.scrollSmooth * 0.004;
    this.emberMat.uniforms.uIntensity.value = 0.45 + p.intensity * 0.55;

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    this.scene.traverse((obj) => {
      const o = obj as THREE.Mesh;
      o.geometry?.dispose();
      const m = o.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    this.renderer.dispose();
  }
}
