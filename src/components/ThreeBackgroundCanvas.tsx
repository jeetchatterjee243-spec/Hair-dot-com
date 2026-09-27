import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundCanvasProps {
  variant?: 'subtle' | 'dynamic';
}

export const ThreeBackgroundCanvas: React.FC<ThreeBackgroundCanvasProps> = ({ variant = 'subtle' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      const scene = new THREE.Scene();
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const light = new THREE.PointLight(0xe2b774, 2, 10);
      light.position.set(2, 2, 2);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Torus ring mimicking sculpted curl ring
      const torusGeo = new THREE.TorusGeometry(1.4, 0.08, 16, 64);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0xe2b774,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: variant === 'subtle' ? 0.4 : 0.7,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      scene.add(torusMesh);

      // Secondary floating diamond
      const octaGeo = new THREE.OctahedronGeometry(0.8, 0);
      const octaMat = new THREE.MeshStandardMaterial({
        color: 0xc49040,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: true,
      });
      const octaMesh = new THREE.Mesh(octaGeo, octaMat);
      scene.add(octaMesh);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        torusMesh.rotation.x = t * 0.4;
        torusMesh.rotation.y = t * 0.3;
        octaMesh.rotation.y = -t * 0.5;
        octaMesh.rotation.z = t * 0.2;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      // Fallback silently if WebGL is unavailable
    }
  }, [variant]);

  return (
    <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden" />
  );
};
