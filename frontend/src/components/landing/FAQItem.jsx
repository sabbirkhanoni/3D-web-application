import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ key, q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="glass-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-200"
      onClick={() => setOpen((v) => !v)}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold text-[#f2f0ff]">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown size={16} className="text-[#f2f0ff]/40" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-sm leading-relaxed text-[#f2f0ff]/50">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;