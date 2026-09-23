/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

interface CarouselProps {
  slides: {
    srcMobile: string;
    link: string;
    label: string;
  }[];
}

export const MobileCarousel = ({ slides }: CarouselProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] w-full flex items-center justify-center overflow-hidden md:hidden z-10">
      {/* Botão Anterior */}
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }}
        onTouchEnd={() => setIsPaused(false)}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Anterior">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white w-4 h-4 sm:w-5 sm:h-5">
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
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full overflow-hidden">
          <img
            src={slides[carouselIndex].srcMobile}
            alt={slides[carouselIndex].label || "Envisio"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

          {/* Conteúdo e botão reposicionado com animação */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate(slides[carouselIndex].link)}
              className="bg-red-600 text-white py-2 px-5 rounded-[5px] text-xs font-semibold shadow-lg hover:bg-red-700 active:bg-red-800 transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>Saiba mais</span>
              <span>→</span>
            </motion.button>

            {/* Indicadores de slides móveis */}
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPaused(true);
                    setCarouselIndex(idx);
                  }}
                  aria-label={`Slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                    carouselIndex === idx
                      ? "w-5 bg-red-500"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Botão Próximo */}
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) => (prev + 1) % slides.length);
        }}
        onTouchEnd={() => setIsPaused(false)}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Próximo">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white w-4 h-4 sm:w-5 sm:h-5">
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
