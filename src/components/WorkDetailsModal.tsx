import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Building2, Calendar, MapPin } from 'lucide-react';
import type { WorkHistory } from '../types';

interface WorkDetailsModalProps {
  work: WorkHistory;
  onClose: () => void;
}

const WorkDetailsModal = ({ work, onClose }: WorkDetailsModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
          <img
            src={work.image}
            alt={work.company}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors group"
        >
          <X className="w-5 h-5 text-white/70 group-hover:text-white" />
          <span className="sr-only">Close modal</span>
        </button>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{work.role}</h2>
            <div className="flex flex-wrap gap-4 text-zinc-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{work.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{work.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{work.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Description</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{work.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Key Achievements</h3>
            <ul className="space-y-2">
              {work.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {work.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkDetailsModal;