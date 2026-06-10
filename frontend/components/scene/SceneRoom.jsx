import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { addObjectToScene } from "../../utils/LoadObjectsToAddScene";

const SceneRoom = (props) => {
  const { objects, onUpdateObjectPosition, onSelectObject } = props;

  const mountRef = useRef(null);
  const sceneRef = useRef(null); // Store scene to used in other components
  const cameraRef = useRef(null); // Store camera to used in other components
  const rendererRef = useRef(null); // Store renderer to used in other components
  const dragControlsRef = useRef(null);
  const orbitRef = useRef(null);
  const newObjectsRef = useRef([]);
  const loadedObjectIdsRef = useRef(new Set());
  const selectedMeshRef = useRef(null);
  // Raycaster for click selection
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  //Remove deleted objects form scene
  useEffect(() => {
    if (!sceneRef.current) return;

    const currentIds = new Set(objects.map((o) => o.id));

    //Remove objects from scene which are not in current objects list
    newObjectsRef.current = newObjectsRef.current.filter((mesh) => {
      const id = mesh.userData.id;
      if (!currentIds.has(id)) {
        sceneRef.current.remove(mesh); //Remove
        loadedObjectIdsRef.current.delete(id); //Remove from loaded set
        return false;
      }
      return true;
    });

    // Update DragControls
    if (dragControlsRef.current) {
      dragControlsRef.current.objects = newObjectsRef.current;
    }
  }, [objects]);

  //Add new objects
  useEffect(() => {
    if (!sceneRef.current || objects.length === 0) return;

    objects.forEach((object) => {
      if (!loadedObjectIdsRef.current.has(object.id)) {
        addObjectToScene(object, sceneRef.current, newObjectsRef);
        loadedObjectIdsRef.current.add(object.id);
      }
    });

    if (dragControlsRef.current) {
      dragControlsRef.current.objects = newObjectsRef.current;
    }
  }, [objects]);

  // Scene setup
  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0d0e24);

    //camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 35, 50);
    cameraRef.current = camera;

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Orbit Controls
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
      renderer.domElement,
    );
    dragControlsRef.current = dragControls;

    // Drag Events when drag start
    dragControls.addEventListener("dragstart", (event) => {
      orbit.enabled = false;
    });

    // Drag Events when dragging
    dragControls.addEventListener("drag", (event) => {
      const obj = event.object.userData.rootModel || event.object;

      const floorY = obj.userData.floorY ?? 0;

      obj.position.y = floorY;

      obj.position.x = Math.max(-24, Math.min(24, obj.position.x));
      obj.position.z = Math.max(-24, Math.min(24, obj.position.z));

      //Update the position in parent state
      if (onUpdateObjectPosition) {
        onUpdateObjectPosition(obj.userData.id, {
          x: Math.round(obj.position.x * 100) / 100,
          y: Math.round(obj.position.y * 100) / 100,
          z: Math.round(obj.position.z * 100) / 100,
        });
      }
    });

    // Drag Events when drag end
    dragControls.addEventListener("dragend", (event) => {
      orbit.enabled = true;
      const obj = event.object.userData.rootModel || event.object;

      if (selectedMeshRef.current?.userData.id !== obj.userData.id) {
        event.object.traverse?.((child) => {
          if (child.material) child.material.emissive?.setHex(0x000000);
        });
      }

      onUpdateObjectPosition(obj.userData.id, {
        x: obj.position.x,
        y: obj.position.y,
        z: obj.position.z,
      });
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // Room Floor Grid
    const gridHelper = new THREE.GridHelper(50, 50);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Left wall materials
    const leftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // Right wall material
    const rightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xb44745,
      side: THREE.DoubleSide,
    });

    // Back wall material
    const backWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedcd8,
      side: THREE.DoubleSide,
    });

    // Back Wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      backWallMaterial,
    );
    backWall.position.set(0, 7.5, -25);
    scene.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      leftWallMaterial,
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-25, 7.5, 0);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15),
      rightWallMaterial,
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

    const handleClick = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        newObjectsRef.current,
        true,
      );

      // আগেরটার highlight সরাও
      if (selectedMeshRef.current) {
        selectedMeshRef.current.traverse?.((child) => {
          if (child.material) child.material.emissive?.setHex(0x000000);
        });
        selectedMeshRef.current = null;
      }

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const rootModel = hit.userData.rootModel || hit;

        // নতুনটায় highlight দাও
        rootModel.traverse?.((child) => {
          if (child.material) child.material.emissive?.setHex(0x0044ff);
        });
        selectedMeshRef.current = rootModel; // 🔥 track করো

        onSelectObject?.(rootModel.userData.id);
      } else {
        onSelectObject?.(null);
      }
    };

    container.addEventListener("click", handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      orbit.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);

      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      dragControls.dispose();
      orbit.dispose();
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default SceneRoom;
