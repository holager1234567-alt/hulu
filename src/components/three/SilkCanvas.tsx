import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Mesh, Plane, Raycaster, ShaderMaterial, Vector2, Vector3 } from 'three'

import { getScrollVelocity } from '@/lib/scrollVelocity'
import { SILK_TONES, type SilkPalette } from '@/components/three/silkPalettes'

type SilkCanvasProps = {
  palette: SilkPalette
  active: boolean
  onReady?: () => void
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform vec2 uPointer;
  uniform float uPress;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vHeight;

  float fold(vec2 p, float t) {
    vec2 q = p + 0.42 * vec2(sin(p.y * 0.9 + t * 0.21), cos(p.x * 0.7 - t * 0.17));
    float h = sin(q.x * 1.25 + q.y * 0.35 + t * 0.38) * 0.55;
    h += sin(q.x * 2.3 - q.y * 0.5 + t * 0.29 + 1.7) * 0.25;
    h += sin(q.x * 0.6 + q.y * 1.4 - t * 0.23 + 0.4) * 0.22;
    h += sin(q.x * 4.1 + q.y * 0.9 + t * 0.45 + 2.3) * 0.06;
    return h;
  }

  float surface(vec2 p) {
    float h = fold(p, uTime) * uAmp;
    vec2 d = p - uPointer;
    h -= uPress * exp(-dot(d, d) * 0.9) * 0.28;
    return h;
  }

  void main() {
    vec2 p = position.xy;
    float h = surface(p);
    const float e = 0.03;
    float hx = surface(p + vec2(e, 0.0));
    float hy = surface(p + vec2(0.0, e));
    vec3 n = normalize(vec3(h - hx, h - hy, e));
    vHeight = h / max(uAmp, 0.001);
    vNormal = normalize(normalMatrix * n);
    vec4 mv = modelViewMatrix * vec4(p, h, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uBase;
  uniform vec3 uLight;
  uniform vec3 uSheen;
  uniform vec3 uBg;
  uniform vec3 uLightDir;
  uniform vec2 uResolution;
  uniform vec2 uFade;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vHeight;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vViewPos);
    vec3 L = normalize(uLightDir);
    float wrap = clamp(dot(N, L) * 0.55 + 0.45, 0.0, 1.0);
    vec3 H = normalize(L + V);
    float ndh = max(dot(N, H), 0.0);
    float spec = pow(ndh, 64.0);
    float soft = pow(ndh, 10.0);
    float rim = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
    float cavity = smoothstep(-1.1, 0.9, vHeight);

    vec3 col = mix(uDeep, uBase, smoothstep(0.05, 0.6, wrap));
    col = mix(col, uLight, smoothstep(0.6, 1.0, wrap));
    col *= mix(0.84, 1.0, cavity);
    col += uSheen * (spec * 0.35 + soft * 0.05);
    col = mix(col, uSheen, rim * 0.12);

    vec2 screen = gl_FragCoord.xy / uResolution;
    float fade = smoothstep(0.0, max(uFade.x, 0.0001), screen.y)
      * (1.0 - smoothstep(1.0 - max(uFade.y, 0.0001), 1.0, screen.y));
    col = mix(uBg, col, fade);
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * (1.5 / 255.0);
    gl_FragColor = vec4(col, 1.0);
  }
`

function rgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return new Vector3(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255)
}

function SilkSurface({ palette, onReady }: { palette: SilkPalette; onReady?: () => void }) {
  const tone = SILK_TONES[palette]
  const meshRef = useRef<Mesh>(null)
  const camera = useThree((state) => state.camera)
  const viewport = useThree((state) => state.viewport)
  const gl = useThree((state) => state.gl)
  const vp = viewport.getCurrentViewport(camera, [0, 0, 0])

  const pointer = useRef({ x: 0, y: 0, inside: false, speed: 0 })
  const frames = useRef(0)
  const time = useRef(Math.random() * 40)
  const press = useRef(0)
  const scratch = useMemo(
    () => ({ ray: new Raycaster(), plane: new Plane(), hit: new Vector3(), ndc: new Vector2(), normal: new Vector3(), res: new Vector2() }),
    [],
  )

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: tone.amplitude },
          uPointer: { value: new Vector2(0, 0) },
          uPress: { value: 0 },
          uDeep: { value: rgb(tone.deep) },
          uBase: { value: rgb(tone.base) },
          uLight: { value: rgb(tone.light) },
          uSheen: { value: rgb(tone.sheen) },
          uBg: { value: rgb(tone.bg) },
          uLightDir: { value: new Vector3(0.35, 0.55, 0.75) },
          uResolution: { value: new Vector2(1, 1) },
          uFade: { value: new Vector2(tone.fadeBottom, tone.fadeTop) },
        },
      }),
    [tone],
  )

  useEffect(() => () => material.dispose(), [material])

  useEffect(() => {
    const canvas = gl.domElement
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      const state = pointer.current
      state.speed = Math.min(1, state.speed + Math.hypot(x - state.x, y - state.y) * 4)
      state.x = x
      state.y = y
      state.inside = Math.abs(x) <= 1 && Math.abs(y) <= 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [gl])

  useFrame((_state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const u = material.uniforms
    const p = pointer.current
    const ease = 1 - Math.exp(-delta * 3)

    time.current += delta * (0.75 + Math.min(Math.abs(getScrollVelocity()) * 0.05, 2.2))
    u.uTime.value = time.current

    const targetPress = p.inside ? 0.35 + p.speed * 0.65 : 0
    press.current += (targetPress - press.current) * ease
    p.speed *= Math.exp(-delta * 2.5)
    u.uPress.value = press.current

    if (p.inside) {
      scratch.ndc.set(p.x, p.y)
      scratch.ray.setFromCamera(scratch.ndc, camera)
      scratch.normal.set(0, 0, 1).applyQuaternion(mesh.quaternion)
      scratch.plane.setFromNormalAndCoplanarPoint(scratch.normal, mesh.position)
      if (scratch.ray.ray.intersectPlane(scratch.plane, scratch.hit)) {
        mesh.worldToLocal(scratch.hit)
        u.uPointer.value.lerp(new Vector2(scratch.hit.x, scratch.hit.y), ease)
      }
    }

    const light = u.uLightDir.value as Vector3
    light.x += (0.35 + p.x * 0.45 - light.x) * ease
    light.y += (0.55 + p.y * 0.35 - light.y) * ease

    gl.getDrawingBufferSize(scratch.res)
    u.uResolution.value.copy(scratch.res)

    frames.current += 1
    if (frames.current === 2) onReady?.()
  })

  return (
    <mesh ref={meshRef} rotation={[-0.3, 0, 0.14]} material={material}>
      <planeGeometry args={[vp.width * 1.45, vp.height * 1.7, 200, 130]} />
    </mesh>
  )
}

export default function SilkCanvas({ palette, active, onReady }: SilkCanvasProps) {
  return (
    <Canvas
      className="silk-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      flat
      gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance' }}
      camera={{ fov: 30, position: [0, 0, 10], near: 0.1, far: 40 }}
    >
      <SilkSurface palette={palette} onReady={onReady} />
    </Canvas>
  )
}
