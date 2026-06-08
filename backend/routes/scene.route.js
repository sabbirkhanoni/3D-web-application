import {createSceneController} from "../controllers/scene.controller.js";
import Router  from "express";

const router = Router();

router.post("/", createSceneController);

export default router;
