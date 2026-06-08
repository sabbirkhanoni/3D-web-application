import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { addObjectToScene } from "../../utils/LoadObjectsToAddScene";

const SceneRoom = ({ objects }) => {
  const mountRef = useRef(null);

  const sceneRef = useRef(null); //Store the scene to used in other components
  const cameraRef = useRef(null); //Store the camera to used in other components
  const rendererRef = useRef(null); //Store the renderer to used in other components

  const newObjectsRef = useRef([]);

  // Object Add
  useEffect(() => {
    if (!sceneRef.current || objects.length === 0) return;

    const latestObject = objects[objects.length - 1];

    addObjectToScene(
      latestObject,
      sceneRef.current,
      newObjectsRef
    );
  }, [objects]);

  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene; //store the scene

    scene.background = new THREE.Color(0x0d0e24);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 35, 52);

    cameraRef.current = camera; //store the camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    rendererRef.current = renderer; //store the renderer

    container.appendChild(renderer.domElement);

    const orbit = new OrbitControls(
      camera,
      renderer.domElement
    );

    orbit.target.set(0, 2, 0);
    orbit.update();

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const dirLight = new THREE.DirectionalLight(
      0xffffff,
      2
    );

    dirLight.position.set(10, 15, 10);

    scene.add(dirLight);

    // Room Grid floor
    scene.add(new THREE.GridHelper(50, 50));

    // left Walls material
    const leftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // right Walls material
    const rightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // back Walls material
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

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} className="w-full h-full" />
  );
};

export default SceneRoom;