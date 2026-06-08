import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import BigSizeSofa from "/models/BigSizeSofa.glb?url";
import TableModel from "/models/table.glb?url";
import SofaModel from "/models/sofa_chair.glb?url";
import BedModel from "/models/bed.glb?url";
import RefrigeratorModel from "/models/fridge.glb?url";

const loader = new GLTFLoader();

export const addObjectToScene = (
  object,
  scene,
  objectsRef
) => {
  const randomX = Math.round(Math.random() * 20 - 10);
  const randomZ = Math.round(Math.random() * 20 - 10);

  const addModel = (path, scale) => {
    loader.load(path, (gltf) => {
      const model = gltf.scene;

      model.userData.id = object.id;
      model.scale.set(scale, scale, scale);
      model.position.set(randomX, 0, randomZ);

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
      sphere.position.set(randomX, 2, randomZ);

      scene.add(sphere);
      objectsRef.current.push(sphere);
      break;
    }

    case "Chair":
      addModel(SofaModel, 4);
      break;

    case "Table":
      addModel(TableModel, 2);
      break;

    case "Sofa":
      addModel(BigSizeSofa, 7);
      break;

    case "Bed":
      addModel(BedModel, 1.5);
      break;

    case "Refrigerator":
      addModel(RefrigeratorModel, 3);
      break;

    default:
      break;
  }
};