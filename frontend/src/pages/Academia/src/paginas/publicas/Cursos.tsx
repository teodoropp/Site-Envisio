/** @format */
import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Star,
  Clock,
  BarChart,
  User,
  Search,
  LayoutGrid,
  List,
  Trophy,
  Calendar,
  FileText,
  PlayCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Interface estendida do Curso para exibição rica de dados offline
interface CursoEstatico {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  status: "disponivel" | "breve";
  imagemUrl: string;
  duracao: string;
  estrelas: number;
  avaliacoes: number;
  professor: string;
  nivel: string;
  preco?: string;
  novo?: boolean;
}

const CURSOS_ESTATICOS: CursoEstatico[] = [
  {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Boas Práticas",
    descricao:
      "Domine o Cegid Primavera: conceitos, parametrização e boas práticas no ERP.",
    categoria: "ERP & Gestão",
    status: "disponivel",
    imagemUrl: "/academia/primavera.svg",
    duracao: "120h",
    estrelas: 4.9,
    avaliacoes: 128,
    professor: "João Silva",
    nivel: "Intermédio",
  },
  {
    id: "programacao-web-frontend",
    titulo: "Programação Web Front-end Completo",
    descricao:
      "HTML, CSS e JavaScript modernos. Crie interfaces responsivas de altíssimo nível.",
    categoria: "Programação",
    status: "disponivel",
    imagemUrl: "/academia/frontend.jpg",
    duracao: "80h",
    estrelas: 4.8,
    avaliacoes: 96,
    professor: "Pedro Costa",
    nivel: "Iniciante",
  },
  {
    id: "power-bi",
    titulo: "Power BI — Business Intelligence na Prática",
    descricao:
      "Desenvolva relatórios interativos e dashboards avançados para decisão.",
    categoria: "Dados & BI",
    status: "disponivel",
    imagemUrl: "/academia/pagina home/inscricao.webp",
    duracao: "50h",
    estrelas: 4.9,
    avaliacoes: 110,
    professor: "Ana Santos",
    nivel: "Intermédio",
  },
  {
    id: "sql-server",
    titulo: "SQL Server — Banco de Dados Essencial",
    descricao:
      "Consultas SQL, modelagem relacional, procedures e noções de administração.",
    categoria: "Dados & BI",
    status: "disponivel",
    imagemUrl: "/academia/sql.png",
    duracao: "60h",
    estrelas: 4.8,
    avaliacoes: 82,
    professor: "Ana Santos",
    nivel: "Intermédio",
  },
  {
    id: "logica-de-programacao",
    titulo: "Lógica de Programação e Algoritmos",
    descricao:
      "Fundamentos essenciais: variáveis, decisões, loops e estruturas de dados.",
    categoria: "Programação",
    status: "disponivel",
    imagemUrl: "/academia/logica.png",
    duracao: "40h",
    estrelas: 4.7,
    avaliacoes: 64,
    professor: "Pedro Costa",
    nivel: "Iniciante",
  },
  {
    id: "excel-avancado",
    titulo: "Microsoft Excel Corporativo Avançado",
    descricao:
      "Automatize tarefas, crie análises avançadas e relatórios profissionais.",
    categoria: "Produtividade",
    status: "disponivel",
    imagemUrl: "/academia/co-working-people-working-together.jpg",
    duracao: "40h",
    estrelas: 4.8,
    avaliacoes: 154,
    professor: "Patrícia Ramos",
    nivel: "Avançado",
  },
  {
    id: "gestao-projetos-agile",
    titulo: "Gestão de Projetos & Metodologias Ágeis",
    descricao:
      "Aprenda a liderar equipas de tecnologia com Scrum, Kanban e gestão.",
    categoria: "Gestão & Liderança",
    status: "disponivel",
    imagemUrl: "/academia/pagina home/inscricao.webp",
    duracao: "45h",
    estrelas: 4.9,
    avaliacoes: 68,
    professor: "Eng. Fernando Costa",
    nivel: "Intermédio",
  },
  {
    id: "ciberseguranca-redes",
    titulo: "Cibersegurança & Defesa de Redes",
    descricao:
      "Proteja sistemas e dados contra ameaças e vulnerabilidades corporativas.",
    categoria: "Redes & Segurança",
    status: "disponivel",
    imagemUrl: "/academia/logica.png",
    duracao: "65h",
    estrelas: 4.9,
    avaliacoes: 94,
    professor: "Eng. Pedro Santos",
    nivel: "Intermédio",
  },
];

