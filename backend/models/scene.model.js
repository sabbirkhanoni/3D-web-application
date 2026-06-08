import mongoose from "mongoose";

const sceneObjectSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number,
    z: Number,
  },
});

const sceneSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    objects: [sceneObjectSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Scene", sceneSchema);