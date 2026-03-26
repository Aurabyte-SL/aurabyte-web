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

  #define PI 3.14159265359

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * smoothNoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;
    
    // Aurora waves
    float aurora = 0.0;
    for (float i = 0.0; i < 4.0; i++) {
      float offset = i * 0.15;
      float wave = sin(uv.x * 3.0 + t + i) * 0.1;
      wave += fbm(vec2(uv.x * 2.0 + t * 0.5, i)) * 0.15;
      
      float y = 0.5 + wave + offset;
      float dist = abs(uv.y - y);
      float intensity = smoothstep(0.15, 0.0, dist);
      intensity *= smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
      
      aurora += intensity * (1.0 - i * 0.2);
    }
    
    // Colors - teal/cyan aurora
    vec3 color1 = vec3(0.0, 0.8, 0.7);  // Cyan
    vec3 color2 = vec3(0.0, 0.4, 0.6);  // Teal blue
    vec3 color3 = vec3(0.1, 0.2, 0.4);  // Deep blue
    
    vec3 auroraColor = mix(color2, color1, aurora);
    auroraColor = mix(color3, auroraColor, aurora * 0.8);
    
    // Dark background
    vec3 bgColor = vec3(0.02, 0.04, 0.08);
    
    // Combine
    vec3 finalColor = mix(bgColor, auroraColor, aurora * 0.6);
    
    // Add subtle stars
    float stars = step(0.998, noise(uv * 500.0));
    finalColor += stars * 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function AuroraPlane() {
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

interface AuroraShaderProps {
  className?: string
}

export function AuroraShader({ className = "" }: AuroraShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <AuroraPlane />
      </Canvas>
    </div>
  )
}
