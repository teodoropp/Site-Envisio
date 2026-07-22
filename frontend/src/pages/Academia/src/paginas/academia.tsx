/** @format */

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import { Curso } from "../tipos";

const slides = [
  {
    imagemUrl: "/academia/Slide4.jpg",
    titulo: "Domine Sistemas ERP",
    subtitulo:
      "Aprenda do zero ao avançado com o software de gestão Cegid Primavera e impulsione sua carreira.",
    cta: "Ver Cursos",
    link: "/academia",
  },
  {
    imagemUrl: "/academia/Slide3.jpg",
    titulo: "Sua Carreira Decola Aqui",
    subtitulo:
      "Formação prática com especialistas de mercado e laboratórios totalmente equipados.",
    cta: "Conhecer a Academia",
    link: "/academia",
  },
  {
    imagemUrl: "/academia/Slide1.jpg",
    titulo: "Impulsione seu Aprendizado",
    subtitulo:
      "Aproveite descontos exclusivos nas matrículas para turmas de abertura rápida.",
    cta: "Quero Desconto",
    link: "#inscricao",
  },
  {
    imagemUrl: "/academia/Slide2.jpg",
    titulo: "Certificação Reconhecida",
    subtitulo:
      "Valide as suas competências com um certificado de peso no mercado de trabalho.",
    cta: "Saber Mais",
    link: "/academia",
  },
];

