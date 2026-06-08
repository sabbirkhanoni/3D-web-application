import { saveSceneService, getSceneByUserIdService } from "../services/scene.service.js";

export const createSceneController = async (request, response) => {
  try {
    const createdScene = await saveSceneService(request.body);

    if (!createdScene) {
      return response.status(400).json({
        message: "Failed to save scene",
        error: true,
        success: false
      });
    }
    response.status(201).json({
        message: "Scene saved successfully",
        error: false,
        success: true,
    });
  } catch (error) {
    response.status(500).json({
        message: error.message,
        error: true,
        success: false
    });
  }
};

export const getSceneByUserIdController = async (request, response) => {
  try {
    const userId = request.session.userId;
    const scene = await getSceneByUserIdService(userId);
    if (!scene) {
      return response.status(404).json({
        message: "Scene not found",
        error: true,
        success: false
      });
    }
    response.status(200).json({
      message: "Scene retrieved successfully",
      error: false,
      success: true,
      data: scene
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
};
