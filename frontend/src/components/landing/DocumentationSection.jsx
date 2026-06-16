import React from "react";
import { FadeSection, StaggerGrid } from "../../ui/Animation";
import { motion } from "framer-motion";

const DOC = [
  {
    n: "01",
    title: "Sign up in seconds",
    desc: "Create your free account. No credit card, no setup.",
  },
  {
    n: "02",
    title: "Add objects to your scene",
    desc: "Choose from cubes, spheres, or import a GLB model. Each click spawns it at a random position.",
  },
  {
    n: "03",
    title: "Drag & arrange",
    desc: "Click to select, drag to reposition. Fine-tune coordinates in the properties panel.",
  },
  {
    n: "04",
    title: "Save & reload",
    desc: "Hit Save — your scene persists to MongoDB. Log back in anytime and pick up where you left off.",
  },
  {
    n: "05",
    title: "Collaborate in real-time",
    desc: "Invite others to your scene and work together in real-time.",
  },
];

const DocumentationSection = () => {
  return (
    <section id="how" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
      <FadeSection className="text-center mb-16">
        <h2 className="font-display font-black text-4xl text-[#f2f0ff]">
          How it works
        </h2>
      </FadeSection>
      <StaggerGrid className="flex flex-col gap-10">
        {DOC.map((step) => (
          <motion.div
            key={step.n}
            variants={{
              hidden: { opacity: 0, x: -24 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex items-start gap-6"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm bg-[#5b73ff]/10 border border-[#5b73ff]/25 text-[#5b73ff]">
              {step.n}
            </div>
            <div className="pt-1">
              <h3 className="font-display font-bold text-xl mb-1 text-[#f2f0ff]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#f2f0ff]/50">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </StaggerGrid>
    </section>
  );
};

export default DocumentationSection;
