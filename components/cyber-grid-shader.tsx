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

  float grid(vec2 uv, float size, float thickness) {
    vec2 g = abs(fract(uv * size - 0.5) - 0.5) / fwidth(uv * size);
    return 1.0 - min(min(g.x, g.y), 1.0) * thickness;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;
    
    // Perspective transformation for infinite grid look
    vec2 p = uv - 0.5;
    p.y -= 0.3;
    
    float perspective = 1.0 / (p.y + 0.5);
    vec2 gridUv = vec2(p.x * perspective, perspective);
    gridUv.y -= t; // Scrolling effect
    
    // Create grid layers
    float grid1 = grid(gridUv, 10.0, 0.8);
    float grid2 = grid(gridUv, 50.0, 0.5);
    
    // Fade based on distance (perspective)
    float fade = smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.6, uv.y);
    fade *= smoothstep(-0.3, 0.0, p.y);
    
    // Horizon glow
    float horizonGlow = exp(-abs(uv.y - 0.3) * 8.0) * 0.5;
    
    // Scan line effect
    float scanline = sin(uv.y * 200.0 + t * 5.0) * 0.02 + 1.0;
    
    // Colors
    vec3 bgColor = vec3(0.02, 0.03, 0.06);
    vec3 gridColor = vec3(0.0, 0.7, 0.7);
    vec3 glowColor = vec3(0.0, 0.5, 0.6);
    
    // Combine
    vec3 finalColor = bgColor;
    finalColor += gridColor * (grid1 * 0.3 + grid2 * 0.1) * fade;
    finalColor += glowColor * horizonGlow;
    finalColor *= scanline;
    
    // Top fade to dark
    finalColor *= smoothstep(1.0, 0.7, uv.y);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function GridPlane() {
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

interface CyberGridShaderProps {
  className?: string
}

export function CyberGridShader({ className = "" }: CyberGridShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <GridPlane />
      </Canvas>
    </div>
  )
}
