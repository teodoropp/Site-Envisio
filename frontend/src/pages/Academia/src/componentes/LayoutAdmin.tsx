/** @format */

import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Star,
  Tags,
  Users,
  UserCheck,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Search,
  Bell,
} from "lucide-react";

interface LayoutAdminProps {
  children: ReactNode;
}

interface MenuItem {
  nome: string;
  rota: string;
  icone: React.ReactNode;
  badge?: string | number;
}

interface MenuGrupo {
  titulo: string;
  items: MenuItem[];
}

const adminMenuGrupos: MenuGrupo[] = [
  {
    titulo: "MENU PRINCIPAL",
    items: [
      {
        nome: "Dashboard",
        rota: "/academia/admin",
        icone: <LayoutDashboard size={18} />,
      },
    ],
  },
  {
    titulo: "GESTÃO ACADÉMICA",
    items: [
      {
        nome: "Cursos",
        rota: "/academia/admin/cursos",
        icone: <BookOpen size={18} />,
      },
      {
        nome: "Destaques",
        rota: "/academia/admin/destaques",
        icone: <Star size={18} />,
      },
      {
        nome: "Categorias",
        rota: "/academia/admin/categorias",
        icone: <Tags size={18} />,
      },
      {
        nome: "Alunos",
        rota: "/academia/admin/inscricoes",
        icone: <UserCheck size={18} />,
      },
    ],
  },
  {
    titulo: "EQUIPA & PERFIS",
    items: [
      {
        nome: "Utilizadores",
        rota: "/academia/admin/usuarios",
        icone: <Users size={18} />,
      },
    ],
  },
  {
    titulo: "SISTEMA",
    items: [
      {
        nome: "Relatórios",
        rota: "/academia/admin/relatorios",
        icone: <FileText size={18} />,
      },
      {
        nome: "Configurações",
        rota: "/academia/admin/configuracoes",
        icone: <Settings size={18} />,
      },
    ],
  },
];

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/academia/admin") {
      return location.pathname === "/academia/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/academia");
  };

  useEffect(() => {
    setNotifOpen(false);
    setUserMenuOpen(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif] text-slate-800 relative">
      {/* ── 1. SIDEBAR LATERAL QUE VAI ATÉ AO TOPO (Z-40, Top-0, H-screen) ── */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white text-slate-700 border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
        {/* Topo da Sidebar: Logo da Envisio Training Academy */}
        <div className="h-20 px-10 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
          <Link to="/academia/admin" className="flex items-center gap-2">
            <img
              src="/academia/logo.svg"
              alt="Envisio Academy"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback caso a imagem não carregue
                e.currentTarget.style.display = "none";
              }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-[5px]">
            <X size={18} />
          </button>
        </div>

        {/* Corpo de Navegação com Espaçamento Amplo ("Deixa respirar") */}
        <div className="py-6 px-4 space-y-7 overflow-y-auto flex-1 scrollbar-none [scrollbar-width:none]">
          {adminMenuGrupos.map((grupo, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                {grupo.titulo}
              </p>
              <div className="space-y-1">
                {grupo.items.map((item) => {
                  const active = isActive(item.rota);
                  return (
                    <Link
                      key={item.rota}
                      to={item.rota}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] text-[11px] font-semibold transition-all ${
                        active
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}>
                      <div className="flex items-center gap-2.5">
                        <span
                          className={
                            active ? "text-red-400" : "text-slate-400"
                          }>
                          {item.icone}
                        </span>
                        <span>{item.nome}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end text-[11px] text-slate-400 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors">
            <LogOut size={13} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* ── 2. TOPBAR SUPERIOR (Sem Borda Inferior!) ── */}
      <header className="h-16 fixed top-0 left-0 lg:left-64 right-0 z-30 flex items-center justify-between px-6 sm:px-8 bg-slate-50/90 backdrop-blur-md">
        {/* Esquerda: Botão Mobile (Sem texto do logo!) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-[5px] hover:bg-slate-200/60">
            <Menu size={20} />
          </button>

          {/* Pesquisa no Topbar */}
          <div className="hidden md:flex items-center relative w-80 lg:w-96">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Pesquisar tarefas, cursos, alunos..."
              className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200/80 rounded-[5px] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-800/60 transition-all shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-[3px]">
              ⌘K
            </span>
          </div>
        </div>

        {/* Direita: Botão Ver Site + Notificações + Avatar Redondo com Dropdown */}
        <div className="flex items-center gap-4">
          <Link
            to="/academia"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-800 bg-white hover:bg-slate-100 px-4 py-2 rounded-[5px] border border-slate-200/80 transition-colors shadow-2xs">
            <ExternalLink size={14} />
            <span>Ver Site</span>
          </Link>

          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-[5px] relative transition-colors cursor-pointer">
              <Bell size={19} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-800 rounded-full" />
            </button>

            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setNotifOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-[5px] border border-slate-200 shadow-xl z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                    <span className="font-extrabold text-xs tracking-wide">
                      Notificações
                    </span>
                    <span className="text-[10px] bg-red-800 text-white font-bold px-2 py-0.5 rounded-[3px]">
                      3 Novas
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
                    <div className="p-3.5 hover:bg-slate-50 transition-colors">
                      <p className="font-bold text-slate-900">
                        Nova Inscrição Confirmada
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Mateus António inscreveu-se no Cegid Primavera.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Há 10 minutos
                      </span>
                    </div>
                    <div className="p-3.5 hover:bg-slate-50 transition-colors">
                      <p className="font-bold text-slate-900">
                        Pagamento Confirmado
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Faturação de 85.000 Kz processada com sucesso.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Há 45 minutos
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Avatar Apenas Redondo com Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-9 h-9 rounded-full bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs flex items-center justify-center cursor-pointer transition-all shadow-xs focus:outline-none ring-2 ring-transparent hover:ring-red-300"
              title="Perfil do Administrador">
              AD
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-[5px] border border-slate-200 shadow-xl z-50 overflow-hidden text-xs py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                    <p className="font-extrabold text-slate-900 text-xs">
                      Super Admin
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      admin@envisio.co.ao
                    </p>
                  </div>

                  <Link
                    to="/academia/admin/configuracoes"
                    className="px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold transition-colors">
                    <Settings size={14} />
                    <span>Configurações do Sistema</span>
                  </Link>

                  <Link
                    to="/academia"
                    target="_blank"
                    className="px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold transition-colors">
                    <ExternalLink size={14} />
                    <span>Ir para o Portal</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-700 font-bold flex items-center gap-2 cursor-pointer transition-colors">
                    <LogOut size={14} />
                    <span>Encerrar Sessão</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── 3. CONTEÚDO PRINCIPAL (Margin Left lg:ml-64, Padding Amplo) ── */}
      <div className="flex pt-16 flex-1 lg:ml-64">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-950/40 z-30 lg:hidden backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
