import React, { useState, useRef, useCallback } from "react";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "../../constants/projects";
import { motion, useInView } from "framer-motion";
import "./Work.css";

/* ------------------------------------------------------------------ */
/*  Featured Project Card – large immersive hero card                  */
/* ------------------------------------------------------------------ */
function FeaturedCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Alternate layout: even index = image left, odd = image right
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="work-featured-card group"
      style={{ "--card-index": index }}
    >
      <div className={`work-featured-inner ${isReversed ? "work-featured-reversed" : ""}`}>
        {/* Image Panel */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="work-featured-image-wrap"
        >
          <div className="work-featured-image-container">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="work-featured-image"
              style={{
                transform: isHovered
                  ? `scale(1.08) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`
                  : "scale(1)",
              }}
            />
            {/* Gradient overlay */}
            <div className="work-featured-overlay" />

            {/* Floating "View" circle on hover */}
            <div className="work-featured-view-circle">
              <ExternalLink className="w-5 h-5" />
              <span>View</span>
            </div>
          </div>

          {/* Number badge */}
          <div className="work-featured-number">
            {String(index + 1).padStart(2, "0")}
          </div>
        </a>

        {/* Content Panel */}
        <div className="work-featured-content">
          <div className="work-featured-meta">
            <span className="work-featured-category">{project.category}</span>
            <span className="work-featured-divider" />
            <span className="work-featured-year">2024</span>
          </div>

          <h3 className="work-featured-title">{project.title}</h3>

          <p className="work-featured-description">
            {project.description} — {project.result}
          </p>

          <div className="work-featured-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="work-featured-tag">{tag}</span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="work-featured-link"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Work Section                                                  */
/* ------------------------------------------------------------------ */
export default function Work() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProjects = projects.slice(0, 3);
  const totalProjects = projects.length;

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="work-ambient-glow work-ambient-glow--1" />
      <div className="work-ambient-glow work-ambient-glow--2" />

      {/* Section Header */}
      <div className="work-header">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-label"
        >
          <span className="work-header-line" />
          <span className="work-header-tag">Portfolio</span>
          <span className="work-header-line" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-title"
        >
          Featured <span className="work-header-title-accent">Works</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-subtitle"
        >
          A curated selection of our most impactful digital experiences, crafted with precision and purpose.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="work-stats"
        >
          <div className="work-stat">
            <span className="work-stat-value">{totalProjects}+</span>
            <span className="work-stat-label">Projects</span>
          </div>
          <div className="work-stat-divider" />
          <div className="work-stat">
            <span className="work-stat-value">100%</span>
            <span className="work-stat-label">On-Time Delivery</span>
          </div>
          <div className="work-stat-divider" />
          <div className="work-stat">
            <span className="work-stat-value">5★</span>
            <span className="work-stat-label">Client Satisfaction</span>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects */}
      <div className="work-featured-grid">
        {featuredProjects.map((project, index) => (
          <FeaturedCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Projects CTA — opens /projects in a new tab */}
      {totalProjects > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-cta-wrap"
        >
          <div className="work-cta-line" />

          <div className="work-cta-content">
            <p className="work-cta-text">
              Explore our full portfolio of <span className="text-white font-medium">{totalProjects} projects</span> across web, apps, and brand design.
            </p>

            <a
              href="/projects"
              target="_blank"
              rel="noreferrer"
              className="work-cta-button group"
            >
              <span className="work-cta-button-bg" />
              <span className="work-cta-button-text">
                View All Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </a>
          </div>

          <div className="work-cta-line" />
        </motion.div>
      )}
    </section>
  );
}
