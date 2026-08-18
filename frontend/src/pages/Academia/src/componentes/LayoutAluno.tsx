/** @format */

import { ReactNode, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextos/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LayoutAlunoMobile from "../paginas/aluno/mobile/LayoutAlunoMobile";
import { useIsMobile } from "../hooks/useIsMobile";
import {
  BookOpen,
  User,
  Settings,
  Award,
  Heart,
  Menu,
  X,
  LogOut,
  Home,
  Star,
  ChevronDown,
  Bell,
  Search,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface LayoutAlunoProps {
  children: ReactNode;
}

const menuItems = [
  {
    nome: "Dashboard",
    rota: "/academia/aluno",
    icone: <Home size={15} />,
    descricao: "Visão geral do seu progresso",
  },
  {
    nome: "Meus Cursos",
    rota: "/academia/aluno/cursos",
    icone: <BookOpen size={15} />,
    descricao: "Cursos em que está inscrito",
  },
  {
    nome: "Certificados",
    rota: "/academia/aluno/certificados",
    icone: <Award size={15} />,
    descricao: "Seus certificados conquistados",
  },
  {
    nome: "Favoritos",
    rota: "/academia/aluno/favoritos",
    icone: <Heart size={15} />,
    descricao: "Cursos guardados para depois",
  },
  {
    nome: "Avaliações",
    rota: "/academia/aluno/avaliacoes",
    icone: <Star size={15} />,
    descricao: "Suas avaliações e comentários",
  },
  {
    nome: "Configurações",
    rota: "/academia/aluno/configuracoes",
    icone: <Settings size={15} />,
    descricao: "Gerencie sua conta",
  },
];

export default function LayoutAluno({ children }: LayoutAlunoProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isMobile) {
    return <LayoutAlunoMobile>{children}</LayoutAlunoMobile>;
  }

  const handleLogout = () => {
    logout();
    navigate("/academia");
  };

  const isActiveRoute = (route: string) => {
    if (route === "/academia/aluno") {
      return location.pathname === "/academia/aluno";
    }
    return location.pathname.startsWith(route);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif] text-slate-800">
      {/* ── 1. BARRA DE TOPO EXECUTIVA DA ENVISIO ACADEMY ── */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Lado Esquerdo: Marca & Tag do Portal do Aluno */}
            <div className="flex items-center gap-4">
              <Link to="/academia/aluno" className="flex items-center gap-2 group">
                <span className="font-black text-lg tracking-tight text-white">
                  Envisio <span className="text-red-500">Academy</span>
                </span>
                <span className="px-2 py-0.5 bg-red-950/80 border border-red-800/80 text-red-400 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                  Portal do Aluno
                </span>
              </Link>
            </div>

            {/* Lado Direito: Notificações & Perfil do Aluno */}
            <div className="flex items-center gap-3">
              {/* Pesquisa rápida */}
              <div className="hidden sm:flex items-center bg-slate-800/80 border border-slate-700/80 rounded-full px-3 py-1.5 text-xs w-56 focus-within:border-red-500 transition-colors">
                <Search size={14} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Pesquisar nos meus cursos..."
                  className="bg-transparent border-0 text-white placeholder-slate-400 text-xs focus:outline-none w-full"
                />
              </div>

              {/* Botão Notificações */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors relative cursor-pointer"
                  title="Notificações">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-4 z-50">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                        <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                          Notificações
                        </h4>
                        <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full font-bold">
                          Nova
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                          <p className="font-bold text-slate-900">Novo Certificado Disponível!</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Concluiu com sucesso o curso de ERP Primavera.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Menu de Perfil do Aluno */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer text-left">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-xs flex items-center justify-center border border-red-400/30 shadow-xs">
                    {usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : "A"}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-bold text-white leading-tight">
                      {usuario?.nome || "Mateus Silva"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Formando Certificado</p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900">{usuario?.nome || "Mateus Silva"}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{usuario?.email || "aluno@envisio.co.ao"}</p>
                      </div>
                      <Link
                        to="/academia/aluno/configuracoes"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 transition-colors font-medium">
                        <Settings size={14} className="text-slate-400" />
                        <span>Configurações</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-700 transition-colors font-bold text-left cursor-pointer">
                        <LogOut size={14} className="text-red-600" />
                        <span>Sair da Conta</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botão Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── 2. NAVEGAÇÃO SECUNDÁRIA POR SEPARADORES (TAB BAR ELEGANTE) ── */}
        <div className="bg-slate-950 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="hidden md:flex items-center space-x-1 overflow-x-auto scrollbar-none">
              {menuItems.map((item) => {
                const active = isActiveRoute(item.rota);
                return (
                  <Link
                    key={item.nome}
                    to={item.rota}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all relative select-none ${
                      active
                        ? "text-red-400 bg-slate-900 border-b-2 border-red-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                    }`}>
                    <span className={active ? "text-red-400" : "text-slate-500"}>
                      {item.icone}
                    </span>
                    <span>{item.nome}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-3 space-y-1 text-xs">
              {menuItems.map((item) => {
                const active = isActiveRoute(item.rota);
                return (
                  <Link
                    key={item.nome}
                    to={item.rota}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-bold ${
                      active
                        ? "bg-red-950/80 text-red-400 border-l-4 border-red-500"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}>
                    <span className={active ? "text-red-400" : "text-slate-400"}>
                      {item.icone}
                    </span>
                    <span>{item.nome}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 3. CORPO DA PÁGINA (MAIN CONTENT CONTAINER) ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-150">
        {children}
      </main>
    </div>
  );
}
