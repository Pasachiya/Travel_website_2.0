"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Menu,
  X,
  Phone,
  Play
} from 'lucide-react';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'discover', name: 'Discover' },
  { id: 'destinations', name: 'Destinations' },
  { id: 'experiences', name: 'Experiences' },
  { id: 'journey', name: 'Journey' }
];

const destinations = [
  {
    name: "Ella",
    location: "Hill Country",
    image: "/Travel_website_2.0/images/ella.jpg",
    description: "Misty mountains and tea gardens"
  },
  {
    name: "Sigiriya",
    location: "Cultural Triangle",
    image: "/Travel_website_2.0/images/sigiriya.jpeg",
    description: "Ancient rock fortress"
  },
  {
    name: "Galle",
    location: "Southern Coast",
    image: "/Travel_website_2.0/images/galle.jpg",
    description: "Colonial fort by the sea"
  }
];

const stats = [
  { number: "2M+", label: "Travelers", icon: "🌟" },
  { number: "8", label: "UNESCO Sites", icon: "🏛️" },
  { number: "1000+", label: "Bird Species", icon: "🦅" },
  { number: "365", label: "Days of Paradise", icon: "🌺" }
];

const experiences = [
  { icon: "🐘", title: "Wildlife Safari", desc: "Encounter elephants in their natural habitat" },
  { icon: "🏛️", title: "Ancient Temples", desc: "Walk through 2000 years of history" },
  { icon: "🏖️", title: "Pristine Beaches", desc: "Endless coastlines of golden sand" },
  { icon: "🍃", title: "Tea Plantations", desc: "Journey through emerald hills" }
];

const getSectionTransform = (scrollProgress: number, sectionIndex: number, totalSections: number, direction = 'right') => {
  const sectionProgress = scrollProgress * (totalSections - 1);
  const relativeProgress = sectionProgress - sectionIndex;

  if (relativeProgress < -1 || relativeProgress > 1) {
    return { transform: 'translateX(100%)', opacity: 0 };
  }

  let translateX = '0%', translateY = '0%', opacity = 1, scale = 1;
  const progress = Math.abs(relativeProgress);

  if (relativeProgress < 0) {
    if (direction === 'left') translateX = `${progress * 100}%`;
    else if (direction === 'up') translateY = `${-progress * 100}%`;
    else if (direction === 'down') translateY = `${progress * 100}%`;
    else translateX = `${-progress * 100}%`;
  } else if (relativeProgress > 0) {
    if (direction === 'left') translateX = `${-progress * 100}%`;
    else if (direction === 'up') translateY = `${progress * 100}%`;
    else if (direction === 'down') translateY = `${-progress * 100}%`;
    else translateX = `${progress * 100}%`;
  }

  opacity = 1 - progress * 0.5;
  scale = 1 - progress * 0.1;

  return {
    transform: `translate3d(${translateX}, ${translateY}, 0) scale(${scale})`,
    opacity,
    willChange: 'transform, opacity'
  };
};

const SriLankaTravelLanding = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
      const sectionProgress = progress * (sections.length - 1);
      setCurrentSection(Math.floor(sectionProgress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const targetScroll = (index / (sections.length - 1)) * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-white text-black">
      {/* Spacer div to create scrollable height */}
      <div style={{ height: `${sections.length * 100}vh` }} className="absolute inset-0 pointer-events-none" />
      
      <header className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-white">Ceylon</div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-white font-medium transition-all duration-300 text-sm lg:text-base ${
                  currentSection === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md text-white md:hidden">
            <div className="px-4 py-2 space-y-1">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className="block w-full text-left py-3 px-2 text-lg hover:bg-white/10 rounded transition-colors"
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="fixed inset-0">
        {/* Hero Section */}
        <section
          className="absolute inset-0 flex items-center justify-center"
          style={{ ...getSectionTransform(scrollProgress, 0, sections.length, 'right'), zIndex: 5 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/Travel_website_2.0/images/hero-tea-plantation.jpg"
              alt="Sri Lanka Tea Plantation"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Discover</span>
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Ceylon
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Where ancient stories meet endless horizons
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
              <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-base sm:text-lg">
                Begin Journey <ChevronRight className="inline ml-2" size={18} />
              </button>
              <button className="px-8 sm:px-10 py-4 sm:py-5 backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-base sm:text-lg">
                <Play className="inline mr-2" size={18} /> Watch Story
              </button>
            </div>
          </div>
        </section>

        {/* Discover Section */}
        <section
          className="absolute inset-0 flex items-center justify-center"
          style={{ ...getSectionTransform(scrollProgress, 1, sections.length, 'right'), zIndex: 4 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/Travel_website_2.0/images/ella.jpg"
              alt="Discover Sri Lanka"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Discover</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Sri Lanka
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              A land of rich culture and breathtaking landscapes
            </p>
          </div>
        </section>

        {/* Destinations Section */}
        <section
          className="absolute inset-0 flex items-center justify-center"
          style={{ ...getSectionTransform(scrollProgress, 2, sections.length, 'right'), zIndex: 3 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/Travel_website_2.0/images/sigiriya.jpeg"
              alt="Destinations in Sri Lanka"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Top</span>
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {destinations.map((destination, index) => (
                <div key={index} className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-md">
                  <div className="relative w-full aspect-[4/3] mb-3 sm:mb-4">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{destination.name}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{destination.location}</p>
                  <p className="text-white/60 text-sm sm:text-base">{destination.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section
          className="absolute inset-0 flex items-center justify-center"
          style={{ ...getSectionTransform(scrollProgress, 3, sections.length, 'right'), zIndex: 2 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/Travel_website_2.0/images/experiences-elephant.jpg"
              alt="Experiences in Sri Lanka"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Unique</span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {experiences.map((experience, index) => (
                <div key={index} className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-md">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{experience.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{experience.title}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{experience.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section
          className="absolute inset-0 flex items-center justify-center"
          style={{ ...getSectionTransform(scrollProgress, 4, sections.length, 'right'), zIndex: 1 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/Travel_website_2.0/images/journey-train.jpg"
              alt="Journey through Sri Lanka"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Your</span>
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Embark on an unforgettable adventure
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SriLankaTravelLanding;