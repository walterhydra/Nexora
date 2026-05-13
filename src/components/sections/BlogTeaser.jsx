import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "Why Next.js is winning the framework war in 2024",
    category: "Engineering",
    date: "Oct 12, 2023",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The death of generic web design: Rise of the creative developer",
    category: "Design",
    date: "Oct 05, 2023",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "How we optimized a client's site score from 40 to 100",
    category: "Case Study",
    date: "Sep 28, 2023",
    readTime: "4 min read"
  }
];

export default function BlogTeaser() {
  return (
    <section className="py-24 bg-primary-light dark:bg-primary-dark border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
              Thoughts & <span className="text-gradient">Insights</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400">
              We write about engineering, design, and building products.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <MagneticButton className="border border-gray-200 dark:border-white/10 bg-transparent text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
              Read the Blog <ArrowRight size={16} className="ml-2" />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.a
              href="#"
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group block p-6 rounded-2xl glass border border-gray-200 dark:border-white/10 hover:border-accent-blue/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="font-mono text-accent-blue">{post.category}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
                <span>&bull;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-accent-blue transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
