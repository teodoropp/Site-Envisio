import React from "react";
import { motion } from "framer-motion";

interface DiamondGridImage {
  src: string;
  alt: string;
  delay?: number;
}

interface DiamondGridProps {
  className?: string;
  isMobile?: boolean;
  images?: DiamondGridImage[];
}

export const DiamondGrid: React.FC<DiamondGridProps> = ({ 
  className = "", 
  isMobile = false,
  images
}) => {
  // Define sizes depending on desktop or mobile
  const containerSize = isMobile
    ? "w-[220px] h-[220px]"
    : "w-[290px] h-[290px] md:w-[340px] md:h-[340px]";
  const gridGap = isMobile ? "gap-2" : "gap-3 md:gap-4";
  
  // Default Image paths
  const defaultImages = [
    {
      src: "/images/imagem quem somos/História.webp",
      alt: "ENVISIO História",
      delay: 0.1,
    },
    {
      src: "/images/imagem soft/Consultoria.webp",
      alt: "Consultoria Especializada",
      delay: 0.2,
    },
    {
      src: "/images/imagem soft/Desenvol.webp",
      alt: "Desenvolvimento de Software",
      delay: 0.3,
    },
    {
      src: "/images/banner_quem.webp",
      alt: "Equipa ENVISIO",
      delay: 0.4,
    },
  ];

  const displayImages = images || defaultImages;

  return (
    <div className={`relative flex items-center justify-center py-8 ${className}`}>
      {/* Decorative blurred background shapes to create a premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-100 rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/5 rounded-full blur-2xl -z-10" />

      {/* Outer grid rotated by 45 degrees */}
      <div className={`grid grid-cols-2 ${gridGap} transform rotate-45 ${containerSize}`}>
        {displayImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: img.delay ?? (0.1 * (index + 1)),
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-[10px] md:rounded-[14px] bg-white border-2 border-white shadow-lg aspect-square group cursor-pointer"
          >
            {/* Inner content wrapper rotated back by -45 degrees to keep the image upright */}
            <div className="w-full h-full transform -rotate-45 scale-[1.45] transition-transform duration-500 group-hover:scale-[1.55] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
              {/* Overlay with a subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiamondGrid;
