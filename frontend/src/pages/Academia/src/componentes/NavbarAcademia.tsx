/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  User,
  BookOpen,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Menu de navegação principal estilo Microsoft
const mainNavItems = [
  { nome: "Início", path: "/academia" },
  { nome: "Cursos", path: "/academia/cursos" },
  { nome: "Sobre", path: "/academia/quem-somos" },
  { nome: "Contato", path: "/academia/contato" },
];

export default function NavbarAcademia() {
  const [megaMenuAberto, setMegaMenuAberto] = useState(false);
  const [searchAberto, setSearchAberto] = useState(false);
  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const [mobileMenuAberto, setMobileMenuAberto] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input quando busca é aberta
  useEffect(() => {
    if (searchAberto && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchAberto]);

  // Fechar menus ao navegar ou ao clicar fora
  useEffect(() => {
    setMegaMenuAberto(false);
    setSearchAberto(false);
    setUserMenuAberto(false);
    setMobileMenuAberto(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setMegaMenuAberto(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/academia/cursos?busca=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchAberto(false);
      setSearchQuery("");
    }
  };

  const isLightHero = [
    "/academia/cursos",
    "/academia/quem-somos",
    "/academia/contato",
    "/academia/login",
    "/academia/cadastro",
    "/login",
    "/cadastro",
  ].includes(location.pathname);
  const useWhiteHeaderTheme = !isScrolled && !isLightHero;
  const isRightControlWhite = useWhiteHeaderTheme;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-['Segoe_UI_Variable_Text',sans-serif] h-[54px] select-none transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-[#e6e6e6] shadow-sm text-[#262626]"
          : "bg-transparent border-none"
      }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Lado Esquerdo: Apenas o Logótipo Envisio & Menu Principal */}
        <div className="flex items-center space-x-4 md:space-x-8 h-full">
          {/* Apenas o Logo Envisio limpo (sem texto ou linha | ACADEMIA) */}
          <Link
            to="/academia"
            className="flex items-center py-1.5 focus:outline-none group">
            <img
              src="/academia/logo.svg"
              alt="Envisio"
              className={`h-10 w-auto object-contain transition-all duration-200 group-hover:scale-105 ${
                useWhiteHeaderTheme
                  ? "brightness-0 invert drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  : ""
              }`}
            />
          </Link>

          {/* Barra separadora entre a logo e as opções de menu */}
          <div
            className={`hidden lg:block h-6 w-[1px] mx-1 transition-colors ${
              useWhiteHeaderTheme ? "bg-white/40" : "bg-gray-300"
            }`}></div>

          {/* Menu Desktop Principal */}
          <nav className="hidden lg:flex items-center space-x-2 h-full">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.nome}
                  to={item.path}
                  className="h-full flex items-center px-2.5 text-[13px] font-normal transition-colors group">
                  <span
                    className={`py-0.5 border-b-2 transition-all ${
                      isActive
                        ? useWhiteHeaderTheme
                          ? "border-white font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                          : "border-black font-semibold text-black"
                        : useWhiteHeaderTheme
                          ? "border-transparent text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:border-white group-hover:text-white"
                          : "border-transparent text-[#262626] group-hover:border-black group-hover:text-black"
                    }`}>
                    {item.nome}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Lado Direito: Tudo Envisio MegaMenu, Pesquisa, User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4 h-full">
          {/* Mega Menu Toggle ("Tudo Envisio") */}
          <div className="relative hidden md:block" ref={megaMenuRef}>
            <button
              onClick={() => {
                setMegaMenuAberto(!megaMenuAberto);
                setSearchAberto(false);
                setUserMenuAberto(false);
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 text-[13px] font-normal rounded border border-transparent transition-all ${
                megaMenuAberto
                  ? "bg-gray-100 text-black font-medium border-gray-200"
                  : isRightControlWhite
                    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:bg-white/10"
                    : "text-[#262626] hover:bg-gray-100/80"
              }`}>
              <span>Tudo Envisio</span>
              {megaMenuAberto ? (
                <ChevronUp
                  size={14}
                  className={
                    isRightControlWhite ? "text-white" : "text-gray-600"
                  }
                />
              ) : (
                <ChevronDown
                  size={14}
                  className={
                    isRightControlWhite ? "text-white" : "text-gray-600"
                  }
                />
              )}
            </button>

            {/* Painel Mega Menu Dropdown */}
            {megaMenuAberto && (
              <div className="absolute right-0 top-[44px] w-[880px] bg-white border-b border-l border-r border-t-0 border-[#e6e6e6] shadow-2xl rounded-b-md p-6 z-40 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="grid grid-cols-4 gap-6 text-sm">
                  {/* Coluna 1: Cursos em Destaque */}
                  <div>
                    <h4 className="text-[12px] uppercase font-bold text-gray-500 tracking-wider mb-3 flex items-center">
                      <GraduationCap
                        size={14}
                        className="mr-1.5 text-red-600"
                      />
                      Cursos em Destaque
                    </h4>
                    <ul className="space-y-2 text-[13px]">
                      <li>
                        <Link
                          to="/academia/curso1"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Cegid Primavera ERP
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/curso2"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Gestão de Recursos Humanos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/curso3"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Excel Avançado & Business
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/curso4"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Contabilidade & Fiscalidade
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Coluna 2: Categorias */}
                  <div>
                    <h4 className="text-[12px] uppercase font-bold text-gray-500 tracking-wider mb-3 flex items-center">
                      <BookOpen size={14} className="mr-1.5 text-blue-600" />
                      Categorias
                    </h4>
                    <ul className="space-y-2 text-[13px]">
                      <li>
                        <Link
                          to="/academia/cursos"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Gestão & Software ERP
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/cursos"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Tecnologia & Sistemas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/cursos"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Finanças & Auditoria
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/academia/cursos"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Produtividade Digital
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Coluna 3: Recursos */}
                  <div>
                    <h4 className="text-[12px] uppercase font-bold text-gray-500 tracking-wider mb-3 flex items-center">
                      <Sparkles size={14} className="mr-1.5 text-amber-500" />
                      Recursos & Suporte
                    </h4>
                    <ul className="space-y-2 text-[13px]">
                      <li>
                        <Link
                          to="/academia/quem-somos"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Certificados Reconhecidos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contato"
                          className="hover:underline text-gray-800 hover:text-black block">
                          Formação para Empresas
                        </Link>
                      </li>
                      <li>
                        <a
                          href="https://wa.me/244947137676"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline text-gray-800 hover:text-black flex items-center">
                          <span>Apoio ao Aluno</span>
                          <ExternalLink size={12} className="ml-1 opacity-60" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Coluna 4: Envisio Corporate */}
                  <div className="bg-gray-50 p-3.5 rounded border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[12px] uppercase font-bold text-gray-900 mb-1">
                        Portal Envisio
                      </h4>
                      <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
                        Soluções integradas de software, consultoria e
                        equipamentos tecnológicos.
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="inline-flex items-center text-[12px] font-semibold text-red-600 hover:text-red-700 hover:underline">
                      Visitar Site Principal
                      <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão de Pesquisa (Lupa) */}
          <div className="relative">
            {searchAberto ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-gray-100 rounded border border-gray-300 px-2 py-1 z-50">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[13px] px-2 py-0.5 outline-none w-36 sm:w-48 text-black"
                />
                <button
                  type="submit"
                  className="p-1 text-gray-600 hover:text-black">
                  <Search size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchAberto(false)}
                  className="p-1 text-gray-500 hover:text-black ml-1">
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setSearchAberto(true);
                  setMegaMenuAberto(false);
                  setUserMenuAberto(false);
                }}
                className={`p-2 rounded transition-colors ${
                  isRightControlWhite
                    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:bg-white/10"
                    : "text-[#262626] hover:text-black hover:bg-gray-100"
                }`}
                title="Pesquisar">
                <Search size={18} />
              </button>
            )}
          </div>

          {/* User Profile Avatar ("EA") - Links Desabilitados */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setUserMenuAberto(!userMenuAberto);
                setMegaMenuAberto(false);
                setSearchAberto(false);
              }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold transition-colors focus:outline-none ml-1 ${
                isRightControlWhite
                  ? "border-white/70 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:border-white hover:bg-white/10"
                  : "border-gray-400 text-[#262626] hover:border-black hover:bg-gray-100"
              }`}
              title="Sua Conta">
              <span className="tracking-tighter">EA</span>
            </button>

            {/* Menu Suspenso de Utilizador Desabilitado */}
            {userMenuAberto && (
              <div className="absolute right-0 top-[43px] w-60 bg-white border-b border-l border-r border-t-0 border-[#e6e6e6] shadow-xl rounded-b-md py-2 z-40 animate-in fade-in slide-in-from-top-1 duration-150 text-[#262626]">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-[13px] font-bold text-gray-900">
                    Envisio Training Academy
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    Plataforma E-learning
                  </p>
                </div>

                {/* Itens Habilitados */}
                <div className="py-1 space-y-0.5">
                  <Link
                    to="/academia/aluno"
                    onClick={() => setUserMenuAberto(false)}
                    className="flex items-center px-4 py-2 text-[13px] text-red-800 font-bold hover:bg-red-50 transition-colors">
                    <GraduationCap size={14} className="mr-2.5 text-red-800" />
                    <span>Portal do Aluno</span>
                  </Link>

                  <Link
                    to="/academia/login"
                    onClick={() => setUserMenuAberto(false)}
                    className="flex items-center px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 hover:text-black transition-colors">
                    <User size={14} className="mr-2.5 text-gray-500" />
                    <span>Iniciar Sessão</span>
                  </Link>

                  <Link
                    to="/academia/cadastro"
                    onClick={() => setUserMenuAberto(false)}
                    className="flex items-center px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 hover:text-black transition-colors">
                    <User size={14} className="mr-2.5 text-gray-500" />
                    <span>Criar Conta</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Botão Hambúrguer para Mobile */}
          <button
            onClick={() => setMobileMenuAberto(!mobileMenuAberto)}
            className={`lg:hidden p-2 rounded focus:outline-none transition-colors ${
              isRightControlWhite
                ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:bg-white/10"
                : "text-[#262626] hover:text-black hover:bg-gray-100"
            }`}>
            {mobileMenuAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuAberto && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 animate-in fade-in duration-150">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar cursos na Envisio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 text-[13px] border border-gray-300 rounded px-3 py-2 pl-9 outline-none text-black"
              />
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
          </form>

          {mainNavItems.map((item) => (
            <Link
              key={item.nome}
              to={item.path}
              className={`block py-2 text-sm font-medium border-b border-gray-100 ${
                location.pathname === item.path
                  ? "text-black font-bold"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => setMobileMenuAberto(false)}>
              {item.nome}
            </Link>
          ))}

          <div className="pt-2 flex flex-col space-y-2">
            <Link
              to="/academia/login"
              onClick={() => setMobileMenuAberto(false)}
              className="w-full text-center py-2 text-xs font-semibold border border-gray-300 rounded text-gray-800 hover:bg-gray-50">
              Entrar na Plataforma
            </Link>
            <Link
              to="/academia/cadastro"
              onClick={() => setMobileMenuAberto(false)}
              className="w-full text-center py-2 text-xs font-semibold bg-red-600 text-white rounded hover:bg-red-700">
              Criar Conta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
