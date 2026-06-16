import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, color, title, description, tag }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white relative"
          style={{ backgroundColor: `${color}22` }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {/* Icon glow */}
          <div
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
            style={{ backgroundColor: color }}
          />
          <Icon size={18} style={{ color }} className="relative z-10" />
        </motion.div>

        {tag && (
          <span className="text-xs px-2 py-0.5 rounded-full font-mono border border-white/10 text-white/40">
            {tag}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display font-bold text-base mb-1.5 text-[#f2f0ff]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#f2f0ff]/50">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;