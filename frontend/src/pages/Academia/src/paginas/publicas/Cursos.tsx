/** @format */
import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Clock,
  BarChart,
  User,
  LayoutGrid,
  List,
  BookOpen,
  Lock,
  Sparkles,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCursos } from "../../hooks/useCursos";
import { Curso } from "../../tipos/Curso";
import { isCursoAtivo } from "../../servicos/cursoService";

// Helper para obter nome do instrutor
const getInstrutorNome = (instrutor?: any) => {
  if (!instrutor) return "Formador Envisio";
  if (typeof instrutor === "string") return instrutor;
  return instrutor.nome || "Formador Envisio";
};

// Componente para Destaques (layout limpo/Microsoft)
const CursoCardMicrosoft = ({
  curso,
  navigate,
}: {
  curso: Curso;
  navigate: any;
}) => {
  const ativo = isCursoAtivo(curso);

  return (
    <div
      className={`flex flex-col text-left group h-full transition-all duration-300 ${
        ativo
          ? "cursor-pointer"
          : "opacity-75 bg-slate-50/50 border border-slate-200/80 rounded-[5px] p-2"
      }`}
      onClick={() => ativo && navigate(`/academia/curso/${curso.id}`)}>
      {/* Imagem */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 mb-5 rounded-[4px]">
        <img
          src={curso.imagemUrl || "/academia/RH.png"}
          alt={curso.titulo}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ${
            ativo
              ? "group-hover:scale-105"
              : "grayscale filter opacity-75 contrast-90"
          }`}
        />
        {!ativo && (
          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-300 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
            Em breve
          </span>
        )}
      </div>

      {/* Título e Descrição */}
      <h3
        className={`text-xl font-bold mb-2 ${
          ativo
            ? "text-slate-900 group-hover:underline decoration-red-600 decoration-2 underline-offset-4"
            : "text-slate-700"
        }`}>
        {curso.titulo}
      </h3>
      <p className="text-[12px] text-slate-600 leading-relaxed mb-6 line-clamp-3">
        {curso.descricao}
      </p>

      {/* Footer / Ação */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
        {ativo ? (
          <span className="text-red-600 text-[15px] font-semibold flex items-center gap-1 group-hover:underline">
            Ver curso <ChevronRight size={16} />
          </span>
        ) : (
          <span className="text-slate-400 text-[12px] font-bold flex items-center gap-1 uppercase tracking-wider">
            <Lock size={13} className="text-slate-400" /> Indisponível
          </span>
        )}
      </div>
    </div>
  );
};

// Componente unificado de card de curso
const CursoCard = ({
  curso,
  navigate,
  layout = "grid",
}: {
  curso: Curso;
  navigate: any;
  layout?: "grid" | "list";
}) => {
  const ativo = isCursoAtivo(curso);

  return (
    <div
      className={`rounded-[5px] border overflow-hidden transition-all duration-300 ${
        ativo
          ? "bg-white border-slate-200 shadow-sm hover:shadow-md group"
          : "bg-slate-50/90 border-slate-200/80 opacity-75"
      } ${layout === "list" ? "flex flex-row h-full items-stretch" : "flex flex-col h-full"}`}>
      {/* Imagem do curso com badge de categoria */}
      <div
        className={`relative overflow-hidden flex-shrink-0 bg-slate-100 ${
          layout === "list" ? "w-64 min-h-[200px]" : "h-48 w-full"
        }`}>
        <img
          src={curso.imagemUrl || "/academia/RH.png"}
          alt={curso.titulo}
          className={`w-full h-full object-cover object-top ${
            ativo
              ? "scale-[1.03] transition-transform duration-700 group-hover:scale-110"
              : "grayscale filter opacity-75 contrast-90"
          }`}
        />

        {/* Categoria tag flutuante estilo pill overlay */}
        <span className="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm z-10">
          {curso.categoria}
        </span>

        {/* Badge de status */}
        {!ativo ? (
          <span className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm z-10">
            Em breve
          </span>
        ) : (
          curso.novo && (
            <span className="absolute top-4 right-4 bg-white text-slate-900 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm z-10">
              Novo
            </span>
          )
        )}
      </div>

      {/* Conteúdo (Título, Descrição, Formador) */}
      <div className="p-5 flex flex-col flex-grow text-left bg-white">
        <h3
          onClick={() => ativo && navigate(`/academia/curso/${curso.id}`)}
          className={`text-[17px] font-bold mb-2 leading-snug ${
            ativo
              ? "text-slate-900 cursor-pointer group-hover:text-red-600 transition-colors"
              : "text-slate-700 cursor-not-allowed"
          }`}>
          {curso.titulo}
        </h3>

        <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {curso.descricao}
        </p>

        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium mb-5">
          <User size={14} className="text-slate-400" />
          <span>{getInstrutorNome(curso.instrutor)}</span>
        </div>

        {/* Rodapé (Duração, Nível, Botão) */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600 text-[12px] font-semibold">
              <Clock size={12} className="text-slate-400" />
              {curso.duracao}
            </span>
            <span className="flex items-center gap-1 text-slate-600 text-[12px] font-semibold">
              <BarChart size={12} className="text-slate-400" />
              {curso.nivel}
            </span>
          </div>

          {ativo ? (
            <button
              onClick={() => navigate(`/academia/curso/${curso.id}`)}
              className="text-slate-900 text-[12px] font-bold hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer">
              Ver curso <ArrowRight size={12} />
            </button>
          ) : (
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Lock size={12} /> Brevemente
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Cursos() {
  const navigate = useNavigate();
  const { cursos } = useCursos();

  const [busca, setBusca] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeNiveis, setActiveNiveis] = useState<string[]>([]);
  const [activeDuracao, setActiveDuracao] = useState<string[]>([]);

  // Filtros collapsíveis
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(true);
  const [isNivelOpen, setIsNivelOpen] = useState(true);

  // Ordenação e visualização
  const [ordenacao, setOrdenacao] = useState("Mais relevantes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const cursosPorPagina = 6;

  // Obter curso em destaque ativo (Gestão de RH)
  const cursoDestaque = useMemo(() => {
    return (
      cursos.find((c) => c.id === "gestao-recursos-humanos") ||
      cursos.find((c) => isCursoAtivo(c)) ||
      cursos[0]
    );
  }, [cursos]);

  // Reset da página ao alterar os filtros
  React.useEffect(() => {
    setPaginaAtual(1);
  }, [busca, activeCategory, activeNiveis, activeDuracao]);

  // Filtro de Cursos dinâmico
  const cursosFiltrados = useMemo(() => {
    let result = cursos.filter((c) => {
      const matchCategory =
        activeCategory === "Todos" ||
        c.categoria.toLowerCase().includes(activeCategory.toLowerCase());

      const matchSearch =
        c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        c.categoria.toLowerCase().includes(busca.toLowerCase());

      const matchNivel =
        activeNiveis.length === 0 ||
        activeNiveis.some((n) =>
          c.nivel.toLowerCase().includes(n.toLowerCase()),
        );

      const matchDuracao =
        activeDuracao.length === 0 ||
        activeDuracao.some((d) => String(c.duracao).includes(d));

      return matchCategory && matchSearch && matchNivel && matchDuracao;
    });

    if (ordenacao === "Mais recentes") {
      result = [...result].reverse();
    } else if (ordenacao === "Mais bem avaliados") {
      result = [...result].sort((a, b) => (isCursoAtivo(a) ? -1 : 1));
    }

    return result;
  }, [cursos, busca, activeCategory, activeNiveis, activeDuracao, ordenacao]);

  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);

  const cursosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * cursosPorPagina;
    return cursosFiltrados.slice(inicio, inicio + cursosPorPagina);
  }, [cursosFiltrados, paginaAtual]);

  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-800 font-['Inter',sans-serif]">
      {/* ─── 1. Hero Section ─────────────────────────────────────────────── */}
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

            {/* Imagem Hero Estudante */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-end h-full mt-8 lg:mt-0">
              <div className="relative w-full max-w-[620px] lg:max-w-[660px] group flex justify-center items-end">
                <img
                  src="/academia/student-hero-front.png"
                  alt="Estudante virado para a frente"
                  className="w-full h-auto object-contain transform lg:scale-110 group-hover:scale-115 transition-transform duration-700 origin-bottom block"
                  style={{ marginBottom: 0, paddingBottom: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Curso em Destaque Premium ──────────────────────────────────── */}
      {cursoDestaque && (
        <section className="py-16 lg:py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {/* Section label */}
            <div className="mb-8">
              <h2
                className="text-2xl font-extrabold text-slate-900 inline-block border-b-2 border-slate-900 pb-1"
                style={{
                  fontFamily:
                    "'Segoe UI Variable Text', 'Segoe UI', sans-serif",
                }}>
                Curso em Destaque
              </h2>
            </div>

            {/* Banner card com mesmo tamanho e proporções da página home */}
            <div className="bg-white rounded-none shadow-md overflow-hidden mb-16 transition-all duration-300 hover:shadow-lg border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[490px] lg:min-h-[560px]">
                {/* Informações da Capa do Curso */}
                <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white relative z-10">
                  <div className="flex items-center space-x-2 text-red-400 text-sm font-semibold uppercase mb-4">
                    <Sparkles size={16} />
                    <span>
                      {cursoDestaque.categoria || "Qualificação Profissional"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {cursoDestaque.titulo}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-[12px] sm:text-[12px] leading-relaxed mb-8 max-w-xl">
                    {cursoDestaque.descricao}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 mb-8">
                    <div>
                      <span className="block text-gray-400 text-[11px]">
                        Duração
                      </span>
                      <span className="text-[11px] font-semibold text-white">
                        {cursoDestaque.duracao}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[11px]">
                        Formato
                      </span>
                      <span className="text-[11px] font-semibold text-white">
                        {cursoDestaque.format || "Presencial ou misto"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[11px]">
                        Idioma
                      </span>
                      <span className="text-[11px] font-semibold text-white">
                        {cursoDestaque.idioma || "Português"}
                      </span>
                    </div>
                  </div>

                  {/* Link alinhado à esquerda com linha sublinhada */}
                  <div className="flex items-center pt-2">
                    <Link
                      to={`/academia/curso/${cursoDestaque.id}`}
                      className="inline-flex items-center gap-2.5 text-white hover:text-red-400 text-[11px] sm:text-[11px] font-bold uppercase tracking-wider underline underline-offset-8 decoration-2 decoration-red-500 hover:decoration-red-400 transition-all group cursor-pointer">
                      <span>Ver Programa</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1.5 transition-transform"
                      />
                    </Link>
                  </div>
                </div>

                {/* Capa Visual do Curso (Mesma altura e enquadramento object-top da home) */}
                <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] overflow-hidden bg-slate-950">
                  <img
                    src={cursoDestaque.imagemUrl || "/academia/RH.png"}
                    alt={cursoDestaque.titulo}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 3. Secção: Formações Recomendadas ───────────────────────────────────────────── */}
      <section
        id="secao-cursos"
        className="py-16 bg-slate-50/80 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 text-left">
              Formações Recomendadas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {cursos.slice(0, 4).map((curso) => (
              <CursoCardMicrosoft
                key={curso.id}
                curso={curso}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Secção: Mais Populares ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 text-left">
              Mais populares
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cursos.slice(4, 8).map((curso) => (
              <CursoCard key={curso.id} curso={curso} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Catálogo Completo: Todos os Cursos (Sidebar + Grid) ─────────── */}
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
                      "Gestão & RH",
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

              {/* Grid de Cursos */}
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
                        layout={viewMode}
                      />
                    ))}
                  </div>

                  {/* Paginação Numérica */}
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
