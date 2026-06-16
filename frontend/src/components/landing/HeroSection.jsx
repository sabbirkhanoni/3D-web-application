import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Stat from './Stat';
import SceneCanvasLayout from './SceneCanvasLayout';


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 mt-10">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[600px] h-[600px] rounded-full bg-[#5b73ff]/10 blur-[120px]"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2 text-xs font-mono font-semibold uppercase px-3 py-1 rounded-full bg-[#5b73ff]/10 text-[#5b73ff] mb-6 border border-[#5b73ff]/20"
          >
            <Zap size={11} fill="#a5b4fc" />
            VRSB: VR Scene Builder version 1.0.2
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black leading-[1.05] text-[clamp(2.8rem,8vw,6rem)] text-[#f2f0ff]"
          >
            Build{' '}
            <span className="bg-gradient-to-r from-[#5b73ff] to-[#a855f7] bg-clip-text text-transparent">
              3D Virtual
            </span>
            <br />
           <span className="text-transparent bg-gradient-to-r text-7xl from-[#3e53ca] to-[#a855f7] bg-clip-text">
             Worlds, <em className='text-green-500'>In Browser.</em>
           </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg max-w-xl mt-6 leading-relaxed text-gray-400"
          >
            The professional-grade 3D scene system that lets you create, import, and manage
            production-ready scenes drag, drop, save, reload.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 my-5 justify-center"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-base bg-white text-gray-900 rounded-full hover:bg-gray-100 transition"
              >
                Start Building Free
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-base bg-blue-500 hover:bg-blue-700 text-gray-200 font-semibold rounded-md transition"
              >
                View Demo
              </motion.button>
            </Link>
          </motion.div>

           <SceneCanvasLayout />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-10 mt-20 justify-center"
          >
            <Stat value="50K+" label="Scenes created" />
            <div className="w-px bg-white/10" />
            <Stat value="3ms" label="Avg render time" />
            <div className="w-px bg-white/10" />
            <Stat value="99.9%" label="Uptime SLA" />
          </motion.div>
        </section>
  )
}

export default HeroSection