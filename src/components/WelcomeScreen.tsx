import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const WelcomeScreen = ({ isVisible, onAnimationComplete }: WelcomeScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onAnimationComplete}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
            <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-900/90 to-black" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-8"
            >
              {/* Logo Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-white/90 to-white/40 rounded-xl flex items-center justify-center"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-3xl font-bold text-black"
                >
                  SHK
                </motion.span>
              </motion.div>

              {/* Text Animations */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-4xl md:text-6xl font-bold gradient-text"
                >
                  Welcome
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="space-y-2"
                >
                  <p className="text-zinc-400 text-lg">Exploring creativity through code</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 }}
                    className="flex justify-center gap-2"
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;