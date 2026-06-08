import { get } from "mongoose";
import {createSceneController, getSceneByUserIdController} from "../controllers/scene.controller.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js";

import Router  from "express";

const router = Router();

//only authenticated user can access these routes
router.post("/", isAuthenticated, createSceneController);
router.get("/", isAuthenticated, getSceneByUserIdController);

export default router;
