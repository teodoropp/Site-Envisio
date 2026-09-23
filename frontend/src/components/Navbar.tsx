/** @format */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicosDropdownOpen, setServicosDropdownOpen] = useState(false);
  const [servicosDropdownTimeout, setServicosDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [apoioDropdownTimeout, setApoioDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isServicosActive = () => location.pathname.startsWith("/servicos");
  const isApoioActive = () =>
    location.pathname.startsWith("/contato") ||
    location.pathname.startsWith("/suporte");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[54px] select-none transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm text-[#262626]"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-200/60"
      }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Lado Esquerdo: Apenas o Logótipo Envisio */}
        <Link
          to="/"
          className="flex items-center py-1.5 focus:outline-none group">
          <img
            src="/images/Logos/logo.svg"
            alt="Envisio"
            className="h-10 w-auto object-contain transition-all duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Lado Direito: Todos os Links do Menu Alinhados à Direita (Estilo Academia) */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 h-full">
          {/* Link 1: Home */}
          <Link
            to="/"
            className="h-full flex items-center px-3 text-[13px] font-normal transition-colors group">
            <span
              className={`py-0.5 border-b-2 transition-all ${
                location.pathname === "/"
                  ? "border-red-600 font-semibold text-red-600"
                  : "border-transparent text-[#262626] group-hover:border-red-600 group-hover:text-red-600"
              }`}>
              Início
            </span>
          </Link>

          {/* Link 2: Quem Somos */}
          <Link
            to="/quem-somos"
            className="h-full flex items-center px-3 text-[13px] font-normal transition-colors group">
            <span
              className={`py-0.5 border-b-2 transition-all ${
                location.pathname === "/quem-somos"
                  ? "border-red-600 font-semibold text-red-600"
                  : "border-transparent text-[#262626] group-hover:border-red-600 group-hover:text-red-600"
              }`}>
              Quem Somos
            </span>
          </Link>

          {/* Link 3: Serviços Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => {
              if (servicosDropdownTimeout)
                clearTimeout(servicosDropdownTimeout);
              setServicosDropdownOpen(true);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(
                () => setServicosDropdownOpen(false),
                200,
              );
              setServicosDropdownTimeout(timeout);
            }}>
            <button
              className={`h-full px-3 text-[13px] font-normal flex items-center transition-colors group focus:outline-none ${
                isServicosActive() || servicosDropdownOpen
                  ? "text-red-600 font-semibold"
                  : "text-[#262626] hover:text-red-600"
              }`}>
              <span
                className={`py-0.5 border-b-2 transition-all flex items-center gap-1 ${
                  isServicosActive() || servicosDropdownOpen
                    ? "border-red-600"
                    : "border-transparent group-hover:border-red-600"
                }`}>
                Serviços
                <ChevronDown size={14} className="mt-0.5" />
              </span>
            </button>

            {/* Dropdown de Serviços */}
            {servicosDropdownOpen && (
              <div
                className="absolute right-0 top-[53px] min-w-[210px] bg-white border-b border-l border-r border-t-0 border-[#e6e6e6] shadow-xl rounded-b-md py-2 z-40 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => {
                  if (servicosDropdownTimeout)
                    clearTimeout(servicosDropdownTimeout);
                  setServicosDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(
                    () => setServicosDropdownOpen(false),
                    200,
                  );
                  setServicosDropdownTimeout(timeout);
                }}>
                <Link
                  to="/servicos/hardware"
                  className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setServicosDropdownOpen(false)}>
                  Hardware
                </Link>
                <div className="h-[1px] bg-gray-100 my-1" />
                <Link
                  to="/servicos/software"
                  className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setServicosDropdownOpen(false)}>
                  Software
                </Link>
                <div className="h-[1px] bg-gray-100 my-1" />
                <Link
                  to="/servicos/renting"
                  className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setServicosDropdownOpen(false)}>
                  Aluguel de Produtos (Renting)
                </Link>
              </div>
            )}
          </div>

          {/* Link 4: Apoio / Contactos Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => {
              if (apoioDropdownTimeout) clearTimeout(apoioDropdownTimeout);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => setDropdownOpen(false), 200);
              setApoioDropdownTimeout(timeout);
            }}>
            <button
              className={`h-full px-3 text-[13px] font-normal flex items-center transition-colors group focus:outline-none ${
                isApoioActive() || dropdownOpen
                  ? "text-red-600 font-semibold"
                  : "text-[#262626] hover:text-red-600"
              }`}>
              <span
                className={`py-0.5 border-b-2 transition-all flex items-center gap-1 ${
                  isApoioActive() || dropdownOpen
                    ? "border-red-600"
                    : "border-transparent group-hover:border-red-600"
                }`}>
                Apoio
                <ChevronDown size={14} className="mt-0.5" />
              </span>
            </button>

            {/* Dropdown de Apoio */}
            {dropdownOpen && (
              <div
                className="absolute right-0 top-[53px] min-w-[200px] bg-white border-b border-l border-r border-t-0 border-[#e6e6e6] shadow-xl rounded-b-md py-2 z-40 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => {
                  if (apoioDropdownTimeout) clearTimeout(apoioDropdownTimeout);
                  setDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => setDropdownOpen(false), 200);
                  setApoioDropdownTimeout(timeout);
                }}>
                <Link
                  to="/contato"
                  className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setDropdownOpen(false)}>
                  Contactos
                </Link>
                <div className="h-[1px] bg-gray-100 my-1" />
                <Link
                  to="/suporte-tecnico"
                  className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setDropdownOpen(false)}>
                  Suporte Técnico
                </Link>
              </div>
            )}
          </div>

          {/* Botão Especial Academia */}
          <div className="pl-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/academia"
                className="px-6 text-xs font-semibold text-gray-900 bg-white border border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 uppercase flex items-center justify-center rounded-[4px] h-[38px] shadow-sm hover:shadow-md cursor-pointer">
                Academia
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Botão Hamburger Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-[#262626] focus:outline-none cursor-pointer"
            aria-label="Menu">
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all transform origin-left duration-300 ${
                  isOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all transform origin-left duration-300 ${
                  isOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown Overlay com Animação em Cascata */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-xl overflow-hidden">
            <div className="px-4 pt-3 pb-6 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === "/"
                      ? "bg-red-50 text-red-600 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  Início
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}>
                <Link
                  to="/quem-somos"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === "/quem-somos"
                      ? "bg-red-50 text-red-600 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  Quem Somos
                </Link>
              </motion.div>

              {/* Submenu Serviços Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-1">
                <button
                  onClick={() => setServicosDropdownOpen(!servicosDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <span>Serviços</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      servicosDropdownOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {servicosDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 border-l-2 border-red-200 ml-3 overflow-hidden">
                      <Link
                        to="/servicos/hardware"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all">
                        Hardware & Redes
                      </Link>
                      <Link
                        to="/servicos/software"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all">
                        Software & ERP
                      </Link>
                      <Link
                        to="/servicos/renting"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all">
                        Aluguel de Produtos (Renting)
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submenu Apoio Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <span>Apoio</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 border-l-2 border-red-200 ml-3 overflow-hidden">
                      <Link
                        to="/contato"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all">
                        Contactos
                      </Link>
                      <Link
                        to="/suporte-tecnico"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all">
                        Suporte Técnico
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Botão Academia Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-3">
                <Link
                  to="/academia"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center h-[42px] px-6 text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md rounded-[5px] transition-all uppercase">
                  Aceder à Academia
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
