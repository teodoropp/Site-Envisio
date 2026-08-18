/** @format */

import { useState } from "react";
import {
  BookOpen,
  Search,
  Award,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import LayoutAlunoMobile from "./LayoutAlunoMobile";

interface CursoInscrito {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  instrutor: string;
  imagem: string;
  progresso: number;
  status: "em_andamento" | "inscrito" | "concluido";
  localidade: string;
  dataInicio?: string;
}

const meusCursosData: CursoInscrito[] = [
  {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos Corporativos",
    categoria: "ERP & Gestão",
    descricao:
      "Domine o Cegid Primavera: conceitos, parametrização e boas práticas no ERP em sala de aula.",
    instrutor: "João Silva",
    imagem: "/academia/primavera.svg",
    progresso: 70,
    status: "em_andamento",
    localidade: "Envisio Academy — Sala Executiva 302 (Luanda)",
  },
  {
    id: "programacao-web-frontend",
    titulo: "Programação Web Front-end Completo",
    categoria: "Desenvolvimento Web",
    descricao:
      "Construa interfaces modernas e responsivas utilizando HTML5, CSS3, JavaScript ES6+ e React.",
    instrutor: "Pedro Costa",
    imagem: "/academia/frontend.jpg",
    progresso: 100,
    status: "concluido",
    localidade: "Envisio Academy — Auditório Principal (Luanda)",
  },
  {
    id: "sql-server",
    titulo: "SQL Server — Banco de Dados Essencial",
    categoria: "Dados & BI",
    descricao:
      "Consultas SQL avançadas, modelagem de bancos de dados relacionais, views e stored procedures.",
    instrutor: "Ana Santos",
    imagem: "/academia/sql.png",
    progresso: 35,
    status: "em_andamento",
    localidade: "Envisio Academy — Sala 204 (Luanda)",
  },
  {
    id: "logica-de-programacao",
    titulo: "Lógica de Programação e Algoritmos",
    categoria: "Programação",
    descricao:
      "Estrutura condicional, laços de repetição e resolução de problemas práticos de código.",
    instrutor: "Pedro Costa",
    imagem: "/academia/logica.png",
    progresso: 0,
    status: "inscrito",
    localidade: "Envisio Academy — Lab 1 (Luanda)",
    dataInicio: "Início: 01 de Outubro",
  },
];

export default function MeusCursosMobile() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<
    "todos" | "em_andamento" | "inscrito" | "concluido"
  >("todos");

  const cursosFiltrados = meusCursosData.filter((c) => {
    const matchBusca =
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.categoria.toLowerCase().includes(busca.toLowerCase());
    const matchStatus =
      filtroStatus === "todos" ? true : c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const cursosEmAndamento = cursosFiltrados.filter(
    (c) => c.status === "em_andamento",
  );
  const cursosConcluidos = cursosFiltrados.filter(
    (c) => c.status === "concluido",
  );
  const todosMeusCursosAtivosEInscritos = cursosFiltrados;

  return (
    <LayoutAlunoMobile>
      <div className="space-y-4 pb-8 select-none">
        {/* ── BARRA SUPERIOR DE BOAS-VINDAS / RESUMO ── */}
        <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[9px] font-extrabold uppercase rounded-[2px]">
              Gestão de Formações
            </span>
          </div>

          <div>
            <h1 className="text-xl font-black text-white leading-tight">
              Meus Cursos
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Gestão e acompanhamento de carga horária em sala.
            </p>
          </div>

          {/* Campo de Pesquisa Integrado */}
          <div className="relative pt-1">
            <input
              type="text"
              placeholder="Pesquisar nos meus cursos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-[2px] text-xs focus:outline-none focus:border-red-500 font-medium"
            />
            <Search
              size={14}
              className="absolute left-3 top-3.5 text-slate-400"
            />
          </div>
        </div>

        {/* ── FILTROS RÁPIDOS DE STATUS ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
              filtroStatus === "todos"
                ? "bg-red-800 text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}>
            Todos ({meusCursosData.length})
          </button>
          <button
            onClick={() => setFiltroStatus("em_andamento")}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
              filtroStatus === "em_andamento"
                ? "bg-red-800 text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}>
            Em Andamento (2)
          </button>
          <button
            onClick={() => setFiltroStatus("concluido")}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
              filtroStatus === "concluido"
                ? "bg-red-800 text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}>
            Concluídos (1)
          </button>
          <button
            onClick={() => setFiltroStatus("inscrito")}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
              filtroStatus === "inscrito"
                ? "bg-red-800 text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}>
            Inscrito (1)
          </button>
        </div>

        {/* ── SECÇÃO 1: TODOS OS MEUS CURSOS (CULTURA APP MEUS CURSOS - ABRE FICHA DE DETALHES DE CURSO) ── */}
        {filtroStatus === "todos" &&
          todosMeusCursosAtivosEInscritos.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Bookmark size={16} className="text-red-800" />
                  <span>
                    Meus Cursos ({todosMeusCursosAtivosEInscritos.length})
                  </span>
                </h3>
              </div>

              {/* Carrossel Deslizante 1*2 */}
              <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1">
                {todosMeusCursosAtivosEInscritos.map((curso) => (
                  <div
                    key={curso.id}
                    className="w-[calc(50%-6px)] min-w-[calc(50%-6px)] max-w-[calc(50%-6px)] bg-white rounded-[2px] border border-slate-200 shadow-2xs p-2.5 space-y-2 flex flex-col justify-between flex-shrink-0 snap-start hover:border-slate-300 transition-all">
                    {/* Imagem Limpa do Curso */}
                    <div className="w-full h-24 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-100">
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Título */}
                    <h4 className="font-black text-xs text-slate-900 leading-tight line-clamp-1">
                      {curso.titulo}
                    </h4>

                    {/* Descrição */}
                    <p className="text-[10px] text-slate-500 font-normal leading-snug line-clamp-2 min-h-[26px]">
                      {curso.descricao}
                    </p>

                    {/* Rodapé: Link para a Página de Detalhes do Curso (Imagem 1) */}
                    <div className="pt-1 border-t border-slate-100 space-y-1">
                      <p className="text-[9px] text-slate-500 font-medium line-clamp-1">
                        {curso.status === "inscrito"
                          ? curso.dataInicio
                          : `Formador: ${curso.instrutor}`}
                      </p>
                      <Link
                        to={`/academia/aluno/curso/${curso.id}`}
                        className="w-full py-1 text-red-800 hover:text-red-900 font-black text-[10px] uppercase tracking-wider flex items-center justify-center text-center transition-colors">
                        <span>Ver Detalhes</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* ── SECÇÃO 2: FORMAÇÕES EM ANDAMENTO (COM PERCENTAGEM DE PROGRESSO & LINK PARA DETALHES) ── */}
        {(filtroStatus === "todos" || filtroStatus === "em_andamento") &&
          cursosEmAndamento.length > 0 && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                  <BookOpen size={16} className="text-red-800" />
                  <span>Formações em Andamento ({cursosEmAndamento.length})</span>
                </h3>
              </div>

              {/* Carrossel Deslizante 1*2 */}
              <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1">
                {cursosEmAndamento.map((curso) => (
                  <div
                    key={curso.id}
                    className="w-[calc(50%-6px)] min-w-[calc(50%-6px)] max-w-[calc(50%-6px)] bg-white rounded-[2px] border border-slate-200 shadow-2xs p-2.5 space-y-2 flex flex-col justify-between flex-shrink-0 snap-start hover:border-slate-300 transition-all">
                    {/* Imagem Limpa do Curso */}
                    <div className="w-full h-24 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-100 relative">
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />
                      {/* Badge de Percentagem de Progresso no Topo da Imagem */}
                      <span className="absolute top-1.5 right-1.5 bg-slate-900/90 text-white border border-slate-700 text-[9px] font-black px-1.5 py-0.5 rounded-[2px] shadow-2xs">
                        {curso.progresso}%
                      </span>
                    </div>

                    <h4 className="font-black text-xs text-slate-900 leading-tight line-clamp-1">
                      {curso.titulo}
                    </h4>

                    {/* Barra de Progresso + Percentagem */}
                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-500">Progresso</span>
                        <span className="text-red-800 font-extrabold">{curso.progresso}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div
                          className="h-full bg-gradient-to-r from-red-700 to-red-900 rounded-full"
                          style={{ width: `${curso.progresso}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-100 space-y-1">
                      <p className="text-[9px] text-slate-500 font-medium line-clamp-1">
                        Formador: {curso.instrutor}
                      </p>
                      <Link
                        to={`/academia/aluno/curso/${curso.id}`}
                        className="w-full py-1 text-red-800 hover:text-red-900 font-black text-[10px] uppercase tracking-wider flex items-center justify-center text-center transition-colors">
                        <span>Ver Detalhes</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* ── SECÇÃO 3: FORMAÇÕES CONCLUÍDAS E DIPLOMAS ── */}
        {(filtroStatus === "todos" || filtroStatus === "concluido") &&
          cursosConcluidos.length > 0 && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Award size={16} className="text-emerald-700" />
                  <span>Formações Concluídas ({cursosConcluidos.length})</span>
                </h3>
              </div>

              {/* Carrossel Deslizante 1*2 */}
              <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1">
                {cursosConcluidos.map((curso) => (
                  <div
                    key={curso.id}
                    className="w-[calc(50%-6px)] min-w-[calc(50%-6px)] max-w-[calc(50%-6px)] bg-white rounded-[2px] border border-slate-200 shadow-2xs p-2.5 space-y-2 flex flex-col justify-between flex-shrink-0 snap-start hover:border-slate-300 transition-all">
                    <div className="w-full h-24 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-100 relative">
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 right-1.5 bg-emerald-700 text-white font-black text-[9px] px-1.5 py-0.5 rounded-[2px]">
                        100%
                      </span>
                    </div>

                    <h4 className="font-black text-xs text-slate-900 leading-tight line-clamp-1">
                      {curso.titulo}
                    </h4>

                    <p className="text-[10px] text-slate-500 font-normal leading-snug line-clamp-2 min-h-[26px]">
                      {curso.descricao}
                    </p>

                    <div className="pt-1 border-t border-slate-100">
                      <Link
                        to="/academia/aluno/certificados"
                        className="w-full py-1 text-emerald-700 hover:text-emerald-800 font-black text-[10px] uppercase tracking-wider flex items-center justify-center text-center transition-colors">
                        <span>Ver Diploma</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </LayoutAlunoMobile>
  );
}
