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
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;
    
    // Domain warping for nebula effect
    vec2 q = vec2(
      fbm(uv + t * 0.1),
      fbm(uv + vec2(1.0))
    );
    
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t)
    );
    
    float f = fbm(uv + 4.0 * r);
    
    // Color mixing
    vec3 color1 = vec3(0.0, 0.1, 0.2);    // Deep blue
    vec3 color2 = vec3(0.0, 0.3, 0.3);    // Teal
    vec3 color3 = vec3(0.0, 0.5, 0.5);    // Cyan
    vec3 color4 = vec3(0.1, 0.2, 0.3);    // Blue gray
    
    vec3 finalColor = mix(color1, color2, clamp(f * f * 2.0, 0.0, 1.0));
    finalColor = mix(finalColor, color3, clamp(length(q), 0.0, 1.0) * 0.5);
    finalColor = mix(finalColor, color4, clamp(length(r.x), 0.0, 1.0) * 0.3);
    
    // Add subtle glow spots
    float glow1 = exp(-length(uv - vec2(0.3, 0.4)) * 3.0) * 0.2;
    float glow2 = exp(-length(uv - vec2(0.7, 0.6)) * 4.0) * 0.15;
    finalColor += vec3(0.0, 0.4, 0.4) * glow1;
    finalColor += vec3(0.0, 0.3, 0.5) * glow2;
    
    // Star field
    float stars = step(0.997, hash(floor(uv * 300.0)));
    float starBrightness = hash(floor(uv * 300.0) + 100.0);
    finalColor += stars * starBrightness * 0.5;
    
    // Vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.6;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function NebulaPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size])

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

interface NebulaShaderProps {
  className?: string
}

export function NebulaShader({ className = "" }: NebulaShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <NebulaPlane />
      </Canvas>
    </div>
  )
}
