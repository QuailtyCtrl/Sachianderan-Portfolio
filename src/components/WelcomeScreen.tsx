import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Zap, Terminal, Cpu, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const icons = [Terminal, Code2, Cpu, Globe];

const glowVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0.5, 1, 0.5], 
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const codeParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 0.5
}));

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
          {/* Animated Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-900/90 to-black" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5" />
            {codeParticles.map((particle, index) => {
              const Icon = icons[index % icons.length];
              return (
              <motion.div
                key={particle.id}
                initial={{ 
                  opacity: 0,
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  rotate: Math.random() * 360
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [`${particle.y}%`, `${particle.y - 20}%`],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Icon className="w-4 h-4 text-white/10" />
              </motion.div>
            )})}
          </motion.div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-8"
            >
              {/* Enhanced Logo Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
                className="relative w-24 h-24 mx-auto"
              >
                <motion.div
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-xl blur-xl"
                />
                <div className="relative w-full h-full bg-gradient-to-br from-white/90 via-white/80 to-white/40 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-white/20">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-3xl font-bold text-black"
                >
                  SHK
                </motion.span>
                </div>
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className={`absolute ${
                      i === 0 ? '-top-2 -right-2' :
                      i === 1 ? '-bottom-2 -right-2' :
                      i === 2 ? '-bottom-2 -left-2' :
                      '-top-2 -left-2'
                    }`}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Text Animations */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  <span className="relative">
                    <span className="relative z-10 gradient-text">Welcome</span>
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1.5 }}
                      className="absolute bottom-0 left-0 h-[6px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-80"
                    />
                  </span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                    <p className="text-zinc-300 text-lg font-light tracking-wide">Exploring creativity through code</p>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  </div>
                  <div className="relative mt-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2 }}
                      className="flex justify-center gap-3"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-500/20"
                        />
                      ))}
                    </motion.div>
                  </div>
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