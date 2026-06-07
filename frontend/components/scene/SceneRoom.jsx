import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SceneRoom = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0e24);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 20, 50);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.target.set(0, 2, 0);
    orbit.update();

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // grid floor
    const grid = new THREE.GridHelper(50, 50);
    scene.add(grid);

      // left wall material
    const leftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // right wall material
    const rightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // back wall material
    const backWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedcd8,
      side: THREE.DoubleSide,
    });

    // back wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      backWallMaterial
    );
    backWall.position.set(0, 7.5, -25);
    scene.add(backWall);

    // left wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      leftWallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-25, 7.5, 0);
    scene.add(leftWall);

    // right wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      rightWallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(25, 7.5, 0);
    scene.add(rightWall);

    // cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
    );
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    // animate
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} 
      className="w-full h-full" 
    />
  );
};

export default SceneRoom;
