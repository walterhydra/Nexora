import React, { useRef } from "react";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "../../constants/projects";
import { m, useInView } from 'framer-motion';
import { Link } from "react-router-dom";
import "./Work.css";

/* ------------------------------------------------------------------ */
/*  Featured Project Card – Modern Professional Split Layout          */
/* ------------------------------------------------------------------ */
const FeaturedCard = React.memo(function FeaturedCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const projectUrlDomain = project.link 
    ? project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 sm:p-7 lg:p-8 rounded-[2rem] bg-[#070b14]/90 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl relative overflow-hidden group font-quicksand"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Side: Project Showcase Preview */}
        <div className="lg:col-span-7">
          <Link
            to={`/projects/${project.id}`}
            className="block rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl group/preview relative"
          >
            {/* Top Browser Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 truncate max-w-[200px] sm:max-w-[280px]">
                {projectUrlDomain}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Live</span>
              </div>
            </div>

            {/* Project Screenshot / Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                width="1920"
                height="1200"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
                style={{ transform: 'translateZ(0)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </Link>
        </div>

        {/* Right Side: Project Name, Details & Demo Button */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-4 sm:gap-5">
          {/* Category & Project Index */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-quicksand font-bold uppercase tracking-wider text-white">
              {project.category}
            </span>
            <span className="font-mono text-xs text-white/40 font-semibold tracking-wider">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-quicksand font-bold text-white tracking-tight leading-tight group-hover:text-accent-primary transition-colors">
            {project.title}
          </h3>

          {/* Project Description & Impact */}
          <p className="font-quicksand text-white/75 text-sm sm:text-base leading-relaxed font-medium">
            {project.description} — <span className="text-white font-semibold">{project.result}</span>
          </p>

          {/* Metrics Highlight (if available) */}
          {project.results?.metrics && (
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
              {project.results.metrics.slice(0, 3).map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold truncate">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons: Live Demo & Case Study */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-quicksand font-bold text-sm hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Live Demo</span>
                <ExternalLink size={15} />
              </a>
            )}

            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/15 text-white font-quicksand font-semibold text-sm hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <span>Case Study</span>
              <ArrowUpRight size={15} />
            </Link>
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
      <div className="work-header font-quicksand">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-label"
        >
          <span className="work-header-line" />
          <span className="work-header-tag font-quicksand font-semibold">PORTFOLIO</span>
          <span className="work-header-line" />
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-title font-quicksand font-extrabold"
        >
          FEATURED <span className="work-header-title-accent block mt-1.5 font-quicksand">DEMO WORKS</span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="work-header-subtitle font-quicksand font-medium text-white/70"
        >
          A curated selection of our most impactful digital experiences, crafted with precision and purpose.
        </m.p>

        {/* Stats row */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="work-stats font-quicksand"
        >
          <div className="work-stat">
            <span className="work-stat-value font-quicksand font-bold">{totalProjects}+</span>
            <span className="work-stat-label font-quicksand">Projects</span>
          </div>
          <div className="work-stat-divider" />
          <div className="work-stat">
            <span className="work-stat-value font-quicksand font-bold">100%</span>
            <span className="work-stat-label font-quicksand">On-Time Delivery</span>
          </div>
          <div className="work-stat-divider" />
          <div className="work-stat">
            <span className="work-stat-value font-quicksand font-bold">4★</span>
            <span className="work-stat-label font-quicksand">Client Satisfaction</span>
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
