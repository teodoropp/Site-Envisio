/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { partners } from "../../types/partners";
import { MobileCarousel } from "../../components/Carousel";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Laptop,
  Shield,
  Code2,
  TrendingUp,
  Award,
  Clock,
  Layers,
  User,
  BarChart,
  Lock,
  Building2,
} from "lucide-react";
import cursosData from "../Academia/src/data/cursos.json";

// Slides do Hero Carrossel Mobile (Mantido intacto conforme solicitado)
const heroSlides = [
  {
    srcMobile: "/images/mobile/banner_mobile0.webp",
    link: "/servicos/software",
    label: "Consultoria",
  },
  {
    srcMobile: "/images/mobile/banner_mobile2.webp",
    link: "/servicos/hardware",
    label: "Serviços Técnicos",
  },
  {
    srcMobile: "/images/mobile/renting_mobile.webp",
    link: "/servicos/renting",
    label: "Serviços Técnicos",
  },
];

// 5 Serviços Oferecidos com Categorias para Filtro Dinâmico
const services = [
  {
    id: "renting",
    title: "Renting de Equipamentos",
    category: "renting",
    badge: "Renting & Hardware",
    description:
      "Renting de impressoras multifuncionais, computadores e servidores empresariais com assistência e manutenção preventiva inclusas.",
    path: "/servicos/renting",
    image: "/images/imagem cads/Destaque3.webp",
    icon: Laptop,
    highlights: [
      "Manutenção preventiva incluída",
      "Equipamentos modernos e ágeis",
    ],
  },
  {
    id: "seguranca",
    title: "Sistemas de Segurança",
    category: "hardware",
    badge: "Hardware & Redes",
    description:
      "Instalação de CCTV inteligente, controlo biométrico de acessos, segurança perimetral e monitorização contínua 24/7.",
    path: "/servicos/hardware",
    image: "/images/imagem cads/Destaque4.webp",
    icon: Shield,
    highlights: ["Monitorização em tempo real", "Controlo biométrico seguro"],
  },
  {
    id: "web",
    title: "Desenvolvimento Web",
    category: "software",
    badge: "Sistemas & Web",
    description:
      "Criação de websites modernos, portais corporativos e plataformas web personalizadas focadas em performance e conversão.",
    path: "/servicos/software",
    image: "/images/imagem cads/Destaque5.webp",
    icon: Code2,
    highlights: ["Design 100% responsivo", "Arquitetura veloz e segura"],
  },
  {
    id: "consultoria",
    title: "Consultoria em TI",
    category: "software",
    badge: "Consultoria em TI",
    description:
      "Auditoria de sistemas, diagnóstico de infraestrutura de rede e planeamento estratégico para modernização de processos.",
    path: "/servicos/software",
    image: "/images/imagem cads/Destaque6.webp",
    icon: Layers,
    highlights: ["Otimização de custos de TI", "Estratégia sob medida"],
  },
  {
    id: "erp",
    title: "Instalação de Sistemas ERP",
    category: "software",
    badge: "ERP & Gestão",
    description:
      "Instalação, parametrização e assistência contínua em sistemas ERP líderes de mercado para gestão empresarial integrada.",
    path: "/servicos/software",
    image: "/images/imagem soft/Primavera.webp",
    icon: Building2,
    highlights: [
      "Parametrização fiscal e faturação",
      "Gestão integrada de stocks e compras",
    ],
  },
  {
    id: "digital",
    title: "Consultoria Digital",
    category: "software",
    badge: "Inovação Digital",
    description:
      "Soluções de automação empresarial e integração tecnológica para acelerar o crescimento do seu negócio em Angola.",
    path: "/servicos/software",
    image: "/images/imagem cads/Destaque7.webp",
    icon: TrendingUp,
    highlights: ["Automação de rotinas manuais", "Aumento da produtividade"],
  },
];

// Depoimentos Reais dos Clientes
const testimonials = [
  {
    text: "Trabalhamos há anos com a Envisio e nunca tivemos reclamações. Serviço dinâmico, responsável e de total confiança.",
    author: "Direção Geral",
    company: "ReiBoque",
    rating: 5,
  },
  {
    text: "A Envisio demonstra comprometimento, responsabilidade e total disponibilidade. Sempre disposta a resolver problemas com seriedade e sem desistir.",
    author: "Gestão Operacional",
    company: "Global Corp",
    rating: 5,
  },
  {
    text: "Os programas e serviços de tecnologia abriram portas para novas oportunidades e elevaram a eficiência dos nossos processos internos.",
    author: "Diretoria Técnica",
    company: "Multinacional",
    rating: 5,
  },
];

// Variantes de Animação Fluidas e Suaves
const smoothEase = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom,
      ease: smoothEase,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Ícone Oficial do WhatsApp
function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
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

export function HomeMobile() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const academiaScrollRef = useRef<HTMLDivElement>(null);

  const handleAcademiaScroll = () => {
    if (academiaScrollRef.current) {
      const { scrollLeft } = academiaScrollRef.current;
      const cardWidth = 250 + 16;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCourseIndex(Math.min(3, Math.max(0, index)));
    }
  };

  // Filtragem dos serviços
  const filteredServices =
    selectedCategory === "todos"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
      {/* 1. HERO SECTION (Mantida 100% como está) */}
      <section className="relative w-full md:hidden pt-[54px]">
        <MobileCarousel slides={heroSlides} />
      </section>

      {/* 2. QUEM SOMOS - Storytelling Visual & Moderno */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Cabeçalho Editorial com Tag Moderna */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1.5 block">
              Sobre a Envisio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              Inovação Tecnológica com Raízes em Angola
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="h-1 bg-red-600 mx-auto mt-3 mb-4 rounded-full"
            />
          </motion.div>

          {/* Imagem Editorial em Destaque com Badge Flutuante */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: smoothEase }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-gray-100 group">
            <img
              src="/images/banner_quem.webp"
              alt="Equipa e História da Envisio"
              className="w-full h-[240px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Card Flutuante de Vidro Fosco Sobreposto */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: smoothEase }}
              className="absolute bottom-3 left-3 right-3 bg-white/30 backdrop-blur-md border border-white/60 p-3 rounded-[5px] shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-[100%] bg-gray-800 text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                  2018
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    Fundação em Luanda
                  </p>
                  <p className="text-[11px] text-gray-600">
                    Excelência e compromisso local
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Texto Institucional Curado */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: smoothEase }}
            className="text-center sm:text-left pt-1">
            <p className="text-gray-600 text-sm leading-relaxed">
              A <strong className="text-gray-900 font-semibold">ENVISIO</strong>{" "}
              é uma empresa de direito Angolano orientada para solucionar
              desafios locais de tecnologia, combinando infraestrutura segura,
              desenvolvimento de software e consultoria especializada para
              impulsionar o crescimento do seu negócio.
            </p>
          </motion.div>

          {/* Régua de Métricas com Animação Escalonada */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 text-center">
            <motion.div variants={fadeInUp}>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                +2.500
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                Clientes Atendidos
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="border-l border-r border-gray-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                +5 Anos
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                no Mercado
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                Suporte
              </div>
            </motion.div>
          </motion.div>

          {/* Botão de Navegação com Micro-interação */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/quem-somos")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-[5px] flex items-center justify-center gap-2 shadow-md shadow-red-600/15 transition-all text-sm group cursor-pointer">
            <span>Nossa História</span>
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>
        </div>
      </section>

      {/* 3. NOSSOS SERVIÇOS - Horizontal Snap Carousel */}
      <section className="py-14 bg-gradient-to-b from-gray-50 to-slate-100/70 border-t border-b border-gray-200/80">
        <div className="px-4 sm:px-6 max-w-xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1.5 block">
              Soluções Especializadas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              O Que Fazemos de Melhor
            </h2>
            <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
              Deslize para os lados para explorar as nossas áreas de atuação
              técnica
            </p>
          </motion.div>

          {/* Filtros em Pílula Rápidos com Animação Suave */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex items-center justify-center gap-1.5 flex-wrap">
            {[
              { id: "todos", label: `Todos (${services.length})` },
              { id: "hardware", label: "Hardware" },
              { id: "software", label: "Software" },
              { id: "renting", label: "Renting" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Carrossel Horizontal Táctil (Swipe com o Dedo) com Animação Fluida */}
        <div
          ref={servicesScrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-4 pt-1 no-scrollbar scroll-smooth">
          {filteredServices.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: smoothEase,
                }}
                whileTap={{ scale: 0.98 }}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-white rounded-[5px] border border-gray-200/90 shadow-lg shadow-gray-200/50 overflow-hidden flex flex-col transition-all hover:border-red-200 group">
                {/* Imagem do Card com Badge Sobreposta */}
                <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/60 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm z-10">
                    {service.badge}
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Benefícios Rápidos */}
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-gray-100">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2
                          size={13}
                          className="text-emerald-600 shrink-0"
                        />
                        <span className="text-[11px] text-gray-700 font-medium">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Botão de Ação */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(service.path)}
                    className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-[5px] text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer group/btn">
                    <span>Saber mais</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicador de Deslize Lateral */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {filteredServices.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === 0 ? "w-6 bg-red-600" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. ACADEMIA ENVISIO - Vitrine de Formação Profissional Moderna */}
      <section className="py-12 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-xl mx-auto space-y-5">
          {/* Cabeçalho com Prova Social e Animação */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="text-center">
            <div className="inline-flex items-center gap-1 text-red-600 mb-1.5">
              <Award size={15} />
              <span className="text-xs font-bold text-gray-800 ml-1">
                Formação Certificada
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Academia Envisio
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-sm mx-auto">
              Cursos práticos e executivos para transformar a sua carreira e
              elevar a maturidade da sua equipa.
            </p>
          </motion.div>

          {/* Carrossel Horizontal com os Cards Oficiais da Academia */}
          <div className="-mx-4 sm:-mx-6">
            <div
              ref={academiaScrollRef}
              onScroll={handleAcademiaScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 sm:px-8 pb-3 pt-1 no-scrollbar scroll-smooth scroll-pl-6">
              {cursosData.slice(0, 4).map((curso: any, idx: number) => {
                const ativo =
                  curso.status === "active" ||
                  curso.available === true ||
                  curso.status === "disponivel";
                const instrutorNome =
                  typeof curso.instrutor === "object" &&
                  curso.instrutor !== null
                    ? curso.instrutor.nome
                    : curso.instrutor || "Formador Certificado";
                const isSpecialBorder =
                  curso.id === "power-bi" || curso.id === "sql-server";

                return (
                  <motion.div
                    key={curso.id || idx}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.09,
                      ease: smoothEase,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-[250px] sm:w-[270px] shrink-0 snap-start rounded-[5px] border overflow-hidden flex flex-col transition-all duration-300 bg-white group ${
                      isSpecialBorder
                        ? "border-slate-300 shadow-xs select-none"
                        : ativo
                          ? "border-slate-200 shadow-xs hover:shadow-md hover:border-red-200"
                          : "border-slate-200/80 select-none"
                    }`}>
                    {/* Imagem do curso com badge */}
                    <div
                      className={`relative h-36 sm:h-40 w-full overflow-hidden flex-shrink-0 bg-white ${
                        isSpecialBorder ? "border-b border-slate-200" : ""
                      }`}>
                      <img
                        src={curso.imagemUrl || "/academia/RH.png"}
                        alt={curso.titulo}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Categoria tag overlay */}
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/60 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider shadow-sm z-10">
                        {curso.categoria}
                      </span>

                      {/* Badge de status */}
                      {!ativo ? (
                        <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider shadow-sm z-10">
                          Em breve
                        </span>
                      ) : (
                        <span className="absolute top-2.5 right-2.5 bg-white text-slate-900 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider shadow-sm z-10">
                          Novo
                        </span>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-4 flex flex-col flex-grow text-left bg-white">
                      <h3
                        onClick={() =>
                          ativo && navigate(`/academia/curso/${curso.id}`)
                        }
                        className={`text-sm font-bold mb-1.5 leading-snug line-clamp-2 ${
                          ativo
                            ? "text-slate-900 cursor-pointer hover:text-red-600 transition-colors"
                            : "text-slate-700 cursor-not-allowed"
                        }`}>
                        {curso.titulo}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-grow font-normal">
                        {curso.descricao}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium mb-3">
                        <User size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{instrutorNome}</span>
                      </div>

                      {/* Rodapé */}
                      <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-slate-100 gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex items-center gap-1 text-slate-600 text-[10.5px] font-semibold whitespace-nowrap">
                            <Clock
                              size={11}
                              className="text-slate-400 flex-shrink-0"
                            />
                            {String(curso.duracao || "").replace(" horas", "h")}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600 text-[10.5px] font-semibold whitespace-nowrap truncate">
                            <BarChart
                              size={11}
                              className="text-slate-400 flex-shrink-0"
                            />
                            {String(curso.nivel || "").includes("Intermédio")
                              ? "Intermédio"
                              : curso.nivel}
                          </span>
                        </div>

                        {ativo ? (
                          <button
                            onClick={() =>
                              navigate(`/academia/curso/${curso.id}`)
                            }
                            className="text-slate-700 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer whitespace-nowrap flex-shrink-0 group/link">
                            <span>Ver curso</span>{" "}
                            <ChevronRight
                              size={12}
                              className="group-hover/link:translate-x-0.5 transition-transform"
                            />
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider cursor-not-allowed whitespace-nowrap flex-shrink-0">
                            <Lock size={11} className="text-slate-400" />{" "}
                            Brevemente
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Indicador de Deslize Lateral */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {cursosData.slice(0, 4).map((_: any, idx: number) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeCourseIndex
                      ? "w-5 bg-red-600"
                      : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Botão de Acesso Completo à Academia */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/academia")}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3.5 px-12 rounded-[5px] flex items-center justify-center gap-2 shadow-md transition-colors text-sm group cursor-pointer">
            <Award
              size={17}
              className="text-red-400 group-hover:rotate-12 transition-transform duration-300"
            />
            <span>Explorar cursos</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>
        </div>
      </section>

      {/* 5. DEPOIMENTOS - Prova Social com Design Sofisticado */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white relative overflow-hidden">
        {/* Glow Sutil Vermelho no Fundo com Pulsação Suave */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-600 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-xl mx-auto relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-red-400 font-bold mb-1.5 block">
              Confiança & Resultados
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              O Que Dizem os Nossos Clientes
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="h-1 bg-red-600 mx-auto mt-3 rounded-full"
            />
          </motion.div>

          {/* Cartão de Depoimento Moderno */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: smoothEase }}
                className="bg-slate-800/90 border border-slate-700/80 p-6 rounded-2xl shadow-xl backdrop-blur-xs flex flex-col justify-between min-h-[220px]">
                <div>
                  {/* Estrelas & Aspas */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testimonials[currentSlide].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                        ),
                      )}
                    </div>
                    <Quote size={24} className="text-red-500/40" />
                  </div>

                  <p className="text-sm text-slate-200 italic leading-relaxed mb-4">
                    "{testimonials[currentSlide].text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-xs sm:text-sm">
                      {testimonials[currentSlide].company}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {testimonials[currentSlide].author}
                    </p>
                  </div>
                  <span className="text-[10px] bg-red-500/15 text-red-300 border border-red-500/30 px-2.5 py-0.5 rounded-full font-medium">
                    Cliente Verificado
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controlos de Navegação Rápidos */}
            <div className="flex items-center justify-between mt-4 px-2">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1,
                  )
                }
                aria-label="Anterior"
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer">
                <ChevronLeft size={18} />
              </motion.button>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "w-6 bg-red-500"
                        : "w-2 bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % testimonials.length)
                }
                aria-label="Próximo"
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer">
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARCEIROS & CTA DE PARCERIA */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1.5 block">
              Rede de Confiança
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Nossos Parceiros
            </h2>
          </motion.div>

          {/* Marquee de Parceiros Limpo (Sem Sombreamento / Sem Máscara de Degradê) */}
          <div className="overflow-hidden py-3">
            <div className="relative w-full">
              <div
                className="flex items-center gap-8 py-2 animate-logo-marquee"
                style={{
                  width: `${partners.length * 2 * 130 + partners.length * 2 * 32}px`,
                  animation: "logo-marquee 20s linear infinite",
                }}>
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={partner.id + "-" + idx}
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 130 }}>
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="h-12 w-auto object-contain mx-auto transition-all"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Quer se Tornar um Parceiro? */}
          <div className="pt-8 sm:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: smoothEase }}
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-7 sm:p-8 rounded-[5px] shadow-2xl border border-gray-800 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white leading-snug">
                Quer se Tornar um Parceiro?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-md mx-auto">
                Junte-se a nós e faça parte de uma rede de empresas
                comprometidas com a excelência e inovação
              </p>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/contato")}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-[5px] inline-flex items-center justify-center gap-2 group transition-all text-sm shadow-md cursor-pointer">
                  <span>Entre em Contato</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                    →
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. BOTÃO FLUTUANTE WHATSAPP OFICIAL COM ANIMAÇÃO SUAVE */}
      <motion.a
        href="https://wa.me/244947137676?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Envisio."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale connosco pelo WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl shadow-emerald-600/40 flex items-center justify-center hover:bg-[#20bd5a] transition-colors focus:outline-none cursor-pointer">
        <WhatsAppIcon className="w-6 h-6 text-white fill-current" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 pointer-events-none -z-10" />
      </motion.a>
    </div>
  );
}
