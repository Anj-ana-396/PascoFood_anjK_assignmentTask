import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Award, ShieldCheck } from 'lucide-react';
import * as THREE from 'three';

export default function Hero3D({ onExploreClick, onShopClick }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf472b6, 3, 20); // Soft Pink Light
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffb703, 2, 20); // Warm Gold Light
    pointLight2.position.set(-4, -3, 2);
    scene.add(pointLight2);

    // Central Futuristic Spice Sphere (Glass-like material)
    const sphereGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfce7f0,
      emissive: 0xec4899,
      emissiveIntensity: 0.15,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.85, // Glass effect
      thickness: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(mainSphere);

    // Wireframe Outer Mesh (Futuristic Orbit Ring)
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh2);

    // Floating Spice Molecules / Particles
    const particlesCount = 80;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPalette = [
      new THREE.Color(0xf472b6), // Soft Pink
      new THREE.Color(0xfbcfe8), // Powder Pink
      new THREE.Color(0xf5ebe1), // Cream
      new THREE.Color(0xe65100), // Spice Orange
    ];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      mouseX = (clientX / window.innerWidth - 0.5) * 2;
      mouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate central sphere
      mainSphere.rotation.y = elapsedTime * 0.3;
      mainSphere.rotation.x = elapsedTime * 0.15;

      // Rotate ring mesh
      ringMesh1.rotation.z = elapsedTime * 0.4;
      ringMesh2.rotation.z = -elapsedTime * 0.3;

      // Rotate particle cloud
      particlesMesh.rotation.y = elapsedTime * 0.05;

      // Parallax smoothly toward mouse
      scene.rotation.y += (mouseX * 0.4 - scene.rotation.y) * 0.05;
      scene.rotation.x += (-mouseY * 0.4 - scene.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-softpink-200/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-cream-300/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Soft Pink Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-rosewood-500 font-semibold text-xs sm:text-sm tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-softpink-500 animate-spin-slow" />
              <span>Authentic Indian Heritage Since 1992 • Wigan, UK</span>
            </div>

            {/* Futuristic Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Next-Gen <br className="hidden sm:block" />
              <span className="gradient-text-pink">Flavours & Secret Spices</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Crafted in Lancashire using time-honoured family recipes. Discover our 100% natural, gluten-free curry cooking sauces, spice pastes, chutneys, and foodservice range.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-softpink-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Natural & Gluten-Free</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-softpink-200 shadow-sm">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>No Artificial Preservatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-softpink-200 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Award-Winning Quality</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-softpink-500 via-pink-600 to-rosewood-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-softpink-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group text-base"
              >
                <span>Shop Product Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 glass-panel text-gray-800 font-semibold rounded-2xl hover:bg-white hover:text-softpink-600 border border-softpink-300/60 shadow-sm transition-all text-base"
              >
                Explore Recipe Guide
              </button>
            </div>
          </motion.div>

          {/* Right 3D Interactive WebGL Spice Sphere Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center h-[380px] sm:h-[480px] w-full"
          >
            {/* WebGL Canvas Mount */}
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Floating Glass Accent Badge over 3D Canvas */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-4 right-4 glass-card p-4 rounded-2xl border border-softpink-300 shadow-lg max-w-[210px] pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-softpink-400 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  P
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Original Formula</p>
                  <p className="text-sm font-bold text-gray-800">Master Secret Spices</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
