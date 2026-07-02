import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Scene3D.css";

/**
 * Scene3D — lightweight Three.js shape with scroll + mouse-driven rotation,
 * orbiting particles, and a soft glow shell.
 */
export default function Scene3DImpl({
  shape = "ico",
  color = "#e8542e",
  wireColor = "#a9762b",
  size = 220,
  scrollFactor = 1,
  float = true,
  interactive = true,
  className = "",
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 4, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffe9d6, 0.7);
    fill.position.set(-4, -2, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(-3, 2, -4);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const accentLight = new THREE.PointLight(color, 0.6, 8);
    accentLight.position.set(2, 1, 3);
    scene.add(accentLight);

    let geometry;
    switch (shape) {
      case "knot":
        geometry = new THREE.TorusKnotGeometry(1.05, 0.32, 140, 16);
        break;
      case "octa":
        geometry = new THREE.OctahedronGeometry(1.5, 0);
        break;
      case "dodeca":
        geometry = new THREE.DodecahedronGeometry(1.4, 0);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(1.15, 0.42, 24, 64);
        break;
      case "ico":
      default:
        geometry = new THREE.IcosahedronGeometry(1.5, 0);
        break;
    }

    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.25,
      metalness: 0.35,
      flatShading: true,
      emissive: color,
      emissiveIntensity: 0.08,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireGeo = new THREE.EdgesGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    mesh.add(wireframe);

    const glowGeo = geometry.clone();
    glowGeo.scale(1.08, 1.08, 1.08);
    const glowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const glowShell = new THREE.Mesh(glowGeo, glowMat);
    mesh.add(glowShell);

    const orbitGroup = new THREE.Group();
    const orbitCount = 12;
    const orbitParticles = [];
    for (let i = 0; i < orbitCount; i++) {
      const pGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? color : wireColor,
        transparent: true,
        opacity: 0.7,
      });
      const particle = new THREE.Mesh(pGeo, pMat);
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.15;
      particle.userData = { angle, radius, speed: 0.3 + (i % 4) * 0.1, yOffset: (i % 5) * 0.2 };
      orbitGroup.add(particle);
      orbitParticles.push(particle);
    }
    scene.add(orbitGroup);

    let visible = false;
    let rafId = null;
    let scrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const clock = new THREE.Clock();

    const computeScrollProgress = () => {
      const rect = mount.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      scrollProgress = Math.min(Math.max(traveled / total, 0), 1);
    };

    const onScroll = () => computeScrollProgress();

    const onMouseMove = (e) => {
      if (!interactive || prefersReducedMotion) return;
      const rect = mount.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };

    const onMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mount.addEventListener("mousemove", onMouseMove, { passive: true });
    mount.addEventListener("mouseleave", onMouseLeave);
    computeScrollProgress();

    const animate = () => {
      if (!visible) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const idleSpin = prefersReducedMotion ? 0.05 : 0.22;
      mesh.rotation.y =
        scrollProgress * Math.PI * 2 * scrollFactor +
        t * idleSpin +
        mouseX * 0.6;
      mesh.rotation.x =
        0.4 +
        scrollProgress * Math.PI * scrollFactor * 0.6 +
        Math.sin(t * 0.3) * 0.08 +
        mouseY * 0.5;

      if (float && !prefersReducedMotion) {
        mesh.position.y = Math.sin(t * 0.8) * 0.12;
      }

      orbitGroup.rotation.y = t * 0.15;
      orbitGroup.rotation.x = Math.sin(t * 0.2) * 0.1;

      orbitParticles.forEach((p) => {
        const { angle, radius, speed, yOffset } = p.userData;
        const a = angle + t * speed;
        p.position.x = Math.cos(a) * radius;
        p.position.z = Math.sin(a) * radius;
        p.position.y = Math.sin(a * 2 + t) * 0.3 + yOffset - 0.5;
      });

      accentLight.position.x = Math.sin(t * 0.5) * 2 + 1;
      accentLight.position.y = Math.cos(t * 0.7) * 1.5;

      glowShell.material.opacity = 0.04 + Math.sin(t * 1.2) * 0.02;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) {
          clock.start();
          animate();
        } else if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.01 }
    );
    io.observe(mount);

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const s = Math.max(1, Math.min(width, height));
      renderer.setSize(s, s);
    });
    ro.observe(mount);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      geometry.dispose();
      glowGeo.dispose();
      wireGeo.dispose();
      material.dispose();
      wireMat.dispose();
      glowMat.dispose();
      orbitParticles.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [shape, color, wireColor, size, scrollFactor, float, interactive]);

  return (
    <div
      ref={mountRef}
      className={`scene3d ${interactive ? "scene3d--interactive" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
