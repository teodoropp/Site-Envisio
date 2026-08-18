/** @format */

import { ReactNode, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextos/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Award,
  Heart,
  Settings,
  Star,
  LogOut,
  Bell,
  Search,
  User,
  ChevronRight,
  X,
  Menu,
  CheckCircle,
} from "lucide-react";

interface LayoutAlunoMobileProps {
  children: ReactNode;
}

const mobileTabs = [
  {
    nome: "Painel",
    rota: "/academia/aluno",
    icone: <Home size={20} />,
  },
  {
    nome: "Cursos",
    rota: "/academia/aluno/cursos",
    icone: <BookOpen size={20} />,
  },
  {
    nome: "Diplomas",
    rota: "/academia/aluno/certificados",
    icone: <Award size={20} />,
  },
  {
    nome: "Favoritos",
    rota: "/academia/aluno/favoritos",
    icone: <Heart size={20} />,
  },
  {
    nome: "Perfil",
    rota: "/academia/aluno/configuracoes",
    icone: <Settings size={20} />,
  },
];

export default function LayoutAlunoMobile({
  children,
}: LayoutAlunoMobileProps) {
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/academia");
  };

  const isActiveTab = (rota: string) => {
    if (rota === "/academia/aluno") {
      return location.pathname === "/academia/aluno";
    }
    return location.pathname.startsWith(rota);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif] text-slate-800 pb-20 select-none">
      {/* ── TOPO DA APLICAÇÃO MOBILE ── */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 px-4 py-3 border-b border-slate-800 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="font-black text-sm text-white tracking-tight leading-none">
              Envisio <span className="text-red-500">Academy</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notificações Mobile */}
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800/80 relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Perfil Mobile Drawer Trigger */}
          <button
            onClick={() => setProfileDrawerOpen(true)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xs flex items-center justify-center border border-red-400/40">
            {usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : "M"}
          </button>
        </div>
      </header>

      {/* ── PAINEL DE NOTIFICAÇÕES POPUP MOBILE ── */}
      <AnimatePresence>
        {notifOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-4 border-b border-slate-200 shadow-lg text-xs space-y-2 z-30">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-black uppercase text-slate-900 text-[10px]">
                Notificações Recentes
              </span>
              <button
                onClick={() => setNotifOpen(false)}
                className="text-slate-400">
                <X size={16} />
              </button>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px] space-y-0.5">
              <p className="font-bold text-slate-900">
                Aula Presencial Agendada
              </p>
              <p className="text-[11px] text-slate-600">
                Próxima sessão: ERP Primavera V10 às 09h00 (Sala 302).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DRAWER LATERAL DE PERFIL DO ALUNO (MOBILE) ── */}
      <AnimatePresence>
        {profileDrawerOpen && (
          <div className="fixed inset-0 bg-slate-950/70 z-50 flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-xs bg-white h-full flex flex-col justify-between shadow-2xl p-5">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-800 text-white font-black text-sm flex items-center justify-center">
                      {usuario?.nome
                        ? usuario.nome.charAt(0).toUpperCase()
                        : "M"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">
                        {usuario?.nome || "Mateus Silva"}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Formando Presencial
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setProfileDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-900">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-1 text-xs font-bold">
                  <Link
                    to="/academia/aluno"
                    onClick={() => setProfileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-[2px] text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <Home size={16} className="text-red-800" />
                      <span>Painel Principal</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>

                  <Link
                    to="/academia/aluno/cursos"
                    onClick={() => setProfileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-[2px] text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={16} className="text-slate-500" />
                      <span>Meus Cursos Presenciais</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>

                  <Link
                    to="/academia/aluno/certificados"
                    onClick={() => setProfileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-[2px] text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <Award size={16} className="text-slate-500" />
                      <span>Meus Certificados</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>

                  <Link
                    to="/academia/aluno/avaliacoes"
                    onClick={() => setProfileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-[2px] text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <Star size={16} className="text-slate-500" />
                      <span>Minhas Avaliações</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>

                  <Link
                    to="/academia/aluno/configuracoes"
                    onClick={() => setProfileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-[2px] text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <Settings size={16} className="text-slate-500" />
                      <span>Configurações de Conta</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-800 font-extrabold text-xs rounded-[2px] flex items-center justify-center gap-2 cursor-pointer">
                  <LogOut size={16} />
                  <span>Sair do Portal</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CONTEÚDO DA PÁGINA MOBILE ── */}
      <main className="flex-1 p-4 space-y-4">{children}</main>

      {/* ── NAVEGAÇÃO FIXA INFERIOR (BOTTOM TAB BAR APP STYLE) ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white border-t border-slate-800 z-40 px-2 py-1.5 shadow-2xl flex items-center justify-around">
        {mobileTabs.map((tab) => {
          const active = isActiveTab(tab.rota);
          return (
            <Link
              key={tab.nome}
              to={tab.rota}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-[2px] transition-all text-[10px] font-bold ${
                active
                  ? "text-red-400 bg-slate-800/80 font-black scale-105"
                  : "text-slate-400 hover:text-slate-200"
              }`}>
              <div className={active ? "text-red-500" : "text-slate-400"}>
                {tab.icone}
              </div>
              <span className="mt-0.5">{tab.nome}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
