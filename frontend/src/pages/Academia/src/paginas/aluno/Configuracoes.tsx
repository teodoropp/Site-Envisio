/** @format */

import { useState, useContext } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Bell,
  Shield,
  Key,
  LogOut,
  Building,
  Phone,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../contextos/AuthContext";

import { useIsMobile } from "../../hooks/useIsMobile";
import ConfiguracoesMobile from "./mobile/ConfiguracoesMobile";

export default function Configuracoes() {
  const isMobile = useIsMobile();
  const { logout } = useContext(AuthContext);
  const [salvando, setSalvando] = useState(false);
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: "Mateus Silva",
    email: "mateus.silva@empresa.co.ao",
    telefone: "+244 923 884 910",
    empresa: "Banco Angolano de Investimentos (BAI)",
    cargo: "Analista de Operações Financeiras",
  });

  const [senhaData, setSenhaData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);

  if (isMobile) {
    return <ConfiguracoesMobile />;
  }

  const handleSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setSucessoMsg("Perfil de aluno atualizado com sucesso!");
      setTimeout(() => setSucessoMsg(null), 3000);
    }, 600);
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setSucessoMsg("Senha alterada com sucesso!");
      setSenhaData({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setTimeout(() => setSucessoMsg(null), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
            Gestão do Perfil do Aluno
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <User size={24} className="text-red-400" />
            <span>Configurações da Conta</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Mantenha atualizadas as suas informações pessoais, dados da empresa para os certificados e credenciais de segurança.
          </p>
        </div>

        {sucessoMsg && (
          <div className="px-3.5 py-2 bg-emerald-900/90 border border-emerald-700 text-white font-bold text-xs rounded-[2px] flex items-center gap-2 relative z-10">
            <CheckCircle size={16} className="text-emerald-400" />
            <span>{sucessoMsg}</span>
          </div>
        )}

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── CARD 1: INFORMAÇÕES PESSOAIS E EMPRESARIAIS ── */}
        <div className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User size={18} className="text-red-800" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Dados do Formando & Empresa
            </h3>
          </div>

          <form onSubmit={handleSalvarPerfil} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Nome Completo *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Endereço de E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Telefone de Contacto</label>
                <input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Empresa / Organização</label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Cargo Profissional</label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={salvando}
                className="px-5 py-2 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                <Save size={14} />
                <span>Guardar Alterações</span>
              </button>
            </div>
          </form>
        </div>

        {/* ── CARD 2: SEGURANÇA E PALAVRA-PASSE ── */}
        <div className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock size={18} className="text-red-800" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Segurança & Palavra-passe
            </h3>
          </div>

          <form onSubmit={handleAlterarSenha} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Palavra-passe Atual *</label>
              <div className="relative">
                <input
                  type={mostrarSenhaAtual ? "text" : "password"}
                  value={senhaData.senhaAtual}
                  onChange={(e) => setSenhaData({ ...senhaData, senhaAtual: e.target.value })}
                  placeholder="Introduza a sua palavra-passe atual"
                  className="w-full p-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  {mostrarSenhaAtual ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Nova Palavra-passe *</label>
                <div className="relative">
                  <input
                    type={mostrarNovaSenha ? "text" : "password"}
                    value={senhaData.novaSenha}
                    onChange={(e) => setSenhaData({ ...senhaData, novaSenha: e.target.value })}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full p-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {mostrarNovaSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Confirmar Nova Palavra-passe *</label>
                <input
                  type="password"
                  value={senhaData.confirmarSenha}
                  onChange={(e) => setSenhaData({ ...senhaData, confirmarSenha: e.target.value })}
                  placeholder="Repita a nova palavra-passe"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={salvando}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors">
                <Key size={14} />
                <span>Atualizar Palavra-passe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
