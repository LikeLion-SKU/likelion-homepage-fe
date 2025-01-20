import { AnimatePresence, motion } from 'framer-motion';
/**
 * 아래에서 위로 나타나는 애니메이션이 필요한 곳에 사용
 * @param Component 애니메이션이 필요한 컴포넌트
 * @param styling 필요 시 css 필요없으면 안 써두 됩니다.(optional)
 * @returns
 *
 * @example
 * const AnimationRecruitSection = withBottomUpAnimation(RecruitSection, {
 * position: 'absolute',
 * left: 0,
 * width: '100vw',
 * height: '100vh',
 * });
 */

export function withBottomUpAnimation(Component, styling) {
  const pageVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  if (typeof styling !== 'undefined') {
    return function ({ ...props }) {
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            style={styling}
            key={location.key}
            variants={pageVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.5 }}
            // animate='animate'
            exit='exit'
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            <Component {...props} />
          </motion.div>
        </AnimatePresence>
      );
    };
  }
  return function ({ ...props }) {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.key}
          variants={pageVariants}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, amount: 0.2 }}
          // animate='animate'
          exit='exit'
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <Component {...props} />
        </motion.div>
      </AnimatePresence>
    );
  };
}
