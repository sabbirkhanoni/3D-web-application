import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeSection } from "../../ui/Animation";

const CTASection = () => {
  return (
    <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
      <FadeSection>
        <div className="relative rounded-3xl px-10 py-16 flex flex-col items-center gap-8 border border-[#5b73ff]/20 overflow-hidden bg-[#0b0d1f]">
          {/* Ambient pulse behind CTA */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 60px rgba(91,115,255,0.08)",
                "0 0 120px rgba(91,115,255,0.18)",
                "0 0 60px rgba(91,115,255,0.08)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="relative font-display font-black text-4xl md:text-5xl text-[#f2f0ff]">
            Ready to build your
            <br />
            first 3D scene?
          </h2>
          <p className="relative text-[#f2f0ff]/50">
            Join 5000+ creators. No credit card required.
          </p>
          <div className="relative flex gap-4 flex-wrap justify-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-3.5 text-base bg-[#5b73ff] hover:bg-[#5b73ff]/90 text-white rounded-full transition"
              >
                Start Building Free
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-3.5 text-base border border-white/20 text-white hover:bg-white/5 rounded-full transition"
              >
                View the Demo
              </motion.button>
            </Link>
          </div>
        </div>
      </FadeSection>
    </section>
  );
};

export default CTASection;
