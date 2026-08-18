/** @format */

import { useState } from "react";
import { BookOpen, Search, MapPin, CheckSquare, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import MeusCursosMobile from "./mobile/MeusCursosMobile";

interface CursoInscrito {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  instrutor: string;
  progresso: number;
  status: "em_andamento" | "concluido";
  localidade: string;
  aulasPresenciaisConcluidas: number;
  totalAulasPresenciais: number;
  horas: number;
}

const mockMeusCursos: CursoInscrito[] = [
  {
    id: "1",
    titulo: "Gestão Avançada de ERP Cegid Primavera V10",
    categoria: "Sistemas & ERP",
    descricao: "Formação técnica presencial focada na operacionalização do Primavera V10, vendas, stocks e submissão SAF-T (AO).",
    instrutor: "Eng.ª Sofia Martins",
    progresso: 70,
    status: "em_andamento",
    localidade: "Envisio Academy — Sala Executiva 302 (Luanda)",
    aulasPresenciaisConcluidas: 14,
    totalAulasPresenciais: 20,
    horas: 40,
  },
  {
    id: "2",
    titulo: "Análise Contabilística e SAF-T Angola (SNC-AO)",
    categoria: "Contabilidade & Fiscalidade",
    descricao: "Domínio do plano de contas nacional angolano e procedimentos fiscais de fecho de exercício.",
    instrutor: "Dr. Carlos Eduardo",
    progresso: 100,
    status: "concluido",
    localidade: "Envisio Academy — Auditório Principal (Luanda)",
    aulasPresenciaisConcluidas: 16,
    totalAulasPresenciais: 16,
    horas: 32,
  },
];

export default function MeusCursos() {
  const isMobile = useIsMobile();
  const [cursos] = useState<CursoInscrito[]>(mockMeusCursos);
  const [filtroStatus, setFiltroStatus] = useState<"todos" | "em_andamento" | "concluido">("todos");
  const [busca, setBusca] = useState("");

  if (isMobile) {
    return <MeusCursosMobile />;
  }

  const cursosFiltrados = cursos.filter((curso) => {
    const atendeStatus = filtroStatus === "todos" || curso.status === filtroStatus;
    const atendeBusca =
      curso.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      curso.instrutor.toLowerCase().includes(busca.toLowerCase());
    return atendeStatus && atendeBusca;
  });

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
            Plano de Formação Presencial
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Meus Cursos Presenciais
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Consulte os seus programas de formação em sala de aula, verifique a localização do seu centro e valide as presenças efetuadas.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700">
          <BookOpen size={24} className="text-red-400" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Total Inscritos</p>
            <p className="text-lg font-black leading-none text-white">{cursos.length} Formações</p>
          </div>
        </div>
      </div>

      {/* ── BARRA DE PESQUISA E FILTROS COMPACTOS ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex border-b border-slate-200 sm:border-b-0 text-xs font-bold w-full sm:w-auto">
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              filtroStatus === "todos"
                ? "bg-slate-900 text-white font-extrabold rounded-[2px]"
                : "text-slate-600 hover:text-slate-900"
            }`}>
            Todos ({cursos.length})
          </button>

          <button
            onClick={() => setFiltroStatus("em_andamento")}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              filtroStatus === "em_andamento"
                ? "bg-slate-900 text-white font-extrabold rounded-[2px]"
                : "text-slate-600 hover:text-slate-900"
            }`}>
            Em Andamento ({cursos.filter((c) => c.status === "em_andamento").length})
          </button>

          <button
            onClick={() => setFiltroStatus("concluido")}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              filtroStatus === "concluido"
                ? "bg-slate-900 text-white font-extrabold rounded-[2px]"
                : "text-slate-600 hover:text-slate-900"
            }`}>
            Concluídos ({cursos.filter((c) => c.status === "concluido").length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Pesquisar por curso ou formador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-[2px] text-xs text-slate-900 focus:outline-none focus:border-slate-400"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── GRELHA ORGANIZADA DE CARTÕES DE CURSO ── */}
      {cursosFiltrados.length === 0 ? (
        <div className="bg-white p-12 rounded-[2px] border border-slate-200 text-center space-y-3">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">Nenhum curso encontrado</h3>
          <p className="text-xs text-slate-500">Tente ajustar a sua pesquisa ou filtro de estado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cursosFiltrados.map((curso) => (
            <div
              key={curso.id}
              className="bg-white rounded-[2px] border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 space-y-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase rounded-[2px]">
                    {curso.categoria}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                      curso.status === "concluido"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                    {curso.status === "concluido" ? "Concluído" : "Em Andamento"}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {curso.titulo}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Formador(a): <strong className="text-slate-800">{curso.instrutor}</strong>
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1 font-medium pt-1">
                    <MapPin size={14} className="text-red-800" />
                    {curso.localidade}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {curso.descricao}
                </p>

                {/* Barra de Progresso Presencial */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Aproveitamento Presencial</span>
                    <span className="text-red-800 font-black">{curso.progresso}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-[2px] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        curso.status === "concluido" ? "bg-emerald-600" : "bg-red-800"
                      }`}
                      style={{ width: `${curso.progresso}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {curso.horas} Horas de Formação
                    </span>
                    <span>
                      {curso.aulasPresenciaisConcluidas} de {curso.totalAulasPresenciais} Aulas Vistas
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="p-4 bg-slate-50/50 flex items-center justify-between gap-3">
                {curso.status === "concluido" ? (
                  <Link
                    to="/academia/aluno/certificados"
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
                    <Award size={14} />
                    <span>Ver Diploma Certificado</span>
                  </Link>
                ) : (
                  <Link
                    to={`/academia/aluno/aula/${curso.id}`}
                    className="w-full py-2 bg-red-800 hover:bg-red-900 text-white font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
                    <CheckSquare size={14} />
                    <span>Registar Presença / Marcar Aula</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