const Academia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    turno: "",
    nivelExperiencia: "",
  });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeCourseTab, setActiveCourseTab] = useState("todos");

  // Favoritos e Partilha
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleShare = async (e: React.MouseEvent, curso: any) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + curso.link;
    if (navigator.share) {
      try {
        await navigator.share({
          title: curso.title,
          text: curso.desc,
          url: url,
        });
      } catch (err) {
        console.error("Erro ao partilhar:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    }
  };

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivos(e.target.files);
      setFileNames(Array.from(e.target.files).map((file) => file.name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !formData.nome ||
      !formData.sobrenome ||
      !formData.email ||
      !formData.turno
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    if (!arquivos || arquivos.length === 0) {
      setError("Por favor, anexe pelo menos um ficheiro PDF.");
      setLoading(false);
      return;
    }

    const invalidFiles = Array.from(arquivos).some(
      (file) => file.type !== "application/pdf",
    );
    if (invalidFiles) {
      setError("Apenas ficheiros PDF são permitidos.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      Array.from(arquivos).forEach((file) => {
        formDataToSend.append(`arquivos`, file);
      });

      const targetUrl = process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/api/email`
        : "https://api.maisresultados.co.ao/api/email";

      await axios.post(targetUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
          turno: "",
          nivelExperiencia: "",
        });
        setFileNames([]);
        setArquivos(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      setError(
        "Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Fallback local para rota fixa (sem :id)
  const cursoLocal: Curso = {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos",
    descricao:
      "O software de gestão mais robusto de Portugal não precisa ser um mistério. Aprenda na prática, do zero ao avançado, e torne-se o profissional que resolve problemas, não que os cria.",
    imagemUrl: "",
    requisitos: ["Nenhum requisito"],
  } as unknown as Curso;

  const cursoExibir = cursoLocal as Curso as Curso;

  return (
    <section className="bg-gray-50 w-full mt-[-64px]">
      {/* Seção 1: Carrossel Publicitário de Alta Qualidade */}
      <div className="relative overflow-hidden w-full h-screen bg-black">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            {/* Imagem de Fundo com efeito Ken Burns */}
            <motion.img
              src={slides[currentSlide].imagemUrl}
              alt={slides[currentSlide].titulo}
              initial={{ scale: 1 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Degradês de sobreposição para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />

            {/* Conteúdo do Slide */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-2xl text-left">
                  {/* Tag Superior */}
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/30 rounded-full">
                    Academia Mais Resultados
                  </motion.span>

                  {/* Título Principal */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {slides[currentSlide].titulo}
                  </motion.h1>

                  {/* Subtítulo */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                    {slides[currentSlide].subtitulo}
                  </motion.p>

                  {/* Botão de Ação (CTA) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}>
                    {slides[currentSlide].link.startsWith("#") ? (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
                        {slides[currentSlide].cta}
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        to={slides[currentSlide].link}
                        className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
                        {slides[currentSlide].cta}
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Setas Laterais de Navegação */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicadores Visuais com Barra de Progresso */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/30"
              style={{ width: currentSlide === idx ? "40px" : "10px" }}>
              {currentSlide === idx && (
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute top-0 bottom-0 right-0 bg-red-500 rounded-full"
                  style={{ width: "100%" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Segunda Seção: Curso em Destaque - Completo e Organizado */}
      <section
        id="curso-destaque"
        className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute w-72 h-72 bg-red-300 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
          {/* Ícones Educacionais */}
          <div className="grid grid-cols-6 gap-20 p-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 opacity-20 transform rotate-45 transition-transform"
                style={{
                  animation: `float ${2 + (i % 3)}s infinite ease-in-out ${
                    i * 0.1
                  }s`,
                }}>
                {i % 3 === 0 && (
                  <svg
                    className="w-full h-full text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                )}
                {i % 3 === 1 && (
                  <svg
                    className="w-full h-full text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                )}
                {i % 3 === 2 && (
                  <svg
                    className="w-full h-full text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Cabeçalho da Seção */}
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 rounded-full">
              Curso em Destaque
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              Cegid Primavera ERP
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl">
              Formação prática de alto nível para dominar as funcionalidades do
              sistema de gestão líder do mercado.
            </p>
          </div>

          {/* Grid Principal: Detalhes, Capa e Apresentação do Curso */}
          <div className="bg-white rounded-[5px] shadow-md border border-gray-200 overflow-hidden mb-16 transition-all duration-300 hover:shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Informações da Capa do Curso */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="flex items-center space-x-2 text-red-400 text-sm font-semibold uppercase mb-4">
                  <span>Qualificação Profissional</span>
                  <span>•</span>
                  <span>Certificação Envisio</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  Funcionalidades e Módulos Corporativos
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  {cursoExibir.descricao ||
                    "O software de gestão mais robusto de Portugal não precisa ser um mistério. Aprenda na prática, do zero ao avançado, e torne-se o profissional que resolve problemas, não que os cria."}
                </p>

                {/* Métricas e Características Rápidas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-gray-400 text-sm">Duração</span>
                    <span className="text-xl font-semibold text-white">
                      120 Horas
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-sm">Formato</span>
                    <span className="text-xl font-semibold text-white">
                      Presencial
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-sm">Idioma</span>
                    <span className="text-xl font-semibold text-white">
                      Português
                    </span>
                  </div>
                </div>
              </div>

              {/* Capa Visual do Curso */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img
                  src="/academia/pagina home/cegid.png"
                  alt="Capa do Curso Cegid Primavera"
                  className="absolute inset-0 w-[120%] h-[105%]  transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid do Conteúdo Programático + Inscrição */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Esquerda: Conteúdo Programático (8 colunas) */}
            <div className="lg:col-span-8 bg-white p-8 rounded-[5px] shadow-sm border border-gray-200 transition-shadow duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Conteúdo Programático
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Explore os módulos práticos estruturados pelos nossos
                    especialistas.
                  </p>
                </div>
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                  {modules.length} Módulos
                </span>
              </div>

              <div className="space-y-4">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    module={module}
                    index={index}
                    isOpen={openModuleIndex === index}
                    onToggle={() =>
                      setOpenModuleIndex(
                        openModuleIndex === index ? null : index,
                      )
                    }
                  />
                ))}
              </div>

              {/* Botão de Ver Detalhes */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                <Link
                  to="/academia/curso1"
                  className="inline-flex justify-center items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-sm">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Mais detalhes do curso
                </Link>
              </div>
            </div>

            {/* Direita: Card Fixo e Formulário/Botão de Inscrição (4 colunas) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-[5px] shadow-md hover:shadow-lg overflow-hidden border border-gray-200 transition-shadow duration-300">
                {/* Imagem do Flyer do Card */}
                <div className="relative h-48 sm:h-56 lg:h-48 overflow-hidden">
                  <img
                    src="/academia/pagina home/inscricao.webp"
                    alt="Inscrições Abertas"
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Conteúdo do Card de Ação */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">
                    Inicie a sua Inscrição
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-900">
                          Duração Completa
                        </span>
                        <span className="text-xs text-gray-500">
                          120 horas lectivas
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-900">
                          Certificação
                        </span>
                        <span className="text-xs text-gray-500">
                          Reconhecida no mercado
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-600/20 text-center text-sm">
                    Fazer Inscrição Agora
                  </button>

                  <a
                    href="https://wa.me/244947137676?text=Olá%20Mais%20Resultados,%20gostaria%20de%20saber%20mais%20sobre%20o%20curso%20Cegid%20Primavera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-300 text-center block hover:bg-gray-50 text-sm">
                    Falar com Consultor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Seção 3: Nossos Cursos ─────────────────────────────────────────── */}
      <section
        id="nossos-cursos"
        className="relative py-16 bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho alinhado à esquerda */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Formações que transformam a sua carreira
            </h2>
            <p className="mt-2 text-base text-gray-500 max-w-2xl">
              Desde fundamentos técnicos até soluções empresariais, a Envisio
              apoia o seu desenvolvimento profissional.
            </p>
          </div>

          {/* Filtros por Categoria */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {[
                { key: "todos", label: "Todos os cursos" },
                { key: "erp", label: "ERP & Gestão" },
                { key: "programacao", label: "Programação" },
                { key: "dados", label: "Dados & BI" },
                { key: "produtividade", label: "Produtividade" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCourseTab(tab.key)}
                  className={`whitespace-nowrap px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                    activeCourseTab === tab.key
                      ? "border-red-600 text-red-700"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Cursos Compactos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                category: "erp",
                title: "Cegid Primavera: Funcionalidades e Módulos",
                desc: "Domine o ERP mais utilizado em Angola e Portugal para gestão empresarial completa.",
                tags: ["120h", "Gestão"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-red-50 text-red-600",
                ],
                link: "/academia/curso1",
                bgHeader: "bg-gray-900",
                badgeText: "ERP",
                badgeColor: "bg-red-600",
                imgSrc: "/academia/pagina home/primavera.svg",
                imgStyle: "opacity-90",
                titleHover: "group-hover:text-red-700",
                iconColor: "text-red-700",
              },
              {
                id: 2,
                category: "programacao",
                title: "Programação Web Frontend",
                desc: "HTML, CSS e JavaScript modernos. Crie interfaces responsivas com boas práticas profissionais.",
                tags: ["Consultar", "Iniciante"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-blue-50 text-blue-600",
                ],
                link: "/academia/curso2",
                bgHeader: "bg-gray-900",
                badgeText: "Web",
                badgeColor: "bg-blue-600",
                imgSrc: "/academia/frontend.jpg",
                imgStyle: "opacity-90",
                titleHover: "group-hover:text-blue-700",
                iconColor: "text-blue-700",
              },
              {
                id: 3,
                category: "programacao",
                title: "Lógica de Programação",
                desc: "Fundamentos de algoritmos, fluxogramas e estruturas de decisão para iniciantes.",
                tags: ["Consultar", "Iniciante"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-green-50 text-green-600",
                ],
                link: "/academia/curso3",
                bgHeader: "bg-gray-900 flex items-center justify-center",
                badgeText: "Base",
                badgeColor: "bg-green-600",
                imgSrc: "/academia/logica.svg",
                imgStyle: "opacity-90",
                titleHover: "group-hover:text-green-700",
                iconColor: "text-green-700",
              },
              {
                id: 4,
                category: "dados",
                title: "SQL Server — Banco de Dados",
                desc: "Consultas SQL, modelagem, procedures, views e administração básica no SQL Server.",
                tags: ["Consultar", "Intermédio"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-purple-50 text-purple-600",
                ],
                link: "/academia/curso4",
                bgHeader: "bg-gray-900 flex items-center justify-center",
                badgeText: "BD",
                badgeColor: "bg-purple-600",
                imgSrc: "/academia/sql.svg",
                imgStyle: "opacity-90",
                titleHover: "group-hover:text-purple-700",
                iconColor: "text-purple-700",
              },
              {
                id: 5,
                category: "dados",
                title: "Power BI — Business Intelligence",
                desc: "Relatórios interativos, dashboards executivos e análises visuais com Microsoft Power BI.",
                tags: ["50h", "Dados"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-orange-50 text-orange-600",
                ],
                link: "/academia/cursos",
                bgHeader:
                  "bg-gradient-to-br from-yellow-800 to-orange-700 flex items-center justify-center",
                badgeText: "BI",
                badgeColor: "bg-orange-600",
                imgStyle: "",
                svgElement: (
                  <svg
                    className="w-20 h-20 text-yellow-200 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                ),
                titleHover: "group-hover:text-orange-600",
                iconColor: "text-orange-600",
              },
              {
                id: 6,
                category: "produtividade",
                title: "Microsoft Excel Avançado",
                desc: "Fórmulas complexas, tabelas dinâmicas, macros VBA e dashboards para análise de dados.",
                tags: ["40h", "Produtividade"],
                tagColors: [
                  "bg-gray-100 text-gray-500",
                  "bg-emerald-50 text-emerald-700",
                ],
                link: "/academia/cursos",
                bgHeader:
                  "bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center",
                badgeText: "Office",
                badgeColor: "bg-emerald-600",
                imgStyle: "",
                svgElement: (
                  <svg
                    className="w-20 h-20 text-emerald-200 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                ),
                titleHover: "group-hover:text-emerald-700",
                iconColor: "text-emerald-700",
              },
            ]
              .filter(
                (curso) =>
                  activeCourseTab === "todos" ||
                  curso.category === activeCourseTab,
              )
              .map((curso, idx) => (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group bg-white rounded-[5px] border border-gray-200 hover:border-gray-300 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer min-h-[460px]">
                  <div
                    className={`relative h-64 overflow-hidden ${curso.bgHeader}`}>
                    {curso.imgSrc ? (
                      <img
                        src={curso.imgSrc}
                        alt={curso.title}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${curso.imgStyle}`}
                      />
                    ) : (
                      curso.svgElement
                    )}
                    <span
                      className={`absolute top-2 left-2 px-3 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm ${curso.badgeColor}`}>
                      {curso.badgeText}
                    </span>
                    
                    {/* Ações: Favorito e Partilhar */}
                    <div className={`absolute top-2 right-2 flex flex-row gap-2 transition-opacity duration-300 ${favorites.includes(curso.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <button 
                        className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-all shadow-sm ${favorites.includes(curso.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                        title={favorites.includes(curso.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                        onClick={(e) => toggleFavorite(e, curso.id)}
                      >
                        <svg className="w-4 h-4" fill={favorites.includes(curso.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                      <button 
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-500 flex items-center justify-center hover:text-blue-500 hover:bg-white hover:scale-110 transition-all shadow-sm"
                        title="Partilhar"
                        onClick={(e) => handleShare(e, curso)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className={`text-base font-bold text-gray-900 leading-snug transition-colors duration-200 mb-3 ${curso.titleHover}`}>
                      {curso.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                      {curso.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {curso.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.5 text-[10px] rounded ${curso.tagColors[i]}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={curso.link}
                        className={`text-xs font-semibold text-gray-900 transition-colors duration-200 flex items-center gap-0.5 group-hover:${curso.iconColor}`}>
                        Ver curso
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Rodapé da seção */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              A mostrar cursos baseados na sua seleção
            </p>
            <Link
              to="/academia/cursos"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-[5px] transition-all duration-200 text-sm">
              Ver todos os cursos
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Seção 4: Depoimentos ─────────────────────────────────────────── */}
      <DepoimentosCarrossel />

      {/* ─── Seção 5: Porquê Escolher a Academia Envisio ─────────────────── */}
      <DiferenciaisSection />

      {/* ─── Seção 6: Perguntas Frequentes (FAQ) ─────────────────────────── */}
      <FaqSection />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white rounded-lg overflow-hidden w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl border border-gray-100">
              {/* Cabeçalho com Imagem do Cegid Primavera */}
              <div className="relative h-40 bg-gray-950 flex items-center justify-center p-4">
                <img
                  src="/academia/pagina home/inscricao.webp"
                  alt="Inscrição Cegid Primavera"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1.5 transition-all z-10">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Inscreva-se no Curso
                </h3>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                {success ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Inscrição Enviada!
                    </h3>
                    <p className="text-gray-600">
                      Obrigado por se inscrever. Entraremos em contato em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nome"
                          className="block text-sm font-semibold text-gray-700">
                          Primeiro Nome *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sobrenome"
                          className="block text-sm font-semibold text-gray-700">
                          Último Nome *
                        </label>
                        <input
                          type="text"
                          id="sobrenome"
                          value={formData.sobrenome}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sobrenome: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telefone"
                        className="block text-sm font-semibold text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) =>
                          setFormData({ ...formData, telefone: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-400 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="empresa"
                        className="block text-sm font-semibold text-gray-700">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        value={formData.empresa}
                        onChange={(e) =>
                          setFormData({ ...formData, empresa: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-400 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-black mb-2">
                          Selecione o turno*
                        </label>

                        {/* Turno A */}
                        <div className="mb-4 border border-gray-200 border-b-gray-300 rounded-[1px] overflow-hidden">
                          <div className="p-4 bg-gray-100">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="turno"
                                value="Turno A"
                                checked={formData.turno === "Turno A"}
                                onChange={() =>
                                  setFormData({ ...formData, turno: "Turno A" })
                                }
                                className="h-4 w-4 text-black ring-black border-b-gray-300 border-gray-300"
                                disabled={loading}
                              />
                              <span className="ml-3 text-sm font-semibold text-blue-700">
                                Turno A
                              </span>
                            </label>
                          </div>
                          {formData.turno === "Turno A" && (
                            <div className="bg-white p-4 mt-[-10px]">
                              <div className="space-y-1">
                                {[
                                  "Segunda a Sexta - 8h às 17h (Presencial)",
                                ].map((option) => (
                                  <div
                                    key={option}
                                    className="py-2 px-3 hover:bg-gray-50 rounded transition-colors">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                                      <span className="text-sm text-gray-700">
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Turno B */}
                        <div className="mb-4 border border-gray-200 border-b-gray-300 rounded-[1px] overflow-hidden">
                          <div className="p-4 bg-gray-100">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="turno"
                                value="Turno B"
                                checked={formData.turno === "Turno B"}
                                onChange={() =>
                                  setFormData({ ...formData, turno: "Turno B" })
                                }
                                className="h-4 w-4 text-black ring-black border-b-gray-300 border-gray-300"
                                disabled={loading}
                              />
                              <span className="ml-3 text-sm font-semibold text-blue-700">
                                Turno B
                              </span>
                            </label>
                          </div>
                          {formData.turno === "Turno B" && (
                            <div className="bg-white p-4 mt-[-10px]">
                              <div className="space-y-1">
                                {[
                                  "Terça - Feira - 19h às 21h (Online)",
                                  "Quarta - Feira - 19h às 21h (Online)",
                                  "Domingo - 9h às 17h (Presencial)",
                                ].map((option) => (
                                  <div
                                    key={option}
                                    className="py-2 px-3 hover:bg-gray-50 rounded transition-colors">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                                      <span className="text-sm text-gray-700">
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {!formData.turno && (
                        <p className="text-sm text-red-500">
                          Por favor, selecione um turno
                        </p>
                      )}
                    </div>

                    {/* Adicione este bloco após o campo de seleção de turno */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nível de Experiência *
                      </label>
                      <select
                        required
                        value={formData.nivelExperiencia}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nivelExperiencia: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-[1px]"
                        disabled={loading}>
                        <option value="">Selecione seu nível</option>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Anexar Ficheiros (PDF) *
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true">
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                              <span>Carregar ficheiros</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                accept=".pdf"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">ou arraste e solte</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF até 10MB</p>
                        </div>
                      </div>
                      {fileNames.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Ficheiros selecionados:</p>
                          <ul className="list-disc pl-5">
                            {fileNames.map((name, index) => (
                              <li key={index}>{name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mensagem"
                        className="block text-sm font-semibold text-gray-700">
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        rows={3}
                        value={formData.mensagem}
                        onChange={(e) =>
                          setFormData({ ...formData, mensagem: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 border border-transparent rounded-[5px] shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50">
                        {loading ? "Enviando..." : "Enviar Inscrição"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Academia;

/* Componentes auxiliares */

const depoimentosData = [
  {
    id: 1,
    nome: "João Silva",
    papel: "Analista Financeiro",
    texto:
      "A formação em Cegid Primavera da Envisio mudou a minha carreira. Consegui automatizar processos que antes levavam dias em apenas algumas horas. Os formadores são excecionais e muito práticos.",
    iniciais: "JS",
  },
  {
    id: 2,
    nome: "Mariana Costa",
    papel: "Gestora de RH",
    texto:
      "Fiz o curso de Recursos Humanos e a plataforma é super intuitiva. A componente prática ajuda imenso a perceber como aplicar a teoria no dia a dia das empresas em Angola.",
    iniciais: "MC",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    papel: "Desenvolvedor Júnior",
    texto:
      "Graças à Academia Envisio, consolidei a minha lógica de programação. Hoje sinto-me muito mais seguro para enfrentar desafios complexos no desenvolvimento de software.",
    iniciais: "PS",
  },
  {
    id: 4,
    nome: "Ana Lima",
    papel: "Consultora de Dados",
    texto:
      "O curso de Power BI foi um divisor de águas. Aprendi a criar dashboards que impressionam a administração da minha empresa logo na primeira apresentação. Recomendo muito!",
    iniciais: "AL",
  },
  {
    id: 5,
    nome: "Carlos Mendes",
    papel: "Diretor de Operações",
    texto:
      "Uma academia que não ensina apenas a usar ferramentas, mas a pensar em soluções empresariais. A certificação deu um peso enorme ao meu currículo profissional.",
    iniciais: "CM",
  },
];

const DepoimentosCarrossel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % depoimentosData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getVisibleItems = () => {
    const total = depoimentosData.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    return [
      { ...depoimentosData[prev], position: "prev" },
      { ...depoimentosData[activeIndex], position: "active" },
      { ...depoimentosData[next], position: "next" },
    ];
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gray-50/50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-left">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 rounded-full">
            Testemunhos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            O que dizem os nossos alunos
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Histórias reais de profissionais que impulsionaram as suas carreiras
            com as formações práticas da Academia Envisio.
          </p>
        </div>

        <div
          className="relative h-[350px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <div className="flex justify-center items-center w-full max-w-5xl relative h-full">
            <AnimatePresence>
              {getVisibleItems().map((item) => {
                const isActive = item.position === "active";
                const isPrev = item.position === "prev";

                return (
                  <motion.div
                    key={`${item.id}-${item.position}`}
                    initial={{ opacity: 0, scale: 0.8, x: isPrev ? -100 : 100 }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.85,
                      x: isActive ? 0 : isPrev ? "-60%" : "60%",
                      zIndex: isActive ? 30 : 10,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                    }}
                    exit={{ opacity: 0, scale: 0.8, x: isPrev ? -100 : 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute w-full max-w-md bg-white rounded-[5px] p-8 shadow-xl border ${isActive ? "border-red-100 shadow-red-900/5" : "border-gray-200"} flex flex-col`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${isActive ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                        {item.iniciais}
                      </div>
                      <div>
                        <h4
                          className={`font-bold text-lg ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                          {item.nome}
                        </h4>
                        <span className="text-sm font-medium text-gray-400">
                          {item.papel}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 relative">
                      <svg
                        className="absolute -top-4 -left-2 w-8 h-8 text-gray-100"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p
                        className={`relative z-10 text-base leading-relaxed ${isActive ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                        "{item.texto}"
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Controladores */}
        <div className="flex justify-center items-center gap-3 mt-8 relative z-40">
          {depoimentosData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${activeIndex === idx ? "w-8 h-2.5 bg-red-600" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* Componentes auxiliares */
type ModuleCardProps = {
  module: {
    title: string;
    topics: string[];
  };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  index,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-50 rounded-[5px] overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <button
        onClick={onToggle}
        className={`w-full px-5 py-3 flex items-center justify-between transition-colors duration-200 ${
          isOpen ? "bg-gray-100" : "hover:bg-gray-100"
        }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-600 border border-gray-300">
            <span className="font-medium text-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-base font-medium text-gray-700">
              {module.title}
            </h3>
            <p className="text-xs text-gray-500">
              {module.topics.length} tópicos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-t border-gray-200">
            <div className="p-2 space-y-1">
              {module.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Dados dos módulos
const modules = [
  {
    title: "Módulo 1: Conceitos Base de ERP",
    topics: [
      "O que é um ERP",
      "História e evolução do ERP",
      "Por que é importante",
      "Como funciona um sistema ERP",
      "Tipos de implementação de ERP",
      "Seis principais benefícios do ERP",
    ],
  },
  {
    title: "Módulo 2: Instalação e Administração do ERP Primavera",
    topics: [
      "Instalação do software",
      "Enquadramento e conceitos iniciais",
      "Criação e gestão de empresas",
      "Manutenção de dados fundamentais",
      "Gestão de utilizadores e segurança",
      "Configurações avançadas",
    ],
  },
  {
    title: "Módulo 3: Logística e Gestão de Inventário",
    topics: [
      "Documentos de compras e vendas",
      "Gestão de stock e inventário",
      "Movimentos e validações",
      "Relatórios e análises",
      "Processos de inventariação",
    ],
  },
  {
    title: "Módulo 4: Gestão Financeira e Contabilística",
    topics: [
      "Contabilidade básica",
      "Gestão de tesouraria",
      "Processos contabilísticos",
      "Relatórios financeiros",
      "Encerramento de contas",
    ],
  },
];

/* ─── FAQ Section ────────────────────────────────────────────────────────── */
const faqs = [
  {
    pergunta: "Os certificados emitidos são reconhecidos pelo mercado?",
    resposta: "Sim. A Academia Envisio emite certificados com validade e reconhecimento no mercado profissional de Angola, atestando de forma robusta as suas competências."
  },
  {
    pergunta: "Preciso de experiência prévia para iniciar uma formação?",
    resposta: "Depende do curso. Formações como 'Lógica de Programação' ou 'Conceitos Base de ERP' começam do zero. Já cursos de nível Avançado podem exigir conhecimentos prévios que estarão descritos na página de detalhes do curso."
  },
  {
    pergunta: "Existe a possibilidade de pagar o curso em prestações?",
    resposta: "Sim! Sabemos que a flexibilidade é importante. Fale com um dos nossos consultores para conhecer os nossos planos de pagamento faseado adequados à sua realidade financeira."
  },
  {
    pergunta: "As aulas são mais teóricas ou práticas?",
    resposta: "A nossa metodologia é 80% prática e 20% teórica. O foco é prepará-lo para situações reais do mercado de trabalho, resolvendo casos práticos em laboratórios equipados."
  },
  {
    pergunta: "As formações são presenciais ou online?",
    resposta: "Atualmente, a maioria das nossas turmas funciona no formato presencial nas nossas instalações. Isso garante uma melhor imersão, foco e acompanhamento direto e imediato pelo formador especialista."
  }
];

/* ─── Diferenciais Section ───────────────────────────────────────────────── */
const DiferenciaisSection = () => {
  const beneficios = [
    {
      titulo: "Professores Especialistas",
      descricao: "Aprenda com profissionais ativos no mercado que trazem a realidade do dia-a-dia empresarial para dentro da sala de aula.",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      titulo: "Componente 100% Prática",
      descricao: "Chega de teoria exaustiva. A nossa metodologia foca na resolução de problemas reais usando ferramentas modernas.",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      titulo: "Laboratórios Equipados",
      descricao: "Tenha acesso a computadores de alto desempenho e ao software Cegid Primavera já instalado para um treino imersivo.",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Mercado de Trabalho",
      descricao: "Certificação de peso e parcerias com empresas locais que ajudam a encaminhar os nossos alunos para o emprego.",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-left">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 rounded-full">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Porquê escolher a Academia Envisio?</h2>
          <p className="text-lg text-gray-500">
            A nossa prioridade não é apenas emitir diplomas, mas sim capacitar profissionais para as reais necessidades do tecido empresarial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-4 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                {item.icone}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{item.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeira aberta por padrão
  const [contactData, setContactData] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.nome || !contactData.email || !contactData.mensagem) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setTimeout(() => {
      setStatus('');
      setContactData({ nome: '', email: '', mensagem: '' });
    }, 3000);
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-left">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 rounded-full">
            Tira-Teimas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-500 max-w-2xl">Tudo o que precisa de saber antes de dar o próximo passo na sua carreira.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Accordion (Left) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white border ${isOpen ? 'border-red-200 shadow-md' : 'border-gray-200 shadow-sm'} rounded-[5px] overflow-hidden transition-all duration-200`}
                >
                  <button
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={`font-semibold text-lg ${isOpen ? 'text-red-600' : 'text-gray-900'}`}>
                      {faq.pergunta}
                    </span>
                    <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
                      <svg className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed text-base">
                          {faq.resposta}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[5px] shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ainda tem dúvidas?</h3>
              <p className="text-sm text-gray-500 mb-6">Envie-nos uma mensagem e a nossa equipa entrará em contacto consigo rapidamente.</p>

              {status === 'success' ? (
                <div className="p-4 bg-green-50 text-green-700 rounded border border-green-200 text-center font-medium">
                  Mensagem enviada com sucesso!
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
                      Por favor, preencha todos os campos obrigatórios.
                    </div>
                  )}
                  <div>
                    <label htmlFor="faq-nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome completo *</label>
                    <input
                      type="text"
                      id="faq-nome"
                      value={contactData.nome}
                      onChange={(e) => setContactData({...contactData, nome: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div>
                    <label htmlFor="faq-email" className="block text-sm font-semibold text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      id="faq-email"
                      value={contactData.email}
                      onChange={(e) => setContactData({...contactData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Ex: joao.silva@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="faq-mensagem" className="block text-sm font-semibold text-gray-700 mb-1">Mensagem *</label>
                    <textarea
                      id="faq-mensagem"
                      rows={4}
                      value={contactData.mensagem}
                      onChange={(e) => setContactData({...contactData, mensagem: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-[5px] transition duration-300 transform hover:scale-[1.02] shadow-sm"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

