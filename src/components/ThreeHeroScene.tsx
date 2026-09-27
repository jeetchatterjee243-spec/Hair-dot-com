import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  className?: string;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x08090d, 0.035);

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 11);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

      // --- Lighting (Three-Point Studio Lighting) ---
      const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffe8c2, 3.0);
      keyLight.position.set(6, 8, 8);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
      rimLight.position.set(-8, -4, -4);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0xffb84d, 2.2, 20);
      fillLight.position.set(0, 2, 4);
      scene.add(fillLight);

      // Materials
      const polishedChrome = new THREE.MeshStandardMaterial({
        color: 0xe6e9ef,
        metalness: 0.95,
        roughness: 0.12,
      });

      const luxuryGold = new THREE.MeshStandardMaterial({
        color: 0xe2b774,
        metalness: 0.88,
        roughness: 0.22,
      });

      const matteObsidian = new THREE.MeshStandardMaterial({
        color: 0x161822,
        metalness: 0.6,
        roughness: 0.4,
      });

      // --- 1. PROCEDURAL 3D HAIRDRESSER SCISSORS ---
      const scissorsGroup = new THREE.Group();

      // Helper function to build one scissor half (blade + shank + ring)
      const createScissorHalf = (isRight: boolean) => {
        const halfGroup = new THREE.Group();

        // Cutting Blade (tapered wedge)
        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(0, 0);
        bladeShape.lineTo(0.18, 0.4);
        bladeShape.lineTo(0.08, 2.6);
        bladeShape.lineTo(0.0, 2.85); // sharp tip
        bladeShape.lineTo(-0.06, 2.6);
        bladeShape.lineTo(-0.16, 0.4);
        bladeShape.closePath();

        const extrudeSettings = {
          steps: 1,
          depth: 0.05,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelSegments: 3,
        };

        const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
        bladeGeo.center();
        const bladeMesh = new THREE.Mesh(bladeGeo, polishedChrome);
        bladeMesh.position.set(0, 1.4, 0);
        halfGroup.add(bladeMesh);

        // Shank connecting to handle
        const shankGeo = new THREE.CylinderGeometry(0.07, 0.09, 1.2, 16);
        const shankMesh = new THREE.Mesh(shankGeo, polishedChrome);
        const xOffset = isRight ? 0.35 : -0.35;
        shankMesh.position.set(xOffset * 0.5, -0.6, 0);
        shankMesh.rotation.z = isRight ? -0.25 : 0.25;
        halfGroup.add(shankMesh);

        // Finger Loop Ring (Torus)
        const ringGeo = new THREE.TorusGeometry(0.38, 0.075, 16, 32);
        const ringMesh = new THREE.Mesh(ringGeo, luxuryGold);
        ringMesh.position.set(xOffset * 1.1, -1.3, 0);
        ringMesh.rotation.x = Math.PI * 0.1;
        halfGroup.add(ringMesh);

        // Ergonomic bumper/finger rest
        if (isRight) {
          const restGeo = new THREE.ConeGeometry(0.06, 0.35, 12);
          const restMesh = new THREE.Mesh(restGeo, luxuryGold);
          restMesh.position.set(xOffset * 1.5, -1.45, 0);
          restMesh.rotation.z = -1.2;
          halfGroup.add(restMesh);
        }

        return halfGroup;
      };

      const bladeA = createScissorHalf(false);
      const bladeB = createScissorHalf(true);
      scissorsGroup.add(bladeA);
      scissorsGroup.add(bladeB);

      // Gold Pivot screw
      const screwGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.14, 24);
      const screwMesh = new THREE.Mesh(screwGeo, luxuryGold);
      screwMesh.rotation.x = Math.PI / 2;
      screwMesh.position.set(0, 0, 0.04);
      scissorsGroup.add(screwMesh);

      scissorsGroup.scale.set(1.2, 1.2, 1.2);
      scissorsGroup.position.set(2.4, 0.4, 0);
      scene.add(scissorsGroup);

      // --- 2. PROCEDURAL 3D BARBER COMB ---
      const combGroup = new THREE.Group();
      
      // Comb spine
      const spineShape = new THREE.Shape();
      spineShape.moveTo(-1.6, -0.22);
      spineShape.lineTo(1.6, -0.22);
      spineShape.lineTo(1.5, 0.28);
      spineShape.lineTo(-1.5, 0.28);
      spineShape.closePath();

      const spineGeo = new THREE.ExtrudeGeometry(spineShape, {
        steps: 1,
        depth: 0.06,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
      });
      const spineMesh = new THREE.Mesh(spineGeo, luxuryGold);
      combGroup.add(spineMesh);

      // Comb teeth (22 slender teeth)
      const toothGeo = new THREE.BoxGeometry(0.045, 0.85, 0.04);
      for (let i = 0; i < 22; i++) {
        const toothMesh = new THREE.Mesh(toothGeo, polishedChrome);
        const xPos = -1.35 + (i * (2.7 / 21));
        toothMesh.position.set(xPos, -0.6, 0.03);
        combGroup.add(toothMesh);
      }

      combGroup.position.set(-2.8, -1.1, -1.2);
      combGroup.rotation.set(0.3, 0.5, 0.4);
      scene.add(combGroup);

      // --- 3. FLOWING 3D HAIR STRANDS / GOLDEN RIBBONS ---
      const ribbonsGroup = new THREE.Group();

      const createHairStrand = (radius: number, height: number, twists: number, color: number) => {
        const points: THREE.Vector3[] = [];
        const count = 75;
        for (let i = 0; i <= count; i++) {
          const t = i / count;
          const angle = t * Math.PI * 2 * twists;
          const r = radius * (1 - 0.4 * Math.sin(t * Math.PI));
          const x = Math.cos(angle) * r + Math.sin(t * 3) * 0.5;
          const y = (t - 0.5) * height;
          const z = Math.sin(angle) * r;
          points.push(new THREE.Vector3(x, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 70, 0.045, 8, false);
        const strandMat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.25,
          metalness: 0.85,
        });
        return new THREE.Mesh(tubeGeo, strandMat);
      };

      const strand1 = createHairStrand(1.6, 5.5, 2.5, 0xe2b774);
      const strand2 = createHairStrand(2.2, 6.0, 1.8, 0xfff0d4);
      const strand3 = createHairStrand(1.2, 4.2, 3.0, 0xc49040);

      strand1.position.set(0.5, 0, -2);
      strand2.position.set(-1.0, 0.5, -3);
      strand3.position.set(2.0, -0.5, -1.5);

      ribbonsGroup.add(strand1, strand2, strand3);
      scene.add(ribbonsGroup);

      // --- 4. FLOATING 3D SPHERES & SALON ORBS ---
      const spheresGroup = new THREE.Group();
      const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);

      const sphereA = new THREE.Mesh(sphereGeo, luxuryGold);
      sphereA.position.set(3.8, 2.2, -1.0);
      spheresGroup.add(sphereA);

      const sphereB = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), polishedChrome);
      sphereB.position.set(-3.5, 2.0, -0.5);
      spheresGroup.add(sphereB);

      const sphereC = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), luxuryGold);
      sphereC.position.set(-1.8, -2.4, 0.5);
      spheresGroup.add(sphereC);

      const sphereD = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), matteObsidian);
      sphereD.position.set(2.8, -2.2, -1.8);
      spheresGroup.add(sphereD);

      scene.add(spheresGroup);

      // --- 5. FLOATING BEAUTY PARTICLES ---
      const particleCount = 120;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
        scales[i] = Math.random() * 0.08 + 0.02;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Particle points with gold/champagne color
      const particleMat = new THREE.PointsMaterial({
        color: 0xe2b774,
        size: 0.12,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });

      const particlePoints = new THREE.Points(particleGeo, particleMat);
      scene.add(particlePoints);

      // --- 6. MOUSE INTERACTION & PARALLAX ---
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetX = normX * 0.8;
        targetY = normY * 0.6;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize Listener
      const handleResize = () => {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);

        // Adjust positioning for mobile screens
        if (newWidth < 768) {
          scissorsGroup.position.set(0, 1.2, 0);
          scissorsGroup.scale.set(0.9, 0.9, 0.9);
          combGroup.position.set(0, -1.8, -1);
          combGroup.scale.set(0.8, 0.8, 0.8);
          camera.position.z = 13.5;
        } else {
          scissorsGroup.position.set(2.4, 0.4, 0);
          scissorsGroup.scale.set(1.2, 1.2, 1.2);
          combGroup.position.set(-2.8, -1.1, -1.2);
          combGroup.scale.set(1, 1, 1);
          camera.position.z = 11;
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse damping
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Camera gentle parallax
        camera.position.x = mouseX * 1.5;
        camera.position.y = mouseY * 1.0;
        camera.lookAt(0, 0, 0);

        // Scissors scissor snip motion (opening & closing blades)
        const snipAngle = Math.sin(elapsedTime * 2.8) * 0.22 + 0.12;
        bladeA.rotation.z = -snipAngle;
        bladeB.rotation.z = snipAngle;

        // Scissors gentle floating rotation
        scissorsGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.35 + mouseX * 0.4;
        scissorsGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.2 + mouseY * 0.3;
        scissorsGroup.position.y = (container.clientWidth < 768 ? 1.2 : 0.4) + Math.sin(elapsedTime * 1.2) * 0.18;

        // Comb gentle rotation & bobbing
        combGroup.rotation.x = 0.3 + Math.sin(elapsedTime * 0.8) * 0.25;
        combGroup.rotation.y = 0.5 + Math.cos(elapsedTime * 0.6) * 0.3;
        combGroup.position.y = (container.clientWidth < 768 ? -1.8 : -1.1) + Math.cos(elapsedTime * 1.1) * 0.15;

        // Hair ribbons slow graceful twist
        ribbonsGroup.rotation.y = elapsedTime * 0.18;
        ribbonsGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1;

        // Floating orbs oscillation
        sphereA.position.y = 2.2 + Math.sin(elapsedTime * 1.4) * 0.25;
        sphereB.position.y = 2.0 + Math.cos(elapsedTime * 1.2) * 0.22;
        sphereC.position.y = -2.4 + Math.sin(elapsedTime * 1.6) * 0.2;
        sphereD.position.y = -2.2 + Math.cos(elapsedTime * 1.3) * 0.18;

        // Particle subtle drift
        particlePoints.rotation.y = elapsedTime * 0.03;
        particlePoints.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn('WebGL init warning in ThreeHeroScene:', err);
      setHasWebGlError(true);
    }
  }, []);

  if (hasWebGlError) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#08090D] via-[#12141D] to-[#1A181E] opacity-90" />
        <div className="relative z-10 w-48 h-48 rounded-full border border-[#E2B774]/30 bg-[#E2B774]/5 backdrop-blur-md flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-[#E2B774]/50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
