"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.1;
    
    // Multi-layered noise
    float n1 = fbm(uv * 3.0 + t);
    float n2 = fbm(uv * 5.0 - t * 0.5);
    float n3 = fbm(uv * 8.0 + vec2(t * 0.3, -t * 0.2));
    
    // Combine noise layers
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    noise = noise * 0.5 + 0.5;
    
    // Gradient based on position and noise
    float gradient = uv.y + noise * 0.3;
    
    // Three-color gradient
    vec3 finalColor;
    if (gradient < 0.5) {
      finalColor = mix(uColor1, uColor2, gradient * 2.0);
    } else {
      finalColor = mix(uColor2, uColor3, (gradient - 0.5) * 2.0);
    }
    
    // Add noise variation
    finalColor += (noise - 0.5) * 0.1;
    
    // Subtle grain
    float grain = fract(sin(dot(uv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (grain - 0.5) * 0.02;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function GradientPlane({ color1, color2, color3 }: { color1: THREE.Color; color2: THREE.Color; color3: THREE.Color }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor1: { value: color1 },
    uColor2: { value: color2 },
    uColor3: { value: color3 },
  }), [size, color1, color2, color3])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

interface NoiseGradientShaderProps {
  className?: string
  colors?: [string, string, string]
}

export function NoiseGradientShader({ 
  className = "",
  colors = ["#050810", "#0a1520", "#051515"]
}: NoiseGradientShaderProps) {
  const color1 = useMemo(() => new THREE.Color(colors[0]), [colors])
  const color2 = useMemo(() => new THREE.Color(colors[1]), [colors])
  const color3 = useMemo(() => new THREE.Color(colors[2]), [colors])

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <GradientPlane color1={color1} color2={color2} color3={color3} />
      </Canvas>
    </div>
  )
}
