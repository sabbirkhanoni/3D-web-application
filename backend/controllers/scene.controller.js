import { saveSceneService, getSceneByUserIdService, deleteSceneByUserIdService } from "../services/scene.service.js";

export const createSceneController = async (request, response) => {
  try {
    const userId = request.session.userId; 
    const createdScene = await saveSceneService({ userId, ...request.body });

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
        message: "Build your scene",
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

export const deleteSceneByUserIdController = async (request, response) => {
  try {
    const userId = request.session.userId;
    await deleteSceneByUserIdService(userId);
    response.status(200).json({
      message: "Scene deleted successfully",
      error: false,
      success: true
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
};
