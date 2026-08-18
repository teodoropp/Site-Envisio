/** @format */

import { useState } from "react";
import { Heart, BookOpen, Star, Clock, User, Trash2, ArrowRight, Sparkles, MapPin, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import FavoritosMobile from "./mobile/FavoritosMobile";

interface CursoFavorito {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  instrutor: string;
  imagem: string;
  duracao: string;
  localidade: string;
  avaliacao: number;
}

const mockFavoritos: CursoFavorito[] = [
  {
    id: "excel-avancado",
    titulo: "Microsoft Excel Corporativo Avançado",
    categoria: "Produtividade",
    descricao: "Automatize tarefas, crie análises avançadas e relatórios profissionais em sala.",
    instrutor: "Patrícia Ramos",
    imagem: "/academia/co-working-people-working-together.jpg",
    duracao: "40h Presenciais",
    localidade: "Envisio Academy (Luanda)",
    avaliacao: 4.8,
  },
  {
    id: "power-bi",
    titulo: "Power BI — Business Intelligence na Prática",
    categoria: "Dados & BI",
    descricao: "Desenvolva relatórios interativos e dashboards avançados para decisão executiva.",
    instrutor: "Ana Santos",
    imagem: "/academia/erp-course-featured.png",
    duracao: "50h Presenciais",
    localidade: "Envisio Academy (Luanda)",
    avaliacao: 4.9,
  },
  {
    id: "gestao-projetos-agile",
    titulo: "Gestão de Projetos & Metodologias Ágeis",
    categoria: "Gestão & Liderança",
    descricao: "Aprenda a liderar equipas de tecnologia com Scrum, Kanban e gestão moderna.",
    instrutor: "Eng. Fernando Costa",
    imagem: "/academia/slide_academia.png",
    duracao: "45h Presenciais",
    localidade: "Envisio Academy (Luanda)",
    avaliacao: 4.9,
  },
];

export default function Favoritos() {
  const isMobile = useIsMobile();
  const [favoritos, setFavoritos] = useState<CursoFavorito[]>(mockFavoritos);

  if (isMobile) {
    return <FavoritosMobile />;
  }

  const removerFavorito = (cursoId: string) => {
    setFavoritos((prev) => prev.filter((fav) => fav.id !== cursoId));
  };

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
            Lista de Interesse Presencial
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Heart className="text-red-500 fill-red-500" size={24} />
            <span>Cursos Favoritos</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Consulte os programas de formação presencial em sala de aula apresentados em tabela executiva.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700">
          <Sparkles size={24} className="text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Cursos Guardados</p>
            <p className="text-lg font-black leading-none text-white">{favoritos.length} Formações</p>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      {/* ── TABELA ORGANIZADA DE FAVORITOS ── */}
      {favoritos.length === 0 ? (
        <div className="bg-white p-12 rounded-[2px] border border-slate-200 text-center space-y-3">
          <Heart className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">Sua lista de favoritos está vazia</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore o nosso catálogo público de cursos presenciais e clique no ícone de coração para os guardar.
          </p>
          <Link
            to="/academia/cursos"
            className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[2px] transition-colors">
            Explorar Catálogo Presencial
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-extrabold text-[10px] uppercase tracking-wider border-b border-slate-800">
                  <th className="p-3.5">Curso</th>
                  <th className="p-3.5">Categoria</th>
                  <th className="p-3.5">Formador(a)</th>
                  <th className="p-3.5">Duração & Local</th>
                  <th className="p-3.5 text-center">Nota</th>
                  <th className="p-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {favoritos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-slate-50 transition-colors">
                    {/* Imagem + Título */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img
                          src={curso.imagem}
                          alt={curso.titulo}
                          className="w-14 h-11 object-cover rounded-[2px] border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                            {curso.titulo}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{curso.descricao}</p>
                        </div>
                      </div>
                    </td>

                    {/* Categoria */}
                    <td className="p-3.5 font-bold text-slate-700">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase rounded-[2px]">
                        {curso.categoria}
                      </span>
                    </td>

                    {/* Formador */}
                    <td className="p-3.5 font-bold text-slate-900">
                      {curso.instrutor}
                    </td>

                    {/* Duração & Localidade */}
                    <td className="p-3.5">
                      <p className="font-extrabold text-slate-800">{curso.duracao}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin size={11} className="text-red-800" />
                        {curso.localidade}
                      </p>
                    </td>

                    {/* Nota */}
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-600 font-black text-xs bg-amber-50 px-2 py-0.5 rounded-[2px] border border-orange-200/60">
                        <Star size={12} className="fill-amber-400" />
                        {curso.avaliacao}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/academia/curso/${curso.id}`}
                          className="px-3 py-1.5 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] inline-flex items-center gap-1 shadow-2xs transition-colors">
                          <Eye size={13} />
                          <span>Ver</span>
                        </Link>

                        <button
                          onClick={() => removerFavorito(curso.id)}
                          className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 rounded-[2px] border border-slate-200 transition-colors cursor-pointer"
                          title="Remover dos favoritos">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
