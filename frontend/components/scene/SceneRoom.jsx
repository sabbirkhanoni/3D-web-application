import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SceneRoom = (props) => {
  const { objects } = props;

  const mountRef = useRef(null); //store the to attach the scene
  const sceneRef = useRef(null); //store the scene to used in other components
  const cameraRef = useRef(null); //store the camera to used in other components
  const rendererRef = useRef(null); //store the renderer to used in other components
  const newObjectsRef = useRef([]);

  // add new objects to scene
  useEffect(() => {
  if (!sceneRef.current) return;

  const latestObject =
    objects[objects.length - 1];

  if (!latestObject) return;

  let mesh;

  if (latestObject.type === "Cube") {
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0x00ff00,
      })
    );
  }

  if (!mesh) return;

  mesh.userData.id =
    latestObject.id;

  //set object position randomly within the room
  mesh.position.set(
    Math.round((Math.random() * 20 - 10) / 1) * 1,
    1,
    Math.round((Math.random() * 20 - 10) / 1) * 1
  );

  sceneRef.current.add(mesh);

  newObjectsRef.current.push(mesh);
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
      1000,
    );
    cameraRef.current = camera; // store the camera
    camera.position.set(0, 35, 52);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer; // store the renderer
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

    // grid room floor
    const grid = new THREE.GridHelper(50,50);
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


    // animate
    const animate = () => {
      requestAnimationFrame(animate);
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
