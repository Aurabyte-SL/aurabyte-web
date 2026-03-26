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

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.5;
    
    // Multiple wave layers
    float waves = 0.0;
    
    for (float i = 0.0; i < 6.0; i++) {
      float freq = 2.0 + i * 1.5;
      float speed = 0.3 + i * 0.1;
      float amp = 0.03 / (i + 1.0);
      
      float wave = sin(uv.x * freq * PI + t * speed + i * 0.5) * amp;
      wave += sin(uv.x * freq * 0.7 * PI - t * speed * 0.8 + i) * amp * 0.5;
      
      float y = 0.3 + i * 0.1 + wave;
      float dist = abs(uv.y - y);
      float line = smoothstep(0.02, 0.0, dist);
      
      waves += line * (1.0 - i * 0.12);
    }
    
    // Background gradient
    vec3 bgTop = vec3(0.02, 0.04, 0.08);
    vec3 bgBottom = vec3(0.05, 0.1, 0.12);
    vec3 bgColor = mix(bgBottom, bgTop, uv.y);
    
    // Wave color
    vec3 waveColor = vec3(0.0, 0.6, 0.6);
    
    // Combine
    vec3 finalColor = bgColor + waveColor * waves * 0.4;
    
    // Add glow under waves
    float glow = smoothstep(0.8, 0.3, uv.y) * 0.15;
    finalColor += vec3(0.0, 0.3, 0.3) * glow;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function WavePlane() {
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

interface WaveShaderProps {
  className?: string
}

export function WaveShader({ className = "" }: WaveShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <WavePlane />
      </Canvas>
    </div>
  )
}
