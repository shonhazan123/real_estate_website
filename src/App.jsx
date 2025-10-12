import React, { useState, useEffect } from 'react';
import { Phone, Mail, Home, Hammer, Droplets, Trees, CheckCircle, ArrowRight, Warehouse, Wind } from 'lucide-react';
import { IMAGES } from './config/images';

export default function App() {
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mobileImageIndex, setMobileImageIndex] = useState({});
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  
  // Collect all project images for hero background
  const allProjectImages = IMAGES.projects.flatMap(project => [project.image, project.imageAlt]);
  
  // Auto-rotate hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex(prev => (prev + 1) % allProjectImages.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [allProjectImages.length]);
  
  // Auto-rotate images on mobile devices
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      const interval = setInterval(() => {
        setMobileImageIndex(prev => {
          const newIndex = {};
          IMAGES.projects.forEach(project => {
            newIndex[project.id] = prev[project.id] === 1 ? 0 : 1;
          });
          return newIndex;
        });
      }, 4000); // Change every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, []);

  const services = [
    { icon: Home, title: "Complete Remodeling", desc: "Full home renovations tailored to your vision" },
    { icon: Hammer, title: "Fix & Flip Expertise", desc: "Specialized services for real estate investors working with Hard Money Lenders" },
    { icon: Droplets, title: "Plumbing Services", desc: "Professional plumbing installation and repairs" },
    { icon: Trees, title: "Landscaping", desc: "Transform outdoor spaces with expert design" },
    { icon: Warehouse, title: "Roofing", desc: "Expert roof installation, repair, and replacement" },
    { icon: Wind, title: "HVAC", desc: "Heating, ventilation, and air conditioning services" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Image Slideshow */}
        {allProjectImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: heroImageIndex === index ? 1 : 0,
              zIndex: 0
            }}
          >
            <img
              src={image}
              alt="Project showcase"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Gradient overlay for text readability - top and bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-gray-50" style={{ zIndex: 1 }}></div>
        <nav className="relative container mx-auto px-6 py-6 flex justify-between items-center" style={{ zIndex: 2 }}>
          <div className="text-2xl font-bold text-white">
            SH ELITE ESTATE
          </div>
          <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Get Quote
          </a>
        </nav>
        
        <div className="relative container mx-auto px-6 py-20 text-center text-white" style={{ zIndex: 2 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
            Transform Properties.<br />Maximize Value.
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)' }}>
            Elite remodeling services for Real Estate investors and homeowners. From planning to final touches, we manage it all!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl">
              Start Your Project <ArrowRight size={20} />
            </a>
            <a href="#portfolio" className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl">
              View Our Work
            </a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900">
            Complete Construction Solutions
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Everything you need under one roof</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 border border-gray-200 group"
              >
                <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900">
            The Power of Transformation
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">See the dramatic difference our work makes</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-900/20">
              {/* Before Image */}
              <div className="absolute inset-0">
                <img 
                  src={IMAGES.beforeAfter.before} 
                  alt="Before renovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-900/80 text-white px-4 py-2 rounded-lg font-bold">
                  BEFORE
                </div>
              </div>
              
              {/* After Image */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - beforeAfterSlider}% 0 0)` }}
              >
                <img 
                  src={IMAGES.beforeAfter.after} 
                  alt="After renovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-600/90 text-white px-4 py-2 rounded-lg font-bold">
                  AFTER
                </div>
              </div>
              
              {/* Slider */}
              <div className="absolute inset-0 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={beforeAfterSlider}
                  onChange={(e) => setBeforeAfterSlider(e.target.value)}
                  className="w-full cursor-ew-resize opacity-0"
                />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${beforeAfterSlider}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-orange-600">
                    <div className="flex gap-1">
                      <div className="w-1 h-6 bg-blue-900"></div>
                      <div className="w-1 h-6 bg-blue-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6 text-sm">Drag the slider to see the transformation</p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900">
            Our Recent Projects
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Quality craftsmanship in every detail • Click to view on project website</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {IMAGES.projects.map((project) => {
              const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
              const showAltImage = isMobile 
                ? mobileImageIndex[project.id] === 1 
                : hoveredProject === project.id;
              
              return (
                <a 
                  key={project.id} 
                  href={project.zillowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-200 hover:shadow-2xl transition-all border border-gray-300 mb-4">
                    {/* Main Image */}
                    <img 
                      src={project.image} 
                      alt={`${project.title} - Main view`}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                        showAltImage ? 'opacity-0' : 'opacity-100'
                      }`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Alternate Image */}
                    <img 
                      src={project.imageAlt} 
                      alt={`${project.title} - Alternate view`}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                        showAltImage ? 'opacity-100' : 'opacity-0'
                      }`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 items-center justify-center">
                      <div className="text-center opacity-50 group-hover:opacity-70 transition-opacity">
                        <Home size={60} className="mx-auto mb-3 text-gray-500" />
                        <p className="text-gray-600">{project.title}</p>
                        <p className="text-sm text-gray-500 mt-2">Add your project photo here</p>
                      </div>
                    </div>
                    {/* Zillow badge overlay */}
                    <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-lg text-sm font-semibold group-hover:bg-blue-700 transition-colors z-10">
                      View Project →
                    </div>
                  </div>
                  <div className="px-2">
                    <h3 className="text-xl font-bold mb-2 text-blue-900 group-hover:text-orange-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    <p className="text-gray-600 text-sm mt-1">{project.location}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900">
            Full-Service Project Management
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "Complete project management from start to finish",
              "All permits handled and processed",
              "Detailed receipts and documentation",
              "Constant communication throughout the project",
              "Specialized in fix & flip properties",
              "Specialized in Working with Hard Money Lenders to provide fast funding"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all border border-gray-200">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-100">
        {/* Top fade effect */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Let's Build Something Amazing
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Ready to start your next project?</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white text-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-2">
                  SH Elite Estate LLC
                </h3>
                <p className="text-gray-600">Your trusted partner in property transformation</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border border-gray-200">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call or Text</p>
                    <a href="tel:9048499701" className="text-xl font-semibold text-blue-900 hover:text-orange-600 transition-colors">
                      (904) 849-9701
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border border-gray-200">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Us</p>
                    <a href="mailto:elitestate0710@gmail.com" className="text-xl font-semibold text-blue-900 hover:text-orange-600 transition-colors break-all">
                      elitestate0710@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Home size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="text-xl font-semibold text-blue-900">Shon Hazan</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a href="tel:9048499701" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                  Get Your Free Quote Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 text-gray-700 border-t border-gray-300">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 SH Elite Estate LLC. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-600">Professional remodeling and construction services</p>
        </div>
      </footer>
    </div>
  );
}