import React from 'react';
import { motion } from 'framer-motion';

const Stat = ({ value, label }) => {
  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-display font-black text-4xl text-[#f2f0ff]">{value}</span>
      <span className="text-sm text-[#f2f0ff]/40">{label}</span>
    </motion.div>
  );
};

export default Stat;