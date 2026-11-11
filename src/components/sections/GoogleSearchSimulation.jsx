import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

// Official Google Multicolored Favicon for Tab
const GoogleFavicon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" className="shrink-0">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Official Google Vector Logo
const GoogleLogo = ({ size = 'large' }) => {
  const isSmall = size === 'small';
  return (
    <svg
      className={isSmall ? 'w-20 h-auto shrink-0' : 'w-36 sm:w-48 md:w-56 h-auto mx-auto mb-4 drop-shadow-sm'}
      viewBox="0 0 272 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* G */}
      <path
        fill="#4285F4"
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.85.36 15.81 16.32.35 35.3.35c10.42 0 17.9 4.09 23.47 9.42l-6.6 6.6c-4.01-3.77-9.45-6.69-16.87-6.69-13.62 0-24.47 11.08-24.47 24.7s10.85 24.7 24.47 24.7c8.87 0 13.9-3.56 17.15-6.81 2.64-2.64 4.38-6.42 5.06-11.75H35.29z"
      />
      {/* o */}
      <path
        fill="#EA4335"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      {/* o */}
      <path
        fill="#FBBC05"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      {/* g */}
      <path
        fill="#4285F4"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 8.16 11.18 8.16 7.31 0 11.84-4.53 11.84-13.01v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.89h9.44zm-8.75 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
      />
      {/* l */}
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      {/* e */}
      <path
        fill="#EA4335"
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
      />
    </svg>
  );
};

const GoogleMic = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 cursor-pointer">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4285F4" />
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#34A853" />
    <path d="M12 16c-1.38 0-2.5-.56-3.29-1.46l-1.42 1.42C8.36 17.06 10.08 17.7 12 17.7s3.64-.64 4.71-1.74l-1.42-1.42C14.5 15.44 13.38 16 12 16z" fill="#FBBC05" />
    <path d="M12 14c.78 0 1.48-.3 2-.8l-1.4-1.4c-.16.12-.37.2-.6.2s-.44-.08-.6-.2L10 13.2c.52.5 1.22.8 2 .8z" fill="#EA4335" />
  </svg>
);

const GoogleLens = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 cursor-pointer">
    <path d="M6 2h4v2H6a2 2 0 0 0-2 2v4H2V6a4 4 0 0 1 4-4z" fill="#EA4335" />
    <path d="M18 2h-4v2h4a2 2 0 0 1 2 2v4h2V6a4 4 0 0 0-4-4z" fill="#4285F4" />
    <path d="M22 18v-4h-2v4a2 2 0 0 1-2 2h-4v2h4a4 4 0 0 0 4-4z" fill="#34A853" />
    <path d="M2 18v-4h2v4a2 2 0 0 0 2 2h4v2H6a4 4 0 0 1-4-4z" fill="#FBBC05" />
    <circle cx="12" cy="12" r="3.5" fill="#4285F4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#34A853" />
  </svg>
);

const GoogleAppsGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368" className="cursor-pointer hover:fill-black">
    <circle cx="5" cy="5" r="2" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="12" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

// Third-party website icons for search results
const LinkedInIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shrink-0 shadow-sm">
    <span className="font-bold text-[9px] font-sans">in</span>
  </div>
);

const InstagramIcon = () => (
  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 shadow-sm">
    <div className="w-2.5 h-2.5 rounded-sm border-[1.2px] border-white flex items-center justify-center">
      <div className="w-1 h-1 rounded-full border-[1px] border-white" />
    </div>
  </div>
);

const GitHubIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#24292e] flex items-center justify-center text-white shrink-0 shadow-sm">
    <span className="font-bold text-[9px] font-mono">gh</span>
  </div>
);

