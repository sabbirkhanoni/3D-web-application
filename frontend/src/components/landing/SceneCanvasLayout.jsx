import React from "react";
import { Boxes, MousePointer } from "lucide-react";
import { useState, useEffect } from "react";

const SceneCanvasLayout = () => {
  const [coordinates, setCoordinates] = useState({ x: 1.5, y: 0, z: -3.2 });


  const shapes = ["Cube", "Sphere", "Cone", "Cylinder"];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#070811] shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col lg:flex-row min-h-[500px]">

        {/* LEFT TOOLBOX */}
        <div className="w-full lg:w-56 border-r border-white/5 bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono text-white/30 mb-3">
            OBJECTS
          </p>

          <div className="flex flex-col gap-2">
            {shapes.map((shape, i) => (
              <button
                key={shape}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition
                  ${
                    i === 0
                      ? "bg-blue-500/10 border border-blue-500/20 text-white"
                      : "text-white/50 hover:bg-white/5"
                  }`}
              >
                <Boxes size={14} />
                {shape}
              </button>
            ))}
          </div>
        </div>

        {/* CENTER CANVAS */}
        <div className="flex-1 relative bg-[#05060f] flex items-center justify-center overflow-hidden">

          {/* GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* HUD */}
          <div className="absolute top-4 right-4 text-[10px] font-mono text-white/40 bg-black/40 border border-white/10 px-3 py-2 rounded">
            <div className="flex items-center gap-1 text-white/70">
              <MousePointer size={10} />
              Editor Mode
            </div>
            Drag to move objects
          </div>

          {/* 3D MOCK OBJECT */}
          <div
            className="w-24 h-24 relative"
            style={{
              transform: `translate(${coordinates.x * 20}px, ${
                -coordinates.y * 30
              }px) rotateX(35deg) rotateY(45deg)`,
            }}
          >
            <div className="absolute inset-0 bg-blue-500/30 border border-blue-400" />
            <div className="absolute inset-0 bg-purple-500/20 rotate-y-90 border border-purple-400" />
            <div className="absolute inset-0 bg-cyan-500/20 rotate-x-90 border border-cyan-400" />
          </div>

          {/* AXIS */}
          <div className="absolute bottom-4 left-4 text-[10px] text-white/30 font-mono flex gap-3">
            <span className="text-red-400">X</span>
            <span className="text-green-400">Y</span>
            <span className="text-blue-400">Z</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneCanvasLayout;