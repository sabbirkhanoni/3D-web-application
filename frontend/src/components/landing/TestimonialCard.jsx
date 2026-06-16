import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, name, role, avatar }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors duration-300"
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.3, ease: 'backOut' }}
          >
            <Star size={13} fill="#f59e0b" className="text-[#f59e0b]" />
          </motion.div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-[#f2f0ff]/65">"{quote}"</p>

      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 bg-gradient-to-br from-[#5b73ff] to-[#9333ea] text-white">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#f2f0ff]">{name}</p>
          <p className="text-xs text-[#f2f0ff]/35">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;