// Real Windows Laptop Cursor Component (Pixel-perfect Windows 10/11 OS Cursor)
const RealLaptopCursor = ({ isPointer = false }) => {
  if (isPointer) {
    // Official Windows Pointer Hand Cursor with accurate index finger hotspot
    return (
      <svg
        width="19"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] filter -translate-x-[8px] -translate-y-[2px]"
      >
        <path
          d="M6.5 2.5a2 2 0 0 1 3.5 1.4v7.1h1a1.5 1.5 0 0 1 1.5 1.5v.5h1a1.5 1.5 0 0 1 1.5 1.5v.5h1a1.5 1.5 0 0 1 1.5 1.5v3.6a5.5 5.5 0 0 1-5.5 5.5H10c-2.3 0-4.4-1.3-5.4-3.3l-2.1-4.2a2 2 0 0 1 .8-2.7l1.7-.9a2 2 0 0 1 2.7.8l.3.6V3.9a2 2 0 0 1 .5-1.4z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Official Windows Arrow Cursor
  return (
    <svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] filter"
    >
      <path
        d="M0.75 0.75V18.25L4.85 14.15L8.25 21.75L11.45 20.35L8.05 12.75L13.85 12.75L0.75 0.75Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.25"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />
    </svg>
  );
};

export default function GoogleSearchSimulation({ onComplete }) {
  const [viewState, setViewState] = useState('homepage'); // 'homepage' | 'results'
  const [cursorPos, setCursorPos] = useState({ x: 74, y: 78 });
  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const viewportRef = React.useRef(null);
  const searchInputRef = React.useRef(null);
  const titleLinkRef = React.useRef(null);

  useEffect(() => {
    const timers = [];

    // 1. Move cursor smoothly inside the Google Search bar (at ~250ms) - Direct coordinates without layout thrashing
    timers.push(
      setTimeout(() => {
        setCursorPos({ x: 34, y: 50.5 });
      }, 250)
    );

    // 2. Click effect inside the search bar (at ~620ms)
    timers.push(
      setTimeout(() => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 120);
      }, 620)
    );

    // 3. Start typing "nexoraa studio" (at ~750ms)
    const fullText = 'nexoraa studio';
    timers.push(
      setTimeout(() => {
        let charIdx = 0;
        const typeInterval = setInterval(() => {
          charIdx++;
          setSearchQuery(fullText.slice(0, charIdx));
          if (charIdx >= fullText.length) {
            clearInterval(typeInterval);

            // 4. Hit enter / trigger search -> Show Google Search Results Page (after 180ms)
            timers.push(
              setTimeout(() => {
                setViewState('results');

                // Move cursor directly over "Nexoraa Studio" title link without layout reflow
                timers.push(
                  setTimeout(() => {
                    setCursorPos({ x: 14, y: 39 });
                    setIsHoveringLink(true);

                    // 5. Click the link (subtle mouse press, no artificial touch ring)
                    timers.push(
                      setTimeout(() => {
                        setIsClicked(true);

                        // 6. Browser loading progress
                        timers.push(
                          setTimeout(() => {
                            setIsLoadingPage(true);

                            // 7. Navigate to video showcase
                            timers.push(
                              setTimeout(() => {
                                onComplete();
                              }, 350)
                            );
                          }, 200)
                        );
                      }, 480)
                    );
                  }, 250)
                );
              }, 180)
            );
          }
        }, 36); // Crisp, rapid typing
      }, 750)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full flex flex-col bg-[#ffffff] select-none overflow-hidden font-sans"
    >
      {/* 1. Chrome Window Top Tab Header (Light Theme) */}
      <div className="h-7 sm:h-8 bg-[#dfe1e5] flex items-center justify-between px-2.5 border-b border-[#dadce0] shrink-0">
        <div className="flex items-center gap-1.5 bg-[#ffffff] px-3 py-1 rounded-t-md text-[10px] sm:text-[11px] text-[#3c4043] border-t border-x border-[#dadce0] max-w-[180px] truncate shadow-sm">
          {/* Original Google 4-Color Favicon */}
          <GoogleFavicon />
          <span className="truncate font-medium">
            {isLoadingPage
              ? 'Nexoraa Studio — Launching...'
              : viewState === 'results'
              ? 'nexoraa studio - Google Search'
              : 'Google'}
          </span>
          <span className="ml-auto text-[#5f6368] hover:text-black text-[10px] pl-1 cursor-pointer">
            &times;
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-2.5 text-[#5f6368] text-xs pr-1">
          <span className="hover:text-black cursor-pointer leading-none">&minus;</span>
          <span className="hover:text-black cursor-pointer text-[9px] leading-none">&#9633;</span>
          <span className="hover:text-red-500 cursor-pointer text-xs leading-none">&times;</span>
        </div>
      </div>

      {/* 2. Chrome URL Bar / Omnibox */}
      <div className="h-7 sm:h-8 bg-[#ffffff] flex items-center gap-2 px-2.5 border-b border-[#dadce0] shrink-0">
        <div className="flex items-center gap-2 text-[#5f6368] text-[11px]">
          <span className="hover:text-black cursor-pointer leading-none">&larr;</span>
          <span className="hover:text-black cursor-pointer leading-none">&rarr;</span>
          <span
            className={`hover:text-black cursor-pointer leading-none ${
              isLoadingPage ? 'animate-spin text-[#4285F4]' : ''
            }`}
          >
            &#8635;
          </span>
        </div>

        <div className="flex-1 h-5 sm:h-6 bg-[#f1f3f4] rounded-full flex items-center px-2.5 text-[9px] sm:text-[10px] text-[#202124] gap-1.5 border border-transparent hover:border-[#dadce0] hover:bg-[#e8eaed] transition-colors">
          <span className="text-[#5f6368] text-[9px]">&#128274;</span>
          <span className="truncate font-sans">
            {isLoadingPage
              ? 'https://nexoraa.works'
              : viewState === 'results'
              ? 'https://www.google.com/search?q=nexoraa+studio'
              : 'https://www.google.com'}
          </span>
        </div>

        <button
          onClick={onComplete}
          className="text-[9px] font-mono uppercase tracking-wider text-[#1a73e8] hover:text-[#174ea6] hover:underline cursor-pointer shrink-0 font-medium"
        >
          Skip &rarr;
        </button>
      </div>

      {/* 3. Page Loading Progress Bar */}
      {isLoadingPage && (
        <m.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="h-[2px] bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#EA4335] absolute top-[56px] left-0 right-0 z-40"
        />
      )}

      {/* 4. Google Main Viewport */}
      <div ref={viewportRef} className="flex-1 relative overflow-hidden bg-white text-[#202124]">
        <AnimatePresence mode="wait">
          {/* VIEW 1: GOOGLE HOMEPAGE */}
          {viewState === 'homepage' && (
            <m.div
              key="google-homepage"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-3"
            >
              {/* Top Right Navigation: Gmail, Images, App Grid, Exact User Avatar (Image 2) */}
              <div className="absolute top-2.5 right-4 flex items-center gap-3.5 text-[11px] text-[#3c4043] font-sans">
                <span className="hover:underline cursor-pointer">Gmail</span>
                <span className="hover:underline cursor-pointer">Images</span>
                <GoogleAppsGrid />
                {/* Official Nexora Avatar from Image */}
                <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm border border-black/15 cursor-pointer bg-black flex items-center justify-center ring-1 ring-black/5">
                  <img
                    src="/images/nexora-avatar.png"
                    alt="Nexora Account"
                    className="w-full h-full object-cover scale-[1.35] transform"
                  />
                </div>
              </div>

              {/* Center Google Vector Logo */}
              <div className="w-full flex justify-center select-none mb-3 sm:mb-4">
                <GoogleLogo size="large" />
              </div>

              {/* Center Google Search Bar (Image 1 style) */}
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto relative z-20 px-3">
                <div
                  ref={searchInputRef}
                  className={`w-full h-10 sm:h-11 bg-white rounded-full px-4 flex items-center gap-3 border transition-all duration-200 ${
                    searchQuery
                      ? 'border-[#dfe1e5] shadow-md ring-1 ring-black/5'
                      : 'border-[#dfe1e5] hover:shadow-md'
                  }`}
                >
                  <Search size={15} className="text-[#9aa0a6] shrink-0" />
                  <div className="flex-1 text-xs sm:text-sm text-left text-[#202124] font-sans flex items-center min-h-[20px] overflow-hidden">
                    <span className="font-normal">{searchQuery}</span>
                    {/* Blinking Caret */}
                    <span className="w-[1.5px] h-4 bg-[#4285F4] ml-0.5 animate-pulse" />
                  </div>
                  <GoogleMic />
                  <GoogleLens />
                </div>
              </div>

              {/* Buttons Below Search Bar */}
              <div className="flex items-center justify-center gap-2.5 mt-4 relative z-10">
                <button
                  onClick={() => setViewState('results')}
                  className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-[#3c4043] text-[10px] sm:text-[11px] px-3.5 py-1.5 rounded-md font-sans transition-all cursor-pointer"
                >
                  Google Search
                </button>
                <button
                  onClick={onComplete}
                  className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-[#3c4043] text-[10px] sm:text-[11px] px-3.5 py-1.5 rounded-md font-sans transition-all cursor-pointer"
                >
                  I'm Feeling Lucky
                </button>
              </div>

              {/* Promo Notice line */}
              <div className="text-[9px] sm:text-[10px] text-center mt-5 text-[#3c4043] font-sans px-4">
                <span className="text-[#d93025] font-semibold mr-1">Watch</span>
                <span className="text-[#1a0dab] hover:underline cursor-pointer">
                  Google I/O to learn about the latest innovations, news, and AI updates
                </span>
              </div>
            </m.div>
          )}

          {/* VIEW 2: GOOGLE SEARCH RESULTS PAGE (Exact match to Image 3 + Other Websites) */}
          {viewState === 'results' && (
            <m.div
              key="google-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col bg-white overflow-y-auto overflow-x-hidden text-left"
            >
              {/* Google Search Results Top Bar */}
              <div className="px-3 sm:px-6 pt-2.5 pb-2 border-b border-[#ebebeb] flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-3">
                  <GoogleLogo size="small" />
                  {/* Search input with current query */}
                  <div className="flex-1 max-w-xl h-7 sm:h-8 bg-white rounded-full border border-[#dfe1e5] shadow-sm flex items-center px-3 gap-2">
                    <span className="text-xs sm:text-sm text-[#202124] font-medium flex-1 truncate">
                      nexoraa studio
                    </span>
                    <GoogleMic />
                    <GoogleLens />
                    <Search size={14} className="text-[#1a73e8] shrink-0" />
                  </div>
                  {/* Avatar on right */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shadow-sm border border-black/15 shrink-0 ml-auto bg-black flex items-center justify-center ring-1 ring-black/5">
                    <img
                      src="/images/nexora-avatar.png"
                      alt="Nexora Account"
                      className="w-full h-full object-cover scale-[1.35] transform"
                    />
                  </div>
                </div>

                {/* Search category tabs */}
                <div className="flex items-center gap-4 text-[10px] sm:text-[11px] text-[#5f6368] font-sans pt-1">
                  <span className="text-[#1a73e8] font-medium pb-1 border-b-2 border-[#1a73e8] cursor-pointer">
                    All
                  </span>
                  <span className="hover:text-black cursor-pointer">Images</span>
                  <span className="hover:text-black cursor-pointer">Videos</span>
                  <span className="hover:text-black cursor-pointer">News</span>
                  <span className="hover:text-black cursor-pointer">Maps</span>
                  <span className="hover:text-black cursor-pointer">More</span>
                </div>
              </div>

              {/* Search Results Body */}
              <div className="flex-1 p-3 sm:p-5 md:px-8 space-y-4 max-w-3xl">
                {/* Result stats */}
                <div className="text-[9px] sm:text-[10px] text-[#70757a]">
                  About 42,300 results (0.24 seconds)
                </div>

                {/* 1. HERO SEARCH RESULT: NEXORAA STUDIO (EXACT REPLICA OF IMAGE 3) */}
                <div
                  onClick={onComplete}
                  className="group cursor-pointer p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50/80 transition-colors"
                >
                  {/* Favicon & Breadcrumb */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden shadow-sm border border-black/15 shrink-0 bg-black flex items-center justify-center">
                      <img
                        src="/images/nexora-avatar.png"
                        alt="nexoraa.works"
                        className="w-full h-full object-cover scale-[1.35] transform"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-xs text-[#202124] font-medium leading-none">
                        nexoraa.works
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-[#4d5156] leading-none mt-0.5 font-mono">
                        https://nexoraa.works
                      </span>
                    </div>
                    <span className="text-[#70757a] text-xs ml-1 select-none font-bold">&#8942;</span>
                  </div>

                  {/* Title Link */}
                  <div
                    ref={titleLinkRef}
                    className={`text-sm sm:text-base font-medium text-[#1a0dab] group-hover:underline transition-all ${
                      isHoveringLink ? 'underline text-[#174ea6]' : ''
                    }`}
                  >
                    Nexoraa Studio | 7-Day Web &amp; App Development
                  </div>

                  {/* Snippet Description (From Image 3) */}
                  <p className="text-[10px] sm:text-[11px] text-[#4d5156] mt-1 leading-relaxed">
                    We build world-class websites, apps, automations, and digital products in 7 days. High-converting design meets top-tier engineering.
                  </p>

                  {/* Sitelinks */}
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100 text-[10px]">
                    <div>
                      <div className="text-[#1a0dab] font-medium hover:underline">Services</div>
                      <div className="text-[9px] text-[#70757a] truncate">Web, Mobile Apps &amp; Autonomous AI</div>
                    </div>
                    <div>
                      <div className="text-[#1a0dab] font-medium hover:underline">Portfolio</div>
                      <div className="text-[9px] text-[#70757a] truncate">View our featured production work</div>
                    </div>
                  </div>
                </div>

                {/* 2. OTHER WEBSITES (User Request: "baki website bhi dikhni chahiye") */}
                
                {/* Result 2: LinkedIn */}
                <div
                  onClick={onComplete}
                  className="group cursor-pointer p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <LinkedInIcon />
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] text-[#202124] font-medium leading-none">
                        LinkedIn
                      </span>
                      <span className="text-[9px] text-[#4d5156] leading-none mt-0.5 font-mono">
                        https://www.linkedin.com &rsaquo; company &rsaquo; nexoraa-studio
                      </span>
                    </div>
                    <span className="text-[#70757a] text-xs ml-1 select-none font-bold">&#8942;</span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-[#1a0dab] group-hover:underline">
                    Nexoraa Studio - Next-Gen Tech &amp; Software Agency | LinkedIn
                  </div>

                  <p className="text-[9px] sm:text-[10px] text-[#4d5156] mt-0.5 leading-relaxed">
                    Nexoraa Studio is a digital product agency specializing in high-performance web applications, AI integration, and enterprise software.
                  </p>
                </div>

                {/* Result 3: Instagram */}
                <div
                  onClick={onComplete}
                  className="group cursor-pointer p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <InstagramIcon />
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] text-[#202124] font-medium leading-none">
                        Instagram
                      </span>
                      <span className="text-[9px] text-[#4d5156] leading-none mt-0.5 font-mono">
                        https://www.instagram.com &rsaquo; nexoraa.works
                      </span>
                    </div>
                    <span className="text-[#70757a] text-xs ml-1 select-none font-bold">&#8942;</span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-[#1a0dab] group-hover:underline">
                    Nexoraa Studio (@nexoraa.works) &bull; Instagram photos and videos
                  </div>

                  <p className="text-[9px] sm:text-[10px] text-[#4d5156] mt-0.5 leading-relaxed">
                    Official page of Nexoraa Studio. Building the next generation of web &amp; AI solutions for founders and high-growth brands.
                  </p>
                </div>

                {/* Result 4: GitHub */}
                <div
                  onClick={onComplete}
                  className="group cursor-pointer p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <GitHubIcon />
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] text-[#202124] font-medium leading-none">
                        GitHub
                      </span>
                      <span className="text-[9px] text-[#4d5156] leading-none mt-0.5 font-mono">
                        https://github.com &rsaquo; nexoraa
                      </span>
                    </div>
                    <span className="text-[#70757a] text-xs ml-1 select-none font-bold">&#8942;</span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-[#1a0dab] group-hover:underline">
                    Nexoraa &bull; GitHub
                  </div>

                  <p className="text-[9px] sm:text-[10px] text-[#4d5156] mt-0.5 leading-relaxed">
                    Open-source repositories, developer tools, and architecture templates built by the Nexoraa Studio engineering team.
                  </p>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Real Laptop Animated Mouse Pointer */}
        <m.div
          className="absolute z-50 pointer-events-none"
          animate={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
          }}
          transition={{
            duration: 0.42,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <m.div
            animate={{
              scale: isClicked ? 0.88 : 1,
              y: isClicked ? 1.5 : 0,
            }}
            transition={{ duration: 0.08 }}
            className="relative"
          >
            <RealLaptopCursor isPointer={isHoveringLink} />
          </m.div>
        </m.div>
      </div>
    </m.div>
  );
}
