import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const FadeSection = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };
  
  export const StaggerGrid = ({ children, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };