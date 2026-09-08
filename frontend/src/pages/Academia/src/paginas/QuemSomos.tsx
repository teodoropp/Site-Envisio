/** @format */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  GraduationCap,
  Users,
  Award,
  Lightbulb,
  ShieldCheck,
  Scale,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Camera,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { DiamondGrid } from "../../../../components/DiamondGrid";

export default function QuemSomos() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedMembro, setSelectedMembro] = React.useState<any>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState<
    number | null
  >(null);
  const [photoFilter, setPhotoFilter] = React.useState<string>("todos");
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (window.location.hash === "#galeria") {
      setTimeout(() => {
        const el = document.getElementById("galeria");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  // Categorias e fotografias organizadas do espaço da Academia Envisio
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const espacoCategorias = [
    {
      id: "salas-formacao",
      titulo: "Sala de Formação",
      descricao:
        "Salas climatizadas com postos individuais de computadores e projetor multimédia para formações práticas.",
      badge: "Formação Prática",
      layoutInvertido: false,
      fotos: [
        {
          id: 1,
          src: "/images/espaco/sala-formacao-01.jpg",
          titulo: "Sala de Formação Principal",
          categoria: "Salas de Formação",
          descricao:
            "Postos individuais com computadores de alto desempenho e ambiente climatizado.",
          destaque: true,
        },
        {
          id: 2,
          src: "/images/espaco/sala-formacao-02.jpg",
          titulo: "Postos Informáticos de Trabalho",
          categoria: "Salas de Formação",
          descricao:
            "Bancadas práticas equipadas para simulações empresariais em ERP e TI.",
          destaque: false,
        },
        {
          id: 3,
          src: "/images/espaco/sala-formacao-03.jpg",
          titulo: "Perspetiva Ampla da Sala de Aula",
          categoria: "Salas de Formação",
          descricao:
            "Disposição ergonómica para acompanhamento próximo do formador a cada formando.",
          destaque: false,
        },
      ],
    },
    {
      id: "salas-reuniao",
      titulo: "Sala de Reunião",
      descricao:
        "Ambiente executivo para reuniões de equipa, planeamento estratégico e apresentações corporativas.",
      badge: "Corporativo & Estratégico",
      layoutInvertido: true,
      fotos: [
        {
          id: 4,
          src: "/images/espaco/sala-reuniao-01.jpg",
          titulo: "Sala de Reunião",
          categoria: "Salas de Reunião",
          descricao:
            "Mesa diretiva e equipamento para videoconferências e reuniões corporativas.",
          destaque: true,
        },
        {
          id: 5,
          src: "/images/espaco/sala-reuniao-02.jpg",
          titulo: "Mesa de Conferência",
          categoria: "Salas de Reunião",
          descricao:
            "Espaço reservado e confortável para alinhamentos e tomadas de decisão.",
          destaque: false,
        },
        {
          id: 6,
          src: "/images/espaco/sala-reuniao-03.jpg",
          titulo: "Ambiente de Consultoria",
          categoria: "Salas de Reunião",
          descricao:
            "Concebido para sessões de trabalho colaborativo e consultoria especializada.",
          destaque: false,
        },
      ],
    },
    {
      id: "recepcao",
      titulo: "Recepção e Atendimento",
      descricao:
        "Zona de acolhimento moderno, atendimento a formandos, inscrições e apoio contínuo.",
      badge: "Acolhimento & Apoio",
      layoutInvertido: false,
      fotos: [
        {
          id: 7,
          src: "/images/espaco/recepcao-01.jpg",
          titulo: "Recepção Principal da Envisio",
          categoria: "Recepção e Atendimento",
          descricao:
            "Entrada principal acolhedora para receção de formandos, parceiros e clientes.",
          destaque: true,
        },
        {
          id: 8,
          src: "/images/espaco/recepcao-02.jpg",
          titulo: "Balcão de Atendimento",
          categoria: "Recepção e Atendimento",
          descricao:
            "Área de atendimento dedicada ao esclarecimento de dúvidas e apoio a inscrições.",
          destaque: false,
        },
        {
          id: 9,
          src: "/images/espaco/recepcao-03.jpg",
          titulo: "Espaço de Espera e Informações",
          categoria: "Recepção e Atendimento",
          descricao:
            "Ambiente agradável e organizado para receção e consulta de informações académicas.",
          destaque: false,
        },
      ],
    },
    {
      id: "escritorios-apoio",
      titulo: "Escritórios & Áreas de Apoio",
      descricao:
        "Gabinetes de coordenação, postos de trabalho e área de pausa e refeições.",
      badge: "Instalações & Bem-Estar",
      layoutInvertido: true,
      fotos: [
        {
          id: 10,
          src: "/images/espaco/escritorio-01.jpg",
          titulo: "Escritorio",
          categoria: "Escritórios & Áreas de Apoio",
          descricao:
            "Espaço de gestão académica e coordenação pedagógica da Academia.",
          destaque: true,
        },
        {
          id: 11,
          src: "/images/espaco/escritorio-02.jpg",
          titulo: "Postos de Trabalho Operacional",
          categoria: "Escritórios & Áreas de Apoio",
          descricao:
            "Estações de trabalho equipadas com tecnologia e apoio logístico contínuo.",
          destaque: false,
        },
        {
          id: 12,
          src: "/images/espaco/refeitorio.jpg",
          titulo: "Área de Refeitório e Convívio",
          categoria: "Escritórios & Áreas de Apoio",
          descricao:
            "Zona de descanso e refeições concebida para o convívio e conforto de formandos e equipa.",
          destaque: false,
        },
      ],
    },
  ];

  // Lista unificada para navegação completa no Lightbox
  const todasFotos = React.useMemo(
    () => espacoCategorias.flatMap((cat) => cat.fotos),
    [espacoCategorias],
  );

  // Navegação por teclado na galeria do espaço
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + todasFotos.length) % todasFotos.length
            : null,
        );
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % todasFotos.length : null,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, todasFotos.length]);

  const membros = [
    {
      nome: "João Silva",
      cargo: "CEO & Formador Primavera",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Mestre em Gestão de Informação - Universidade Nova de Lisboa",
      sobre:
        "Líder e estrategista com vasta experiência em implementação de ERPs, o João guia os nossos formandos no desenvolvimento de competências orientadas para a liderança empresarial e otimização de processos corporativos.",
      especialidades: [
        "ERP Primavera",
        "Gestão Estratégica",
        "Business Intelligence",
      ],
    },
    {
      nome: "Maria Fernandes",
      cargo: "Especialista em Gestão de RH",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Pós-graduada em Psicologia Organizacional e Recursos Humanos",
      sobre:
        "Com mais de 8 anos de atuação como consultora corporativa em grandes empresas angolanas, a Maria capacita os nossos formandos com as melhores práticas de atração, retenção e desenvolvimento de talentos no ecossistema moderno.",
      especialidades: [
        "Gestão de Talentos",
        "Psicologia Organizacional",
        "Legislação Laboral",
      ],
    },
    {
      nome: "Pedro Costa",
      cargo: "Lead Software Developer",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Licenciado em Engenharia Informática - IST Portugal",
      sobre:
        "Desenvolvedor Full Stack Sénior especializado em arquiteturas escaláveis. O Pedro possui uma grande paixão por partilhar conhecimento prático sobre desenvolvimento de software com tecnologias modernas.",
      especialidades: [
        "React & Node.js",
        "Arquitetura Cloud",
        "Bases de Dados",
      ],
    },
    {
      nome: "Ana Santos",
      cargo: "Data Analyst & Consultora BI",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Mestre em Ciências de Dados - University of Essex",
      sobre:
        "Especialista em traduzir grandes volumes de dados em insights de negócios valiosos. A Ana tem ajudado dezenas de organizações a criar e implementar estruturas robustas de tomada de decisão baseada em dados.",
      especialidades: [
        "Power BI & Tableau",
        "Linguagem Python",
        "Data Modeling",
      ],
    },
    {
      nome: "Ricardo Oliveira",
      cargo: "Consultor de Marketing Digital",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Bacharel em Comunicação e Marketing - ESPM",
      sobre:
        "Focado em estratégias de crescimento e aquisição digital, o Ricardo apoia profissionais e empresas a alcançarem resultados consistentes de visibilidade e notoriedade no ambiente online.",
      especialidades: ["SEO & SEM", "Estratégia de Conteúdo", "Copywriting"],
    },
    {
      nome: "Patrícia Ramos",
      cargo: "Especialista em Contabilidade e Auditoria",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      formacao: "Contabilista Certificada - Ordem dos Contabilistas de Angola",
      sobre:
        "Com sólida experiência em auditoria de contas e consultoria fiscal, a Patrícia ajuda os nossos formandos a dominarem as dinâmicas do Sistema de Contabilidade Geral de Angola com abordagem estritamente prática e operacional.",
      especialidades: ["Auditoria Fiscal", "SGCA", "Planeamento de Impostos"],
    },
  ];

  const getVisibleTeamMembers = () => {
    const total = membros.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;
    return [
      { ...membros[prevIndex], position: "prev", targetIndex: prevIndex },
      {
        ...membros[currentIndex],
        position: "active",
        targetIndex: currentIndex,
      },
      { ...membros[nextIndex], position: "next", targetIndex: nextIndex },
    ];
  };

  const nextTeamMember = () => {
    setCurrentIndex((prev) => (prev + 1) % membros.length);
  };

  const prevTeamMember = () => {
    setCurrentIndex((prev) => (prev - 1 + membros.length) % membros.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section (Split Background Style) */}
      <section className="relative bg-white text-slate-900 overflow-hidden min-h-screen lg:h-screen flex flex-col justify-center pt-14 pb-12 border-b border-gray-100">
        {/* Soft Grid Background on Left Side */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F3F4F6_1px,transparent_1px),linear-gradient(to_bottom,#F3F4F6_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50 z-0" />

        {/* Lado Direito (Desktop Full-Bleed Background Image) */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] xl:w-[54%] h-full z-10 hidden lg:block overflow-hidden">
          {/* Curve mask separator to blend with white content background */}
          <svg
            className="absolute left-0 top-0 h-full w-24 text-white fill-current z-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <path d="M0,0 L100,0 C60,20 30,70 0,100 Z" />
          </svg>
          {/* Red separator accent line tracing the curve (extends fully to the bottom) */}
          <svg
            className="absolute left-0 top-0 h-full w-24 text-[#EF4444] fill-none stroke-current z-20 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            strokeWidth="2.5">
            <path d="M100,0 C60,20 30,70 3,100" />
          </svg>

          {/* Main Editorial Image with Hover Zoom Transition */}
          <img
            src="/academia/Quem%20somos/Hero.png"
            alt="Estudantes Envisio"
            className="w-full h-full object-cover object-center select-none transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-20 w-full flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lado Esquerdo Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left w-full">
              {/* Headline */}
              <h1 className="text-[32px] sm:text-4xl md:text-5xl font-black mb-6 leading-[1.1] text-[#111827] tracking-tight">
                Conheça a <br className="hidden sm:inline" />
                nossa história e <br />
                <span className="text-[#000000] relative inline-block">
                  quem somos.
                  {/* Underline stroke red curve */}
                  <svg
                    className="absolute left-0 -bottom-1 w-full h-2 text-[#EF4444] fill-none stroke-current"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none">
                    <path
                      d="M0,5 C30,2 70,2 100,5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Short Text */}
              <p className="text-[14px] md:text-[14px] text-[#374151] leading-relaxed mb-8 max-w-xl">
                Somos uma academia de formação que prepara estudantes e
                profissionais para os desafios do mercado através de uma
                aprendizagem prática, atualizada e alinhada com a realidade das
                empresas.
              </p>

              {/* Differentials aligned horizontally with circular background icons */}
              <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 md:gap-x-6 mb-8 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 w-full">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/90 text-[#EF4444] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                    <GraduationCap
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-slate-800 leading-tight">
                    Ensino
                    <br />
                    de Qualidade
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/90 text-[#EF4444] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>
                  <span className="text-slate-800 leading-tight">
                    Foco no
                    <br />
                    Desenvolvimento
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/90 text-[#EF4444] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>
                  <span className="text-slate-800 leading-tight">
                    Preparados
                    <br />
                    para o Futuro
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mobile/Tablet Image Placement (Hidden on Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
              }}
              className="block lg:hidden w-full my-6">
              <div className="relative w-full rounded-[24px] overflow-hidden shadow-md border-4 border-white">
                <img
                  src="/academia/Quem%20somos/Hero.png"
                  alt="Estudante na Academia"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. O Nosso Propósito */}
      <section id="proposito" className="pt-40 md:pt-48 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Coluna da Esquerda: Texto */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-left lg:max-w-[480px] xl:max-w-[520px]">
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                A{" "}
                <strong className="font-bold text-gray-900">
                  Envisio Training Academy
                </strong>{" "}
                é um centro de formação dedicado ao desenvolvimento de
                competências técnicas e profissionais, preparando estudantes e
                profissionais para os desafios do mercado de trabalho.
              </p>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                Acreditamos que aprender vai muito além da teoria. Por isso,
                oferecemos uma formação baseada na prática, em projetos reais e
                na utilização das mesmas ferramentas utilizadas pelas empresas,
                permitindo que os nossos alunos adquiram experiência desde o
                primeiro dia.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                O nosso compromisso é formar profissionais confiantes,
                preparados e capazes de gerar impacto onde quer que estejam.
              </p>
            </motion.div>

            {/* Coluna da Direita: Grade de Diamantes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center items-center">
              <DiamondGrid
                images={[
                  {
                    src: "/images/espaco/sala-formacao-01.jpg",
                    alt: "Sala de Formação com Computadores - Academia Envisio",
                    delay: 0.1,
                  },
                  {
                    src: "/images/espaco/recepcao-01.jpg",
                    alt: "Área de Recepção da Academia Envisio",
                    delay: 0.2,
                  },
                  {
                    src: "/images/espaco/sala-formacao-02.jpg",
                    alt: "Postos de Trabalho Individuais e Práticos",
                    delay: 0.3,
                  },
                  {
                    src: "/images/espaco/sala-reuniao-01.jpg",
                    alt: "Sala de Reuniões e Conferências",
                    delay: 0.4,
                  },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Missão e Visão (Alternating zigzag rows) */}
      <section className="pt-36 pb-20 bg-white overflow-hidden relative">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F3F4F6_1px,transparent_1px),linear-gradient(to_bottom,#F3F4F6_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Row 1: Missão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 relative z-10">
            {/* Coluna da Esquerda: Texto */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-left lg:max-w-[480px]">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Missão
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Capacitar pessoas através de uma formação prática, inovadora e
                orientada para o mercado de trabalho, desenvolvendo competências
                que geram oportunidades e transformam carreiras.
              </p>
            </motion.div>

            {/* Coluna da Direita: Imagem */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative">
              <div className="relative rounded-none overflow-hidden shadow-md w-full max-w-md mx-auto h-[220px] sm:h-[260px] lg:h-[280px]">
                <img
                  src="/academia/Quem%20somos/missao.jpg"
                  alt="Missão - Estudantes aprendendo com tecnologia"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Row 2: Visão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            {/* Coluna da Esquerda: Imagem */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1">
              <div className="relative rounded-none overflow-hidden shadow-md w-full max-w-md mx-auto h-[220px] sm:h-[260px] lg:h-[280px]">
                <img
                  src="/academia/Quem%20somos/visao.jpg"
                  alt="Visão - Crescimento profissional e inovação"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Coluna da Direita: Texto */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-left lg:max-w-[480px] lg:ml-auto order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Visão
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ser uma referência em formação profissional, reconhecida pela
                excelência, inovação e pelo impacto positivo na vida dos nossos
                alunos e organizações.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3.5. Valores Section */}
      <section className="py-20 bg-gray-50/50 overflow-hidden relative">
        {/* Decorative Grid Dot Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header de Valores */}
          <div className="mb-12 text-left">
            <h2 className="text-3xl font-black text-[#1e1b4b] uppercase tracking-tight leading-none">
              Valores
            </h2>
            <div className="w-12 h-1 bg-red-600 rounded mt-2" />
          </div>

          {/* Grid de 4 Valores em 2 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 lg:gap-x-20">
            {/* Valor 1 */}
            <div className="text-left">
              <h3 className="text-base font-bold text-[#1e1b4b] mb-2 uppercase tracking-wide flex items-center gap-2">
                <Award size={20} className="text-gray-900 flex-shrink-0" />
                Excelência
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Garantimos a máxima qualidade em todas as nossas formações e
                serviços, trabalhando continuamente no aperfeiçoamento das
                nossas metodologias práticas de ensino.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="text-left">
              <h3 className="text-base font-bold text-[#1e1b4b] mb-2 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb size={20} className="text-gray-900 flex-shrink-0" />
                Inovação
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Procuramos constantemente novas tecnologias e ferramentas de
                mercado, permitindo que a nossa formação esteja sempre alinhada
                com as reais e atuais necessidades das empresas.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="text-left">
              <h3 className="text-base font-bold text-[#1e1b4b] mb-2 uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck
                  size={20}
                  className="text-gray-900 flex-shrink-0"
                />
                Credibilidade
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Construímos relações sólidas baseadas na transparência e
                confiança mútua, consolidando o nosso posicionamento de
                referência no setor de formação profissional.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="text-left">
              <h3 className="text-base font-bold text-[#1e1b4b] mb-2 uppercase tracking-wide flex items-center gap-2">
                <Scale size={20} className="text-gray-900 flex-shrink-0" />
                Ética
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Atuamos com total integridade, respeito e profissionalismo em
                todas as interações, valorizando o impacto humano e social das
                capacitações oferecidas pela nossa academia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Os Nossos Números */}
      <section className="py-16 bg-white border-t border-b border-gray-100 relative overflow-hidden">
        {/* Background elements: red circles (bolas) and study icons with low opacity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Study Icons (Ícones de Estudo) */}

          {/* Study Icons (Ícones de Estudo) */}
          <GraduationCap className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 w-14 h-14 text-red-600 opacity-[0.07] -rotate-12" />
          <BookOpen className="absolute right-8 sm:right-20 top-1/2 -translate-y-1/2 w-12 h-12 text-red-600 opacity-[0.06] rotate-12" />
          <Award className="absolute left-[30%] -top-4 w-12 h-12 text-red-600 opacity-[0.04] rotate-6" />
          <Target className="absolute right-[35%] -bottom-4 w-10 h-10 text-red-600 opacity-[0.05] -rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}>
              <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2">
                +500
              </div>
              <div className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Alunos Formados
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}>
              <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2">
                100%
              </div>
              <div className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Aulas Práticas
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}>
              <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2">
                +10
              </div>
              <div className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Especialistas
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}>
              <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2">
                100%
              </div>
              <div className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Empregabilidade
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. A Nossa Equipa */}
      <section className="py-24 bg-gray-50/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-3 tracking-tight">
              Nossa equipa
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-4 rounded-full" />
            <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed"></p>
          </div>

          {/* Container de Apresentação em Destaque 3D (Compacto e Elegante) */}
          <div className="relative h-[440px] flex items-center justify-center">
            {/* Seta Esquerda (Manual) */}
            <button
              onClick={prevTeamMember}
              className="absolute left-2 sm:left-8 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-300 flex items-center justify-center transition-all hover:scale-110"
              aria-label="Anterior">
              <ChevronLeft size={22} />
            </button>

            {/* Seta Direita (Manual) */}
            <button
              onClick={nextTeamMember}
              className="absolute right-2 sm:right-8 z-40 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-300 flex items-center justify-center transition-all hover:scale-110"
              aria-label="Seguinte">
              <ChevronRight size={22} />
            </button>

            <div className="flex justify-center items-center w-full max-w-4xl relative h-full">
              <AnimatePresence mode="popLayout">
                {getVisibleTeamMembers().map((item) => {
                  const isActive = item.position === "active";
                  const isPrev = item.position === "prev";

                  return (
                    <motion.div
                      key={`${item.nome}-${item.position}`}
                      onClick={() => {
                        if (!isActive) setCurrentIndex(item.targetIndex);
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: isPrev ? -130 : 130,
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        scale: isActive ? 1.02 : 0.85,
                        x: isActive ? 0 : isPrev ? "-54%" : "54%",
                        zIndex: isActive ? 30 : 10,
                        filter: isActive ? "blur(0px)" : "blur(2.5px)",
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: isPrev ? -130 : 130 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`absolute w-[250px] sm:w-[270px] md:w-[350px] bg-white  p-4 border transition-all ${
                        isActive
                          ? "border-red-100 shadow-xl ring-1 ring-red-500/10 cursor-default"
                          : "border-gray-200 shadow-md cursor-pointer hover:opacity-60"
                      } flex flex-col text-left`}>
                      {/* Foto do Professor (Compacta com borda de 10px) */}
                      <div className="relative  overflow-hidden h-[200px] sm:h-[310px] w-full mb-3 shadow-sm bg-gray-100">
                        <img
                          src={item.img}
                          alt={item.nome}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Informações do Professor */}
                      <h3 className="text-gray-900 font-bold text-base mb-0.5 leading-tight">
                        {item.nome}
                      </h3>
                      <p className="text-red-600 text-[11px] font-bold uppercase tracking-wider mb-2">
                        {item.cargo}
                      </p>

                      {/* Botão Ver Mais */}
                      <div className="mt-auto pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMembro(item);
                          }}
                          className="text-[#1e1b4b] hover:text-red-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors duration-200">
                          <span>Ver mais</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Pontos de Navegação Manual */}
          <div className="flex justify-center items-center gap-2.5 mt-8 relative z-40">
            {membros.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-red-600"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para membro ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Detalhes do Profissional */}
      {selectedMembro && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-none overflow-hidden shadow-2xl relative w-full max-w-3xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMembro(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors duration-200"
              aria-label="Fechar">
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image */}
              <div className="h-64 md:h-[450px] w-full">
                <img
                  src={selectedMembro.img}
                  alt={selectedMembro.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Info */}
              <div className="p-8 flex flex-col justify-center text-left max-h-[450px] overflow-y-auto no-scrollbar">
                <h3 className="text-2xl font-black text-[#1e1b4b] mb-1 leading-tight">
                  {selectedMembro.nome}
                </h3>
                <p className="text-sm font-bold text-red-600 uppercase tracking-wide mb-6">
                  {selectedMembro.cargo}
                </p>

                {/* Formação */}
                <div className="mb-4">
                  <span className="text-[10px] font-extrabold text-black uppercase tracking-wider block mb-1">
                    Formação Académica
                  </span>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {selectedMembro.formacao}
                  </p>
                </div>

                {/* Sobre */}
                <div className="mb-6">
                  <span className="text-[10px] font-extrabold text-black uppercase tracking-wider block mb-1">
                    Sobre o Especialista
                  </span>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {selectedMembro.sobre}
                  </p>
                </div>

                {/* Especialidades */}
                <div>
                  <span className="text-[10px] font-extrabold text-black uppercase tracking-wider block mb-2">
                    Áreas de Foco
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembro.especialidades.map(
                      (esp: string, i: number) => (
                        <span
                          key={i}
                          className="bg-black/[0.05] text-black text-[10px] font-bold px-2.5 py-1 rounded-none uppercase tracking-wider">
                          {esp}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 5.5. Galeria de Fotos: O Nosso Espaço & Instalações */}
      <section
        id="galeria"
        className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F9FAFB_1px,transparent_1px),linear-gradient(to_bottom,#F9FAFB_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-60 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Geral da Galeria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
              Espaço da Academia
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-4 rounded-full" />
          </motion.div>

          {/* Categorias de Fotos com Título, Linha e Layout Assimétrico (Grande + Pequenas) */}
          <div className="space-y-20">
            {espacoCategorias.map((cat, catIdx) => {
              const fotoGrande =
                cat.fotos.find((f) => f.destaque) || cat.fotos[0];
              const fotosPequenas = cat.fotos.filter(
                (f) => f.id !== fotoGrande.id,
              );

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                  className="space-y-6">
                  {/* Título da Categoria com Linha por Baixo */}
                  <div className="text-left">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl sm:text-[20px] font-normal text-gray-800 tracking-tight">
                          {cat.titulo}
                        </h3>
                      </div>
                    </div>

                    {/* Linha abaixo do título */}
                    <div className="relative w-full my-3">
                      <div className="w-full h-[1px] bg-gray-200" />
                      <div className="absolute top-0 left-0 w-28 h-[2px] bg-red-600 rounded-full" />
                    </div>

                    <p className="text-sm text-gray-500 max-w-2xl mt-1">
                      {cat.descricao}
                    </p>
                  </div>

                  {/* Layout Bento / Assimétrico: Uma Grande e Outras Pequenas */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Se layout invertido, coloca as pequenas à esquerda em desktop */}
                    {cat.layoutInvertido ? (
                      <>
                        {/* 2 Fotos Pequenas Empilhadas (Coluna Esquerda) */}
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 order-2 lg:order-1">
                          {fotosPequenas.map((foto) => {
                            const globalIdx = todasFotos.findIndex(
                              (f) => f.id === foto.id,
                            );
                            return (
                              <motion.div
                                key={foto.id}
                                whileHover={{ y: -3 }}
                                onClick={() => setSelectedPhotoIndex(globalIdx)}
                                className="group relative rounded-[5px] overflow-hidden border border-gray-200 bg-gray-950 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all duration-300 cursor-pointer h-56 sm:h-64 lg:h-[198px]">
                                <img
                                  src={foto.src}
                                  alt={foto.titulo}
                                  loading="lazy"
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                <div className="absolute top-3 right-3 w-7 h-7 rounded-[5px] bg-white/85 backdrop-blur-sm text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                                  <Maximize2 size={13} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-left"></div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* 1 Foto Grande em Destaque (Coluna Direita) */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                          {(() => {
                            const globalIdx = todasFotos.findIndex(
                              (f) => f.id === fotoGrande.id,
                            );
                            return (
                              <motion.div
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedPhotoIndex(globalIdx)}
                                className="group relative rounded-[10px] overflow-hidden border border-gray-200 bg-gray-950 shadow-md hover:shadow-2xl hover:border-red-500/60 transition-all duration-300 cursor-pointer h-72 sm:h-96 lg:h-[416px]">
                                <img
                                  src={fotoGrande.src}
                                  alt={fotoGrande.titulo}
                                  loading="lazy"
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg group-hover:scale-110">
                                  <Maximize2 size={16} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                                  <h4 className="text-white text-lg sm:text-[16px] font-normal leading-snug drop-shadow-sm">
                                    {fotoGrande.titulo}
                                  </h4>
                                </div>
                              </motion.div>
                            );
                          })()}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* 1 Foto Grande em Destaque (Coluna Esquerda) */}
                        <div className="lg:col-span-7">
                          {(() => {
                            const globalIdx = todasFotos.findIndex(
                              (f) => f.id === fotoGrande.id,
                            );
                            return (
                              <motion.div
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedPhotoIndex(globalIdx)}
                                className="group relative rounded-[10px] overflow-hidden border border-gray-200 bg-gray-950 shadow-md hover:shadow-2xl hover:border-red-500/60 transition-all duration-300 cursor-pointer h-72 sm:h-96 lg:h-[416px]">
                                <img
                                  src={fotoGrande.src}
                                  alt={fotoGrande.titulo}
                                  loading="lazy"
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg group-hover:scale-110">
                                  <Maximize2 size={16} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                                  <h4 className="text-white text-lg sm:text-[16px] font-normal leading-snug ">
                                    {fotoGrande.titulo}
                                  </h4>
                                </div>
                              </motion.div>
                            );
                          })()}
                        </div>

                        {/* 2 Fotos Pequenas Empilhadas (Coluna Direita) */}
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                          {fotosPequenas.map((foto) => {
                            const globalIdx = todasFotos.findIndex(
                              (f) => f.id === foto.id,
                            );
                            return (
                              <motion.div
                                key={foto.id}
                                whileHover={{ y: -3 }}
                                onClick={() => setSelectedPhotoIndex(globalIdx)}
                                className="group relative rounded-[5px] overflow-hidden border border-gray-200 bg-gray-950 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all duration-300 cursor-pointer h-56 sm:h-64 lg:h-[198px]">
                                <img
                                  src={foto.src}
                                  alt={foto.titulo}
                                  loading="lazy"
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                                  <Maximize2 size={13} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-left"></div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Lightbox de Foto Ampliada */}
      {selectedPhotoIndex !== null && todasFotos[selectedPhotoIndex] && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative bg-neutral-900 text-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col border border-white/10">
            {/* Barra de Topo com Contador e Fechar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/60">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full">
                  {todasFotos[selectedPhotoIndex].categoria}
                </span>
                <span className="text-xs text-gray-400">
                  Foto {selectedPhotoIndex + 1} de {todasFotos.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar visualizador">
                <X size={18} />
              </button>
            </div>

            {/* Área da Imagem com Setas */}
            <div className="relative flex items-center justify-center bg-black/95 min-h-[320px] sm:min-h-[460px] max-h-[70vh] overflow-hidden">
              <img
                src={todasFotos[selectedPhotoIndex].src}
                alt={todasFotos[selectedPhotoIndex].titulo}
                className="max-h-[70vh] w-auto max-w-full object-contain select-none"
              />

              {/* Seta Anterior */}
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(
                    (selectedPhotoIndex - 1 + todasFotos.length) %
                      todasFotos.length,
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 hover:border-red-600 hover:scale-110 cursor-pointer"
                aria-label="Foto anterior">
                <ChevronLeft size={24} />
              </button>

              {/* Seta Seguinte */}
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(
                    (selectedPhotoIndex + 1) % todasFotos.length,
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 hover:border-red-600 hover:scale-110 cursor-pointer"
                aria-label="Foto seguinte">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Rodapé com Informação da Foto */}
            <div className="px-6 py-4 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 text-left">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {todasFotos[selectedPhotoIndex].titulo}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {todasFotos[selectedPhotoIndex].descricao}
                </p>
              </div>

              {/* Miniaturas de navegação rápida */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full sm:max-w-[260px]">
                {todasFotos.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`w-9 h-7 rounded overflow-hidden flex-shrink-0 border transition-all ${
                      selectedPhotoIndex === i
                        ? "border-red-500 scale-110 ring-1 ring-red-500"
                        : "border-transparent opacity-40 hover:opacity-100"
                    }`}>
                    <img
                      src={f.src}
                      alt={f.titulo}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 6. CTA Final (Novo Design Centrado com Card Reduzido) */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Soft Grid Background inside Section */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F9FAFB_1px,transparent_1px),linear-gradient(to_bottom,#F9FAFB_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-60 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Card Centrado, Reduzido (max-w-3xl) com fundo bg-gray-100, borda de 10px e sombra flutuante */}
          <div className="bg-gray-200 border border-gray-200/50 p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center max-w-3xl mx-auto rounded-[10px] shadow-2xl shadow-gray-400/50 transition-transform duration-300 hover:-translate-y-1">
            <div className="max-w-2xl flex flex-col items-center mb-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight text-gray-900">
                Pronto para transformar a sua carreira?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
                Não adie mais o seu crescimento profissional. Junte-se à
                comunidade de alunos de sucesso e comece hoje mesmo a construir
                o seu futuro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center relative z-10">
              <Link
                to="/academia/cursos"
                className="btn-academia-primary px-6 py-3.5 text-sm sm:text-base font-bold text-center">
                Conhecer as Formações
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <a
                href="https://wa.me/244947137676?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Academia%20Envisio."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-academia-secondary px-6 py-3.5 text-sm sm:text-base font-bold text-center">
                Falar com um Consultor
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
