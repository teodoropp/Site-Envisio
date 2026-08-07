/** @format */

import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Shield,
  User,
  GraduationCap,
  X,
  Save,
  Key,
  Lock,
  Unlock,
  CheckCircle2,
  List,
  Grid,
  Mail,
  Phone,
  Briefcase,
  AlertTriangle,
  UserCheck,
  Building,
} from "lucide-react";
import api from "../../utils/api";

interface Usuario {
  id: string | number;
  codigoUsuario: string;
  nome: string;
  email: string;
  telefone: string;
  empresaCargo: string;
  papel: "admin" | "instrutor" | "secretaria" | "aluno";
  status: "ativo" | "suspenso";
  ultimoAcesso: string;
  criado_em: string;
}

const INITIAL_USUARIOS: Usuario[] = [
  {
    id: "1",
    codigoUsuario: "USR-001",
    nome: "Administrador Envisio",
    email: "admin@envisio.co.ao",
    telefone: "+244 923 000 111",
    empresaCargo: "Direção Executiva Envisio",
    papel: "admin",
    status: "ativo",
    ultimoAcesso: "Hoje às 18:42",
    criado_em: "01/01/2026",
  },
  {
    id: "2",
    codigoUsuario: "USR-002",
    nome: "Eng. Mateus Silva",
    email: "mateus.silva@envisio.co.ao",
    telefone: "+244 923 456 789",
    empresaCargo: "Consultor Técnico Sénior Cegid",
    papel: "instrutor",
    status: "ativo",
    ultimoAcesso: "Ontem às 14:15",
    criado_em: "15/01/2026",
  },
  {
    id: "3",
    codigoUsuario: "USR-003",
    nome: "Dra. Teresa Bento",
    email: "teresa.bento@envisio.co.ao",
    telefone: "+244 912 345 678",
    empresaCargo: "Formadora de Programação & IA",
    papel: "instrutor",
    status: "ativo",
    ultimoAcesso: "05/08/2026",
    criado_em: "20/01/2026",
  },
  {
    id: "4",
    codigoUsuario: "USR-004",
    nome: "Lic. Carlos Fonseca",
    email: "carlos.fonseca@envisio.co.ao",
    telefone: "+244 934 567 890",
    empresaCargo: "Desenvolvedor Frontend UI/UX",
    papel: "instrutor",
    status: "ativo",
    ultimoAcesso: "04/08/2026",
    criado_em: "10/02/2026",
  },
  {
    id: "5",
    codigoUsuario: "USR-005",
    nome: "Maria das Dores",
    email: "secretaria@envisio.co.ao",
    telefone: "+244 945 678 901",
    empresaCargo: "Gestora da Secretaria Académica",
    papel: "secretaria",
    status: "ativo",
    ultimoAcesso: "Hoje às 09:30",
    criado_em: "01/02/2026",
  },
  {
    id: "6",
    codigoUsuario: "USR-006",
    nome: "Mateus António",
    email: "mateus.antonio@gmail.com",
    telefone: "+244 923 111 222",
    empresaCargo: "BancABC Angola — Estudante",
    papel: "aluno",
    status: "ativo",
    ultimoAcesso: "05/08/2026",
    criado_em: "05/03/2026",
  },
  {
    id: "7",
    codigoUsuario: "USR-007",
    nome: "João Manuel",
    email: "joao.manuel@gmail.com",
    telefone: "+244 956 789 012",
    empresaCargo: "Autónomo — Estudante",
    papel: "aluno",
    status: "suspenso",
    ultimoAcesso: "30/07/2026",
    criado_em: "05/05/2026",
  },
];

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(INITIAL_USUARIOS);
  const [busca, setBusca] = useState("");
  const [papelFilter, setPapelFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [vistaModo, setVistaModo] = useState<"tabela" | "cards">("tabela");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresaCargo: "",
    papel: "aluno" as "admin" | "instrutor" | "secretaria" | "aluno",
    status: "ativo" as "ativo" | "suspenso",
    enviarCredenciais: true,
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/admin/usuarios");
      if (response.data?.sucesso && Array.isArray(response.data.dados)) {
        // Merge se necessário
      }
    } catch (err) {
      // Fallback
    }
  };

  const handleOpenModal = (user?: Usuario) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        empresaCargo: user.empresaCargo,
        papel: user.papel,
        status: user.status,
        enviarCredenciais: false,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nome: "",
        email: "",
        telefone: "+244 ",
        empresaCargo: "",
        papel: "aluno",
        status: "ativo",
        enviarCredenciais: true,
      });
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) return;

    if (editingUser) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)),
      );
    } else {
      const newUser: Usuario = {
        id: String(Date.now()),
        codigoUsuario: `USR-${String(usuarios.length + 1).padStart(3, "0")}`,
        ...formData,
        ultimoAcesso: "Nunca acedeu",
        criado_em: new Date().toLocaleDateString("pt-PT"),
      };
      setUsuarios((prev) => [newUser, ...prev]);
    }
    setModalOpen(false);
  };

  const handleToggleStatus = (id: string | number) => {
    setUsuarios((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const nextStatus = u.status === "ativo" ? "suspenso" : "ativo";
        return { ...u, status: nextStatus };
      }),
    );
  };

  const handleResetPassword = (email: string) => {
    alert(`Link de redefinição de palavra-passe enviado com sucesso para ${email}`);
  };

  const handleDelete = (id: string | number) => {
    if (
      window.confirm(
        "Tem a certeza que deseja revogar o acesso e eliminar este utilizador?",
      )
    ) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const filtered = usuarios.filter((u) => {
    const matchSearch =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase()) ||
      u.codigoUsuario.toLowerCase().includes(busca.toLowerCase()) ||
      u.empresaCargo.toLowerCase().includes(busca.toLowerCase());

    const matchPapel = papelFilter === "todos" || u.papel === papelFilter;
    const matchStatus = statusFilter === "todos" || u.status === statusFilter;

    return matchSearch && matchPapel && matchStatus;
  });

  // KPI Calculations
  const totalUsuarios = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.papel === "admin").length;
  const totalInstrutores = usuarios.filter((u) => u.papel === "instrutor").length;
  const totalSecretaria = usuarios.filter((u) => u.papel === "secretaria").length;

  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* Top Banner Executivo */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
              SEGURANÇA & ACESSOS
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-[2px]">
              CONTROLO CENTRALIZADO
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">
            Gestão de Utilizadores & Permissões
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Administração de contas da equipa diretiva, formadores técnicos, colaboradores
            da secretaria académica e atribuição de níveis de acesso ao sistema.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-red-800 hover:bg-red-900 text-white px-4 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto flex-shrink-0">
          <UserPlus size={16} />
          <span>+ Novo Utilizador / Membro</span>
        </button>
      </div>

      {/* KPI Cards em Grelha */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Total de Utilizadores
            </span>
            <User size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalUsuarios}</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Contas Registadas
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Administradores
            </span>
            <Shield size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalAdmins}</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Super-Admins Direção
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Formadores
            </span>
            <GraduationCap size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalInstrutores}</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Corpo Docente
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Secretaria & Suporte
            </span>
            <Briefcase size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalSecretaria}</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Atendimento Académico
          </span>
        </div>
      </div>

      {/* Barra de Pesquisa & Filtros Executiva */}
      <div className="bg-white p-3.5 rounded-[2px] border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Pesquisa */}
        <div className="relative w-full md:w-96">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Pesquisar por nome, e-mail ou código de utilizador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-[2px] font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 transition-all text-xs"
          />
        </div>

        {/* Grupo de Filtros */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider pr-1">
            <Filter size={13} className="text-red-800" />
            <span>Filtrar:</span>
          </div>

          <select
            value={papelFilter}
            onChange={(e) => setPapelFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none focus:border-slate-800 cursor-pointer text-xs transition-colors">
            <option value="todos">Todos os Perfis</option>
            <option value="admin">Administradores</option>
            <option value="instrutor">Formadores / Instrutores</option>
            <option value="secretaria">Secretaria & Atendimento</option>
            <option value="aluno">Alunos (Estudantes)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none focus:border-slate-800 cursor-pointer text-xs transition-colors">
            <option value="todos">Todos os Estados</option>
            <option value="ativo">Contas Ativas</option>
            <option value="suspenso">Contas Suspensas</option>
          </select>

          {/* Alternador Tabela / Cards */}
          <div className="flex items-center bg-slate-100 rounded-[2px] p-0.5 border border-slate-200/80 ml-1">
            <button
              onClick={() => setVistaModo("tabela")}
              className={`px-3 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                vistaModo === "tabela"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <List size={14} />
              <span>Tabela</span>
            </button>
            <button
              onClick={() => setVistaModo("cards")}
              className={`px-3 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                vistaModo === "cards"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <Grid size={14} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* VISTA 1: TABELA EXECUTIVA (CABEÇALHO PRETO) */}
      {vistaModo === "tabela" ? (
        <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Código & Utilizador</th>
                  <th className="py-3.5 px-4">Contacto & E-mail</th>
                  <th className="py-3.5 px-4">Cargo / Instituição</th>
                  <th className="py-3.5 px-4">Perfil de Acesso</th>
                  <th className="py-3.5 px-4">Último Acesso</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4 text-right">Ações de Segurança</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[2px] bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                          {u.nome.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.nome}</p>
                          <span className="font-mono text-[10px] text-slate-400 block">
                            {u.codigoUsuario}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-mono text-slate-800 text-[11px] font-medium">
                        {u.email}
                      </p>
                      <p className="text-[10px] text-slate-400">{u.telefone}</p>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {u.empresaCargo}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                          u.papel === "admin"
                            ? "bg-slate-900 text-white"
                            : u.papel === "instrutor"
                            ? "bg-red-800 text-white"
                            : u.papel === "secretaria"
                            ? "bg-blue-800 text-white"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                        {u.papel === "admin"
                          ? "Administrador"
                          : u.papel === "instrutor"
                          ? "Formador"
                          : u.papel === "secretaria"
                          ? "Secretaria"
                          : "Aluno"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {u.ultimoAcesso}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                          u.status === "ativo"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}>
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResetPassword(u.email)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-[2px] transition-colors cursor-pointer"
                          title="Enviar Redefinição de Senha">
                          <Key size={14} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className={`p-1.5 rounded-[2px] transition-colors cursor-pointer ${
                            u.status === "ativo"
                              ? "text-amber-700 hover:bg-amber-50"
                              : "text-emerald-700 hover:bg-emerald-50"
                          }`}
                          title={
                            u.status === "ativo"
                              ? "Suspender Conta"
                              : "Ativar Conta"
                          }>
                          {u.status === "ativo" ? (
                            <Lock size={14} />
                          ) : (
                            <Unlock size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenModal(u)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-[2px] transition-colors cursor-pointer"
                          title="Editar Utilizador">
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-[2px] transition-colors cursor-pointer"
                          title="Eliminar Conta">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VISTA 2: GRELHA DE CARDS DE UTILIZADORES */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-[2px]">
                    {u.codigoUsuario}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                      u.papel === "admin"
                        ? "bg-slate-900 text-white"
                        : u.papel === "instrutor"
                        ? "bg-red-800 text-white"
                        : u.papel === "secretaria"
                        ? "bg-blue-800 text-white"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                    {u.papel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white font-extrabold text-sm rounded-[2px] flex items-center justify-center flex-shrink-0">
                    {u.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs">
                      {u.nome}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">{u.email}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cargo / Função:</span>
                    <span className="font-bold text-slate-800">{u.empresaCargo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Último Acesso:</span>
                    <span className="font-bold text-slate-800">{u.ultimoAcesso}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                    u.status === "ativo"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}>
                  {u.status}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(u)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-[2px] cursor-pointer transition-colors shadow-2xs">
                    Editar Dados
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL EXECUTIVO DE CRIAR / EDITAR UTILIZADOR ────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-[2px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-red-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider">
                  {editingUser ? "Editar Perfil do Utilizador" : "Criar Novo Utilizador / Membro da Equipa"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-[2px] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                  placeholder="Ex: Dra. Teresa Bento"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Endereço de E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none focus:border-slate-800"
                    placeholder="utilizador@envisio.co.ao"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Telefone de Contacto
                  </label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-800"
                    placeholder="+244 923 000 000"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  Cargo / Função / Instituição
                </label>
                <input
                  type="text"
                  value={formData.empresaCargo}
                  onChange={(e) => setFormData({ ...formData, empresaCargo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-800"
                  placeholder="Ex: Consultor Técnico Sénior ou Formador"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Perfil de Acesso (Role) *
                  </label>
                  <select
                    value={formData.papel}
                    onChange={(e) =>
                      setFormData({ ...formData, papel: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none cursor-pointer">
                    <option value="admin">Administrador (Super-Admin)</option>
                    <option value="instrutor">Instrutor / Formador</option>
                    <option value="secretaria">Secretaria & Atendimento</option>
                    <option value="aluno">Aluno (Estudante)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Estado da Conta
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none cursor-pointer">
                    <option value="ativo">Conta Ativa</option>
                    <option value="suspenso">Conta Suspensa</option>
                  </select>
                </div>
              </div>

              {!editingUser && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.enviarCredenciais}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enviarCredenciais: e.target.checked,
                        })
                      }
                      className="rounded-[2px] text-red-800 focus:ring-0"
                    />
                    <span>Enviar instruções e credenciais por e-mail ao utilizador</span>
                  </label>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px]">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-red-800 hover:bg-red-900 text-white px-5 py-2 font-bold rounded-[2px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
                  <CheckCircle2 size={16} />
                  <span>Salvar Utilizador</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
