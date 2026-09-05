/** @format */

import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { useCurso } from "../../hooks/useCurso";
import { useCursos } from "../../hooks/useCursos";
import {
  Award,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  Star,
  Check,
  Clock,
  BarChart,
  Users,
  ShieldCheck,
  CheckCircle2,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Lock,
} from "lucide-react";

import Spinner from "../../componentes/Spinner";
import ModalVideo from "../../componentes/ModalVideo";
import FormularioInscricao from "../../componentes/FormularioInscricao";
import LayoutAcademia from "../../componentes/LayoutAcademia";
import { isCursoAtivo } from "../../servicos/cursoService";

export default function CursoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const courseId = id || "gestao-recursos-humanos";
  const { curso, carregando, erro } = useCurso(courseId);
  const { cursos } = useCursos();

  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [videoUrl] = useState("");

  const [moduloAberto, setModuloAberto] = useState<number | null>(null); // Fechado por padrão
  const [topicosAbertos, setTopicosAbertos] = useState<Record<string, boolean>>({});

  const toggleTopico = (chave: string) => {
    setTopicosAbertos((prev) => ({
      ...prev,
      [chave]: !prev[chave],
    }));
  };

  const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false);
  const [modalFormadorAberto, setModalFormadorAberto] = useState(false);

  // Formações recomendadas dinâmicas e interligadas (exclui o curso atual)
  const cursosRecomendados = useMemo(() => {
    if (!cursos || cursos.length === 0) return [];
    return cursos.filter((c) => c.id !== (curso?.id || courseId)).slice(0, 4);
  }, [cursos, curso, courseId]);

  if (carregando) return <Spinner />;

  if (erro || !curso) {
    return (
      <LayoutAcademia>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
          <div className="text-center max-w-md p-8 bg-white rounded-[5px] shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Curso não encontrado
            </h2>
            <p className="mb-6 text-slate-600 text-sm">
              O curso solicitado não foi encontrado no nosso catálogo.
            </p>
            <Link
              to="/academia/cursos"
              className="px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-[4px] hover:bg-red-700 transition">
              Voltar para Cursos
            </Link>
          </div>
        </div>
      </LayoutAcademia>
    );
  }

  const ativo = isCursoAtivo(curso);

  // Se o curso for upcoming / indisponível
  if (!ativo) {
    return (
      <LayoutAcademia>
        <div className="bg-slate-50 min-h-screen py-16 text-left">
          <div className="max-w-4xl mx-auto px-4 pt-12">
            <button
              onClick={() => navigate("/academia/cursos")}
              className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors text-xs font-bold cursor-pointer">
              <ArrowLeft className="mr-2" size={16} />
              Voltar para Cursos
            </button>

            <div className="bg-white p-8 sm:p-12 rounded-[5px] shadow-sm border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <Lock size={32} />
              </div>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider rounded-full">
                Formação Futura / Em breve
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {curso.titulo}
              </h1>
              <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                {curso.descricao}
              </p>
              <p className="text-xs font-medium text-amber-800 bg-amber-50 p-4 rounded-[4px] border border-amber-200 inline-block">
                Esta formação estará disponível brevemente. As inscrições e o
                programa completo ainda não foram abertos.
              </p>
              <div>
                <button
                  onClick={() => navigate("/academia/cursos")}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-[4px] cursor-pointer transition-colors">
                  Explorar Outras Formações
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutAcademia>
    );
  }

  const instrutor =
    typeof curso.instrutor === "object" && curso.instrutor !== null
      ? curso.instrutor
      : {
          nome: (curso.instrutor as string) || "Dorivaldo José",
          bio: "Especialista em Gestão de Pessoas & Legislação Laboral",
          cargo: "Formador Principal",
        };

  const modulosFonte = curso.modulos || [];

  return (
    <LayoutAcademia>
      <div
        className="bg-slate-50 min-h-screen text-slate-800 text-left"
        style={{
          fontFamily:
            "'Segoe UI Variable Text', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
        {/* ─── 1. HERO SECTION DO CURSO ─── */}
        <section className="bg-white relative border-b border-slate-200 overflow-hidden select-none pt-14 sm:pt-16">
          {/* Banner Principal com a imagem posicionada à direita exatamente como na home */}
          <div className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex items-center pb-8 sm:pb-12">
            {/* Grid / Layout: Lado Esquerdo Conteúdo do Curso */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* COLUNA ESQUERDA: Texto e Botões */}
                <div className="lg:col-span-6 xl:col-span-5 text-left pr-0 lg:pr-4">
                  {/* Título Principal */}
                  <h1 className="text-3xl sm:text-4xl lg:text-[35px] xl:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-4">
                    {curso.titulo}
                  </h1>

                  {/* Descrição */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-md font-normal mb-6">
                    {curso.subcategoria || curso.descricao}
                  </p>

                  {/* Botões de Ação na Hero */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setModalInscricaoAberto(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[4px] font-bold text-xs uppercase tracking-wider transition duration-300 shadow-sm cursor-pointer">
                      Inscrever-se Agora
                    </button>
                    <button
                      onClick={() => {
                        const elem = document.getElementById(
                          "conteudo-programatico",
                        );
                        if (elem) elem.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-[#f1f3f5] hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-[4px] font-bold text-xs uppercase tracking-wider transition duration-300 border border-slate-200 cursor-pointer">
                      Saiba Mais
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Imagem Completa (Posição Idêntica à Página Inicial) */}
            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[48%] xl:w-[46%] items-center justify-end select-none z-10">
              <img
                src={
                  curso.id === "cegid-primavera" || curso.id === "primavera"
                    ? "/academia/Cegid.png"
                    : curso.id === "gestao-recursos-humanos" || !curso.imagemUrl
                      ? "/academia/imagem_rh.png"
                      : curso.imagemUrl
                }
                alt={curso.titulo}
                className="w-full h-auto object-contain max-h-[380px] border-0 outline-none shadow-none"
              />
            </div>
          </div>
        </section>
        {/* ─── 2. MAIN CONTENT & STICKY SIDEBAR SECTION ───────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative items-start">
            {/* LEFT COLUMN: Course Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Box 1: Sobre a Formação */}
              <div className="bg-white rounded-[5px] p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Sobre a Formação
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm font-normal">
                  {curso.descricao}
                </p>
              </div>

              {/* Box 2: Conteúdo Programático (Acordeão Compacto Estilo Home) */}
              <div
                id="conteudo-programatico"
                className="bg-white rounded-[8px] p-5 sm:p-6 border border-slate-200/80 shadow-xs scroll-mt-24 text-left">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Conteúdo Programático
                    </h3>
                    <div className="w-8 h-[2px] bg-red-600 rounded-full mt-1.5 mb-1.5" />
                    <p className="text-slate-500 text-[11px]">
                      Explore os módulos práticos estruturados pelos nossos
                      especialistas.
                    </p>
                  </div>
                  <span className="text-sm font-bold text-red-600">
                    {modulosFonte.length} Módulos
                  </span>
                </div>

                {/* Módulos Compactos */}
                <div className="space-y-2">
                  {modulosFonte.map((modulo: any, index: number) => {
                    const temTopicos =
                      (modulo.topicos && modulo.topicos.length > 0) ||
                      (modulo.conteudos && modulo.conteudos.length > 0);
                    const temEstruturaTopicos =
                      modulo.topicos && modulo.topicos.length > 0;
                    const estaAberto = moduloAberto === index;

                    const totalTopicos = temEstruturaTopicos
                      ? modulo.topicos.length
                      : modulo.conteudos?.length || 0;

                    return (
                      <div
                        key={modulo.id || index}
                        className="border border-slate-200/80 rounded-[5px] overflow-hidden bg-white shadow-2xs">
                        {temTopicos ? (
                          <button
                            onClick={() =>
                              setModuloAberto(estaAberto ? null : index)
                            }
                            className="w-full px-4 py-2.5 sm:px-4 sm:py-3 text-left flex justify-between items-center bg-white hover:bg-slate-50/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 min-w-0 pr-3">
                              <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-[10.5px] text-slate-500 font-medium flex-shrink-0 bg-slate-50">
                                {String(index + 1).padStart(2, "0")}
                              </div>
                              <div>
                                <h4 className="font-semibold text-xs sm:text-[13px] text-slate-800 leading-tight">
                                  {modulo.titulo.startsWith("Módulo")
                                    ? modulo.titulo
                                    : `Módulo ${index + 1}: ${modulo.titulo}`}
                                </h4>
                                <p className="text-[10px] sm:text-[10.5px] text-slate-400 font-normal mt-0.5">
                                  {modulo.duracao
                                    ? `${modulo.duracao} • ${modulo.regime || "Teórico-prático"}${
                                        totalTopicos > 0
                                          ? ` • ${totalTopicos} tópicos`
                                          : ""
                                      }`
                                    : totalTopicos > 0
                                      ? `${totalTopicos} tópicos`
                                      : "Módulo prático"}
                                </p>
                              </div>
                            </div>

                            <ChevronDown
                              className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                estaAberto
                                  ? "transform rotate-180 text-slate-700"
                                  : ""
                              }`}
                              size={16}
                            />
                          </button>
                        ) : (
                          <div className="w-full px-4 py-2.5 sm:px-4 sm:py-3 text-left flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-[10.5px] text-slate-500 font-medium flex-shrink-0 bg-slate-50">
                                {String(index + 1).padStart(2, "0")}
                              </div>
                              <div>
                                <h4 className="font-semibold text-xs sm:text-[13px] text-slate-800 leading-tight">
                                  {modulo.titulo.startsWith("Módulo")
                                    ? modulo.titulo
                                    : `Módulo ${index + 1}: ${modulo.titulo}`}
                                </h4>
                                <p className="text-[10px] sm:text-[10.5px] text-slate-400 font-normal mt-0.5">
                                  {modulo.duracao
                                    ? `${modulo.duracao} • ${modulo.regime || "Teórico"}`
                                    : "Módulo prático"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {temTopicos && estaAberto && (
                          <div className="bg-white border-t border-slate-100">
                            {temEstruturaTopicos ? (
                              <div className="divide-y divide-slate-100">
                                {modulo.topicos.map(
                                  (topico: any, tIdx: number) => {
                                    const chave = `${index}-${tIdx}`;
                                    const temSub =
                                      topico.subtopicos &&
                                      topico.subtopicos.length > 0;
                                    const isTopicoOpen =
                                      !!topicosAbertos[chave];

                                    return (
                                      <div
                                        key={tIdx}
                                        className="transition-colors">
                                        {/* Tópico: linha limpa com borda inferior divisória quando aberto */}
                                        {temSub ? (
                                          <button
                                            type="button"
                                            onClick={() => toggleTopico(chave)}
                                            className={`w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer group ${
                                              isTopicoOpen
                                                ? "border-b border-slate-200/80 bg-slate-50/40"
                                                : ""
                                            }`}>
                                            <div className="flex items-center gap-2 min-w-0 pr-3">
                                              <span
                                                className={`text-xs sm:text-[13px] font-medium leading-snug transition-colors ${
                                                  isTopicoOpen
                                                    ? "text-red-600 font-semibold"
                                                    : "text-slate-800 group-hover:text-red-600"
                                                }`}>
                                                {topico.titulo}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                              <span className="text-[10px] sm:text-[10.5px] text-slate-400 font-normal group-hover:text-slate-500 transition-colors">
                                                {topico.subtopicos.length}{" "}
                                                {topico.subtopicos.length === 1
                                                  ? "subtópico"
                                                  : "subtópicos"}
                                              </span>
                                              <ChevronDown
                                                size={14}
                                                className={`text-slate-400 transition-transform duration-200 ${
                                                  isTopicoOpen
                                                    ? "transform rotate-180 text-red-600"
                                                    : "group-hover:text-slate-600"
                                                }`}
                                              />
                                            </div>
                                          </button>
                                        ) : (
                                          <div className="w-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center">
                                            <span className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                                              {topico.titulo}
                                            </span>
                                          </div>
                                        )}

                                        {/* Subtópicos em cascata - formato em árvore com linha guia vertical subtil */}
                                        {temSub && isTopicoOpen && (
                                          <div className="px-4 sm:px-5 py-3 bg-slate-50/40">
                                            <div className="ml-1 sm:ml-2 pl-3 sm:pl-3.5 border-l-2 border-slate-200 space-y-2 py-1">
                                              {topico.subtopicos.map(
                                                (sub: string, sIdx: number) => (
                                                  <div
                                                    key={sIdx}
                                                    className="text-[11px] sm:text-[11.5px] text-slate-600 flex items-start gap-2.5 leading-relaxed">
                                                    <FileText
                                                      className="text-slate-400 flex-shrink-0 mt-0.5"
                                                      size={13}
                                                    />
                                                    <span>{sub}</span>
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            ) : (
                              <div className="divide-y divide-slate-100">
                                {modulo.conteudos.map(
                                  (topico: string, tIdx: number) => (
                                    <div
                                      key={tIdx}
                                      className="px-4 py-2 sm:py-2.5 flex items-center gap-2.5 hover:bg-slate-50/80 transition-colors">
                                      <FileText
                                        className="text-slate-400 flex-shrink-0"
                                        size={13.5}
                                      />
                                      <span className="text-[11px] sm:text-[11.5px] font-normal text-slate-700 leading-relaxed">
                                        {topico}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box 3: Público-Alvo (Abaixo do Conteúdo Programático) */}
              <div className="bg-white rounded-[5px] p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
                <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2 text-red-600">
                  <Users size={18} className="text-red-600" />
                  <span>PÚBLICO-ALVO</span>
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  {curso.targetAudience ||
                    "Técnicos e Gestores de Recursos Humanos, Juristas Laborais, Responsáveis Administrativos, Diretores e Quadros de Gestão de Pessoas."}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Formador -> Depoimentos -> Requisitos -> Card de Inscrição (4 Cols) */}
            <div className="lg:col-span-4 relative z-30 space-y-6">
              {/* 1. Card do Formador Responsável (Com botão Ver Mais para o Modal) */}
              <div className="bg-white rounded-[5px] p-6 border border-slate-200/80 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Formador Responsável
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-xl border-2 border-slate-200 shadow-sm flex-shrink-0">
                    {instrutor.nome ? instrutor.nome.charAt(0) : "D"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {instrutor.nome || "Dorivaldo José"}
                    </h3>
                    <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-2">
                      {instrutor.cargo ||
                        "Especialista em Gestão de Pessoas & Legislação Laboral"}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                      {instrutor.bio ||
                        "Vasta experiência prática em consultoria laboral, enquadramento de RH e formação executiva."}
                    </p>
                    <button
                      onClick={() => setModalFormadorAberto(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-colors cursor-pointer">
                      <span>Ver mais sobre o formador</span>
                      <ArrowLeft size={13} className="transform rotate-180" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Card dos Requisitos da Formação */}
              <div className="bg-white rounded-[5px] p-6 border border-slate-200/80 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Requisitos da Formação
                </h2>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Computador portátil com acesso à internet para
                      acompanhamento prático.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Interesse em legislação laboral, relações de trabalho e
                      ERP Primavera.
                    </span>
                  </li>
                </ul>
              </div>

              {/* 4. Card de Informações e Inscrição (Com Banner Faça a sua inscrição como na home) */}
              <div className="bg-white rounded-[5px] border border-slate-200 shadow-sm hover:shadow-md overflow-hidden transition-shadow">
                {/* Banner com fundo cinza claro e escrita centralizada */}
                <div className="h-32 sm:h-36 bg-gradient-to-b from-slate-200 to-slate-200 border-b border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Academia Envisio
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-600 tracking-tight">
                    Faça a sua inscrição
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Título do Curso */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1">
                      {curso.titulo}
                    </h3>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck size={14} />
                      <span>Inscrições Abertas — Vagas Limitadas</span>
                    </p>
                  </div>

                  {/* Este Curso Inclui — 3 Especificações Oficiais */}
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-4">
                    Este curso inclui:
                  </h4>
                  <ul className="space-y-3.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-3">
                      <Clock
                        size={16}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span>
                        <strong>{curso.duracao || "60h"}</strong> lectivas
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BarChart
                        size={16}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span>
                        Nível <strong>{curso.nivel || "Intermédio"}</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award
                        size={16}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span>
                        <strong>Certificado de Conclusão</strong> Oficial
                      </span>
                    </li>
                  </ul>

                  {/* Link de Inscrição */}
                  <div className="text-center mt-6 mb-4">
                    <button
                      onClick={() => setModalInscricaoAberto(true)}
                      className="w-full btn-academia-primary py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer shadow-xs">
                      <span>Inscreva-se Agora</span>
                    </button>
                  </div>

                  {/* Share Button */}
                  <div className="pt-4 border-t border-slate-100 text-center">
                    <button
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: curso.titulo,
                              text: `Confira o curso de ${curso.titulo} na Envisio Training Academy!`,
                              url: window.location.href,
                            });
                          } catch (err) {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success(
                              "Link copiado para a área de transferência!",
                            );
                          }
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success(
                            "Link copiado para a área de transferência!",
                          );
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer">
                      <Share2 size={13} />
                      <span>Partilhar este curso</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ─── 3. OUTRAS FORMAÇÕES RECOMENDADAS ──────────────────────────────────── */}
        <section className="bg-slate-100/70 py-16 border-t border-slate-200/80 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Centralizado */}
            <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
              <span className="inline-block px-3 py-1 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 rounded-[4px]">
                Evolução Contínua
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Outras Formações Recomendadas
              </h2>
              <p className="text-slate-500 text-xs mt-2 font-normal max-w-lg">
                Explore formações práticas e especializadas para impulsionar a
                sua carreira no mercado corporativo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cursosRecomendados.map((item) => {
                const ativo = isCursoAtivo(item);
                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      ativo && navigate(`/academia/curso/${item.id}`)
                    }
                    className={`bg-white rounded-[5px] overflow-hidden border border-slate-200/90 shadow-2xs transition-all duration-300 flex flex-col ${
                      ativo
                        ? "cursor-pointer group hover:shadow-md hover:border-slate-300"
                        : "cursor-default select-none"
                    }`}>
                    <div className="h-36 overflow-hidden relative bg-slate-100/50">
                      <img
                        src={item.imagemUrl || "/academia/RH.png"}
                        alt={item.titulo}
                        className={`w-full h-full object-cover object-center ${
                          ativo
                            ? "group-hover:scale-105 transition-transform duration-500"
                            : ""
                        }`}
                      />
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase tracking-wider shadow-sm border border-slate-700/50">
                        {item.categoria || "Formação"}
                      </span>
                      {ativo ? (
                        <span className="absolute top-2.5 right-2.5 bg-white text-slate-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-slate-200">
                          Novo
                        </span>
                      ) : (
                        <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          Em breve
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-white">
                      <h3
                        className={`font-bold text-sm text-slate-900 mb-1.5 line-clamp-1 ${
                          ativo
                            ? "group-hover:text-red-600 transition-colors"
                            : ""
                        }`}>
                        {item.titulo}
                      </h3>
                      <p className="text-[12px] text-slate-500 line-clamp-2 mb-3 leading-relaxed font-normal">
                        {item.descricao}
                      </p>
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                        <span className="text-slate-400 font-medium text-[10px]">
                          {item.duracao || "60h"}
                        </span>
                        {ativo ? (
                          <span className="text-red-600 inline-flex items-center gap-1 text-[11px] font-bold group-hover:underline">
                            Ver curso <ChevronRight size={13} />
                          </span>
                        ) : (
                          <span className="text-slate-400 inline-flex items-center gap-1 text-[11px] font-bold">
                            <Lock size={12} /> Brevemente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/academia/cursos")}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-[5px] transition-all shadow-sm cursor-pointer">
                <span>Ver Todos os Cursos</span>
                <ArrowLeft size={14} className="ml-2 transform rotate-180" />
              </button>
            </div>
          </div>
        </section>
        {/* Modal de Vídeo */}
        <ModalVideo
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          videoUrl={videoUrl}
        />
        {/* Modal de Inscrição */}
        <FormularioInscricao
          isOpen={modalInscricaoAberto}
          onClose={() => setModalInscricaoAberto(false)}
          cursoNome={curso.titulo}
          cursoArea={curso.categoria || "Cursos"}
          onSuccess={() => {
            setModalInscricaoAberto(false);
          }}
        />
        {/* Modal de Detalhes do Formador */}
        {modalFormadorAberto && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[8px] overflow-hidden shadow-2xl relative w-full max-w-3xl border border-slate-100">
              {/* Close Button Floating */}
              <button
                onClick={() => setModalFormadorAberto(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 bg-white hover:bg-slate-100 p-2 rounded-full shadow-md transition-colors border border-slate-100 cursor-pointer"
                aria-label="Fechar">
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[440px]">
                {/* Left Column: Avatar/Initial (5 cols) */}
                <div className="md:col-span-5 h-64 md:h-auto w-full bg-slate-900 flex flex-col items-center justify-center text-white p-6 relative">
                  <div className="w-24 h-24 rounded-full bg-red-600/20 text-red-400 font-extrabold flex items-center justify-center text-4xl border-2 border-red-500/30 mb-3 shadow-lg">
                    {instrutor.nome ? instrutor.nome.charAt(0) : "D"}
                  </div>
                  <h4 className="text-lg font-bold text-center">
                    {instrutor.nome || "Dorivaldo José"}
                  </h4>
                  <p className="text-xs text-slate-400 text-center mt-1">
                    {instrutor.cargo || "Formador Principal"}
                  </p>
                </div>

                {/* Right Column: Info (7 cols) */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center text-left max-h-[500px] overflow-y-auto">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1e1b4b] mb-1 leading-tight">
                    {instrutor.nome || "Dorivaldo José"}
                  </h3>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-6">
                    {instrutor.cargo ||
                      "ESPECIALISTA EM GESTÃO DE PESSOAS & LEGISLAÇÃO LABORAL"}
                  </p>

                  {/* Formação Académica */}
                  <div className="mb-5">
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      FORMAÇÃO ACADÉMICA
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Especialista em Direito do Trabalho, Gestão Estratégica de
                      Recursos Humanos e Processamento de Salários no ERP
                      Primavera.
                    </p>
                  </div>

                  {/* Sobre o Especialista */}
                  <div className="mb-5">
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      SOBRE O ESPECIALISTA
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Com sólida trajetória prática na consultoria e
                      enquadramento laboral sob a Lei n.º 12/23, orienta os
                      formandos na aplicação prática e legal de todas as rotinas
                      do ciclo laboral e fiscal em Angola.
                    </p>
                  </div>

                  {/* Áreas de Foco */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      ÁREAS DE FOCO
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                        LEGISLAÇÃO LABORAL ANGOLANA
                      </span>
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                        ERP PRIMAVERA RH
                      </span>
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                        PROCESSAMENTO SALARIAL & IRT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </LayoutAcademia>
  );
}
