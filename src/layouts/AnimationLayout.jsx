import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimationLayout({ children, styling }) {
  const location = useLocation(); // 현재 라우터 위치 가져오기

  const pageVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  if (typeof styling !== 'undefined') {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          style={styling}
          key={location.key}
          variants={pageVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key}
        variants={pageVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
