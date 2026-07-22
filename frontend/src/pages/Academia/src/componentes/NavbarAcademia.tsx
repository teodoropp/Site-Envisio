/** @format */

import React, { useState, useEffect } from "react";
import { BookOpen, Menu, X, LogIn, UserPlus, House, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Itens do menu com tamanho de ícone atualizado
const menuItems = [
  {
    nome: "Home",
    icone: <House size={20} className="mr-2" />,
    ativo: true,
    path: "/academia",
  },
  {
    nome: "Sobre",
    icone: <Users size={20} className="mr-2" />,
    ativo: true,
    path: "/academia/quem-somos",
  },
  {
    nome: "Cursos",
    icone: <BookOpen size={20} className="mr-2" />,
    ativo: true,
    path: "/academia/cursos",
  },
];

export default function NavbarAcademia() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Efeito de scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu ao mudar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [location]);

  // Páginas públicas que possuem banner e aceitam navbar transparente
  const isLandingPage =
    location.pathname === "/academia" ||
    location.pathname === "/academia/" ||
    location.pathname === "/academia/quem-somos" ||
    location.pathname.startsWith("/academia/curso") ||
    location.pathname === "/academia/cursos";

  const isTransparent = isLandingPage && !scrolled;
  const isLightHero = location.pathname === "/academia/quem-somos";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? isLightHero
            ? "bg-transparent text-gray-800 shadow-none border-transparent"
            : "bg-transparent text-white shadow-none border-transparent"
          : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 text-gray-700"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}>
          {/* Logo com efeito hover e filtro para ficar branco quando transparente (exceto em Heros claros) */}
          <Link
            to="/academia"
            className="flex-shrink-0 flex items-center group transition-transform duration-300 hover:scale-105">
            <img
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-10" : "h-12"
              } ${isTransparent && !isLightHero ? "brightness-0 invert" : ""}`}
              src="/academia/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.nome}
                to={item.ativo ? item.path : "#"}
                className={`relative px-5 py-2.5 rounded-[5px] text-base font-medium flex items-center transition-all duration-300 group ${
                  item.ativo
                    ? location.pathname === item.path
                      ? isTransparent
                        ? isLightHero
                          ? "text-gray-900 bg-gray-200/50 font-semibold"
                          : "text-white bg-white/20 font-semibold"
                        : "text-gray-900 bg-gray-100 font-semibold"
                      : isTransparent
                      ? isLightHero
                        ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100/50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                    : "text-gray-400 cursor-not-allowed"
                }`}>
                {item.icone}
                {item.nome}

                {/* Efeito de pulso para Cursos */}
                {item.nome === "Cursos" && item.ativo && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isTransparent ? (isLightHero ? "bg-red-400" : "bg-red-400") : "bg-gray-400"
                      }`}></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        isTransparent ? (isLightHero ? "bg-red-500" : "bg-red-500") : "bg-gray-700"
                      }`}></span>
                  </span>
                )}
              </Link>
            ))}

            {/* Divisor sutil */}
            <div
              className={`h-6 w-px mx-2 transition-colors duration-300 ${
                isTransparent 
                  ? isLightHero
                    ? "bg-gray-300"
                    : "bg-white/20" 
                  : "bg-gray-300"
              }`}></div>

            {/* Botões de Ação */}
            <div className="flex items-center space-x-3">
              <button
                disabled
                className={`group relative flex items-center px-5 py-2.5 text-sm font-medium rounded-[5px] border cursor-not-allowed transition-all duration-300 ${
                  isTransparent
                    ? isLightHero
                      ? "text-white bg-transparent border-white hover:border-white/80"
                      : "text-white/70 bg-transparent border-white/25 hover:border-white/40"
                    : "text-gray-500 bg-white border-gray-200 hover:border-gray-300"
                }`}
                title="Em breve">
                <LogIn size={16} className="mr-2" />
                Entrar
              </button>
              <button
                disabled
                className={`group relative flex items-center px-5 py-2.5 text-sm font-medium rounded-[5px] cursor-not-allowed transition-all duration-300 ${
                  isTransparent
                    ? isLightHero
                      ? "text-white bg-gray-800 border border-gray-700 hover:bg-gray-900"
                      : "text-white bg-white/20 border border-white/10 hover:bg-white/30"
                    : "text-white bg-gray-600 hover:bg-gray-700 opacity-90 hover:opacity-100"
                }`}
                title="Em breve">
                <UserPlus size={16} className="mr-2" />
                Cadastrar
              </button>
            </div>
          </div>

          {/* Botão Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className={`inline-flex items-center justify-center p-2 rounded-[5px] transition-colors duration-300 ${
                isTransparent
                  ? isLightHero
                    ? "text-gray-800 hover:text-gray-950"
                    : "text-white hover:text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 w-full transition-all duration-500 overflow-hidden ${
          menuAberto ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="px-4 pt-2 pb-4 space-y-2 max-w-7xl mx-auto">
          {menuItems.map((item) => (
            <Link
              key={item.nome}
              to={item.ativo ? item.path : "#"}
              className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                item.ativo
                  ? location.pathname === item.path
                    ? "text-gray-700 bg-gray-200 font-semibold"
                    : "text-gray-700 hover:text-gray-700 hover:bg-gray-50/50"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => setMenuAberto(false)}>
              {item.icone}
              <span className="ml-3">{item.nome}</span>
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100 mt-2 space-y-2">
            <button
              disabled
              className="w-full text-left px-4 py-3 text-base font-medium text-gray-500 bg-white  border border-gray-200 cursor-not-allowed flex items-center"
              title="Em breve">
              <LogIn size={16} className="mr-3" />
              Entrar
            </button>
            <button
              disabled
              className="w-full text-left px-4 py-3 text-base font-medium text-white bg-gray-600 from-gray-700 rounded-[5px] cursor-not-allowed flex items-center opacity-70"
              title="Em breve">
              <UserPlus size={16} className="mr-3" />
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
