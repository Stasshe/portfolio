import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Vector2, DoubleSide, AdditiveBlending } from 'three';
import * as THREE from 'three';

// Water surface shader
type WaterSurfaceProps = {
  opacity?: number;
  speed?: number;
  color?: [number, number, number]; // RGB 0-1
};
const WaterSurface = ({ opacity = 0.3, speed = 0.5, color = [0.7, 0.8, 0.9] }: WaterSurfaceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // デフォルト値を強調
  const effectiveOpacity = opacity ?? 0.5;
  const effectiveSpeed = speed ?? 1.0;

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(viewport.width, viewport.height) },
        uOpacity: { value: effectiveOpacity },
        uSpeed: { value: effectiveSpeed },
        uColor: { value: new THREE.Color(...color) }
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
        uniform vec3 uColor;
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
          float amplitude = 0.7; // 振幅を強調
          float frequency = 1.0;
          for(int i = 0; i < 6; i++) { // ループ回数増加
            value += amplitude * smoothNoise(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;
          vec2 st = uv * 2.0; // 倍率を上げて細かく
          float time = uTime * uSpeed;
          float ripple1 = fbm(st + time * 0.6);
          float ripple2 = fbm(st + time * 1.0 + vec2(100.0));
          float ripple3 = fbm(st + time * 1.4 + vec2(200.0));
          float ripples = (ripple1 + ripple2 + ripple3) / 3.0;
          float caustics = sin(ripples * 18.0 + time) * 0.18 + 0.85;
          float dist = length(uv - 0.5);
          float gradient = 1.0 - smoothstep(0.0, 0.7, dist);
          vec3 waterColor = uColor;
          float alpha = caustics * gradient * uOpacity;
          gl_FragColor = vec4(waterColor, alpha);
        }
      `,
      transparent: true,
      side: DoubleSide
    });
  }, [effectiveOpacity, effectiveSpeed, color, viewport]);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.uResolution.value.set(viewport.width, viewport.height);
      shaderMaterial.uniforms.uColor.value.set(...color);
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      {/* viewportサイズに合わせて全体をカバー */}
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
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
      <planeGeometry args={[viewport.width, viewport.height]} />
    </mesh>
  );
};

// Main component
type WaterSurfaceBackgroundProps = {
  opacity?: number;
  speed?: number;
  color?: [number, number, number];
  className?: string;
  enableRipples?: boolean;
};
const WaterSurfaceBackground = ({ 
  opacity = 0.5, // 強調
  speed = 1.0,   // 強調
  color = [0.7, 0.8, 0.9],
  className = "",
  enableRipples = true 
}: WaterSurfaceBackgroundProps) => {
  // Intersection Observerで可視判定
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // 初期値true（SSR対策）

  // 開発モード判定
  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 開発モードならCanvas描画自体を省略
  if (isDev) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 rounded-3xl overflow-hidden ${className}`}
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 rounded-3xl overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          frameloop="always"
        >
          <WaterSurface opacity={opacity} speed={isDev ? 0 : speed} color={color} />
          {/* RippleEffectは開発モードでは無効化 */}
          {(!isDev && enableRipples) && <RippleEffect />}
        </Canvas>
      )}
    </div>
  );
};

export default WaterSurfaceBackground;