import React, { useRef, useEffect } from 'react';


export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer;
    let frame;
    let observer;
    let cancelled = false;

    import('three').then((THREE) => {
      if (cancelled || !mountRef.current) return;
      
      const el = mountRef.current;
      const w = el.clientWidth, h = el.clientHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.z = 5;

      // Aperture ring outer
      const ringGeo = new THREE.TorusGeometry(1.8, 0.025, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ring);

      // Aperture ring inner
      const ring2Geo = new THREE.TorusGeometry(1.4, 0.015, 16, 120);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.3 });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      scene.add(ring2);

      // Aperture blades
      const bladeGroup = new THREE.Group();
      scene.add(bladeGroup);
      const bladeCount = 9;

      // PRE-INSTANTIATE GEOMETRY AND MATERIALS (Action 1)
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(0.15, 0.7, 0, 1.35);
      shape.quadraticCurveTo(-0.15, 0.7, 0, 0);
      const geo = new THREE.ShapeGeometry(shape);
      
      const goldMat = new THREE.MeshBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
      const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.12, side: THREE.DoubleSide });

      for (let i = 0; i < bladeCount; i++) {
        const blade = new THREE.Mesh(geo, i % 2 === 0 ? goldMat : cyanMat);
        blade.rotation.z = (i / bladeCount) * Math.PI * 2;
        blade.position.set(0, 0, 0);
        bladeGroup.add(blade);
      }

      // Particle dust
      const partCount = 200;
      const positions = new Float32Array(partCount * 3);
      for (let i = 0; i < partCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      const partGeo = new THREE.BufferGeometry();
      partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const partMat = new THREE.PointsMaterial({
        color: 0xC8A96E, size: 0.02, transparent: true, opacity: 0.4,
      });
      const particles = new THREE.Points(partGeo, partMat);
      scene.add(particles);

      // Cross-hair lines
      const lineMat = new THREE.LineBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.15 });
      const hPoints = [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)];
      const vPoints = [new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0)];
      const hGeo = new THREE.BufferGeometry().setFromPoints(hPoints);
      const vGeo = new THREE.BufferGeometry().setFromPoints(vPoints);
      scene.add(new THREE.Line(hGeo, lineMat));
      scene.add(new THREE.Line(vGeo, lineMat));

      // Corner brackets
      const bMat = new THREE.LineBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.3 });
      const bracketsData = [
        [[-2.2, 2.2], [-1.9, 2.2], [-2.2, 2.2], [-2.2, 1.9]],
        [[2.2, 2.2], [1.9, 2.2], [2.2, 2.2], [2.2, 1.9]],
        [[-2.2, -2.2], [-1.9, -2.2], [-2.2, -2.2], [-2.2, -1.9]],
        [[2.2, -2.2], [1.9, -2.2], [2.2, -2.2], [2.2, -1.9]],
      ];
      bracketsData.forEach(pts => {
        const bGeo = new THREE.BufferGeometry().setFromPoints(
          pts.map(p => new THREE.Vector3(p[0], p[1], 0))
        );
        scene.add(new THREE.Line(bGeo, bMat));
      });

      let mouseX = 0, mouseY = 0;
      const onMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouse);

      let isVisible = true;
      observer = new IntersectionObserver(([e]) => {
        isVisible = e.isIntersecting;
      }, { threshold: 0 });
      observer.observe(el);

      let lastTime = 0;
      const fpsInterval = 1000 / 30;

      const animate = (timestamp) => {
        frame = requestAnimationFrame(animate);
        if (!isVisible) return;
        const elapsed = timestamp - lastTime;
        if (elapsed < fpsInterval) return;
        lastTime = timestamp - (elapsed % fpsInterval);
        
        const t = Date.now() * 0.001;
        bladeGroup.rotation.z = t * 0.12;
        ring.rotation.z = t * 0.08;
        ring.rotation.z = t * 0.08;
        ring2.rotation.z = -t * 0.06;
        particles.rotation.y = t * 0.02;
        particles.rotation.x = t * 0.01;
        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
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

      // Cleanup function within .then
      const originalCleanup = () => {
        if (observer) observer.disconnect();
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        
        // RECURSIVE DISPOSAL TO FIX MEMORY LEAK (Action 2)
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });

        if (renderer) {
          renderer.dispose();
          if (el.contains(renderer.domElement)) {
            el.removeChild(renderer.domElement);
          }
        }
      };
      
      // Store cleanup to be called by the outer useEffect's return
      mountRef.current.cleanupThree = originalCleanup;
    });

    return () => {
      cancelled = true;
      if (mountRef.current && mountRef.current.cleanupThree) {
        mountRef.current.cleanupThree();
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
}
