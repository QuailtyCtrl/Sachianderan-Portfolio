import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowUpRight, Github, Twitter, Mail, Linkedin, ExternalLink, Building2, Calendar, Briefcase, Heart, Clock, Rocket, Code, Palette, Cpu, Globe, ChevronDown, Timer, Users, Eye, Star } from 'lucide-react';
import Navbar from './components/Navbar';
import WorkDetailsModal from './components/WorkDetailsModal';
import WelcomeScreen from './components/WelcomeScreen';
import ScrollAnimation from './components/ScrollAnimation';

const SPRING_CONFIG = { damping: 15, stiffness: 150, mass: 0.8 };
const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Sachian05', label:
    'GitHub' },
  { icon: Twitter, href: 'https://x.com/Sachian_hk', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sachianderan/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sachianhk@gmail.com', label: 'Email' },
];

const SKILLS = {
  development: {
    icon: Code,
    title: "Development",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "GraphQL", level: 75 }
    ]
  },
  design: {
    icon: Palette,
    title: "Design",
    skills: [
      { name: "UI/UX Design", level: 90 },
      { name: "Figma", level: 85 },
      { name: "Motion Design", level: 80 },
      { name: "Design Systems", level: 85 }
    ]
  },
  backend: {
    icon: Cpu,
    title: "Backend",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 }
    ]
  },
  other: {
    icon: Globe,
    title: "Other",
    skills: [
      { name: "SEO", level: 75 },
      { name: "Analytics", level: 80 },
      { name: "Performance", level: 85 },
      { name: "Accessibility", level: 90 }
    ]
  }
};

