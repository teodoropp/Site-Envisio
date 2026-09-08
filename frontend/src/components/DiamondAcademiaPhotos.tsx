/** @format */

import React from "react";
import { motion } from "framer-motion";

interface DiamondAcademiaPhotosProps {
  className?: string;
  images?: string[];
}

export default function DiamondAcademiaPhotos({
  className = "",
  images = [
    "/images/espaco/foto-01.jpg",
    "/images/espaco/foto-02.jpg",
    "/images/espaco/foto-03.jpg",
    "/images/espaco/foto-04.jpg",
  ],
}: DiamondAcademiaPhotosProps) {
  const [topImg, leftImg, rightImg, bottomImg] = images;

  return (
    <div
      className={`relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] flex items-center justify-center mx-auto select-none ${className}`}>
      {/* Glow suave ao fundo */}
      <div className="absolute inset-0 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Losango Superior */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] md:w-[190px] md:h-[190px] rotate-45 rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border-[3px] sm:border-4 border-white shadow-xl bg-slate-100 z-10">
        <img
          src={topImg}
          alt="Academia Envisio - Instalações"
          className="w-full h-full object-cover -rotate-45 scale-[1.48] transition-transform duration-500 hover:scale-[1.6]"
          loading="lazy"
        />
      </motion.div>

      {/* Losango Esquerdo */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-1/2 left-0 sm:left-2 -translate-y-1/2 w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] md:w-[190px] md:h-[190px] rotate-45 rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border-[3px] sm:border-4 border-white shadow-xl bg-slate-100 z-10">
        <img
          src={leftImg}
          alt="Academia Envisio - Sala de Formação"
          className="w-full h-full object-cover -rotate-45 scale-[1.48] transition-transform duration-500 hover:scale-[1.6]"
          loading="lazy"
        />
      </motion.div>

      {/* Losango Direito */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-1/2 right-0 sm:right-2 -translate-y-1/2 w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] md:w-[190px] md:h-[190px] rotate-45 rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border-[3px] sm:border-4 border-white shadow-xl bg-slate-100 z-10">
        <img
          src={rightImg}
          alt="Academia Envisio - Formandos e Prática"
          className="w-full h-full object-cover -rotate-45 scale-[1.48] transition-transform duration-500 hover:scale-[1.6]"
          loading="lazy"
        />
      </motion.div>

      {/* Losango Inferior */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] md:w-[190px] md:h-[190px] rotate-45 rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border-[3px] sm:border-4 border-white shadow-xl bg-slate-100 z-10">
        <img
          src={bottomImg}
          alt="Academia Envisio - Sala de Aulas"
          className="w-full h-full object-cover -rotate-45 scale-[1.48] transition-transform duration-500 hover:scale-[1.6]"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
