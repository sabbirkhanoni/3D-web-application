import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import BigSizeSofa from "/models/sofa1.glb?url";
import TableModel from "/models/table.glb?url";
import WardrobeModel from "/models/Wardrobe.glb?url";
import BedModel from "/models/old_bed.glb?url";
import RefrigeratorModel from "/models/fridge.glb?url";

const loader = new GLTFLoader();

export const addObjectToScene = (object, scene, objectsRef) => {
  const randomX = Math.round(Math.random() * 20 - 10);
  const randomZ = Math.round(Math.random() * 20 - 10);

  const addModel = (path, scale, floorY = 0) => {
    loader.load(path, (gltf) => {
      const model = gltf.scene;

      model.userData.id = object.id;
      model.userData.floorY = floorY; 
      model.scale.set(scale, scale, scale);
      model.position.set(randomX, floorY, randomZ);

      scene.add(model);
      objectsRef.current.push(model);
    });
  };

  switch (object.type) {
    case "Cube": {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      );

      cube.userData.id = object.id;
      cube.userData.floorY = 2; 
      cube.position.set(randomX, 2, randomZ);

      scene.add(cube);
      objectsRef.current.push(cube);
      break;
    }

    case "Sphere": {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2, 150, 50),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
      );

      sphere.userData.id = object.id;
      sphere.userData.floorY = 2;
      sphere.position.set(randomX, 2, randomZ);

      scene.add(sphere);
      objectsRef.current.push(sphere);
      break;
    }

    case "Wardrobe":
      addModel(WardrobeModel, 4, 0);
      break;

    case "Table":
      addModel(TableModel, 3, 0);
      break;

    case "Sofa":
      addModel(BigSizeSofa, 7, 0);
      break;

    case "Bed":
      addModel(BedModel, 8, 0);
      break;

    case "Refrigerator":
      addModel(RefrigeratorModel, 3, 0);
      break;

    default:
      break;
  }
};