// Dados extra para as Novidades (simulação)
const NOVIDADES_ESTATICOS: CursoEstatico[] = [
  {
    id: "ia-fundamentos",
    titulo: "Inteligência Artificial Fundamentos",
    descricao: "Conceitos básicos de Machine Learning e Aplicações IA.",
    categoria: "IA",
    status: "disponivel",
    imagemUrl: "/academia/logica.png",
    duracao: "30h",
    estrelas: 5.0,
    avaliacoes: 12,
    professor: "Rafael Lima",
    nivel: "Iniciante",
    novo: true,
  },
  {
    id: "cegid-retail",
    titulo: "Cegid Retail — Gestão Comercial Completa",
    descricao: "Domine o POS e gestão de lojas do Cegid Retail.",
    categoria: "ERP & Gestão",
    status: "disponivel",
    imagemUrl: "/academia/primavera.svg",
    duracao: "25h",
    estrelas: 4.5,
    avaliacoes: 8,
    professor: "João Silva",
    nivel: "Iniciante",
    novo: true,
  },
  {
    id: "python-zero",
    titulo: "Python do Zero ao Avançado",
    descricao: "A linguagem que domina dados, automação e web.",
    categoria: "Programação",
    status: "disponivel",
    imagemUrl: "/academia/frontend.jpg",
    duracao: "60h",
    estrelas: 4.9,
    avaliacoes: 45,
    professor: "Lucas Mendes",
    nivel: "Iniciante",
    novo: true,
  },
  {
    id: "sql-analise",
    titulo: "SQL para Análise de Dados",
    descricao: "Focado em extração de valor para Business Intelligence.",
    categoria: "Dados & BI",
    status: "disponivel",
    imagemUrl: "/academia/sql.png",
    duracao: "35h",
    estrelas: 4.8,
    avaliacoes: 22,
    professor: "Ana Santos",
    nivel: "Iniciante",
    novo: true,
  },
];

