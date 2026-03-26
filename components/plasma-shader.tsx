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
    float t = uTime * 0.3;
    
    // Plasma effect
    float v1 = sin(uv.x * 10.0 + t);
    float v2 = sin(uv.y * 10.0 + t);
    float v3 = sin((uv.x + uv.y) * 10.0 + t);
    float v4 = sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 10.0 + t);
    
    float plasma = (v1 + v2 + v3 + v4) / 4.0;
    
    // Second layer
    float v5 = sin(uv.x * 5.0 - t * 0.5);
    float v6 = sin(uv.y * 7.0 + t * 0.7);
    float plasma2 = (v5 + v6) / 2.0;
    
    // Combine
    float final = plasma * 0.7 + plasma2 * 0.3;
    
    // Color mapping - dark teal theme
    vec3 color1 = vec3(0.0, 0.1, 0.15);
    vec3 color2 = vec3(0.0, 0.3, 0.35);
    vec3 color3 = vec3(0.0, 0.5, 0.5);
    
    vec3 finalColor;
    if (final < 0.0) {
      finalColor = mix(color1, color2, final + 1.0);
    } else {
      finalColor = mix(color2, color3, final);
    }
    
    // Darken overall
    finalColor *= 0.4;
    
    // Add vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function PlasmaPlane() {
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

interface PlasmaShaderProps {
  className?: string
}

export function PlasmaShader({ className = "" }: PlasmaShaderProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <PlasmaPlane />
      </Canvas>
    </div>
  )
}
