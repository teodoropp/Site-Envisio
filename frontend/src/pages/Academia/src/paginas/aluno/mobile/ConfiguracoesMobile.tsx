/** @format */

import { useState, useContext } from "react";
import { User, Lock, Save, Key, CheckCircle } from "lucide-react";
import { AuthContext } from "../../../contextos/AuthContext";

export default function ConfiguracoesMobile() {
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

  const handleSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setSucessoMsg("Perfil atualizado!");
      setTimeout(() => setSucessoMsg(null), 3000);
    }, 600);
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setSucessoMsg("Palavra-passe atualizada!");
      setSenhaData({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setTimeout(() => setSucessoMsg(null), 3000);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* ── BANNER AZUL ESCURO MOBILE ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 space-y-2">
        <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[9px] font-extrabold uppercase rounded-[2px]">
          Gestão de Conta
        </span>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <User size={20} className="text-red-400" />
          <span>Definições do Perfil</span>
        </h1>
        <p className="text-xs text-slate-300">
          Atualize os seus dados pessoais, empresa e credenciais de acesso.
        </p>

        {sucessoMsg && (
          <div className="p-2 bg-emerald-900/90 border border-emerald-700 text-white font-bold text-xs rounded-[2px] flex items-center gap-2">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>{sucessoMsg}</span>
          </div>
        )}
      </div>

      {/* ── FORMULÁRIO DE PERFIL TOUCH ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User size={16} className="text-red-800" />
          <h3 className="font-extrabold text-xs uppercase text-slate-900">
            Dados do Formando & Empresa
          </h3>
        </div>

        <form onSubmit={handleSalvarPerfil} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Nome Completo *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">E-mail Corporativo *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Telefone</label>
            <input
              type="text"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Empresa / Organização</label>
            <input
              type="text"
              value={formData.empresa}
              onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-semibold text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full py-2.5 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 shadow-2xs">
            <Save size={14} />
            <span>Guardar Perfil</span>
          </button>
        </form>
      </div>

      {/* ── FORMULÁRIO PALAVRA-PASSE TOUCH ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Lock size={16} className="text-red-800" />
          <h3 className="font-extrabold text-xs uppercase text-slate-900">
            Segurança & Palavra-passe
          </h3>
        </div>

        <form onSubmit={handleAlterarSenha} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Palavra-passe Atual *</label>
            <input
              type="password"
              value={senhaData.senhaAtual}
              onChange={(e) => setSenhaData({ ...senhaData, senhaAtual: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Nova Palavra-passe *</label>
            <input
              type="password"
              value={senhaData.novaSenha}
              onChange={(e) => setSenhaData({ ...senhaData, novaSenha: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Confirmar Nova Palavra-passe *</label>
            <input
              type="password"
              value={senhaData.confirmarSenha}
              onChange={(e) => setSenhaData({ ...senhaData, confirmarSenha: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5">
            <Key size={14} />
            <span>Atualizar Palavra-passe</span>
          </button>
        </form>
      </div>
    </div>
  );
}