// Componente para Destaques baseado no mockup da Microsoft
const CursoCardMicrosoft = ({
  curso,
  navigate,
  destino,
}: {
  curso: CursoEstatico;
  navigate: any;
  destino: string;
}) => {
  return (
    <div
      className="flex flex-col text-left group cursor-pointer h-full"
      onClick={() => navigate(destino)}>
      {/* Imagem */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 mb-5">
        <img
          src={curso.imagemUrl}
          alt={curso.titulo}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            curso.id === "sql-server"
              ? "p-4 bg-white border border-slate-200"
              : ""
          }`}
        />
      </div>

      {/* Título e Descrição */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:underline decoration-red-600 decoration-2 underline-offset-4">
        {curso.titulo}
      </h3>
      <p className="text-[15px] text-slate-700 leading-relaxed mb-6">
        {curso.descricao}
      </p>

      {/* Links */}
      <div className="mt-auto flex items-center gap-6">
        <span className="text-red-600 text-[15px] font-semibold flex items-center gap-1 group-hover:underline">
          Ver curso <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
};

// Componente unificado de card de curso
const CursoCard = ({
  curso,
  navigate,
  destino,
  layout = "grid",
}: {
  curso: CursoEstatico;
  navigate: any;
  destino: string;
  layout?: "grid" | "list";
}) => {
  return (
    <div
      className={`bg-white rounded-[5px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${layout === "list" ? "flex flex-row h-full items-stretch" : "flex flex-col h-full"}`}>
      {/* Imagem do curso com badge de categoria */}
      <div
        className={`relative overflow-hidden flex-shrink-0 bg-slate-100 ${layout === "list" ? "w-64 min-h-[200px]" : "h-44 w-full"}`}>
        <img
          src={curso.imagemUrl}
          alt={curso.titulo}
          className={`w-full h-full object-cover object-center scale-[1.03] transition-transform duration-700 group-hover:scale-110 ${
            curso.id === "sql-server"
              ? "p-4 bg-white border border-slate-200 !scale-100 group-hover:!scale-105"
              : ""
          }`}
        />
        {/* Categoria tag flutuante estilo pill overlay */}
        <span className="absolute top-4 left-4 bg-slate-900/40 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm z-10">
          {curso.categoria}
        </span>
        {curso.novo && (
          <span className="absolute top-4 right-4 bg-white text-slate-900 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm z-10">
            Novo
          </span>
        )}
      </div>

      {/* Conteúdo (Título, Descrição, Formador) */}
      <div className="p-5 flex flex-col flex-grow text-left bg-white">
        <h3
          onClick={() => navigate(destino)}
          className="text-[17px] font-bold text-slate-900 mb-2 leading-snug cursor-pointer group-hover:text-red-600 transition-colors">
          {curso.titulo}
        </h3>

        <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {curso.descricao}
        </p>

        <div className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium mb-5">
          <User size={14} className="text-slate-400" />
          <span>{curso.professor}</span>
        </div>

        {/* Rodapé (Duração, Nível, Botão) */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600 text-[11px] font-semibold">
              <Clock size={12} className="text-slate-400" />
              {curso.duracao}
            </span>
            <span className="flex items-center gap-1 text-slate-600 text-[11px] font-semibold">
              <BarChart size={12} className="text-slate-400" />
              {curso.nivel}
            </span>
          </div>
          <button
            onClick={() => navigate(destino)}
            className="text-slate-900 text-[11px] font-bold hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer">
            Ver curso <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Cursos() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeNiveis, setActiveNiveis] = useState<string[]>([]);
  const [activeDuracao, setActiveDuracao] = useState<string[]>([]);

  // Filtros collapsíveis
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(true);
  const [isNivelOpen, setIsNivelOpen] = useState(true);
  const [isDuracaoOpen, setIsDuracaoOpen] = useState(true);

  // Ordenação e visualização
  const [ordenacao, setOrdenacao] = useState("Mais relevantes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const cursosPorPagina = 6;

  // Reset da página ao alterar os filtros
  React.useEffect(() => {
    setPaginaAtual(1);
  }, [busca, activeCategory, activeNiveis, activeDuracao]);

  // Filtro de Cursos dinâmico
  const cursosFiltrados = useMemo(() => {
    let result = [...CURSOS_ESTATICOS, ...NOVIDADES_ESTATICOS].filter((c) => {
      const matchCategory =
        activeCategory === "Todos" || c.categoria === activeCategory;
      const matchSearch =
        c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        c.categoria.toLowerCase().includes(busca.toLowerCase());

      const matchNivel =
        activeNiveis.length === 0 || activeNiveis.includes(c.nivel);
      const matchDuracao =
        activeDuracao.length === 0 || activeDuracao.includes(c.duracao);

      return matchCategory && matchSearch && matchNivel && matchDuracao;
    });

    if (ordenacao === "Mais recentes") {
      result = result.reverse();
    } else if (ordenacao === "Mais bem avaliados") {
      result.sort((a, b) => b.estrelas - a.estrelas);
    }

    return result;
  }, [busca, activeCategory, activeNiveis, activeDuracao, ordenacao]);

  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);

  const cursosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * cursosPorPagina;
    return cursosFiltrados.slice(inicio, inicio + cursosPorPagina);
  }, [cursosFiltrados, paginaAtual]);

  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-800 font-['Inter',sans-serif]">
      {/* ─── 1. Hero Section (Mockup 1) ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen lg:h-screen bg-[#efefef] overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-10">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Texto e Pesquisa */}
            <div className="w-full lg:w-1/2 text-left flex flex-col justify-center pt-32 pb-12 lg:py-0 pr-0 lg:pr-12">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Cursos para impulsionar a sua carreira
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-md">
                Aprenda com especialistas e obtenha competências práticas para o
                mercado.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("secao-cursos");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-academia-primary px-8 py-4 text-sm cursor-pointer group self-start">
                Explorar Cursos
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300 ml-2 inline-block"
                />
              </button>
            </div>

            {/* Imagem Jovem Estudante Meio Corpo Virado para a Frente */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-end h-full mt-8 lg:mt-0">
              <div className="relative w-full max-w-[620px] lg:max-w-[660px] group flex justify-center items-end">
                <img
                  src="/academia/student-hero-front.png"
                  alt="Estudante meio corpo virado para a frente"
                  className="w-full h-auto object-contain transform lg:scale-110 group-hover:scale-115 transition-transform duration-700 origin-bottom block"
                  style={{ marginBottom: 0, paddingBottom: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Curso em Destaque Premium ──────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="mb-8">
            <h2
              className="text-2xl font-extrabold text-slate-900 inline-block border-b-2 border-slate-900 pb-1"
              style={{
                fontFamily: "'Segoe UI Variable Text', 'Segoe UI', sans-serif",
              }}>
              Curso em Destaque
            </h2>
          </div>

          {/* Banner card — slim, square corners, image fills right edge */}
          <div className="relative bg-gray-900 overflow-hidden rounded-none shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
              {/* Left: Content — compact with smaller title font */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative z-10">
                <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Qualificação Profissional</span>
                  <span>•</span>
                  <span>Certificação Envisio</span>
                </div>

                {/* Title — Font Size reduzida para ficar mais ajustada */}
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight mb-3">
                  Cegid Primavera: Funcionalidades e Módulos Corporativos
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 mb-5 leading-relaxed max-w-xl">
                  O software de gestão mais robusto de Portugal não precisa ser
                  um mistério. Aprenda na prática, do zero ao avançado, e
                  torne-se o profissional que resolve problemas, não que os
                  cria.
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 mb-6 text-xs">
                  <div>
                    <span className="block text-gray-400 text-[11px]">
                      Duração
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      120 Horas
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-[11px]">
                      Formato
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Presencial
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-[11px]">
                      Idioma
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Português
                    </span>
                  </div>
                </div>

                {/* Buttons — design system */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/academia/curso1"
                    className="btn-academia-primary px-5 py-2.5 text-xs font-bold rounded-[5px] flex items-center gap-2 cursor-pointer">
                    <span>Começar Curso</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    to="/academia/curso1"
                    className="px-5 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs font-bold rounded-[5px] transition-colors cursor-pointer">
                    Ver Programa
                  </Link>
                </div>
              </div>

              {/* Right: Image — 5 cols (7+5=12) com a ilustração 3D da Imagem 3 + Gradiente Suave */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden">
                <img
                  src="/academia/erp-course-featured.png"
                  alt="Ilustração 3D Cegid Primavera ERP"
                  className="absolute inset-0 w-full h-full object-cover object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Secção: Destaques (Mockup 1) ───────────────────────────────────────────── */}
      <section
        id="secao-cursos"
        className="py-16 bg-slate-50/80 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Destaques
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {CURSOS_ESTATICOS.slice(0, 4).map((curso) => (
              <CursoCardMicrosoft
                key={curso.id}
                curso={curso}
                navigate={navigate}
                destino={`/academia/curso1`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Secção: Mais Populares (Mockup 1) ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Mais populares
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURSOS_ESTATICOS.slice(4, 8).map((curso) => (
              <CursoCard
                key={curso.id}
                curso={curso}
                navigate={navigate}
                destino={`/academia/curso1`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Secção: Novidades (Mockup 1) ───────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50/80 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Novidades
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NOVIDADES_ESTATICOS.map((curso) => (
              <CursoCard
                key={curso.id}
                curso={curso}
                navigate={navigate}
                destino={`/academia/curso1`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Catálogo Completo: Todos os Cursos (Sidebar + Grid) (Mockup 1) ─────────── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-left">
            Todos os cursos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Esquerda (Filtros) */}
            <div className="lg:col-span-1 hidden lg:block text-left">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-bold text-slate-900">Filtros</h4>
                <button
                  onClick={() => {
                    setBusca("");
                    setActiveCategory("Todos");
                    setActiveNiveis([]);
                    setActiveDuracao([]);
                  }}
                  className="text-xs text-red-600 font-semibold hover:underline cursor-pointer">
                  Limpar tudo
                </button>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Buscar nos filtros..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Filtro Categoria */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => setIsCategoriaOpen(!isCategoriaOpen)}>
                  <h5 className="text-sm font-bold text-slate-800">
                    Categoria
                  </h5>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isCategoriaOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isCategoriaOpen && (
                  <div className="space-y-3">
                    {[
                      "ERP",
                      "Programação",
                      "Dados & BI",
                      "Produtividade",
                      "Redes & Segurança",
                      "IA",
                    ].map((cat, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="categoria"
                          checked={activeCategory === cat}
                          onChange={() => setActiveCategory(cat)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span
                          className={`text-sm ${activeCategory === cat ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="categoria"
                        checked={activeCategory === "Todos"}
                        onChange={() => setActiveCategory("Todos")}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span
                        className={`text-sm ${activeCategory === "Todos" ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                        Todos
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Filtro Nível */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => setIsNivelOpen(!isNivelOpen)}>
                  <h5 className="text-sm font-bold text-slate-800">Nível</h5>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isNivelOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isNivelOpen && (
                  <div className="space-y-3">
                    {["Iniciante", "Intermédio", "Avançado"].map((lvl, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={activeNiveis.includes(lvl)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setActiveNiveis([...activeNiveis, lvl]);
                            else
                              setActiveNiveis(
                                activeNiveis.filter((n) => n !== lvl),
                              );
                          }}
                          className="w-4 h-4 cursor-pointer rounded border-slate-300 text-red-600 focus:ring-red-600"
                        />
                        <span className="text-sm text-slate-600">{lvl}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro Duração */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => setIsDuracaoOpen(!isDuracaoOpen)}>
                  <h5 className="text-sm font-bold text-slate-800">Duração</h5>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isDuracaoOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isDuracaoOpen && (
                  <div className="space-y-3">
                    {[
                      "16h",
                      "25h",
                      "30h",
                      "35h",
                      "40h",
                      "50h",
                      "60h",
                      "65h",
                      "80h",
                      "120h",
                    ].map((dur, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={activeDuracao.includes(dur)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setActiveDuracao([...activeDuracao, dur]);
                            else
                              setActiveDuracao(
                                activeDuracao.filter((d) => d !== dur),
                              );
                          }}
                          className="w-4 h-4 cursor-pointer rounded border-slate-300 text-red-600 focus:ring-red-600"
                        />
                        <span className="text-sm text-slate-600 truncate">
                          {dur}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Direita (Grelha) */}
            <div className="lg:col-span-3 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-sm text-slate-500">
                  {cursosFiltrados.length} cursos encontrados
                </p>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
                    Ordenar por
                    <div className="relative">
                      <select
                        value={ordenacao}
                        onChange={(e) => setOrdenacao(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-[5px] text-sm focus:outline-none cursor-pointer">
                        <option>Mais relevantes</option>
                        <option>Mais recentes</option>
                        <option>Mais bem avaliados</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700 bg-transparent shadow-none"}`}>
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700 bg-transparent shadow-none"}`}>
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de Cursos (Limitado a 6 por página) */}
              {cursosFiltrados.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-[5px]">
                  <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                  <h4 className="text-base font-bold text-slate-900">
                    Nenhum curso encontrado
                  </h4>
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                    {cursosPaginados.map((curso) => (
                      <CursoCard
                        key={curso.id}
                        curso={curso}
                        navigate={navigate}
                        destino={`/academia/curso1`}
                        layout={viewMode}
                      />
                    ))}
                  </div>

                  {/* Paginação Numérica Redonda sem borda/fundo nas setas */}
                  {totalPaginas > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          setPaginaAtual((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={paginaAtual === 1}
                        aria-label="Página anterior"
                        className="p-2 bg-transparent border-0 text-slate-700 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-700 transition-colors cursor-pointer">
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from(
                        { length: totalPaginas },
                        (_, i) => i + 1,
                      ).map((num) => (
                        <button
                          key={num}
                          onClick={() => setPaginaAtual(num)}
                          className={`w-9 h-9 flex items-center justify-center font-bold text-xs rounded-full transition-all cursor-pointer ${
                            paginaAtual === num
                              ? "bg-red-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}>
                          {num}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setPaginaAtual((prev) =>
                            Math.min(prev + 1, totalPaginas),
                          )
                        }
                        disabled={paginaAtual === totalPaginas}
                        aria-label="Próxima página"
                        className="p-2 bg-transparent border-0 text-slate-700 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-700 transition-colors cursor-pointer">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
