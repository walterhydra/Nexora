import React, { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, AlertCircle, CheckCircle2, Cpu, BarChart3, Globe } from "lucide-react";
import { projects } from "../constants/projects";
import { m, useInView } from "framer-motion";
import "../components/sections/Work.css";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  // If project not found, redirect to 404
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Animation variants
  const fader = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="projects-page min-h-screen pb-24"
    >
      {/* Background Ambience */}
      <div className="work-ambient-glow work-ambient-glow--1" style={{ filter: "blur(140px)", opacity: 0.2 }} />
      <div className="work-ambient-glow work-ambient-glow--2" style={{ filter: "blur(140px)", opacity: 0.15 }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link to="/projects" className="projects-page-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Hero Section */}
        <m.header 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-left mb-16 border-b border-white/10 pb-12"
        >
          <m.div variants={fader} className="mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-accent-primary/10 border border-accent-primary/30 text-accent-primary">
              CASE STUDY: {project.category}
            </span>
          </m.div>

          <m.h1 variants={fader} className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
            {project.title}
          </m.h1>

          <m.p variants={fader} className="text-lg sm:text-xl text-gray-400 font-light max-w-3xl leading-relaxed">
            {project.description} — engineered to eliminate friction, generate high-intent customer leads, and scale enterprise credibility.
          </m.p>
        </m.header>

        {/* Results Metrics Dashboard */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-16"
        >
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-500 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent-secondary animate-pulse" />
            Business Asset Performance (Results)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.metrics.map((metric, index) => (
              <m.div
                key={index}
                variants={fader}
                className="relative overflow-hidden p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-white/10 hover:bg-white/[0.04] transition-all group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              >
                {/* Micro-light reflect indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-accent-secondary mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {metric.value}
                </p>
                <p className="text-xs uppercase font-bold tracking-wider text-gray-400">
                  {metric.label}
                </p>
              </m.div>
            ))}

            {/* Impact Summary Card */}
            <m.div
              variants={fader}
              className="p-6 rounded-2xl border border-accent-primary/20 bg-accent-primary/[0.02] backdrop-blur-md sm:col-span-2 lg:col-span-1 flex flex-col justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <p className="text-xs font-black uppercase text-accent-primary tracking-widest mb-2">Net Business Impact</p>
              <p className="text-sm text-gray-300 font-medium leading-relaxed">
                {project.results.summary}
              </p>
            </m.div>
          </div>
        </m.section>

        {/* Bento Details Grid */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16"
        >
          {/* Problem Card */}
          <m.div
            variants={fader}
            className="md:col-span-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-lg flex flex-col justify-between group hover:border-red-500/20 hover:bg-red-500/[0.01] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-white">The Problem</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {project.problem}
              </p>
            </div>
            <div className="mt-8 text-[9px] font-black uppercase tracking-[0.2em] text-red-500/40">Friction Point Identified</div>
          </m.div>

          {/* Solution Card */}
          <m.div
            variants={fader}
            className="md:col-span-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-lg flex flex-col justify-between group hover:border-green-500/20 hover:bg-green-500/[0.01] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 mb-6 border border-green-500/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-white">The Asset Solution</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
            <div className="mt-8 text-[9px] font-black uppercase tracking-[0.2em] text-green-500/40">Business Asset Deployed</div>
          </m.div>

          {/* Tech Stack & Showcase Card */}
          <m.div
            variants={fader}
            className="md:col-span-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-lg group hover:border-accent-primary/20 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">Asset Infrastructure</h3>
                </div>
                <p className="text-gray-400 text-sm font-light max-w-xl">
                  Built on a robust, highly optimized technical stack engineered to deliver 100/100 performance, search visibility, and frictionless scaling.
                </p>
              </div>

              {/* Technologies chips */}
              <div className="flex flex-wrap gap-2.5 max-w-xl justify-start md:justify-end">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-black/40 border border-white/10 text-gray-300 rounded-xl hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </m.div>
        </m.section>

        {/* CTA Bar */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fader}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 border-t border-white/10 pt-12"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm overflow-hidden w-full sm:w-auto shadow-lg hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all"
          >
            <div className="absolute inset-0 w-full h-full bg-accent-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-white transition-colors duration-500">
              Visit Live Asset
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <Link
            to="/projects"
            className="px-8 py-4 bg-transparent text-gray-300 hover:text-white font-bold uppercase tracking-wider text-sm border border-white/10 hover:border-white/30 transition-colors w-full sm:w-auto text-center"
          >
            Back to Showcase
          </Link>
        </m.section>

      </div>
    </m.main>
  );
}
