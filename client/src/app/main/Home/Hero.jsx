import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  Award,
  Star,
  Play,
  ArrowRight,
  Globe,
  Clock,
  CheckCircle,
  Heart,
  Sparkles,
  Moon,
  Sun,
  Zap,
  Shield,
  Crown,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Islamic-themed images for the carousel
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Quran Recitation",
      subtitle: "Perfect your Tajweed with expert guidance",
      icon: BookOpen,
      accent: "from-purple-500 to-indigo-600",
    },
    {
      url: "https://thumbs.dreamstime.com/b/close-up-open-quran-intricate-calligraphy-natural-lighting-detailed-beautifully-illuminated-soft-side-captured-373291452.jpg",
      title: "Islamic Jurisprudence",
      subtitle: "Understand Fiqh and Islamic law deeply",
      icon: Shield,
      accent: "from-blue-500 to-cyan-600",
    },
    {
      url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Arabic Mastery",
      subtitle: "Speak classical Arabic fluently",
      icon: Globe,
      accent: "from-green-500 to-emerald-600",
    },
    {
      url: "https://cdn.pixabay.com/photo/2021/03/22/14/46/quran-6114872_1280.jpg",
      title: "Prophetic Studies",
      subtitle: "Learn from the Sunnah and Hadith",
      icon: Crown,
      accent: "from-amber-500 to-orange-600",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>

        {/* Floating Orbs */}
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-3xl animate-pulse"></div>

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Compass className="w-8 h-8 rotate-45 text-emerald-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen !pb-5">
        <div className="container px-6 mx-auto lg:px-8">
          {/* Hero Content Layout */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content - 7 columns */}
            <div className="space-y-4 md:space-y-8 lg:col-span-7">
              {/* Badge */}
              <div
                className={`transform transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="inline-flex items-center px-6 mt-6 text-xs border rounded-full md:mt-0 md:text-sm bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur-sm">
                  <Moon className="w-5 h-5 mr-3 text-emerald-400" />
                  <span className="font-medium text-emerald-300">
                    Trusted by 100,000+ Muslims globally
                  </span>
                  <Sparkles className="w-5 h-5 ml-3 text-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Main Heading */}
              <div
                className={`space-y-6 transform transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h1 className="text-4xl font-black leading-tight md:text-5xl">
                  <span className="mb-2 text-white ">Learn </span>
                  <span className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">
                    Islam
                  </span>
                  <span className="text-white "> Authentically</span>
                </h1>

                <p className="max-w-2xl text-sm font-light leading-relaxed md:text-xl lg:text-2xl text-slate-300">
                  Connect with world-class Islamic scholars and transform your
                  spiritual journey through
                  <span className="font-semibold text-emerald-400">
                    {" "}
                    personalized learning
                  </span>{" "}
                  experiences.
                </p>
              </div>

              {/* Feature Cards */}
              <div
                className={`grid grid-cols-2 md:grid-cols-4 gap-4 transform transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {[
                  {
                    icon: BookOpen,
                    label: "50+ Courses",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    icon: Users,
                    label: "Expert Scholars",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: Clock,
                    label: "24/7 Access",
                    color: "from-emerald-500 to-emerald-600",
                  },
                  {
                    icon: Award,
                    label: "Certificates",
                    color: "from-amber-500 to-amber-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 transition-all duration-300 border group bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:bg-white/10 hover:scale-105"
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-4 h-4 text-white md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-white md:text-lg">
                      {item.label}
                    </h3>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div
                className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button
                  onClick={() => navigate("/register-student")}
                  className="relative px-8 py-3 text-sm font-bold text-white transition-all duration-300 transform shadow-2xl !hover:text-white md:py-4 group bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:scale-105 shadow-emerald-500/25"
                >
                  <div className="flex items-center justify-center hover:text-white">
                    <span className="mr-3">Begin Your Journey</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:opacity-100 rounded-xl"></div>
                </button>
              </div>

              {/* Trust Indicators */}
              <div
                className={`flex flex-wrap items-center gap-8 pt-4 transform transition-all duration-1000 delay-800 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {[
                  { icon: Shield, text: "Authentic Sources" },
                  { icon: CheckCircle, text: "Certified Scholars" },
                  { icon: Zap, text: "Interactive Learning" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center transition-colors duration-300 text-slate-400 group hover:text-emerald-400"
                  >
                    <item.icon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Carousel - 5 columns */}
            <div className="lg:col-span-5">
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Carousel Container */}
                <div className="relative">
                  {/* Main Image Display */}
                  <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                    {carouselImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ${
                          index === currentSlide
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.title}
                          className="object-cover w-full h-full"
                        />

                        {/* Modern Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

                        {/* Content Card */}
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="p-6 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl">
                            <div className="flex items-start space-x-4">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${image.accent} rounded-xl flex items-center justify-center flex-shrink-0`}
                              >
                                <image.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="mb-2 text-xl font-bold text-white">
                                  {image.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-300">
                                  {image.subtitle}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Navigation Controls */}
                    <button
                      onClick={prevSlide}
                      className="absolute flex items-center justify-center w-12 h-12 text-white transition-all duration-300 -translate-y-1/2 border rounded-full left-6 top-1/2 bg-black/20 backdrop-blur-sm border-white/20 hover:bg-black/40 group"
                    >
                      <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute flex items-center justify-center w-12 h-12 text-white transition-all duration-300 -translate-y-1/2 border rounded-full right-6 top-1/2 bg-black/20 backdrop-blur-sm border-white/20 hover:bg-black/40 group"
                    >
                      <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex justify-center mt-6 space-x-3">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-8 bg-gradient-to-r from-emerald-500 to-teal-500"
                            : "w-2 bg-slate-600 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute w-24 h-24 rounded-full -top-6 -right-6 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 blur-xl animate-pulse"></div>
                  <div className="absolute w-32 h-32 delay-1000 rounded-full -bottom-6 -left-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action
      <div className="fixed z-50 bottom-8 right-8">
        <button className="flex items-center justify-center w-16 h-16 transition-all duration-300 transform rounded-full shadow-xl group bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:scale-110">
          <Heart className="text-white transition-transform duration-300 w-7 h-7 group-hover:scale-110" />
          <div className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -top-2 -right-2">
            <span className="text-xs font-bold text-white animate-pulse">
              !
            </span>
          </div>
        </button>
      </div> */}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
