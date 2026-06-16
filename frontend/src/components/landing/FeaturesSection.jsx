import React from "react";
import { StaggerGrid, FadeSection } from "../../ui/Animation";
import {
  Boxes,
  Globe,
  Move3d,
  CloudUpload,
  Code2,
  Layers3,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: Globe,
    color: "#5b73ff",
    title: "3D WebGL Viewport",
    description:
      "Real-time rendering with orbit controls, perspective camera, and ambient lighting - all at 60fps.",
  },
  {
    icon: Move3d,
    color: "#9333ea",
    title: "Drag & Drop Editor",
    description:
      "Click any object to select it. Drag to reposition. Live coordinate sync in the properties panel.",
  },
  {
    icon: CloudUpload,
    color: "#00d9f5",
    title: "Cloud Scene Persistence",
    description:
      "Every scene auto-saves to MongoDB. Sign in on any device and your world is waiting.",
  },
  {
    icon: Boxes,
    color: "#f59e0b",
    title: "GLB Model Support",
    description:
      "Import freely available .glb and .gltf models from the web. Duck, car, furniture - anything goes.",
  },
  {
    icon: Code2,
    color: "#10b981",
    title: "Developer-First API",
    description:
      "Full REST API with session auth. Integrate VR Scene Builder into your own products.",
  },
  {
    icon: Layers3,
    color: "#ec4899",
    title: "Scene Management",
    description:
      "Create, duplicate, and delete scenes. Organize your projects with ease.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative z-10 max-w-7xl mx-auto px-6 py-32"
    >
      <FadeSection className="text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3 text-[#5b73ff]">
          Features
        </p>
        <h2 className="font-display font-black text-4xl md:text-5xl text-[#f2f0ff]">
          A complete 3D creation
          <br />
          <em className="text-[#f2f0ff]/55 not-italic">
            suite in your browser
          </em>
        </h2>
      </FadeSection>

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feat, i) => (
          <FeatureCard
            key={i}
            icon={feat.icon}
            color={feat.color}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </StaggerGrid>
    </section>
  );
};

export default FeaturesSection;
