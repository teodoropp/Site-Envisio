/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CarouselProps {
  slides: {
    src: string;
    link: string;
    label: string;
  }[];
}

export const DesktopCarousel = ({ slides }: CarouselProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section className="relative px-4 md:px-6 lg:px-10 min-h-[40vh] md:min-h-[50vh] lg:min-h-[65vh] w-full flex items-center justify-center overflow-hidden hidden md:flex">
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute left-2 md:left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 group"
        aria-label="Anterior">
        <svg
          width="20"
          height="20"
          className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={carouselIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src={slides[carouselIndex].src}
            alt={slides[carouselIndex].label || "Envisio"}
            className="w-full h-full object-cover object-center animate-ken-burns"
            style={{
              maxHeight: "100vh",
              height: "100%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Botão de Ação com Micro-interações */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-20">
            <Link to={slides[carouselIndex].link}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group px-6 py-3 lg:px-8 lg:py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-[5px] text-sm lg:text-base font-semibold shadow-xl shadow-red-950/20 transition-all flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}>
                <span>Saiba mais</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de slides animados */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPaused(true);
              setCarouselIndex(idx);
            }}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={`Slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
              carouselIndex === idx
                ? "w-8 bg-red-600 shadow-sm"
                : "w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) => (prev + 1) % slides.length);
        }}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute right-2 md:right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 group"
        aria-label="Próximo">
        <svg
          width="20"
          height="20"
          className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};
