import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-light dark:bg-primary-dark pt-16 pb-8 border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <img src="/logo/logo.png" alt="Nexora Logo" className="w-6 h-6 object-contain" /> Nexora Studio
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              We design and build digital products that help fast-growing companies scale.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/milan-pandavdara/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-blue hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/walterhydra" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-blue hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><a href="#work" className="hover:text-black dark:hover:text-white transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-black dark:hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
          <p>&copy; {currentYear} Nexora Studio. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            Made with <span className="text-red-500">&hearts;</span> by Nexora Team
          </div>
        </div>
      </div>
    </footer>
  );
}
