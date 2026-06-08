import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { addObjectToScene } from "../../utils/LoadObjectsToAddScene";

const SceneRoom = ({ objects }) => {
  const mountRef = useRef(null); // Container Ref

  const sceneRef = useRef(null); // Store Scene to use in other components
  const cameraRef = useRef(null); // Store Camera to use in other components
  const rendererRef = useRef(null); // Store Renderer to use in other components

  const dragControlsRef = useRef(null); // Store Drag Controls to use in other components
  const orbitRef = useRef(null); // Store Orbit Controls to use in other components

  const newObjectsRef = useRef([]); 

  // Object Add
  useEffect(() => {
    if (!sceneRef.current || objects.length === 0) return;

    const latestObject = objects[objects.length - 1];

    addObjectToScene(latestObject, sceneRef.current, newObjectsRef);
  }, [objects]);

  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    scene.background = new THREE.Color(0x0d0e24);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 35, 50);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.05;
    orbit.maxPolarAngle = Math.PI / 2.1;
    orbit.minDistance = 10;
    orbit.maxDistance = 100;
    orbit.target.set(0, 2, 0);
    orbit.update();
    orbitRef.current = orbit;

    // Drag Controls
    const dragControls = new DragControls(
      newObjectsRef.current,
      camera,
      renderer.domElement
    );
    dragControlsRef.current = dragControls;

    dragControls.addEventListener("dragstart", (event) => {
      orbit.enabled = false;

      event.object.traverse?.((child) => {
        if (child.material) {
          child.material.emissive?.setHex(0x00ff00);
        }
      });
    });

    dragControls.addEventListener("dragend", (event) => {
      orbit.enabled = true;

      event.object.traverse?.((child) => {
        if (child.material) {
          child.material.emissive?.setHex(0x000000);
        }
      });
    });

    dragControls.addEventListener("drag", (event) => {
      const obj = event.object;

      //get floor Y
      const floorY = obj.userData.floorY ?? 0;
      obj.position.y = floorY;

      obj.position.x = Math.max(-24, Math.min(24, obj.position.x));
      obj.position.z = Math.max(-24, Math.min(24, obj.position.z));
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(50, 50);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Wall Materials
    const leftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // Right Wall Material
    const rightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // Back Wall Material
    const backWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedcd8,
      side: THREE.DoubleSide,
    });

    // Back Wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      backWallMaterial
    );
    backWall.position.set(0, 7.5, -25);
    scene.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      leftWallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-25, 7.5, 0);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      rightWallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(25, 7.5, 0);
    scene.add(rightWall);

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      orbit.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      dragControls.dispose();
      orbit.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
    />
  );
};

export default SceneRoom;