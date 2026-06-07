import React, { useRef, useState, useCallback } from "react";
import { ArrowUpRight, ExternalLink, ArrowLeft } from "lucide-react";
import { projects } from "../constants/projects";
import { m, useInView } from 'framer-motion';
import { Link } from "react-router-dom";
import "../components/sections/Work.css";

/* ------------------------------------------------------------------ */
/*  Project Card                                                       */
/* ------------------------------------------------------------------ */
const ProjectCard = React.memo(function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);
  const rAFRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !imageRef.current) return;
    
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    rAFRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      imageRef.current.style.transform = `scale(1.06) translate(${x * -6}px, ${y * -6}px)`;
    });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1)`;
    }
  };

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="projects-page-card group"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="projects-page-card-image-wrap"
      >
        <div className="projects-page-card-image-container">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
            className="projects-page-card-image"
            style={{ transition: "transform 0.1s ease-out" }}
          />
          <div className="projects-page-card-overlay" />

          {/* Floating View circle */}
          <div className="projects-page-card-view">
            <ExternalLink className="w-4 h-4" />
            <span>View</span>
          </div>
        </div>

        {/* Number badge */}
        <div className="projects-page-card-number">
          {String(index + 1).padStart(2, "0")}
        </div>
      </a>

      <div className="projects-page-card-info">
        <div className="projects-page-card-meta">
          <span className="projects-page-card-category">{project.category}</span>
          <div className="projects-page-card-tags">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="projects-page-card-tag">{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="projects-page-card-title">{project.title}</h3>

        <p className="projects-page-card-desc">
          {project.description} — {project.result}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="projects-page-card-link"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </m.div>
  );
});

/* ------------------------------------------------------------------ */
/*  Projects Page                                                      */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="projects-page"
    >
      {/* Ambient glow */}
      <div className="work-ambient-glow work-ambient-glow--1" />
      <div className="work-ambient-glow work-ambient-glow--2" />

      {/* Back link */}
      <div className="projects-page-back-wrap">
        <Link to="/" className="projects-page-back">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <header className="projects-page-header" ref={headerRef}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-label"
        >
          <span className="work-header-line" />
          <span className="work-header-tag">Complete Portfolio</span>
          <span className="work-header-line" />
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="projects-page-title"
        >
          All <span className="work-header-title-accent">Projects</span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="projects-page-subtitle"
        >
          Every project we've delivered — from restaurant websites to full-scale EdTech platforms.
          <span className="projects-page-count">{projects.length} Projects</span>
        </m.p>
      </header>

      {/* Grid */}
      <div className="projects-page-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </m.main>
  );
}
