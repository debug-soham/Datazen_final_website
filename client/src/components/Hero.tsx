import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, ArrowRight } from "lucide-react";

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Floating particles animation for data points
  const particles = Array.from({ length: 40 }, (_, index) => ({
    id: index,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 10
  }));

  // SVG Data Chart visualization
  const DataChart = () => {
    const points = [25, 40, 35, 65, 50, 75, 60, 90, 75];
    const pathData = points.map((point, i) => `${(i / (points.length - 1)) * 100},${100 - point}`).join(' ');
    
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--power-red)" />
            <stop offset="100%" stopColor="var(--vitality-red)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 25} x2="100" y2={i * 25} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100" />
          ))}
        </g>
        
        {/* Data line */}
        <motion.polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pathData}
          className="path-animation"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={(i / (points.length - 1)) * 100}
            cy={100 - point}
            r="2"
            fill="#fff"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
          />
        ))}
      </svg>
    );
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden"
      ref={ref}
    >
      {/* Background gradient with data grid pattern */}
      <div className="absolute inset-0 bg-background data-grid"></div>
      
      {/* Animated floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full z-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.id % 3 === 0 ? 'var(--power-red)' : 
                      particle.id % 3 === 1 ? 'var(--vitality-red)' : 
                      'var(--somaiya-black)',
            opacity: 0.6
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Accent shapes */}
      <motion.div 
        className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-red rounded-tl-[100px] z-0 opacity-10"
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-red rounded-br-[100px] z-0 opacity-10"
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full md:w-1/2 space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block py-1 px-3 rounded-full border border-[var(--power-red)] text-[var(--power-red)] text-sm font-medium"
              variants={itemVariants}
            >
              Data Science Council
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="text-foreground">Data</span>
              <span className="text-gradient">Zen</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-lg"
              variants={itemVariants}
            >
              The official Data Science council of Somaiya Vidyavihar University, where we transform data into insights and create innovations that matter.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <a 
                href="#about" 
                className="px-8 py-3 bg-gradient-red text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Discover
              </a>
              <a 
                href="#activities" 
                className="px-8 py-3 border-2 border-[var(--power-red)] text-[var(--power-red)] font-medium rounded-lg hover:bg-[var(--power-red)] hover:text-white transition-all duration-300 text-center"
              >
                Explore
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 h-[400px] relative"
            variants={itemVariants}
          >
            {/* Abstract data visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-[300px] bg-card/30 backdrop-blur-sm rounded-xl border border-border shadow-2xl overflow-hidden">
                <DataChart />
                
                {/* Decorative UI elements */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--vitality-red)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[var(--power-red)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[var(--somaiya-black)]"></div>
                </div>
                
                <motion.div 
                  className="absolute bottom-4 right-4 text-xs text-[var(--power-red)] font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                >
                  DATAZEN v2.0
                </motion.div>
              </div>
            </div>
            
            {/* Floating icons */}
            <motion.div
              className="absolute top-[-20px] right-[20%] w-14 h-14 bg-card rounded-lg shadow-lg flex items-center justify-center"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <svg className="w-8 h-8 text-[var(--power-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute bottom-[40px] left-[10%] w-12 h-12 bg-card rounded-lg shadow-lg flex items-center justify-center"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            >
              <svg className="w-6 h-6 text-[var(--power-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute bottom-[80px] right-[20%] w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              <svg className="w-5 h-5 text-[var(--power-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Hiring Announcement Banner */}
        <motion.div
          className="mt-16 relative"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Clean gradient background with subtle animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--power-red)]/5 via-transparent to-[var(--vitality-red)]/5 rounded-2xl border border-[var(--power-red)]/10 backdrop-blur-sm"></div>
          
          {/* Subtle floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-[var(--power-red)]/40 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            {/* Clean announcement badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-2 bg-[var(--power-red)]/10 backdrop-blur-sm rounded-full border border-[var(--power-red)]/20 mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-[var(--power-red)]" />
              </motion.div>
              <span className="text-[var(--power-red)] font-semibold tracking-wide">NOW HIRING</span>
              <motion.div
                className="w-2 h-2 bg-[var(--power-red)] rounded-full"
                animate={{
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Clear, readable headline */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="text-foreground">We Are Hiring </span>
              <motion.span
                className="bg-gradient-to-r from-[var(--power-red)] to-[var(--vitality-red)] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                FY Representatives!
              </motion.span>
            </motion.h2>
            
            {/* Clean subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Join our dynamic team and help shape the future of data science at Somaiya. 
              Be the bridge between students and innovation.
            </motion.p>
            
            {/* Professional action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[var(--power-red)] to-[var(--vitality-red)] text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group text-lg"
                >
                  <a
                    href="https://fy-rep.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Users className="w-5 h-5" />
                    Apply Now
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
              </motion.div>
            </motion.div>
            
            {/* Simple decorative elements */}
            <motion.div
              className="flex justify-center items-center gap-2 opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-2 h-2 rounded-full bg-[var(--power-red)]"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Subtle corner accents */}
          <div className="absolute top-4 left-4">
            <motion.div
              className="w-8 h-8 border-l-2 border-t-2 border-[var(--power-red)]/30 rounded-tl-lg"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="absolute bottom-4 right-4">
            <motion.div
              className="w-8 h-8 border-r-2 border-b-2 border-[var(--power-red)]/30 rounded-br-lg"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
}
