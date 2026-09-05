/** @format */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  User,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { enviarEmail } from "../services/email";

// Ícone Oficial do WhatsApp
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}>
      <path d="M12.031 0C5.49 0 .16 5.33.16 11.87c0 2.09.55 4.13 1.59 5.93L.06 24l6.3-1.65a11.83 11.83 0 0 0 5.67 1.44h.01c6.54 0 11.87-5.33 11.87-11.87C23.91 5.33 18.57 0 12.031 0zm.01 21.78h-.01c-1.78 0-3.52-.48-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.99c-.01 5.45-4.44 9.88-9.85 9.88zm5.41-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

const Contato: React.FC = () => {
  const isMountedRef = useRef(true);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipoCliente, setTipoCliente] = useState<"singular" | "empresa">("singular");
  const [metodoComunicacao, setMetodoComunicacao] = useState<"whatsapp" | "email">("whatsapp");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    area: "",
    empresa: "",
    apelido: "",
    nif: "",
  });

  const resetForm = () => {
    if (!isMountedRef.current) return;
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      area: "",
      empresa: "",
      apelido: "",
      nif: "",
    });
    setTipoCliente("singular");
    setMetodoComunicacao("whatsapp");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleWhatsAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isMountedRef.current) return;

    let text = `*Novo Contacto - Website Envisio*%0A%0A`;
    text += `*Tipo:* ${tipoCliente === "empresa" ? "Empresa" : "Pessoa Singular"}%0A`;
    text += `*Nome:* ${formData.name}${formData.apelido ? ` ${formData.apelido}` : ""}%0A`;
    if (tipoCliente === "empresa") {
      if (formData.empresa) text += `*Empresa:* ${formData.empresa}%0A`;
      if (formData.nif) text += `*NIF:* ${formData.nif}%0A`;
    }
    text += `*E-mail:* ${formData.email}%0A`;
    if (formData.phone) text += `*Telefone:* ${formData.phone}%0A`;
    if (formData.area) text += `*Área de Interesse:* ${formData.area}%0A`;
    text += `%0A*Mensagem:*%0A${encodeURIComponent(formData.message)}`;

    const whatsappNumber = "244947137676";
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    setTimeout(() => {
      if (isMountedRef.current) {
        setFormSubmitted(true);
        resetForm();
      }
    }, 200);
  }

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || !isMountedRef.current) return;

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const response = await enviarEmail(formData, tipoCliente);
      if (isMountedRef.current) {
        if (response.success) {
          setFormSubmitted(true);
          resetForm();
        } else {
          throw new Error("Falha ao enviar email");
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        alert("Erro ao enviar mensagem. Tente novamente ou use o canal via WhatsApp.");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (metodoComunicacao === "whatsapp") {
      handleWhatsAppSubmit(e);
    } else {
      handleEmailSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pt-[60px] pb-20 relative overflow-hidden">
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-red-500/5 via-slate-100/40 to-transparent pointer-events-none -z-10" />

      {/* 1. HERO HEADER */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/80 mb-4 shadow-xs">
            <Sparkles size={13} className="text-red-600" />
            Canais de Atendimento
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Fale com os Nossos Especialistas
          </h1>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-3 mb-4 rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            Estamos prontos para atender as necessidades tecnológicas da sua empresa em Angola.
            Escolha o canal de sua preferência ou envie uma mensagem direta abaixo.
          </p>
        </motion.div>
      </header>

      {/* 2. CARDS DE ATENDIMENTO RÁPIDO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card WhatsApp */}
          <motion.a
            href="https://wa.me/244947137676"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-[5px] bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">WhatsApp Oficial</h2>
              <p className="text-xs text-gray-500 mb-3">Atendimento imediato em tempo real</p>
              <p className="text-sm font-semibold text-gray-800 font-mono">+244 947 137 676</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
              <span>Iniciar conversa</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Card E-mail */}
          <motion.a
            href="mailto:geral@maisresultados.co.ao"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-[5px] bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Mail size={22} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  Corporativo
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">E-mail Comercial</h2>
              <p className="text-xs text-gray-500 mb-3">Para propostas e parcerias</p>
              <p className="text-sm font-semibold text-gray-800 break-all">geral@maisresultados.co.ao</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
              <span>Enviar mensagem</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Card Escritório */}
          <motion.a
            href="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-[5px] bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <MapPin size={22} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                  Sede Luanda
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">Visite a Nossa Sede</h2>
              <p className="text-xs text-gray-500 mb-3">Distrito Urbano do Talatona</p>
              <p className="text-xs font-medium text-gray-800 leading-snug">
                Condomínio Jardins do Talatona, Torre 5 - Nº 003, Luanda
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-red-600 group-hover:text-red-700">
              <span>Abrir no Google Maps</span>
              <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.a>
        </div>
      </section>

      {/* 3. GRID PRINCIPAL (INFORMAÇÕES + FORMULÁRIO) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUNA ESQUERDA: Informações, Horários, Mapa & Confiança (5 colunas) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card: Horário de Funcionamento */}
            <div className="bg-white rounded-[5px] border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[5px] bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Horário de Operação</h3>
                  <p className="text-xs text-gray-500">Fuso horário: Luanda (WAT / GMT+1)</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Segunda a Sexta</span>
                  <span className="font-semibold text-gray-900">08:00 — 17:00</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Sábado e Domingo</span>
                  <span className="text-gray-500 italic">Plantão de Suporte Técnico</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Suporte 24/7
                  </span>
                  <span className="text-gray-500">Contratos Corporativos</span>
                </div>
              </div>
            </div>

            {/* Card: Mapa Integrado */}
            <div className="bg-white rounded-[5px] border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative w-full h-[220px] bg-slate-100">
                <iframe
                  title="Localização da Envisio em Talatona"
                  src="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  aria-label="Mapa da Envisio em Talatona"
                />
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <MapPin size={14} className="text-red-600 shrink-0" />
                  <span className="truncate font-medium">Condomínio Jardins do Talatona</span>
                </div>
                <a
                  href="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0">
                  Rotas <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Card: Compromissos & Prova Social */}
            <div className="bg-gradient-to-br from-slate-900 to-black text-white p-6 rounded-[5px] shadow-lg border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-red-500" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Compromisso Envisio
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Atuamos com consultores e engenheiros certificados no mercado angolano,
                assegurando total confidencialidade e soluções sob medida para a sua operação.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>Atendimento Ágil</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>Presença Local</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>Sistemas Homologados</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>Suporte Contínuo</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Formulário Ultra-Moderno (7 colunas) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[5px] border border-gray-200 p-6 sm:p-8 shadow-xl relative">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Envie a Sua Mensagem
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Preencha o formulário e a nossa equipa entrará em contacto prontamente.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. SELETOR DE CLIENTE (TABS MODERNAS) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Perfil de Contacto
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-[5px] border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setTipoCliente("singular")}
                      className={`py-2 px-3 rounded-[4px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        tipoCliente === "singular"
                          ? "bg-white text-red-600 shadow-xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                      <User size={14} />
                      <span>Pessoa Singular</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoCliente("empresa")}
                      className={`py-2 px-3 rounded-[4px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        tipoCliente === "empresa"
                          ? "bg-white text-red-600 shadow-xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                      <Building2 size={14} />
                      <span>Empresa / Corporativo</span>
                    </button>
                  </div>
                </div>

                {/* 2. CAMPOS DINÂMICOS DEPENDENDO DO TIPO DE CLIENTE */}
                {tipoCliente === "singular" ? (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nome Completo <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Manuel António Domingos"
                      className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Nome do Responsável <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Carlos"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="apelido"
                          className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Apelido / Sobrenome <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="apelido"
                          name="apelido"
                          type="text"
                          required
                          value={formData.apelido}
                          onChange={handleInputChange}
                          placeholder="Ex: Ferreira"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="empresa"
                          className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Nome da Empresa <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="empresa"
                          name="empresa"
                          type="text"
                          required
                          value={formData.empresa}
                          onChange={handleInputChange}
                          placeholder="Ex: Petrogás Angola Lda"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="nif"
                          className="block text-xs font-semibold text-gray-700 mb-1.5">
                          NIF da Empresa <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="nif"
                          name="nif"
                          type="text"
                          required
                          value={formData.nif}
                          onChange={handleInputChange}
                          placeholder="Ex: 5418000000"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CONTATOS (E-MAIL E TELEFONE) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-gray-700 mb-1.5">
                      E-mail <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@empresa.co.ao"
                      className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+244 9XX XXX XXX"
                      className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition font-mono text-xs"
                    />
                  </div>
                </div>

                {/* 4. ÁREA DE INTERESSE */}
                <div>
                  <label
                    htmlFor="area"
                    className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Área de Interesse <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="area"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition cursor-pointer">
                    <option value="">Selecione o serviço pretendido</option>
                    <option value="Renting de Equipamentos">Renting de Equipamentos & Impressoras</option>
                    <option value="Sistemas de Segurança">Sistemas de Segurança & Redes (CCTV / Biometria)</option>
                    <option value="Instalação de ERP">Instalação & Suporte a Sistemas ERP (Primavera)</option>
                    <option value="Desenvolvimento Web">Desenvolvimento Web & Software Sob Medida</option>
                    <option value="Consultoria em TI">Consultoria em TI & Auditoria de Sistemas</option>
                    <option value="Consultoria Digital">Consultoria Digital & Automação de Processos</option>
                    <option value="Outro Assunto">Outro Assunto / Suporte Geral</option>
                  </select>
                </div>

                {/* 5. MENSAGEM */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Mensagem / Detalhes do Projeto <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva brevemente a sua necessidade ou solicite uma proposta..."
                    className="w-full px-3.5 py-2.5 rounded-[5px] border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition resize-none"
                  />
                </div>

                {/* 6. MÉTODO DE ENVIO (CARDS SELECIONÁVEIS) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Canal de Envio Preferencial <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMetodoComunicacao("whatsapp")}
                      className={`p-3 rounded-[5px] border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        metodoComunicacao === "whatsapp"
                          ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}>
                      <WhatsAppIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900">WhatsApp</span>
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                            Direto
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Abre mensagem formatada no app
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoComunicacao("email")}
                      className={`p-3 rounded-[5px] border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        metodoComunicacao === "email"
                          ? "border-red-500 bg-red-50/60 ring-2 ring-red-500/20"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}>
                      <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-gray-900">E-mail</span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Envia diretamente para a central
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 7. BOTÃO DE SUBMISSÃO */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 rounded-[5px] text-sm font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    metodoComunicacao === "whatsapp"
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                      : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                  }`}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processando envio...</span>
                    </>
                  ) : (
                    <>
                      {metodoComunicacao === "whatsapp" ? (
                        <>
                          <WhatsAppIcon className="w-5 h-5 text-white" />
                          <span>Enviar Mensagem via WhatsApp</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Enviar Mensagem via E-mail</span>
                        </>
                      )}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 4. MODAL DE SUCESSO MODERNO COM FRAMER MOTION */}
      <AnimatePresence>
        {formSubmitted && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setFormSubmitted(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center relative overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                Mensagem Registada com Sucesso!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Obrigado pelo seu contacto. A nossa equipa analisará o seu pedido e
                retornará em breve pelo canal indicado.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-[5px] text-sm shadow-md transition-colors cursor-pointer">
                Concluir
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contato;
