/** @format */

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Camera,
  Save,
  CheckCircle2,
  Lock,
  Building,
  MapPin,
  Calendar,
  Globe,
  Bell,
  Check,
  Eye,
  EyeOff,
  Award,
  BookOpen,
  Users,
  Activity,
  Pencil,
  X,
} from "lucide-react";

export default function PerfilAdmin() {
  const [activeTab, setActiveTab] = useState<
    "dados" | "seguranca" | "preferencias" | "atividade"
  >("dados");
  const [isEditing, setIsEditing] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estado das Informações Pessoais do Administrador
  const [perfil, setPerfil] = useState({
    nome: "Super",
    sobrenome: "Admin",
    email: "admin@envisio.co.ao",
    telefone: "+244 923 112 233",
    cargo: "Direção Executiva",
    departamento: "Administração Geral",
    localizacao: "Talatona, Luanda — Angola",
    biografia:
      "Responsável pela gestão estratégica da Envisio Training Academy, supervisão dos programas de formação corporativa e coordenação das operações académicas.",
    fotoUrl: "/academia/admin-avatar.jpg",
    dataAdmissao: "Março de 2023",
  });

  // Estado de Segurança / Senha
  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmar: "",
  });

  const [segurancaConfig, setSegurancaConfig] = useState({
    autenticacaoDoisFatores: true,
    notificarLoginNovo: true,
    sessaoExpiracaoEmHoras: "8",
  });

  // Estado de Preferências
  const [preferencias, setPreferencias] = useState({
    idioma: "Português (AO)",
    fusoHorario: "WAT (UTC+1) — Luanda",
    notificacoesEmailInscricoes: true,
    notificacoesEmailRelatorios: true,
    notificacoesEmailSuporte: false,
    temaModo: "claro",
  });

  // Handler para Upload de Imagem de Perfil
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil((prev) => ({ ...prev, fotoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3500);
  };

  const handleSalvarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha.nova !== senha.confirmar) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }
    setSalvo(true);
    setSenha({ atual: "", nova: "", confirmar: "" });
    setTimeout(() => setSalvo(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 font-['Segoe_UI_Variable_Text',sans-serif]">
      {/* Mensagem Flutuante de Sucesso */}
      {salvo && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-[5px] shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <div>
            <p className="font-extrabold text-xs">
              Alterações salvas com sucesso!
            </p>
            <p className="text-[10px] text-slate-300">
              O seu perfil foi atualizado no sistema.
            </p>
          </div>
        </div>
      )}

      {/* ── 1. BANNER HERO DO PERFIL (Borda Quadrada, Azul Sólido #0F172A) ── */}
      <div className="bg-white rounded-none border border-slate-200 shadow-xs overflow-hidden">
        {/* Banner Superior Azul Sólido com título Perfil */}
        <div className="h-28 bg-[#0F172A] relative flex items-center justify-between px-6">
          <div className="bg-slate-900/90 text-white text-xl font-extrabold px-[90%] py-1 rounded-none uppercase tracking-wider">
            Perfil
          </div>
        </div>

        {/* Informações Principais do Administrador com nome 100% visível */}
        <div className="px-6 pb-6 pt-4 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Foto de Perfil com Botão de Alteração (-mt-14 puxa apenas a foto para cima) */}
            <div className="relative group -mt-14 flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0F172A] text-white font-black text-2xl flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                {perfil.fotoUrl &&
                perfil.fotoUrl !== "/academia/admin-avatar.jpg" ? (
                  <img
                    src={perfil.fotoUrl}
                    alt={perfil.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {perfil.nome.charAt(0)}
                    {perfil.sobrenome.charAt(0)}
                  </span>
                )}
              </div>

              {/* Botão de Upload de Foto */}
              <label
                htmlFor="upload-foto-input"
                className="absolute bottom-1 right-1 p-2 bg-red-800 hover:bg-red-900 text-white rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
                title="Alterar Foto de Perfil">
                <Camera size={14} />
                <input
                  id="upload-foto-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Nome, Cargo e Detalhes 100% nítidos e visíveis sobre fundo branco */}
            <div className="space-y-1.5 pt-1 sm:pt-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                  {perfil.nome} {perfil.sobrenome}
                </h2>
              </div>
              <p className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                <Shield size={14} className="text-red-700" />
                <span>{perfil.cargo}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-semibold">
                  {perfil.departamento}
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {perfil.localizacao}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" />
                  Membro desde {perfil.dataAdmissao}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. NAVEGAÇÃO DE ABAS ── */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab("dados")}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "dados"
              ? "border-red-800 text-red-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}>
          <User size={15} />
          <span>Informações Pessoais</span>
        </button>

        <button
          onClick={() => setActiveTab("seguranca")}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "seguranca"
              ? "border-red-800 text-red-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}>
          <Shield size={15} />
          <span>Segurança & Acesso</span>
        </button>

        <button
          onClick={() => setActiveTab("preferencias")}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "preferencias"
              ? "border-red-800 text-red-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}>
          <Globe size={15} />
          <span>Preferências do Sistema</span>
        </button>
      </div>

      {/* ── 3. CONTEÚDO DAS ABAS ── */}

      {/* TAB 1: INFORMAÇÕES PESSOAIS */}
      {activeTab === "dados" && (
        <>
          {/* MODO DE LEITURA (Padrão ao carregar a página) */}
          {!isEditing ? (
            <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Dados Pessoais do Administrador
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Consulte as informações e contactos registados na sua conta.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-none transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto">
                  <Pencil size={14} />
                  <span>Editar Perfil</span>
                </button>
              </div>

              {/* Grelha de Leitura dos Dados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Nome Completo
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.nome} {perfil.sobrenome}
                  </span>
                </div>

                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    E-mail Corporativo
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.email}
                  </span>
                </div>

                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Telefone / WhatsApp
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.telefone}
                  </span>
                </div>

                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Cargo / Função
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.cargo}
                  </span>
                </div>

                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Departamento
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.departamento}
                  </span>
                </div>

                <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Localização / Endereço
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {perfil.localizacao}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50/80 p-4 border border-slate-200/80">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Biografia / Resumo Profissional
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {perfil.biografia}
                </p>
              </div>
            </div>
          ) : (
            /* MODO DE EDIÇÃO (Abre somente ao clicar em Editar Perfil) */
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
              setSalvo(true);
              setTimeout(() => setSalvo(false), 3500);
            }} className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Editar Dados do Administrador
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Atualize os seus campos de contacto e identificação.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-none transition-colors"
                    title="Cancelar edição">
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Primeiro Nome
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={perfil.nome}
                        onChange={(e) =>
                          setPerfil({ ...perfil, nome: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Sobrenome / Apelido
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={perfil.sobrenome}
                        onChange={(e) =>
                          setPerfil({ ...perfil, sobrenome: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      E-mail Corporativo
                    </label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        value={perfil.email}
                        onChange={(e) =>
                          setPerfil({ ...perfil, email: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Telefone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={perfil.telefone}
                        onChange={(e) =>
                          setPerfil({ ...perfil, telefone: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Cargo / Função
                    </label>
                    <div className="relative">
                      <Building
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={perfil.cargo}
                        onChange={(e) =>
                          setPerfil({ ...perfil, cargo: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={perfil.departamento}
                      onChange={(e) =>
                        setPerfil({ ...perfil, departamento: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Localização / Endereço
                  </label>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={perfil.localizacao}
                      onChange={(e) =>
                        setPerfil({ ...perfil, localizacao: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Biografia / Resumo Profissional
                  </label>
                  <textarea
                    rows={3}
                    value={perfil.biografia}
                    onChange={(e) =>
                      setPerfil({ ...perfil, biografia: e.target.value })
                    }
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-none transition-all cursor-pointer">
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-none transition-all shadow-xs flex items-center gap-2 cursor-pointer">
                    <Save size={15} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}

      {/* TAB 2: SEGURANÇA & SENHA */}
      {activeTab === "seguranca" && (
        <div className="space-y-6">
          {/* Formulário de Alteração de Senha */}
          <form
            onSubmit={handleSalvarSenha}
            className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
              <Key size={18} className="text-red-800" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Alterar Senha de Acesso
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Garanta a segurança da sua conta definindo uma palavra-passe
                  forte.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Senha Atual
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={senha.atual}
                    onChange={(e) =>
                      setSenha({ ...senha, atual: e.target.value })
                    }
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nova Senha
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={senha.nova}
                    onChange={(e) =>
                      setSenha({ ...senha, nova: e.target.value })
                    }
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={senha.confirmar}
                    onChange={(e) =>
                      setSenha({ ...senha, confirmar: e.target.value })
                    }
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-red-800 transition-all font-semibold"
                    placeholder="Repita a nova senha"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-[5px] transition-all shadow-xs flex items-center gap-2 cursor-pointer">
                <Key size={15} />
                <span>Atualizar Palavra-Passe</span>
              </button>
            </div>
          </form>

          {/* Configurações Adicionais de Segurança */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Políticas de Acesso & Proteção
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina os parâmetros de verificação para o seu acesso
                administrativo.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-[6px] border border-slate-200/60">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Autenticação de Dois Fatores (2FA)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Exigir código de verificação via app ou email ao iniciar
                    sessão.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={segurancaConfig.autenticacaoDoisFatores}
                  onChange={(e) =>
                    setSegurancaConfig({
                      ...segurancaConfig,
                      autenticacaoDoisFatores: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-red-800 rounded focus:ring-red-800 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-[6px] border border-slate-200/60">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Alertas de Login em Novos Dispositivos
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Enviar um alerta por email sempre que o sistema detetar um
                    novo endereço IP.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={segurancaConfig.notificarLoginNovo}
                  onChange={(e) =>
                    setSegurancaConfig({
                      ...segurancaConfig,
                      notificarLoginNovo: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-red-800 rounded focus:ring-red-800 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PREFERÊNCIAS DO SISTEMA */}
      {activeTab === "preferencias" && (
        <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Preferências & Notificações
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalize como recebe alertas e relatórios do portal da Academia
              Envisio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Idioma da Interface
              </label>
              <select
                value={preferencias.idioma}
                onChange={(e) =>
                  setPreferencias({ ...preferencias, idioma: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-800 font-semibold focus:outline-none focus:border-red-800">
                <option value="Português (AO)">Português (Angola)</option>
                <option value="English (US)">English (United States)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fuso Horário
              </label>
              <select
                value={preferencias.fusoHorario}
                onChange={(e) =>
                  setPreferencias({
                    ...preferencias,
                    fusoHorario: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-800 font-semibold focus:outline-none focus:border-red-800">
                <option value="WAT (UTC+1) — Luanda">
                  WAT (UTC+1) — Luanda / Lisboa
                </option>
                <option value="UTC (UTC+0)">
                  UTC — Coordinated Universal Time
                </option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Notificações por E-mail
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferencias.notificacoesEmailInscricoes}
                onChange={(e) =>
                  setPreferencias({
                    ...preferencias,
                    notificacoesEmailInscricoes: e.target.checked,
                  })
                }
                className="w-4 h-4 text-red-800 rounded focus:ring-red-800"
              />
              <span className="text-xs font-semibold text-slate-700">
                Receber alerta quando um novo aluno concluir a inscrição
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferencias.notificacoesEmailRelatorios}
                onChange={(e) =>
                  setPreferencias({
                    ...preferencias,
                    notificacoesEmailRelatorios: e.target.checked,
                  })
                }
                className="w-4 h-4 text-red-800 rounded focus:ring-red-800"
              />
              <span className="text-xs font-semibold text-slate-700">
                Enviar resumo semanal das métricas da Academia por email
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                setSalvo(true);
                setTimeout(() => setSalvo(false), 3500);
              }}
              className="px-6 py-2.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-[5px] transition-all shadow-xs flex items-center gap-2 cursor-pointer">
              <Save size={15} />
              <span>Salvar Preferências</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
