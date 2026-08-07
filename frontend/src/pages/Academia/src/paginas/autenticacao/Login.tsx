/** @format */

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contextos/AuthContext";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  LogIn,
} from "lucide-react";

interface LoginProps {
  modoInicial?: "login" | "cadastro";
}

export default function Login({ modoInicial }: LoginProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, cadastrar } = useContext(AuthContext);

  // Aba ativa: 'login' ou 'cadastro'
  const [abaAtiva, setAbaAtiva] = useState<"login" | "cadastro">(
    modoInicial || (location.pathname.includes("cadastro") ? "cadastro" : "login")
  );

  useEffect(() => {
    if (modoInicial) {
      setAbaAtiva(modoInicial);
    } else if (location.pathname.includes("cadastro")) {
      setAbaAtiva("cadastro");
    } else {
      setAbaAtiva("login");
    }
  }, [location.pathname, modoInicial]);

  // Form States - Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  // Form States - Cadastro
  const [cadNombre, setCadNombre] = useState("");
  const [cadEmail, setCadEmail] = useState("");
  const [cadSenha, setCadSenha] = useState("");
  const [cadConfirmSenha, setCadConfirmSenha] = useState("");

  // UI States
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setSucesso("");

    try {
      await login({ email: loginEmail, senha: loginSenha }, "academia");
    } catch (error: any) {
      setErro(error.message || "E-mail ou palavra-passe incorretos");
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setSucesso("");

    if (cadSenha !== cadConfirmSenha) {
      setErro("As palavras-passe não coincidem");
      setCarregando(false);
      return;
    }

    try {
      await cadastrar(cadNombre, cadEmail, cadSenha);
      setSucesso("Conta criada com sucesso! A iniciar sessão...");
      setTimeout(() => {
        navigate("/academia");
      }, 1500);
    } catch (error: any) {
      setErro(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[700px] w-full bg-white rounded-[5px] border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Lado Esquerdo: Banner Corporativo */}
        <div className="md:col-span-5 bg-slate-900 text-white p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Luzes de fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div>
              <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-[3px] border border-red-500/20 mb-2">
                ENVISIO TRAINING ACADEMY
              </span>
              <h2 className="text-lg font-extrabold text-white leading-tight tracking-tight">
                Plataforma de Alta Capacitação
              </h2>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Capacite-se nos sistemas de gestão líderes de mercado com métodos práticos e certificação reconhecida.
            </p>

            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-red-500 flex-shrink-0" />
                <span>Certificação Oficial Envisio</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-red-500 flex-shrink-0" />
                <span>Formação em Cegid Primavera</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-red-500 flex-shrink-0" />
                <span>Acompanhamento por especialistas</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/80 mt-6">
            <p className="text-[10px] text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Envisio. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Lado Direito: Formulário Unificado Compacto */}
        <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-center bg-white">
          <div className="w-full max-w-[340px] mx-auto space-y-5">
            {/* Navegação por Abas */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => {
                  setAbaAtiva("login");
                  setErro("");
                  setSucesso("");
                }}
                className={`flex-1 pb-2.5 text-xs font-extrabold tracking-wider uppercase text-center border-b-2 transition-colors cursor-pointer ${
                  abaAtiva === "login"
                    ? "border-red-600 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}>
                <div className="flex items-center justify-center gap-1.5">
                  <LogIn size={15} />
                  <span>Iniciar Sessão</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setAbaAtiva("cadastro");
                  setErro("");
                  setSucesso("");
                }}
                className={`flex-1 pb-2.5 text-xs font-extrabold tracking-wider uppercase text-center border-b-2 transition-colors cursor-pointer ${
                  abaAtiva === "cadastro"
                    ? "border-red-600 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}>
                <div className="flex items-center justify-center gap-1.5">
                  <UserPlus size={15} />
                  <span>Criar Conta</span>
                </div>
              </button>
            </div>

          {/* Erro / Sucesso Feedback */}
          {erro && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[3px] text-xs font-semibold">
              {erro}
            </motion.div>
          )}

          {sucesso && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-[3px] text-xs font-semibold">
              {sucesso}
            </motion.div>
          )}

          {/* FORMULÁRIO: LOGIN */}
          {abaAtiva === "login" && (
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  E-mail Profissional
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                    placeholder="exemplo@envisio.co.ao"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="senha"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Palavra-passe
                  </label>
                  <Link
                    to="/academia/recuperar-senha"
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium">
                    Esqueceu a palavra-passe?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    required
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1">
                    {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={carregando}
                  className="btn-academia-primary w-full py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-colors">
                  {carregando ? (
                    <span>A iniciar sessão...</span>
                  ) : (
                    <>
                      <span>Entrar na Plataforma</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Acesso Administrativo</span>
                <button
                  type="button"
                  onClick={() => navigate("/academia/admin")}
                  className="text-slate-700 hover:text-slate-900 font-bold underline cursor-pointer">
                  Painel Admin &rarr;
                </button>
              </div>
            </form>
          )}

          {/* FORMULÁRIO: CRIAR CONTA */}
          {abaAtiva === "cadastro" && (
            <form className="space-y-4" onSubmit={handleCadastroSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nome Completo
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    value={cadNombre}
                    onChange={(e) => setCadNombre(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={cadEmail}
                    onChange={(e) => setCadEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Palavra-passe
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      required
                      value={cadSenha}
                      onChange={(e) => setCadSenha(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Confirmar
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      required
                      value={cadConfirmSenha}
                      onChange={(e) => setCadConfirmSenha(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={carregando}
                  className="btn-academia-primary w-full py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-colors">
                  {carregando ? (
                    <span>A criar conta...</span>
                  ) : (
                    <>
                      <span>Criar Minha Conta</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
