import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-navy-950/20 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
