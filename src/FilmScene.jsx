import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FilmScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 6;

    // Film strip segments
    const strips = [];
    for (let j = 0; j < 4; j++) {
      const group = new THREE.Group();
      const stripGeo = new THREE.PlaneGeometry(0.6, 3.2);
      const stripMat = new THREE.MeshBasicMaterial({ color: 0x1A1A2E, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      group.add(new THREE.Mesh(stripGeo, stripMat));
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.5 });
      const edgeGeo = new THREE.EdgesGeometry(stripGeo);
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));
      // Sprocket holes
      for (let i = 0; i < 5; i++) {
        const hGeo = new THREE.PlaneGeometry(0.08, 0.12);
        const hMat = new THREE.MeshBasicMaterial({ color: 0x06060C });
        const lh = new THREE.Mesh(hGeo, hMat);
        lh.position.set(-0.23, -1.3 + i * 0.58, 0.01);
        group.add(lh);
        const rh = lh.clone();
        rh.position.set(0.23, -1.3 + i * 0.58, 0.01);
        group.add(rh);
      }
      group.position.set(-3.5 + j * 2.2, (Math.random() - 0.5) * 2, -j * 0.5);
      group.rotation.z = (Math.random() - 0.5) * 0.4;
      group.userData = { vy: 0.003 + Math.random() * 0.004, vr: (Math.random() - 0.5) * 0.003 };
      scene.add(group);
      strips.push(group);
    }

    // Light beams
    for (let i = 0; i < 3; i++) {
      const beamGeo = new THREE.CylinderGeometry(0.01, 0.4, 5, 8, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0x00C9FF : 0xC8A96E, transparent: true, opacity: 0.04, side: THREE.DoubleSide });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(-2 + i * 2, 2, 0);
      beam.rotation.z = (Math.random() - 0.5) * 0.3;
      scene.add(beam);
    }

    // Floating circles/aperture accent
    const circGeo = new THREE.TorusGeometry(0.8, 0.01, 8, 64);
    const circMat = new THREE.MeshBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.25 });
    const circ = new THREE.Mesh(circGeo, circMat);
    circ.position.set(2.5, 0.5, 0);
    scene.add(circ);

    let frame;
    let scrollY = 0;
    
    // Use passive listener to prevent scroll jank
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let isVisible = false;
    const observer = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
    }, { threshold: 0 });
    observer.observe(el);

    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS

    const animate = (timestamp) => {
      frame = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause GPU rendering completely when scrolled past

      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = timestamp - (elapsed % fpsInterval);
      
      const t = Date.now() * 0.001;
      strips.forEach((s, i) => {
        s.position.y += s.userData.vy;
        s.rotation.z += s.userData.vr;
        if (s.position.y > 4) s.position.y = -4;
      });
      circ.rotation.z = t * 0.2;
      camera.position.y = scrollY * 0.001;
      renderer.render(scene, camera);
    };
    animate(performance.now());

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}
