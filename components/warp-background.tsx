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

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    
    // Aspect correction
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - center) * vec2(aspect, 1.0);
    
    // Polar coordinates
    float angle = atan(p.y, p.x);
    float radius = length(p);
    
    // Warp effect
    float warp = uTime * 0.5;
    float lines = 100.0;
    
    // Create star field effect
    float stars = 0.0;
    for (float i = 0.0; i < 3.0; i++) {
      float speed = 0.5 + i * 0.3;
      float dist = fract(radius * (2.0 + i) - warp * speed);
      float streak = smoothstep(0.0, 0.1, dist) * smoothstep(1.0, 0.3, dist);
      
      // Angle variation
      float angleVar = floor(angle * lines / (2.0 * PI)) / lines * 2.0 * PI;
      float rand = random(vec2(angleVar, i));
      
      if (rand > 0.7) {
        stars += streak * (1.0 - i * 0.2) * rand;
      }
    }
    
    // Add subtle glow at center
    float centerGlow = exp(-radius * 4.0) * 0.2;
    
    // Color
    vec3 bgColor = vec3(0.03, 0.05, 0.08);
    vec3 starColor = vec3(0.7, 0.9, 1.0);
    vec3 glowColor = vec3(0.0, 0.4, 0.4);
    
    vec3 finalColor = bgColor;
    finalColor += starColor * stars * 0.3;
    finalColor += glowColor * centerGlow;
    
    // Vignette
    float vignette = 1.0 - radius * 0.5;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function WarpPlane() {
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

export function WarpBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        style={{ background: '#080c14' }}
      >
        <WarpPlane />
      </Canvas>
    </div>
  )
}
