import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Work', href: '#work', sectionId: 'work' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const checkActiveSection = useCallback(() => {
    const sections = MENU_ITEMS.map(item => ({
      id: item.sectionId,
      offset: document.getElementById(item.sectionId)?.offsetTop || 0
    }));

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPosition >= sections[i].offset) {
        setActiveSection(sections[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      checkActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkActiveSection]);

  const scrollToSection = (href: string, sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    const navHeight = 80; // Height of the navbar
    if (element) {
      const offset = element.offsetTop - navHeight;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(24, 24, 27, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 2xl:px-0">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-white/20 to-white/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <span className="relative text-3xl font-bold gradient-text">SHK</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {MENU_ITEMS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href, item.sectionId);
                }}
                className={`relative px-6 py-3 transition-colors group text-lg ${
                  activeSection === item.sectionId
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative z-10"
                  initial={false}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{
                    scale: activeSection === item.sectionId ? 1 : 1,
                    opacity: activeSection === item.sectionId ? 1 : 0,
                    backgroundColor: activeSection === item.sectionId
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2 text-zinc-400 hover:text-white transition-colors group"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-zinc-900/90 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {MENU_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.sectionId);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors ${
                    activeSection === item.sectionId
                      ? 'text-white bg-white/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;