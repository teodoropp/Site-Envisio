/** @format */

import { useState } from "react";
import {
  Heart,
  BookOpen,
  Star,
  Trash2,
  ArrowRight,
  MapPin,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

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
    descricao:
      "Automatize tarefas, crie análises avançadas e relatórios profissionais em sala.",
    instrutor: "Patrícia Ramos",
    imagem: "/academia/co-working-people-working-together.jpg",
    duracao: "40h Presenciais",
    localidade: "Envisio Luanda",
    avaliacao: 4.8,
  },
  {
    id: "power-bi",
    titulo: "Power BI — Business Intelligence na Prática",
    categoria: "Dados & BI",
    descricao:
      "Desenvolva relatórios interativos e dashboards avançados para decisão executiva.",
    instrutor: "Ana Santos",
    imagem: "/academia/erp-course-featured.png",
    duracao: "50h Presenciais",
    localidade: "Envisio Luanda",
    avaliacao: 4.9,
  },
  {
    id: "gestao-projetos-agile",
    titulo: "Gestão de Projetos & Metodologias Ágeis",
    categoria: "Gestão & Liderança",
    descricao:
      "Aprenda a liderar equipas de tecnologia com Scrum, Kanban e gestão moderna.",
    instrutor: "Eng. Fernando Costa",
    imagem: "/academia/slide_academia.png",
    duracao: "45h Presenciais",
    localidade: "Envisio Luanda",
    avaliacao: 4.9,
  },
];

export default function FavoritosMobile() {
  const [favoritos, setFavoritos] = useState<CursoFavorito[]>(mockFavoritos);

  const removerFavorito = (cursoId: string) => {
    setFavoritos((prev) => prev.filter((fav) => fav.id !== cursoId));
  };

  return (
    <div className="space-y-4">
      {/* ── BANNER AZUL ESCURO MOBILE ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 space-y-2">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <span>Cursos Favoritos</span>
          <Heart className="text-red-500 fill-red-500" size={20} />
        </h1>
        <p className="text-xs text-slate-300">
          Formações guardadas em favoritos.
        </p>
      </div>

      {/* ── LISTA DE CARDS RETANGULARES PEQUENOS EMPILHADOS DE FAVORITOS ── */}
      {favoritos.length === 0 ? (
        <div className="bg-white p-8 rounded-[2px] border border-slate-200 text-center space-y-2">
          <Heart className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="text-xs font-bold text-slate-800">
            Nenhum curso guardado
          </h3>
          <p className="text-[11px] text-slate-500">
            Explore o catálogo e clique no coração para guardar cursos.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {favoritos.map((curso) => (
            <div
              key={curso.id}
              className="bg-white rounded-[2px] border border-slate-200 shadow-2xs p-3 flex items-center justify-between gap-3 hover:border-slate-300 transition-all">
              {/* Esquerda: Miniatura Retangular + Informações */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-16 h-14 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-200 flex-shrink-0 relative">
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 font-extrabold text-[8px] uppercase rounded-[2px]">
                      {curso.categoria}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-black text-[9px]">
                      <Star size={9} className="fill-amber-400" />{" "}
                      {curso.avaliacao}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900 leading-tight line-clamp-1">
                    {curso.titulo}
                  </h3>

                  <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                    Formador: {curso.instrutor} • {curso.duracao}
                  </p>
                </div>
              </div>

              {/* Direita: Botões Ação */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Link
                  to={`/academia/curso/${curso.id}`}
                  className="px-3 py-1.5 bg-red-800 hover:bg-red-900 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs">
                  <span>Detalhes</span>
                  <ArrowRight size={10} />
                </Link>

                <button
                  onClick={() => removerFavorito(curso.id)}
                  className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 rounded-[2px] border border-slate-200 transition-colors cursor-pointer"
                  title="Remover">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
