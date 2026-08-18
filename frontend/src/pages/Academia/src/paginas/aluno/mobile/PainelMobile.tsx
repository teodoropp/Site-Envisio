/** @format */

import { useState } from "react";
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  UserCheck,
  Building,
  CheckSquare,
  Search,
  Flame,
  Star,
  FileText,
  MessageSquare,
  Heart,
  Target,
  SlidersHorizontal,
  Download,
  ShieldCheck,
  User,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PainelMobile() {
  const [busca, setBusca] = useState("");

  const meusCursos = [
    {
      id: "cegid-primavera",
      titulo: "Cegid Primavera: Funcionalidades & Práticas",
      descricao: "Conceitos, parametrização e boas práticas no ERP em sala.",
      imagem: "/academia/primavera.svg",
      progresso: 70,
      link: "/academia/aluno/aula/cegid-primavera",
      status: "em_andamento",
      instrutor: "João Silva",
    },
    {
      id: "programacao-web-frontend",
      titulo: "Programação Web Front-end Completo",
      descricao: "HTML, CSS e JavaScript modernos para interfaces responsivas.",
      imagem: "/academia/frontend.jpg",
      progresso: 100,
      link: "/academia/aluno/certificados",
      status: "concluido",
      instrutor: "Pedro Costa",
    },
    {
      id: "sql-server",
      titulo: "SQL Server — Banco de Dados Essencial",
      descricao: "Consultas SQL, modelagem relacional e procedimentos.",
      imagem: "/academia/sql.png",
      progresso: 35,
      link: "/academia/aluno/aula/sql-server",
      status: "em_andamento",
      instrutor: "Ana Santos",
    },
    {
      id: "logica-de-programacao",
      titulo: "Lógica de Programação e Algoritmos",
      descricao: "Fundamentos essenciais: variáveis, loops e estruturas.",
      imagem: "/academia/logica.png",
      progresso: 15,
      link: "/academia/aluno/aula/logica-de-programacao",
      status: "em_andamento",
      instrutor: "Pedro Costa",
    },
  ];

  const favoritosGuardados = [
    {
      id: "excel-avancado",
      titulo: "Microsoft Excel Corporativo Avançado",
      categoria: "Produtividade",
      duracao: "40h Presenciais",
      imagem: "/academia/co-working-people-working-together.jpg",
      avaliacao: 4.8,
      instrutor: "Patrícia Ramos",
    },
    {
      id: "power-bi",
      titulo: "Power BI — Business Intelligence na Prática",
      categoria: "Dados & BI",
      duracao: "50h Presenciais",
      imagem: "/academia/erp-course-featured.png",
      avaliacao: 4.9,
      instrutor: "Ana Santos",
    },
    {
      id: "gestao-projetos-agile",
      titulo: "Gestão de Projetos & Metodologias Ágeis",
      categoria: "Gestão",
      duracao: "45h Presenciais",
      imagem: "/academia/slide_academia.png",
      avaliacao: 4.9,
      instrutor: "Eng. Fernando Costa",
    },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* ── TOPO DA PÁGINA: GREETING & STREAK BADGE ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            Olá, Mateus! 👋
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Seja bem-vindo de volta
          </p>
        </div>
      </div>

      {/* ── CAMPO DE BUSCA RÁPIDA (BORDA QUADRADA) ── */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Pesquisar cursos, manuais ou salas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-[2px] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-800 shadow-2xs font-medium"
          />
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <button className="p-2.5 bg-slate-900 text-white rounded-[2px] hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer">
          <SlidersHorizontal size={15} />
        </button>
      </div>

      {/* ── SESSÃO 1: HERO BANNER COM IMAGEM EM FULL HEIGHT E FADE/DESFOCADO À ESQUERDA ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 relative overflow-hidden flex items-center justify-between min-h-[175px]">
        {/* Lado Esquerdo: Conteúdo do Curso a Concluir (z-10) */}
        <div className="space-y-2.5 max-w-[62%] z-10 relative">
          <div>
            <h3 className="font-extrabold text-sm text-white leading-snug line-clamp-2">
              Cegid Primavera: Funcionalidades e Módulos Corporativos
            </h3>
            <p className="text-[10px] text-slate-300 font-mono pt-0.5">
              Faltam apenas 30% (6 aulas em sala)
            </p>
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-1 w-full">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
              <span>Progresso Atual</span>
              <span className="text-red-400 font-black">70%</span>
            </div>
            <div className="w-full bg-slate-800/90 h-2 rounded-[2px] overflow-hidden border border-slate-700">
              <div className="bg-gradient-to-r from-red-600 to-red-500 h-full w-[70%] transition-all duration-700" />
            </div>
          </div>

          {/* Botão de Continuar (Borda Quadrada) */}
          <Link
            to="/academia/aluno/aula/cegid-primavera"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-800 hover:bg-red-900 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-[2px] shadow-md transition-all active:scale-95">
            <span>Continuar Aula</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Lado Direito: Imagem do Curso Cobrindo a Altura Toda + Fade/Esfumado à Esquerda */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/primavera_course_banner.png"
            alt="Curso Primavera V10"
            className="w-full h-full object-cover object-right"
          />
          {/* Overlay de Gradiente: Desfoca/Esfuma o Lado Esquerdo da Imagem no Fundo Escuro */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent w-full h-full" />
        </div>
      </div>

      {/* ── SESSÃO 2: MEUS CURSOS (CARROSSEL 1*2 COM CARDS QUADRADOS PEQUENOS E IMAGENS REAIS) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
            <BookOpen size={16} className="text-red-800" />
            <span>Meus Cursos</span>
          </h3>
          <Link
            to="/academia/aluno/cursos"
            className="text-xs font-extrabold text-red-800 hover:text-red-900 flex items-center gap-0.5">
            <span>Ver Todos ({meusCursos.length})</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Carrossel Deslizante Horizontal (1*2 - 2 Cards por Vista) */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1">
          {meusCursos.map((curso) => (
            <div
              key={curso.id}
              className="w-[calc(50%-6px)] min-w-[calc(50%-6px)] max-w-[calc(50%-6px)] bg-white rounded-[2px] border border-slate-200 shadow-2xs p-2.5 space-y-2 flex flex-col justify-between flex-shrink-0 snap-start hover:border-slate-300 transition-all">
              {/* Imagem Real do Curso (Full Width no topo do Card Quadrado) */}
              <div className="relative w-full h-24 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-100">
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título do Curso */}
              <h4 className="font-black text-xs text-slate-900 leading-tight line-clamp-1">
                {curso.titulo}
              </h4>

              {/* Descrição do Curso (text-[10px]) */}
              <p className="text-[10px] text-slate-500 font-normal leading-snug line-clamp-2 min-h-[26px]">
                {curso.descricao}
              </p>

              {/* Link de Detalhe no Rodapé do Card */}
              <div className="pt-1 border-t border-slate-100">
                <Link
                  to={curso.link}
                  className="w-full py-1 text-red-800 hover:text-red-900 font-black text-[10px] uppercase tracking-wider flex items-center justify-center text-center transition-colors">
                  <span>
                    {curso.status === "concluido"
                      ? "Ver Diploma"
                      : "Ver Detalhes"}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SESSÃO 3: FAVORITOS GUARDADOS (CARDS RETANGULARES PEQUENOS EMPILHADOS + BOTÃO VER MAIS) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
            <Heart size={16} className="text-red-600 fill-red-600" />
            <span>Favoritos Guardados</span>
          </h3>
          <Link
            to="/academia/aluno/favoritos"
            className="text-xs font-extrabold text-red-800 hover:text-red-900 flex items-center gap-0.5">
            <span>Ver Mais ({favoritosGuardados.length})</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Lista Vertical de Cards Retangulares Pequenos (Um em baixo do outro) */}
        <div className="space-y-2.5">
          {favoritosGuardados.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-[2px] border border-slate-200 shadow-2xs p-2.5 flex items-center justify-between gap-3 hover:border-slate-300 transition-all">
              {/* Esquerda: Miniatura Retangular + Título, Categoria e Detalhes */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-16 h-12 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-200 flex-shrink-0 relative">
                  <img
                    src={fav.imagem}
                    alt={fav.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 font-extrabold text-[8px] uppercase rounded-[2px]">
                      {fav.categoria}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-black text-[9px]">
                      <Star size={9} className="fill-amber-400" />{" "}
                      {fav.avaliacao}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 leading-tight line-clamp-1">
                    {fav.titulo}
                  </h4>

                  <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                    {fav.duracao} • Formador: {fav.instrutor}
                  </p>
                </div>
              </div>

              {/* Direita: Botão de Ação Detalhes */}
              <Link
                to={`/academia/curso/${fav.id}`}
                className="px-3 py-1.5 bg-red-800 hover:bg-red-900 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs flex-shrink-0">
                <span>Detalhes</span>
                <ArrowRight size={10} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── SESSÃO 4: REGISTO DE PRESENÇAS EM SALA (VALIDAÇÃO EXCLUSIVA PELO FORMADOR) ── */}
      <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[2px] bg-slate-900 text-white flex items-center justify-center font-bold">
              <UserCheck size={16} />
            </div>
            <div>
              <h4 className="font-black text-xs text-slate-900 uppercase">
                Presenças em Sala de Aula
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">
                Controlo & Validação da Envisio
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-[2px]">
            14/20 Aulas
          </span>
        </div>

        {/* Informação Oficial de Validação pelo Formador */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[2px] space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
            <CheckCircle size={15} className="text-emerald-700" />
            <span>Registo Efetuado Exclusivamente em Sala</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
            As presenças são registadas e assinadas em tempo real pelo formador
            responsável (<strong className="text-slate-800">João Silva</strong>)
            na pauta digital no final de cada sessão presencial.
          </p>
        </div>
      </div>

      {/* ── SESSÃO 5: PRÓXIMA AULA PRESENCIAL & HORÁRIO EM SALA (SUBSTITUIU AÇÕES RÁPIDAS) ── */}
      <div className="space-y-3">
        <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
          <Calendar size={16} className="text-red-800" />
          <span>Próxima Aula </span>
        </h3>

        {/* Card Executivo da Próxima Aula Agendada */}
        <div className="bg-slate-900 text-white p-4 rounded-[2px] border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-red-800 text-white text-[9px] font-black uppercase tracking-wider rounded-[2px]">
              Sessão Agendada
            </span>
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Clock size={12} className="text-red-400" /> 09h00 — 12h00
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-white">
              Cegid Primavera: Vendas, Impostos & SAF-T (AO)
            </h4>
            <p className="text-[11px] text-slate-300 flex items-center gap-1">
              <MapPin size={13} className="text-red-400 flex-shrink-0" />
              Sala 2 — Envisio Luanda
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-[10px]">
            <span className="text-slate-400">
              Formador: <strong className="text-white">João Silva</strong>
            </span>
            <Link
              to="/academia/aluno/aula/cegid-primavera"
              className="px-3 py-1 bg-red-800 hover:bg-red-900 text-white font-extrabold uppercase rounded-[2px] flex items-center gap-1 shadow-2xs">
              <span>Ver Conteúdo</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Card do Diploma Conquistado com QR */}
        <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-extrabold uppercase rounded-[2px] flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-700" />
              Último Diploma Conquistado
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              ENV-2026-8849-SFT
            </span>
          </div>

          <h4 className="font-extrabold text-xs text-slate-900">
            Programação Web Front-end Completo
          </h4>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500 font-medium">
              80h Concluídas
            </span>
            <Link
              to="/academia/aluno/certificados"
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs">
              <Download size={11} />
              <span>Ver Diploma</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
