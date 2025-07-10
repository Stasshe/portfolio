import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Vector2, DoubleSide, AdditiveBlending } from 'three';
import * as THREE from 'three';

// Water surface shader
type WaterSurfaceProps = {
  opacity?: number;
  speed?: number;
};
const WaterSurface = ({ opacity = 0.3, speed = 0.5 }: WaterSurfaceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(viewport.width, viewport.height) },
        uOpacity: { value: opacity },
        uSpeed: { value: speed }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uOpacity;
        uniform float uSpeed;
        varying vec2 vUv;

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
          
          for(int i = 0; i < 4; i++) {
            value += amplitude * smoothNoise(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          
          return value;
        }

        void main() {
          vec2 uv = vUv;
          vec2 st = uv * 8.0;
          
          // Create ripple effect
          float time = uTime * uSpeed;
          float ripple1 = fbm(st + time * 0.3);
          float ripple2 = fbm(st + time * 0.5 + vec2(100.0));
          float ripple3 = fbm(st + time * 0.7 + vec2(200.0));
          
          // Combine ripples
          float ripples = (ripple1 + ripple2 + ripple3) / 3.0;
          
          // Create water caustics
          float caustics = sin(ripples * 10.0 + time) * 0.1 + 0.9;
          
          // Distance from center for gradient
          float dist = length(uv - 0.5);
          float gradient = 1.0 - smoothstep(0.0, 0.7, dist);
          
          // Final color with transparency
          vec3 waterColor = vec3(0.7, 0.8, 0.9);
          float alpha = caustics * gradient * uOpacity;
          
          gl_FragColor = vec4(waterColor, alpha);
        }
      `,
      transparent: true,
      side: DoubleSide
    });
  }, [opacity, speed, viewport]);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.uResolution.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

// Ripple effect that responds to mouse/touch
const RippleEffect = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0, 0) },
        uResolution: { value: new Vector2(viewport.width, viewport.height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 center = uMouse * 0.5 + 0.5;
          
          float dist = distance(uv, center);
          float ripple = sin(dist * 30.0 - uTime * 8.0) * exp(-dist * 3.0);
          
          float alpha = abs(ripple) * 0.1;
          
          gl_FragColor = vec4(0.8, 0.9, 1.0, alpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending
    });
  }, [viewport]);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

// Main component
const WaterSurfaceBackground = ({ 
  opacity = 0.15, 
  speed = 0.3, 
  className = "",
  enableRipples = true 
}) => {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WaterSurface opacity={opacity} speed={speed} />
        {enableRipples && <RippleEffect />}
      </Canvas>
    </div>
  );
};

export default WaterSurfaceBackground;