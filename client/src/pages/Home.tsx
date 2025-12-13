import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import PixelCard from "@/components/ui/PixelCard";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  // State to control back-to-top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Create smooth scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Update document title
    document.title = "DataZen - Data Science Council of Somaiya Vidyavihar University";
    
    // Handle scroll event for back-to-top button
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Decorative elements for transition visuals
  const RedBlob = ({ className = "", size = 300, opacity = 0.15 }) => (
    <div 
      className={`red-blob ${className}`}
      style={{ 
        width: size, 
        height: size, 
        opacity,
      }}
    />
  );

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden" style={{ position: 'relative' }}>
      {/* Scroll progress indicator at top of page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-red z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Decorative blobs positioned throughout the page */}
      <RedBlob className="top-[15%] left-[10%]" size={400} opacity={0.08} />
      <RedBlob className="top-[45%] right-[5%]" size={300} opacity={0.06} />
      <RedBlob className="top-[75%] left-[20%]" size={250} opacity={0.04} />
      
      {/* Decorative data grid pattern */}
      <div className="fixed inset-0 data-grid pointer-events-none z-0 opacity-30" />
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Hero />
        
        {/* --- NEW SECTION: CASE STUDY COMPETITION REGISTRATION --- */}
        <section className="py-20 lg:py-28 bg-card/50 border-t border-b border-border backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                DataZen <br />
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-power-red to-vitality-red">
                  Case Study Competition 2024
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to put your data analysis and visualization skills to the test?
                Join our premier competition, tackle real-world challenges in Finance, Healthcare, or Social Good, and win big!
              </p>
              <div className="pt-2">
                {/* Note: 'asChild' prop passes down the Button's styles to the Link component from wouter */}
                <Button asChild className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-power-red to-vitality-red text-white hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-red-500/30">
                  <Link to="/register">
                    Register Your Team Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-5">Team size: 1-4 members | Prize Pool: ₹10,000 + Certificates</p>
              </div>
            </motion.div>
          </div>
        </section>
        {/* --- END NEW SECTION --- */}

        <About />
        <Activities />
        <Timeline />
        <Stats />
        <Team />
      </main>

      <Footer />
    </div>
  );
}
