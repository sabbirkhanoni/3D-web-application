import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6">

      {/* Title */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-3 text-brand-primary">
          Pricing Plans
        </p>
        <h2 className="font-display font-black text-4xl md:text-5xl text-white">
          Simple & transparent By <span className="text-7xl text-green-500">SSLCommerz</span><br />
          <em className="text-white/50 text-xl not-italic font-light">pricing for creators</em>

        </h2>
      </motion.div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">

        {/* Free Plan */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -6, transition: { duration: 0.22 } }}
          className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/5 bg-[#090a14] relative overflow-hidden hover:border-[#5b73ff]/20 transition-colors duration-300"
        >
          {/* Subtle corner glow on hover */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#5b73ff]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Free Sandbox</h3>
            <p className="text-xs text-white/40 mb-6 font-sans">Ideal for exploring core shapes and basic layouts.</p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-white">৳0</span>
              <span className="text-xs text-white/40 font-mono">BDT</span>
              <span className="text-xs text-white/30 ml-1">/ forever</span>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-4 mb-8 text-xs text-white/60"
            >
              {[
                'Interactive 3D viewport canvas',
                'Standard shapes library (cubes, cones)',
                'Manual coordinates layout editor',
              ].map((feat) => (
                <motion.li key={feat} variants={itemVariant} className="flex items-center gap-2.5">
                  <Check size={14} className="text-brand-primary flex-shrink-0" />
                  <span>{feat}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Link to="/login" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 text-xs font-bold font-mono tracking-wider uppercase rounded-xl bg-gradient-to-br from-[#5b73ff] to-[#9333ea] text-white hover:bg-white/10 transition duration-300 cursor-pointer"
            >
              Start Building
            </motion.button>
          </Link>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -6, transition: { duration: 0.22 } }}
          className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-[#5b73ff]/40 bg-[#090b17] relative overflow-hidden hover:border-brand-primary transition-colors duration-300"
        >
          {/* Ambient glow */}
          <motion.div
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#5b73ff]/10 blur-[80px]"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute top-0 right-0 bg-gradient-to-br from-[#5b73ff] to-[#9333ea] text-white text-[9px] uppercase font-bold px-3.5 py-1.5 rounded-bl-xl tracking-wider">
            Most Popular
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Pro</h3>
            <p className="text-xs text-white/40 mb-6 font-sans">For creators importing external models and requiring full cloud save features.</p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-white">৳500</span>
              <span className="text-xs text-white/40 font-mono">BDT</span>
              <span className="text-xs text-white/30 ml-1">/ One-time payment</span>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-4 mb-8 text-xs text-white/60"
            >
              {[
                { text: 'Custom GLB model file upload', bold: true },
                { text: 'Auto-sync persistence to MongoDB', bold: true },
                { text: 'Developer REST API access key', bold: false },
                { text: 'Unlimited concurrent layouts storage', bold: false },
              ].map((feat) => (
                <motion.li key={feat.text} variants={itemVariant} className="flex items-center gap-2.5">
                  <Check size={14} className="text-brand-secondary flex-shrink-0" />
                  <span className={feat.bold ? 'font-semibold text-white/80' : ''}>{feat.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Link to="/login" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(91,115,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 text-xs font-bold bg-gradient-to-br from-[#5b73ff] to-[#9333ea] text-white font-mono tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer"
            >
              Upgrade via SSLCommerz
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;