import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import "./Team.css";

// Define types for team member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  description: string;
  github: string;
  linkedin: string;
  instagram: string;
  photo?: string;
}

export default function Team() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);

  // State for selected category and pagination
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 4; // Number of team members to show at once

    // Team data updated for 2025-26
  const teamMembers: TeamMember[] = [
    // Committee Heads
    {
      id: 1,
      name: "Mann Shah",
      role: "Committee Head",
      category: "Core",
      description: "Chief of Breaking Things and Fixing Them at 2 AM",
      photo: "/mann.jpg",
      github: "https://github.com/mannn13",
      linkedin: "https://www.linkedin.com/in/mann-shah-3940a3278/",
      instagram: "https://www.instagram.com/m.annn13/",
    },
    {
      id: 2,
      name: "Siddharth Chintawar",
      role: "Committee Head",
      category: "Core",
      photo: "/siddarth.jpg",
      description: "Steering the ship, barely",
      github: "https://github.com/sidc124",
      linkedin: "https://www.linkedin.com/in/siddharth-chintawar-a76366291/",
      instagram: "https://www.instagram.com/godknowssid/",
    },
    {
      id: 3,
      name: "Shubham Indulkar",
      role: "Tech Head",
      category: "Technical",
      description: "Name's PyKnight73",
      photo: "/shubham.png",
      github: "https://github.com/shubham-indulkar",
      linkedin: "https://www.linkedin.com/in/shubham-indulkar",
      instagram: "https://www.instagram.com/shubham.indulkar",
    },
    {
      id: 4,
      name: "Ishika Bhoyar",
      role: "Tech Member",
      category: "Technical",
      description: "It is what it is",
      photo: "/ishika.png",
      github: "https://github.com/ishikabhoyar",
      linkedin: "https://www.linkedin.com/in/ishikabhoyar",
      instagram: "https://www.instagram.com/ishika.bhoyar/",
    },
    {
      id: 5,
      name: "Soham Gore",
      role: "Tech Member",
      category: "Technical",
      description: "I am always... plotting .",
      photo: "/soham.jpg",
      github: "https://github.com/SohamGore",
      linkedin: "https://www.linkedin.com/in/soham-gore/",
      instagram: "https://www.instagram.com/sohamgore/",
    },
    {
      id: 6,
      name: "Manas Kolaskar",
      role: "Tech Member",
      category: "Technical",
      description: "Designing user-friendly and engaging experiences.",
      photo: "/manas.jpg",
      github: "https://github.com/manaskolaskar",
      linkedin: "https://www.linkedin.com/in/manas-kolaskar/",
      instagram: "https://www.instagram.com/manas.kolaskar/",
    },
    {
      id: 7,
      name: "Lakshya",
      role: "Tech Member",
      category: "Technical",
      description: "Introverted for a reason",
      photo: "/lakshya.png",
      github: "https://github.com/lakshya",
      linkedin: "https://www.linkedin.com/in/lakshya/",
      instagram: "https://www.instagram.com/lakshya/",
    },
    {
      id: 8,
      name: "Swadha Kumari",
      role: "Creative Head",
      category: "Content",
      description: "Certified Yapper",
      photo: "/swadha.jpg",
      github: "https://github.com/Swadha06",
      linkedin: "https://www.linkedin.com/in/swadha-kumari-525a61294/",
      instagram: "https://www.instagram.com/swaddhaa._/",
    },
    {
      id: 9,
      name: "Riya Gupta",
      role: "Creative Member",
      category: "Content",
      description: "Designing visual experiences",
      photo: "/riyagupta.jpg",
      github: "https://github.com/riyaa-g",
      linkedin: "https://www.linkedin.com/in/riyagupta70/",
      instagram: "https://www.instagram.com/_riyaya_07/",
    },
    {
      id: 10,
      name: "Sachi Parekh",
      role: "Creative Member",
      category: "Content",
      description: "Dedicated - Diligent - Devoted",
      photo: "/sachi.jpg",
      github: "https://github.com/sachiparekh",
      linkedin: "https://linkedin.com/in/sachi-parekh",
      instagram: "https://www.instagram.com/sachi.parekh",
    },
    {
      id: 11,
      name: "Samiksha Phirangi",
      role: "Creative Member",
      category: "Content",
      description: "Creating and planning content strategies.",
      photo: "/samiksha.jpg",
      github: "https://github.com/samikshaphirangi",
      linkedin: "https://www.linkedin.com/in/samiksha-phirangi",
      instagram: "https://www.instagram.com/samiksha.phirangi/",
    },
    {
      id: 12,
      name: "Saam Patil",
      role: "Creative Member",
      category: "Content",
      description: "Ensuring the safety and security of systems.",
      photo: "/saanj.jpg",
      github: "https://github.com/saampatil",
      linkedin: "https://www.linkedin.com/in/saam-patil/",
      instagram: "https://www.instagram.com/saam.patil/",
    },
    {
      id: 13,
      name: "Sohom Mallick",
      role: "PR Head",
      category: "Outreach",
      description: "Making tech look good",
      photo: "/sohom.jpg",
      github: "https://github.com/sohommallick",
      linkedin: "https://www.linkedin.com/in/sohom-mallick/",
      instagram: "https://www.instagram.com/sohom.mallick/",
    },
    {
      id: 14,
      name: "Pratibha Singh",
      role: "PR Member",
      category: "Outreach",
      description: "Designing seamless digital experiences.",
      photo: "/pratibha.PNG",
      github: "https://github.com/pratibhasoup",
      linkedin: "https://www.linkedin.com/in/pratibha-singh-76bb51340/",
      instagram: "https://www.instagram.com/pratibha.singhh/",
    },
    {
      id: 15,
      name: "Mrinali Sharma",
      role: "PR Member",
      category: "Outreach",
      description: "50%sweetness 50%savage",
      photo: "/mrinali.jpg",
      github: "https://github.com/mrinalishh",
      linkedin: "https://www.linkedin.com/in/mrinali-sharma-353b92327/",
      instagram: "https://www.instagram.com/mrinaliisharma?igsh=MTRocWI5a2s2eDI0bA==",
    },
    {
      id: 16,
      name: "Gurkirat Kaur",
      role: "PR Member",
      category: "Outreach",
      description: "Cosmic Wanderer",
      photo: "/gurkirat.jpg",
      github: "https://github.com/GurkiratKaur22",
      linkedin: "https://www.linkedin.com/in/gurkirat-kaur-b159a12b4/",
      instagram: "https://www.instagram.com/gurkirat_227/profilecard/?igsh=MXdoNDE5ZDhpYzc5cQ%3D%3D",
    },
    {
      id: 17,
      name: "Manya Baranwal",
      role: "PR Member",
      category: "Outreach",
      description: "Creating connections",
      photo: "/manya.jpg",
      github: "https://github.com/manyabaranwal",
      linkedin: "https://www.linkedin.com/in/manya-baranwal/",
      instagram: "https://www.instagram.com/manya.baranwal/",
    },
    {
      id: 18,
      name: "Abdullah Qureshi",
      role: "Marketing Head",
      category: "Marketing",
      description: "Strategic marketing expert",
      photo: "/abdullah.jpg",
      github: "https://github.com/abdullahqureshi",
      linkedin: "https://www.linkedin.com/in/abdullah-qureshi/",
      instagram: "https://www.instagram.com/abdullah.qureshi/",
    },
    {
      id: 19,
      name: "Ankita Kotkar",
      role: "Marketing Member",
      category: "Marketing",
      description: "Keepin' it real",
      photo: "/ankita.jpg",
      github: "https://github.com/ankitakotkar",
      linkedin: "https://www.linkedin.com/in/ankita-kotkar/",
      instagram: "https://www.instagram.com/ankita.kotkar/",
    },
    {
      id: 20,
      name: "Suryaansh Jain",
      role: "Marketing Member",
      category: "Marketing",
      description: "Doin it for the plot",
      photo: "/suryaansh.jpg",
      github: "https://github.com/suryaansh-jain",
      linkedin: "https://in.linkedin.com/in/suryaansh-jain-61b74b28a",
      instagram: "https://www.instagram.com/suryaansh._._/profilecard/?igsh=cmw0OXh4ZHY4Nzlm",
    },
    {
      id: 21,
      name: "Maahnal Chauhan",
      role: "Marketing Member",
      category: "Marketing",
      description: "Turning ideas into campaigns",
      photo: "/maahnal.jpg",
      github: "https://github.com/maahnalchauhan",
      linkedin: "https://www.linkedin.com/in/maahnal-chauhan/",
      instagram: "https://www.instagram.com/maahnal.chauhan/",
    },
    {
      id: 22,
      name: "Vedant Padhy",
      role: "Operation Head",
      category: "Operations",
      description: "Efficiency expert",
      photo: "/vedant.jpg",
      github: "https://github.com/vedantpadhy",
      linkedin: "https://www.linkedin.com/in/vedant-padhy/",
      instagram: "https://www.instagram.com/vedant.padhy/",
    },
    {
      id: 23,
      name: "Abhishek Joshi",
      role: "Operation Member",
      category: "Operations",
      description: "Fueled by Coffee & Code",
      photo: "/abhishek.png",
      github: "https://github.com/ketanabhishek8",
      linkedin: "https://www.linkedin.com/in/abhishek-joshi-83b482340/",
      instagram: "https://www.instagram.com/ketanabhishek8/profilecard/?igsh=Mzhjc2swMjdmOXc4",
    },
    {
      id: 24,
      name: "Naman Lodha",
      role: "Operation Member",
      category: "Operations",
      description: "good mornin",
      photo: "/naman.png",
      github: "https://github.com/namanldoha",
      linkedin: "https://www.linkedin.com/in/lodhanaman",
      instagram: "https://www.instagram.com/naman.ld",
    },
    {
      id: 25,
      name: "Rayan J Castelino",
      role: "Operation Member",
      category: "Operations",
      description: "Process optimization specialist",
      photo: "/rayan.jpg",
      github: "https://github.com/rayanjcastelino",
      linkedin: "https://www.linkedin.com/in/rayan-castelino/",
      instagram: "https://www.instagram.com/rayan.castelino/",
    },
    {
      id: 26,
      name: "Ishwari Chopade",
      role: "Operation Member",
      category: "Operations",
      description: "Efficiency advocate",
      photo: "/ishwari.jpg",
      github: "https://github.com/ishwarichopade",
      linkedin: "https://www.linkedin.com/in/ishwari-chopade/",
      instagram: "https://www.instagram.com/ishwari.chopade/",
    },
    {
      id: 27,
      name: "Rayan J Castelino",
      role: "Operation Member",
      category: "Operations",
      description: "Process optimization specialist",
      photo: "/rayan.jpg",
      github: "https://github.com/rayanjcastelino",
      linkedin: "https://www.linkedin.com/in/rayan-castelino/",
      instagram: "https://www.instagram.com/rayan.castelino/",
    },
    {
      id: 28,
      name: "Ishwari Chopade",
      role: "Operation Member",
      category: "Operations",
      description: "Efficiency advocate",
      photo: "/ishwari.jpg",
      github: "https://github.com/ishwarichopade",
      linkedin: "https://www.linkedin.com/in/ishwari-chopade/",
      instagram: "https://www.instagram.com/ishwari.chopade/",
    }
  ];

  // Create a flat array of all team categories including "All"
  const teamCategories = [
    "All",
    ...Array.from(new Set(teamMembers.map((m) => m.category))),
  ];

  // Filtered members based on selected category
  const filteredMembers =
    selectedCategory === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.category === selectedCategory);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // Get current page of members
  const getCurrentMembers = () => {
    const start = currentIndex * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  };

  // Handle pagination
  const paginate = (newDirection: number) => {
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= totalPages) newIndex = 0;
      if (newIndex < 0) newIndex = totalPages - 1;
      return newIndex;
    });
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Handle horizontal scrolling of category buttons
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Binary Background Pattern
  const BinaryBackground = () => (
    <motion.div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      <div className="absolute inset-0 font-mono text-sm text-[var(--power-red)] leading-none flex flex-wrap">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="p-2">
            {Array.from({ length: 8 }).map((_, j) => (
              <span key={j}>{Math.round(Math.random())}</span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="team"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background pattern */}
      <BinaryBackground />

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--power-red) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--vitality-red) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our People
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">The Team </span>
            <span className="text-gradient">Behind </span>
            <span className="text-foreground">DataZen</span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet our passionate team of data enthusiasts driving innovation and
            excellence in data science.
          </motion.p>

          <motion.div
            className="h-1 w-20 bg-gradient-red mx-auto mt-8"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Team Category Selection Menu */}
        <div className="mb-14 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground">Filter by Team</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all border border-primary/20"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all border border-primary/20"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          <div ref={scrollContainerRef} className="category-filter">
            {teamCategories.map((category) => {
              const count =
                category === "All"
                  ? teamMembers.length
                  : teamMembers.filter((m) => m.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentIndex(0);
                  }}
                  className={`category-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                >
                  <span className="font-medium">{category}</span>
                  <span
                    className={`rounded-full text-sm px-2 py-0.5 ml-2 ${
                      selectedCategory === category
                        ? "bg-white/20"
                        : "bg-red-100"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Members Carousel */}
        <div className="mb-24 relative">
          {/* Decorative elements */}
          <div className="absolute -left-20 -top-10 w-40 h-40 bg-gradient-to-r from-red-500/10 to-red-300/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-10 w-40 h-40 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-full blur-3xl"></div>

          <div className="relative overflow-hidden py-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex + selectedCategory}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.7, ease: [0.4, 0.0, 0.2, 1] },
                  opacity: { duration: 0.4 },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
              >
                {getCurrentMembers().map((member, index) => (
                  <div key={`${member.id}`} className="h-full">
                    <div className="team-member-card group">
                      {/* Profile circle at top */}
                      <div className="team-avatar-container">
                        <div className="team-avatar">
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                // If image fails to load, show initials instead
                                const target = e.currentTarget;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="team-avatar-initials">${getInitials(
                                    member.name
                                  )}</div>`;
                                }
                              }}
                            />
                          ) : (
                            <div className="team-avatar-initials">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="team-content">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>

                        {/* Red horizontal line */}
                        <div className="team-divider"></div>

                        {/* Category badge */}
                        <div className="mb-4">
                          <span className="team-category">
                            {member.category}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <p className="text-muted-foreground text-sm leading-relaxed italic">
                            "{member.description}"
                          </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3">
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s Instagram`}
                          >
                            <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(-1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </button>

                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-6 h-6 text-primary" />
                </button>
              </div>
            )}

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="pagination-dots">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }
                    }}
                    className={`pagination-dot ${
                      index === currentIndex ? "active" : "bg-gray-300"
                    }`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats about the team */}
        <motion.div
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-card rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-4xl font-bold text-primary">30+</p>
            <p className="text-muted-foreground mt-1">Team Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">6</p>
            <p className="text-muted-foreground mt-1">Departments</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15+</p>
            <p className="text-muted-foreground mt-1">Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">5+</p>
            <p className="text-muted-foreground mt-1">Events Per Year</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
