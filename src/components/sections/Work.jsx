import React, { useState, useRef, useCallback } from "react";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "../../constants/projects";
import { m, useInView } from 'framer-motion';
import { Link } from "react-router-dom";
import "./Work.css";

/* ------------------------------------------------------------------ */
/*  Featured Project Card – large immersive hero card                  */
/* ------------------------------------------------------------------ */
const FeaturedCard = React.memo(function FeaturedCard({ project, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const rAFRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !imageRef.current) return;

    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);

    rAFRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      imageRef.current.style.transform = `scale(1.08) translate(${x * -8}px, ${y * -8}px)`;
    });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1)`;
    }
  };

  // Alternate layout: even index = image left, odd = image right
  const isReversed = index % 2 !== 0;

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="work-featured-card group"
      style={{ "--card-index": index }}
    >
      <div className={`work-featured-inner ${isReversed ? "work-featured-reversed" : ""}`}>
        {/* Image Panel */}
        <Link
          to={`/projects/${project.id}`}
          className="work-featured-image-wrap"
        >
          <div className="work-featured-image-container">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              width="1920"
              height="1080"
              className="work-featured-image"
              style={{ transition: "transform 0.1s ease-out" }}
            />
            {/* Gradient overlay */}
            <div className="work-featured-overlay" />

            {/* Floating "View" circle on hover */}
            <div className="work-featured-view-circle">
              <ArrowUpRight className="w-6 h-6" />
              <span>Case Study</span>
            </div>
          </div>

          {/* Number badge */}
          <div className="work-featured-number">
            {String(index + 1).padStart(2, "0")}
          </div>
        </Link>

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

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link
              to={`/projects/${project.id}`}
              className="work-featured-link"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-black uppercase tracking-wider text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 ml-2"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </m.div>
  );
});

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
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-label"
        >
          <span className="work-header-line" />
          <span className="work-header-tag">Portfolio</span>
          <span className="work-header-line" />
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-title"
        >
          Featured <span className="work-header-title-accent">Demo Works</span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-subtitle"
        >
          A curated selection of our most impactful digital experiences, crafted with precision and purpose.
        </m.p>

        {/* Stats row */}
        <m.div
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
            <span className="work-stat-value">4★</span>
            <span className="work-stat-label">Client Satisfaction</span>
          </div>
        </m.div>
      </div>

      {/* Featured Projects */}
      <div className="work-featured-grid">
        {featuredProjects.map((project, index) => (
          <FeaturedCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Projects CTA — opens /projects in a new tab */}
      {totalProjects > 3 && (
        <m.div
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

            <Link
              to="/projects"
              className="work-cta-button group"
            >
              <span className="work-cta-button-bg" />
              <span className="work-cta-button-text">
                View All Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Link>
          </div>

          <div className="work-cta-line" />
        </m.div>
      )}
    </section>
  );
}
