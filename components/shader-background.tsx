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
    float frequency = 1.0;
    
    for (int i = 0; i < 6; i++) {
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    
    // Animated flow field
    float t = uTime * 0.1;
    vec2 flow = vec2(
      fbm(p * 2.0 + t),
      fbm(p * 2.0 + t + 100.0)
    );
    
    // Create flowing lines effect
    float lines = 0.0;
    for (float i = 0.0; i < 5.0; i++) {
      vec2 offset = flow * (i * 0.1 + 0.5);
      float line = sin((p.x + offset.x) * 10.0 + (p.y + offset.y) * 5.0 + t * (i + 1.0)) * 0.5 + 0.5;
      line = smoothstep(0.4, 0.6, line);
      lines += line * (0.3 - i * 0.05);
    }
    
    // Mouse interaction
    vec2 mousePos = (uMouse - 0.5) * aspect;
    float mouseDist = length(p - mousePos);
    float mouseGlow = exp(-mouseDist * 3.0) * 0.3;
    
    // Gradient colors - teal to dark blue
    vec3 color1 = vec3(0.05, 0.08, 0.12); // Dark background
    vec3 color2 = vec3(0.1, 0.25, 0.3);   // Teal accent
    vec3 color3 = vec3(0.0, 0.5, 0.5);    // Bright teal
    
    // Combine effects
    vec3 finalColor = color1;
    finalColor += color2 * lines * 0.5;
    finalColor += color3 * mouseGlow;
    
    // Add subtle vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    finalColor *= vignette;
    
    // Add subtle grain
    float grain = noise(uv * 1000.0 + uTime) * 0.03;
    finalColor += grain;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function ShaderPlane() {
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

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        style={{ background: '#0a0d14' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
