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
  uniform vec2 uMouse;
  varying vec2 vUv;

  #define PI 3.14159265359

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.3;
    
    // Particle field
    float particles = 0.0;
    
    for (float layer = 0.0; layer < 4.0; layer++) {
      float scale = 15.0 + layer * 10.0;
      float speed = 0.1 + layer * 0.05;
      float size = 0.015 - layer * 0.003;
      
      vec2 gridPos = p * scale;
      gridPos.y -= t * speed * (1.0 + layer * 0.5);
      
      vec2 cellId = floor(gridPos);
      vec2 cellUv = fract(gridPos) - 0.5;
      
      // Random offset within cell
      vec2 offset = vec2(
        hash(cellId) - 0.5,
        hash(cellId + 100.0) - 0.5
      ) * 0.6;
      
      float dist = length(cellUv - offset);
      float particle = smoothstep(size, 0.0, dist);
      
      // Brightness variation
      float brightness = hash(cellId + 200.0);
      
      // Pulse effect
      float pulse = sin(t * 2.0 + hash(cellId) * PI * 2.0) * 0.3 + 0.7;
      
      particles += particle * brightness * pulse * (1.0 - layer * 0.2);
    }
    
    // Mouse interaction
    vec2 mousePos = (uMouse - 0.5) * vec2(aspect, 1.0);
    float mouseDist = length(p - mousePos);
    float mouseGlow = exp(-mouseDist * 5.0) * 0.3;
    
    // Connection lines
    float lines = 0.0;
    for (float i = 0.0; i < 3.0; i++) {
      vec2 lineStart = vec2(
        sin(t * 0.5 + i * 2.0) * 0.4,
        cos(t * 0.3 + i * 1.5) * 0.3
      );
      vec2 lineEnd = vec2(
        sin(t * 0.4 + i * 1.8 + 1.0) * 0.4,
        cos(t * 0.35 + i * 2.2 + 1.5) * 0.3
      );
      
      vec2 lineDir = normalize(lineEnd - lineStart);
      float lineLen = length(lineEnd - lineStart);
      vec2 toPoint = p - lineStart;
      float proj = clamp(dot(toPoint, lineDir), 0.0, lineLen);
      vec2 closest = lineStart + lineDir * proj;
      float lineDist = length(p - closest);
      
      lines += smoothstep(0.003, 0.0, lineDist) * 0.2;
    }
    
    // Colors
    vec3 bgColor = vec3(0.02, 0.04, 0.06);
    vec3 particleColor = vec3(0.0, 0.7, 0.7);
    vec3 glowColor = vec3(0.0, 0.5, 0.6);
    vec3 lineColor = vec3(0.0, 0.4, 0.5);
    
    // Combine
    vec3 finalColor = bgColor;
    finalColor += particleColor * particles * 0.5;
    finalColor += glowColor * mouseGlow;
    finalColor += lineColor * lines;
    
    // Subtle radial gradient
    float radial = 1.0 - length(p) * 0.5;
    finalColor *= radial;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function ParticlePlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size, pointer } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  }), [size])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      )
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

interface ParticleFieldShaderProps {
  className?: string
}

export function ParticleFieldShader({ className = "" }: ParticleFieldShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ParticlePlane />
      </Canvas>
    </div>
  )
}