const WORK_HISTORY = [
  {
    id: 1,
    company: "Shoppers Drug Mart",
    role: "Pharmacy Assistant",
    period: "2020 - 2022",
    location: "Innisfil, CA",
    description: "Led the frontend development team in creating cutting-edge web applications using React and TypeScript.",
    achievements: [
      "Improved application performance by 40% through code optimization",
      "Mentored junior developers and established coding standards",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Led the migration from Angular to React for 5 major applications"
    ],
    technologies: ["HealthWatch Software", "Controlled Substance", "Next.js", "Tailwind CSS", "GraphQL"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    company: "Digital Solutions Ltd",
    role: "Full Stack Developer",
    period: "2019 - 2021",
    location: "Boston, MA",
    description: "Developed and maintained full-stack applications for enterprise clients.",
    achievements: [
      "Built and deployed 10+ customer-facing applications",
      "Reduced server response time by 50% through optimization",
      "Implemented real-time analytics dashboard for client reporting",
      "Integrated payment processing systems for e-commerce platforms"
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "Redis", "AWS"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    company: "StartUp Ventures",
    role: "Frontend Developer",
    period: "2018 - 2019",
    location: "Austin, TX",
    description: "Worked in an agile environment to develop modern web applications.",
    achievements: [
      "Developed responsive UI components used across multiple projects",
      "Implemented A/B testing increasing conversion rates by 25%",
      "Created reusable component library reducing development time",
      "Optimized web vitals improving lighthouse score to 95+"
    ],
    technologies: ["JavaScript", "Vue.js", "Sass", "Jest", "Webpack"],
    image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?auto=format&fit=crop&q=80&w=1200",
  }
];

const PROJECTS = [
  {
    id: 1,
    name: "Moneymaster.live",
    description: "An AI-powered personal finance tracking application that helps users manage their money smarter using cutting-edge machine learning.",
    url: "https://moneymaster.live",
    github: "https://github.com/username/moneymaster",
    status: "Active", // First project stays active
    features: [
      "AI-powered expense categorization",
      "Real-time budget tracking and alerts",
      "Predictive spending analysis",
      "Custom financial goal setting"
    ],
    technologies: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Python",
      "TensorFlow",
      "PostgreSQL"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    name: "Courtside App",
    description: "My personal portfolio website showcasing my projects and skills. Built with modern web technologies and featuring smooth animations.",
    url: "https://sachianderan.dev",
    github: "https://github.com/username/portfolio-2025",
    status: "Planning",
    features: [
      "Responsive design",
      "Custom animations",
      "Dark/Light mode",
      "Performance optimized"
    ],
    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "TailwindCSS"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    name: "Nervont.store",
    description: "A full-featured ChatGPT clone with real-time chat, code highlighting, and markdown support.",
    url: "https://nervont.store",
    github: "https://github.com/sachian05",
    status: "Paused",
    features: [
      "Real-time chat",
      "Code syntax highlighting",
      "Markdown support",
      "Chat history"
    ],
    technologies: [
      "Next.js",
      "OpenAI API",
      "Prisma",
      "tRPC",
      "TailwindCSS"
    ],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200",
  }
];

const ENTRY_LEVEL_SKILLS = [
  {
    icon: Timer,
    name: "Time Management",
    description: "Efficiently organizing tasks and meeting deadlines consistently"
  },
  {
    icon: Users,
    name: "Team Collaboration",
    description: "Working effectively with diverse teams and supporting colleagues"
  },
  {
    icon: Eye,
    name: "Attention to Detail",
    description: "Maintaining accuracy and thoroughness in all tasks"
  },
  {
    icon: Star,
    name: "Work Ethic",
    description: "Demonstrating reliability, punctuality, and commitment to excellence"
  }
];

const SocialLink = React.memo(({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
  <motion.a
    href={href}
    className="relative flex items-center justify-center w-12 h-12 glass gradient-border rounded-xl hover:bg-zinc-700/30 transition-all group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm glass px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </motion.a>
));

const DateDisplay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formattedDay = date.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="glass gradient-border rounded-xl p-4 w-[280px] group hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-medium">{formattedDay}</span>
        </div>
        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
      </div>
      <div className="text-lg text-zinc-200 font-light tracking-wide">
        {formattedDate}
      </div>
    </div>
  );
};

const WorkHistoryCard = React.memo(({ work, onClick }: { work: typeof WORK_HISTORY[0], onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group relative overflow-hidden rounded-lg glass gradient-border hover-card cursor-pointer"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
    <img
      src={work.image}
      alt={work.company}
      className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">{work.role}</h3>
        <div className="flex items-center gap-2 text-zinc-300">
          <Building2 className="w-4 h-4" />
          <span>{work.company}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-300">
          <Calendar className="w-4 h-4" />
          <span>{work.period}</span>
        </div>
      </div>
    </div>
  </motion.div>
));

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="project-card glass gradient-border rounded-2xl overflow-hidden"
    >
      <motion.div
        className="relative w-full h-64 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">{project.name}</h3>
            <span className={`status-badge px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'Active'
                ? 'bg-emerald-500/20 text-emerald-300'
                : project.status === 'Planning'
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="text-zinc-300 leading-relaxed">{project.description}</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Key Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Globe className="w-4 h-4" />
            Live 
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            View Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, skills, icon: Icon }) => {
  return (
    <div className="glass gradient-border p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{category}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-300">{skill.name}</span>
              <span className="text-zinc-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EntryLevelSkills = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass gradient-border p-6 rounded-xl space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Entry Level Skills</h3>
            <p className="text-sm text-zinc-400">Essential skills for all employeers.</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ENTRY_LEVEL_SKILLS.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex gap-3">
                        <div className="p-2 bg-white/10 rounded-lg shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{skill.name}</h4>
                          <p className="text-sm text-zinc-400">{skill.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-lg">
                <p className="text-sm text-zinc-400">
                  These foundational skills are valuable across all industries and positions,
                  demonstrating your readiness for professional responsibilities.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => (
  <footer className="py-8 mt-32 glass">
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 2xl:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400 flex items-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500" /> by Sachianderan Hari kovinth
        </p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.1 }}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  const [selectedWork, setSelectedWork] = useState<typeof WORK_HISTORY[0] | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const cursorX = useSpring(0, SPRING_CONFIG);
  const cursorY = useSpring(0, SPRING_CONFIG);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-artwork relative">
      <WelcomeScreen isVisible={showWelcome} onAnimationComplete={() => setTimeout(handleWelcomeComplete, 2500)} />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <Navbar />
            {!selectedWork && (
              <motion.div
                className="fixed w-8 h-8 border-2 border-white/80 rounded-full pointer-events-none mix-blend-difference z-50 backdrop-blur-sm"
                style={{ 
                  left: cursorX,
                  top: cursorY,
                  translateX: 0,
                  translateY: 0,
                }}
              />
            )}

            <div className="min-h-screen px-4 py-12 md:py-20 md:px-8 lg:px-16 2xl:px-0">
              <div className="max-w-7xl mx-auto space-y-32">
                <ScrollAnimation id="home">
                  <div className="relative glass gradient-border animated-gradient p-8 md:p-12 lg:p-16 rounded-[2.5rem] overflow-hidden min-h-[85vh] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-white/5 to-transparent opacity-50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-0 backdrop-blur-[2px]" />
                    
                    <div className="relative w-full">
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
                      <div className="flex flex-col gap-8 items-center text-center max-w-3xl mx-auto">
                        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                          <Spline scene="https://prod.spline.design/reulxzNdfgg6JT0t/scene.splinecode" />
                        </div>
                        <div className="space-y-3">
                          <div className="relative">
                            <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gradient-text leading-[1.1] tracking-tight">
                              Sachianderan Hari Kovinth
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                className="absolute -left-12 top-[100%] h-3 bg-gradient-to-r from-white/40 via-white/20 to-transparent rounded-full opacity-60"
                              />
                            </h1>
                          </div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-zinc-200 font-light tracking-wide">
                            Junior Front-End Web Developer
                          </h2>
                          <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-xl shadow-emerald-500/10 backdrop-blur-sm">
                            <div className="relative flex items-center">
                              <div className="w-5 h-5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                              <div className="absolute w-5 h-5 bg-emerald-500 rounded-full animate-ping" />
                            </div>
                            <span className="text-emerald-300 font-medium text-xl tracking-wide">Available for hire</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-8 w-full lg:w-auto items-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                         className="backdrop-blur-xl w-[280px]"
                        >
                          <DateDisplay />
                        </motion.div>
                       <div className="grid grid-cols-4 w-[280px] gap-4">
                          {SOCIAL_LINKS.map((link, index) => (
                            <motion.div
                              key={link.label}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5 + index * 0.1,
                              }}
                            >
                           <SocialLink {...link} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mt-4 lg:mt-8 text-center">
                      <motion.p
                        className="relative z-10 text-lg sm:text-xl md:text-2xl text-zinc-200 max-w-3xl mx-auto text-center leading-relaxed font-light tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        Passionate about web development and eager to contribute to innovative projects.
                        Currently seeking opportunities to apply and expand my skills in a professional environment.
                      </motion.p>
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
                        <motion.a
                          href="#work"
                          className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 text-white rounded-xl font-medium transition-all shadow-xl shadow-blue-500/20 relative overflow-hidden group whitespace-nowrap text-base tracking-wide hover:shadow-2xl hover:shadow-blue-500/40 border border-white/10 bg-[length:200%_100%] animate-gradient"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-2">
                            View Work <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                          </span>
                        </motion.a>
                        <motion.a
                          href="https://upload.wikimedia.org/wikipedia/commons/c/cc/Resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-medium transition-all relative overflow-hidden group whitespace-nowrap text-base tracking-wide border border-white/10 hover:bg-white/15 hover:border-white/20"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.4 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-2">
                            Resume <ExternalLink className="w-5 h-5" strokeWidth={2.5} />
                          </span>
                        </motion.a>
                      </div>
                    </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <EntryLevelSkills />
                </ScrollAnimation>

                <ScrollAnimation id="skills" className="space-y-12">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">Skills & Expertise</h2>
                    <div className="hidden md:flex items-center gap-2 text-zinc-300 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <Code className="w-5 h-5" />
                      <span>Industry Skills</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(SKILLS).map(([key, { icon, title, skills }]) => (
                      <ScrollAnimation key={key}>
                        <SkillCategory
                          category={title as string}
                          skills={skills}
                          icon={icon}
                        />
                      </ScrollAnimation>
                    ))}
                  </div>
                </ScrollAnimation>

                <ScrollAnimation id="projects" className="space-y-16">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                      Projects
                    </h2>
                    <div className="hidden md:flex items-center gap-2 text-zinc-400 glass px-4 py-2 rounded-lg">
                      <Rocket className="w-5 h-5" />
                      <span>{PROJECTS.length} Projects</span>
                    </div>
                  </div>
                  
                  <div className="projects-timeline space-y-16 md:space-y-24 pl-4 md:pl-8">
                    {PROJECTS.map((project, index) => (
                      <ScrollAnimation key={project.id} delay={index * 0.2}>
                        <ProjectCard project={project} index={index} />
                      </ScrollAnimation>
                    ))}
                  </div>
                </ScrollAnimation>

                <ScrollAnimation id="work" className="space-y-12">
                  <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                    Work History
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WORK_HISTORY.map((work, index) => (
                      <ScrollAnimation key={work.id} delay={index * 0.2}>
                        <WorkHistoryCard
                          work={work}
                          onClick={() => setSelectedWork(work)}
                        />
                      </ScrollAnimation>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>
            </div>

            <AnimatePresence>
              {selectedWork && (
                <WorkDetailsModal
                  work={selectedWork}
                  onClose={() => setSelectedWork(null)}
                />
              )}
            </AnimatePresence>

            <Footer className="mt-32" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default App