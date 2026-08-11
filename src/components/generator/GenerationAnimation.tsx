'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GenerationAnimationProps {
  isGenerating: boolean;
  builderId: string;
  onComplete: () => void;
}

const STEPS = [
  { text: 'Framing Builder...', duration: 800 },
  { text: 'Finding Your Signal...', duration: 700 },
  { text: 'Issuing House ID...', duration: 600 },
];

export function GenerationAnimation({
  isGenerating,
  builderId,
  onComplete,
}: GenerationAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setShowFinal(false);
      return;
    }

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex < STEPS.length) {
        setCurrentStep(stepIndex);
        stepIndex++;
        setTimeout(runStep, STEPS[stepIndex - 1].duration);
      } else {
        setShowFinal(true);
        setTimeout(onComplete, 1200);
      }
    };

    runStep();
  }, [isGenerating, onComplete]);

  if (!isGenerating) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-goa-green-deep/95 flex items-center justify-center"
    >
      <div className="text-center px-8">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step indicator dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= currentStep ? 'bg-sun-yellow' : 'bg-cream/20'
                    }`}
                  />
                ))}
              </div>

              {/* Step text */}
              <p className="font-mono text-cream text-lg tracking-wider uppercase">
                {STEPS[currentStep]?.text}
              </p>

              {/* Loading bar */}
              <div className="mt-6 w-48 h-0.5 bg-cream/10 mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-sun-yellow"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: (STEPS[currentStep]?.duration || 800) / 1000,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              {/* Builder ID reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-label text-cream/50 mb-2 tracking-widest">
                  YOUR HOUSE ID
                </p>
                <p className="font-display text-5xl md:text-6xl text-sun-yellow font-black tracking-tight">
                  {builderId}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <p className="font-display text-xl text-cream italic">
                  Welcome to the House.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
