import sceneModel from "../models/scene.model.js";

export const saveSceneService = async (payload) => {
  const { userId, objects } = payload;

  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!objects || !Array.isArray(objects)) {
    throw new Error("Objects must be an array");
  }

  if (objects.length === 0) {
    throw new Error("At least one object is required");
  }

  const scene = await sceneModel.findOneAndUpdate(
    { userId }, // find by user
    {
      $set: { objects }, // replace objects
    },
    {
      new: true,   // return updated doc
      upsert: true, // create if not exists
    }
  );

  return scene;
};


export const getSceneByUserIdService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const scene = await sceneModel.findOne({ userId });
  return scene;
};