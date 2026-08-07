/** @format */

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
} from "lucide-react";

export default function ContatoAcademia() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nome && formData.email && formData.mensagem) {
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setFormData({
          nome: "",
          email: "",
          assunto: "",
          mensagem: "",
        });
      }, 4000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-['Segoe_UI_Variable_Text',sans-serif] text-slate-800">
      {/* 1. Hero Header */}
      <section className="relative bg-white text-slate-900 overflow-hidden min-h-screen lg:h-screen flex flex-col justify-center pt-14 pb-12 border-b border-gray-100">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F3F4F6_1px,transparent_1px),linear-gradient(to_bottom,#F3F4F6_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50 z-0" />

        {/* Lado Direito (Desktop Full-Bleed Background Image) */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] xl:w-[54%] h-full z-10 hidden lg:block overflow-hidden">
          {/* Curve mask separator */}
          <svg
            className="absolute left-0 top-0 h-full w-24 text-white fill-current z-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <path d="M0,0 L100,0 C60,20 30,70 0,100 Z" />
          </svg>

          {/* Generated Customer Support Woman Image */}
          <img
            src="/images/support_hero_bg.png"
            alt="Atendimento e Suporte Envisio"
            className="w-full h-full object-cover object-top select-none transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Left Side Content Container */}
        <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-20 w-full flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left w-full">
              <h1 className="text-[32px] sm:text-4xl md:text-5xl font-black mb-6 leading-[1.1] text-[#111827] tracking-tight">
                Fale connosco e tire as suas dúvidas.
              </h1>
              <p className="text-base md:text-lg text-[#374151] leading-relaxed max-w-md">
                Entre em contacto com a nossa equipa para informações sobre
                formações, inscrições e apoio pedagógico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conteúdo Principal inspirada na imagem de referência */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Coluna da Esquerda: Logótipo Flutuante (Mover Apenas o Logótipo para Cima) + Grelha de Contactos */}
            <div className="lg:col-span-6 flex flex-col justify-center h-full py-2">
              <div className="flex flex-col items-center lg:items-start space-y-8">
                {/* Logótipo em Círculo Flutuante Grande (50% Maior) */}
                <div className="flex items-center justify-start ml-2 sm:ml-6 lg:ml-24 -mt-6 sm:-mt-10 mb-4">
                  <div className="relative inline-flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] bg-slate-900 rounded-full shadow-2xl border-[5px] border-white hover:scale-105 transition-transform duration-500 flex-shrink-0">
                    <img
                      src="/academia/logo.svg"
                      alt="Envisio Logo"
                      className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 object-contain"
                    />
                    {/* Soft halo glow */}
                    <div className="absolute -inset-4 rounded-full pointer-events-none -z-10 blur-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Cartão do Formulário Médio/Compacto com Curva de 5px */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[5px] p-6 sm:p-8 shadow-sm w-full max-w-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-1.5 tracking-tight">
                  Envie uma Mensagem
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Preencha os seus dados e objetivos para que a nossa equipa
                  pedagógica possa orientar a sua carreira.
                </p>

                {enviado ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-[5px] p-6 text-center space-y-2">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-emerald-900">
                      Mensagem Enviada!
                    </h4>
                    <p className="text-xs text-emerald-700 max-w-xs mx-auto leading-relaxed">
                      Obrigado pelo seu contacto. Entraremos em contacto consigo
                      muito em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        placeholder="Ex: João Silva"
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="seu.email@exemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Assunto
                      </label>
                      <input
                        type="text"
                        value={formData.assunto}
                        onChange={(e) =>
                          setFormData({ ...formData, assunto: e.target.value })
                        }
                        placeholder="Ex: Informações sobre cursos ou inscrições"
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Mensagem
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.mensagem}
                        onChange={(e) =>
                          setFormData({ ...formData, mensagem: e.target.value })
                        }
                        placeholder="Escreva aqui a sua mensagem..."
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="btn-academia-primary px-6 py-2.5 text-xs flex items-center gap-2 group cursor-pointer">
                        <span>Enviar mensagem</span>
                        <ArrowRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mapa de Localização Interativo Full Width e Quadrado */}
      <section className="w-full bg-slate-100">
        <div className="w-full h-[400px] sm:h-[480px] border-b border-slate-200 relative">
          <iframe
            title="Localização Academia Envisio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.67389278912!2d13.1812!3d-8.9189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTUnMDguMCJTIDEzwrAxMCc1Mi4zIkU!5e0!3m2!1spt-PT!2sao!4v1620000000000!5m2!1spt-PT!2sao"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          />

          {/* Card Flutuante com Endereço sobre o mapa */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 max-w-xs z-10 hidden sm:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-1">
              Sede Academia Envisio
            </span>
            <p className="text-xs font-bold text-slate-900 mb-1">
              Edifício Envisio, Via AL 14
            </p>
            <p className="text-[11px] text-slate-500 leading-snug">
              Talatona, Luanda - Angola
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:text-red-600 mt-3 transition-colors">
              <span>Abrir no Google Maps</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
