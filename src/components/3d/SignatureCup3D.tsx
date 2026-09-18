import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SignatureCup3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 360;
    const height = mountRef.current.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.2, width < 640 ? 6.4 : 5.8);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Warm Ambient and Lighting
    const ambient = new THREE.AmbientLight(0x402b1f, 1.6);
    scene.add(ambient);

    const keyLight = new THREE.SpotLight(0xffecd1, 4.5, 20, Math.PI / 3, 0.4);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4a373, 2.5, 12);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // Group for cup
    const cupGroup = new THREE.Group();

    // Dark ceramic cup
    const cupMat = new THREE.MeshStandardMaterial({
      color: 0x14100e,
      roughness: 0.35,
      metalness: 0.1,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfbe90,
      roughness: 0.2,
      metalness: 0.85,
    });

    // Cup Body
    const cupGeom = new THREE.CylinderGeometry(1.3, 0.95, 1.8, 40);
    const cupMesh = new THREE.Mesh(cupGeom, cupMat);
    cupMesh.position.y = 0.9;
    cupMesh.castShadow = true;
    cupGroup.add(cupMesh);

    // Rim
    const rimGeom = new THREE.TorusGeometry(1.29, 0.04, 16, 48);
    rimGeom.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeom, goldMat);
    rimMesh.position.y = 1.8;
    cupGroup.add(rimMesh);

    // Handle
    const handleGeom = new THREE.TorusGeometry(0.55, 0.1, 16, 24, Math.PI * 1.15);
    handleGeom.rotateZ(Math.PI / 1.15);
    const handleMesh = new THREE.Mesh(handleGeom, cupMat);
    handleMesh.position.set(1.4, 0.9, 0);
    cupGroup.add(handleMesh);

    // Matching Saucer
    const saucerGeom = new THREE.CylinderGeometry(2.1, 1.4, 0.2, 40);
    const saucerMesh = new THREE.Mesh(saucerGeom, cupMat);
    saucerMesh.position.y = -0.05;
    saucerMesh.castShadow = true;
    cupGroup.add(saucerMesh);

    // Saucer Gold Rim
    const saucerRimGeom = new THREE.TorusGeometry(2.08, 0.03, 16, 48);
    saucerRimGeom.rotateX(Math.PI / 2);
    const saucerRimMesh = new THREE.Mesh(saucerRimGeom, goldMat);
    saucerRimMesh.position.y = 0.05;
    cupGroup.add(saucerRimMesh);

    // Embossed Gold AURA COFFEE logo
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 256;
    logoCanvas.height = 128;
    const lctx = logoCanvas.getContext('2d')!;
    lctx.clearRect(0, 0, 256, 128);
    lctx.fillStyle = '#dfbe90';

    // Sprout
    lctx.beginPath();
    lctx.arc(128, 30, 8, 0, Math.PI * 2);
    lctx.fill();

    // AURA text
    lctx.font = 'bold 28px "Playfair Display", Georgia, serif';
    lctx.textAlign = 'center';
    lctx.letterSpacing = '4px';
    lctx.fillText('AURA', 128, 70);

    lctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    lctx.letterSpacing = '6px';
    lctx.fillText('COFFEE', 128, 92);

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const badgeGeom = new THREE.CylinderGeometry(1.32, 1.16, 0.9, 24, 1, true, -Math.PI / 4, Math.PI / 2);
    const badgeMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.75,
      side: THREE.DoubleSide,
    });
    const badge = new THREE.Mesh(badgeGeom, badgeMat);
    badge.position.y = 0.9;
    badge.rotation.y = Math.PI / 2;
    cupGroup.add(badge);

    // Latte Art Surface
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, '#5a341b');
    grad.addColorStop(0.5, '#8c5225');
    grad.addColorStop(0.85, '#bf7e3d');
    grad.addColorStop(1, '#3b1c0a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Caramel spiral drizzle
    ctx.strokeStyle = '#e69a47';
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 5; a += 0.2) {
      const r = a * 12;
      const x = 128 + Math.cos(a) * r;
      const y = 128 + Math.sin(a) * r;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Steamed foam heart
    ctx.fillStyle = '#fff9f0';
    ctx.beginPath();
    ctx.moveTo(128, 150);
    ctx.bezierCurveTo(90, 115, 80, 85, 128, 105);
    ctx.bezierCurveTo(176, 85, 166, 115, 128, 150);
    ctx.fill();

    const latteTexture = new THREE.CanvasTexture(canvas);
    const liquidGeom = new THREE.CircleGeometry(1.24, 32);
    liquidGeom.rotateX(-Math.PI / 2);
    const liquidMat = new THREE.MeshStandardMaterial({
      map: latteTexture,
      roughness: 0.2,
      metalness: 0.1,
    });
    const liquid = new THREE.Mesh(liquidGeom, liquidMat);
    liquid.position.y = 1.68;
    cupGroup.add(liquid);

    // Roasted Coffee Beans on Saucer
    const beanGeom = new THREE.SphereGeometry(0.2, 16, 16);
    beanGeom.scale(0.85, 0.55, 1.25);
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2e1a10,
      roughness: 0.45,
      metalness: 0.08,
    });

    const saucerBeans = [
      { x: 1.25, y: 0.1, z: 1.05, rx: 0.2, ry: 0.8 },
      { x: 1.45, y: 0.1, z: 0.75, rx: 0.4, ry: 1.4 },
      { x: -1.35, y: 0.1, z: 0.85, rx: 0.1, ry: -0.6 },
    ];

    saucerBeans.forEach((sb) => {
      const b = new THREE.Mesh(beanGeom, beanMat);
      b.position.set(sb.x, sb.y, sb.z);
      b.rotation.set(sb.rx, sb.ry, 0);
      cupGroup.add(b);
    });

    scene.add(cupGroup);

    // Floating Ambient Beans
    const beans: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const b = new THREE.Mesh(beanGeom, beanMat);
      const ang = (i / 7) * Math.PI * 2;
      b.position.set(Math.cos(ang) * 2.8, 1.0 + Math.sin(ang) * 0.8, Math.sin(ang) * 2.8);
      scene.add(b);
      beans.push(b);
    }

    // Interaction handler (mouse + touch)
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.8;
      targetRotX = -y * 0.3;
    };

    const container = mountRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    let startTime = performance.now();
    let animId: number;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const sec = (performance.now() - startTime) / 1000;

      // Smooth hover rotation + auto float
      cupGroup.rotation.y = THREE.MathUtils.lerp(cupGroup.rotation.y, targetRotY + sec * 0.25, 0.05);
      cupGroup.rotation.x = THREE.MathUtils.lerp(cupGroup.rotation.x, targetRotX, 0.05);
      cupGroup.position.y = Math.sin(sec * 1.5) * 0.08 - 0.35;

      beans.forEach((b, idx) => {
        b.rotation.x += 0.01;
        b.rotation.y += 0.015;
        b.position.y += Math.sin(sec * 2 + idx) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.fov = w < 640 ? 46 : 40;
      camera.position.z = w < 640 ? 6.4 : 5.8;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[280px] sm:h-[380px] md:h-[440px] flex items-center justify-center cursor-pointer touch-pan-y"
    />
  );
};
