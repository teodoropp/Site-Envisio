/** @format */

import React, { useState, useEffect } from "react";
import {
  Star,
  Check,
  Sparkles,
  Save,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  Zap,
} from "lucide-react";

interface CursoDestaqueItem {
  id: string;
  titulo: string;
  categoria: string;
  imagemUrl: string;
  isHeroFeatured: boolean;
  secao: "destaques" | "populares" | "novidades" | "nenhum";
}

const INITIAL_ITEMS: CursoDestaqueItem[] = [
  {
    id: "1",
    titulo: "Cegid Primavera — Funcionalidades e Módulos Corporativos",
    categoria: "ERP & Gestão",
    imagemUrl: "/academia/primavera.svg",
    isHeroFeatured: true,
    secao: "destaques",
  },
  {
    id: "2",
    titulo: "Programação Web Frontend (HTML, CSS e JavaScript)",
    categoria: "Programação",
    imagemUrl: "/academia/html.png",
    isHeroFeatured: true,
    secao: "destaques",
  },
  {
    id: "3",
    titulo: "Lógica de Programação e Algoritmos",
    categoria: "Programação",
    imagemUrl: "/academia/logica.png",
    isHeroFeatured: false,
    secao: "populares",
  },
  {
    id: "4",
    titulo: "SQL Server — Banco de Dados Corporativo",
    categoria: "Dados & BI",
    imagemUrl: "/academia/primavera.svg",
    isHeroFeatured: false,
    secao: "populares",
  },
  {
    id: "5",
    titulo: "Power BI — Business Intelligence & Dashboards",
    categoria: "Dados & BI",
    imagemUrl: "/academia/logica.png",
    isHeroFeatured: false,
    secao: "novidades",
  },
  {
    id: "6",
    titulo: "Microsoft Excel Avançado com VBA",
    categoria: "Produtividade",
    imagemUrl: "/academia/logica.png",
    isHeroFeatured: false,
    secao: "novidades",
  },
];

export default function GerirDestaques() {
  const [items, setItems] = useState<CursoDestaqueItem[]>(INITIAL_ITEMS);
  const [salvoMsg, setSalvoMsg] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Múltiplos cursos no Hero ativam a lógica de Carrossel
  const heroCourses = items.filter((i) => i.isHeroFeatured);
  const activeHeroList = heroCourses.length > 0 ? heroCourses : [items[0]];

  // Rotação automática do Carrossel para demonstração
  useEffect(() => {
    if (activeHeroList.length > 1) {
      const timer = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % activeHeroList.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [activeHeroList.length]);

  const currentHero = activeHeroList[heroIndex % activeHeroList.length] || activeHeroList[0];

  const handleToggleHero = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isHeroFeatured: !item.isHeroFeatured } : item
      )
    );
  };

  const handleSecaoChange = (
    id: string,
    secao: "destaques" | "populares" | "novidades" | "nenhum"
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, secao } : item))
    );
  };

  const handleSave = () => {
    setSalvoMsg(true);
    setTimeout(() => setSalvoMsg(false), 3000);
  };

  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      
      {/* ── 1. BANNER EMPRESARIAL EXECUTIVE NO TOPO ───────────────────────── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative overflow-hidden shadow-xs border border-slate-800">
        <div className="space-y-2 z-10 max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Destaques
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Configure quais formações aparecem em evidência na página inicial do portal. Quando mais de um curso for ativado no Hero, o portal público apresenta automaticamente um carrossel dinâmico.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span className="font-bold text-white">
                {activeHeroList.length > 1
                  ? `Carrossel Hero (${activeHeroList.length} Cursos Ativos)`
                  : "Hero Individual Ativo"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-red-400" />
              <span className="font-bold text-white">
                {items.filter((i) => i.secao === "destaques").length} Em Destaque
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-red-800 hover:bg-red-900 text-white px-5 py-2 text-xs font-bold rounded-[2px] flex items-center gap-2 self-start sm:self-auto cursor-pointer transition-colors shadow-xs flex-shrink-0">
          <Save size={15} />
          <span>Salvar Alterações</span>
        </button>
      </div>

      {salvoMsg && (
        <div className="p-4 bg-slate-900 text-white rounded-[2px] text-xs font-semibold flex items-center gap-2 border-l-4 border-l-red-600 shadow-xs animate-in fade-in duration-150">
          <Check size={16} className="text-red-500" />
          <span>Configurações de carrossel de destaques guardadas com sucesso!</span>
        </div>
      )}

      {/* ── 2. SELETOR E PRÉ-VISUALIZAÇÃO DE CARROSSEL HERO ──────────────── */}
      <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="text-red-800" size={16} />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Pré-Visualização do Banner Hero (Modo Carrossel)
            </h2>
          </div>

          {activeHeroList.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 font-mono">
                Slide {heroIndex + 1} de {activeHeroList.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setHeroIndex(
                      (prev) => (prev - 1 + activeHeroList.length) % activeHeroList.length
                    )
                  }
                  className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-[2px] text-slate-700 transition-colors cursor-pointer"
                  title="Slide Anterior">
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() =>
                    setHeroIndex((prev) => (prev + 1) % activeHeroList.length)
                  }
                  className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-[2px] text-slate-700 transition-colors cursor-pointer"
                  title="Próximo Slide">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-500">
          {activeHeroList.length > 1
            ? "Múltiplos cursos ativos no Hero. O portal exibirá uma rotação automática em carrossel."
            : "Apenas 1 curso ativo no Hero. Selecione mais cursos na tabela abaixo para ativar o modo carrossel."}
        </p>

        {/* Card do Slide Atual do Carrossel */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-[2px] space-y-6 shadow-xs border border-slate-800 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-red-950/90 text-red-400 font-extrabold text-[10px] uppercase tracking-widest rounded-[2px] border border-red-800/40">
                QUALIFICAÇÃO PROFISSIONAL • CERTIFICAÇÃO ENVISIO
              </span>
              <span className="text-[10px] text-slate-400 font-mono">• {currentHero.categoria}</span>
            </div>

            <div className="flex items-center gap-2">
              {activeHeroList.length > 1 ? (
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase rounded-[2px] w-fit">
                  CARROSSEL HERO ATIVO ({heroIndex + 1}/{activeHeroList.length})
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-800 text-white font-extrabold text-[10px] tracking-wider uppercase rounded-[2px] w-fit">
                  HERO INDIVIDUAL ATIVO
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] bg-slate-800 border border-slate-700 flex items-center justify-center p-2 flex-shrink-0">
              <img
                src={currentHero.imagemUrl}
                alt={currentHero.titulo}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-2 max-w-3xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                {currentHero.titulo}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Formação técnica de elevado valor prático e aplicabilidade corporativa. Capacitação desenhada para resposta direta às necessidades operacionais das empresas angolanas.
              </p>
            </div>
          </div>

          {/* Indicadores de Ponto do Carrossel */}
          {activeHeroList.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              {activeHeroList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === heroIndex ? "w-6 bg-red-500" : "w-1.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={`Ir para o slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Grelha de Métricas da Formação em Destaque */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Carga Horária</span>
              <span className="font-mono font-bold text-white text-xs">60h a 120h</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Categoria</span>
              <span className="font-bold text-white text-xs">{currentHero.categoria}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Matriculados</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">Ativo no Portal</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Certificação</span>
              <span className="font-bold text-white text-xs">Oficial Envisio</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. TABELA DE GESTÃO DE DESTAQUES (SUPORTA MÚLTIPLOS SELECIONADOS) ── */}
      <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
            Gestão de Relevância e Posições do Carrossel
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">
            Ative múltiplos cursos no Hero para formar o carrossel automático da Homepage
          </span>
        </div>

        <div className="w-full">
          <table className="w-full table-fixed text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4 w-[36%]">Formação Formativa</th>
                <th className="py-3 px-3 w-[20%]">Categoria</th>
                <th className="py-3 px-3 w-[24%]">Status no Carrossel Hero</th>
                <th className="py-3 px-4 w-[20%] text-right">Secção na Homepage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Coluna 1: Imagem + Título */}
                  <td className="py-3.5 px-4 truncate">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[2px] bg-slate-100 border border-slate-200/60 flex items-center justify-center p-1 flex-shrink-0">
                        <img
                          src={item.imagemUrl}
                          alt={item.titulo}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="font-bold text-slate-900 text-xs truncate" title={item.titulo}>
                        {item.titulo}
                      </p>
                    </div>
                  </td>

                  {/* Coluna 2: Categoria (Texto limpo) */}
                  <td className="py-3.5 px-3 font-semibold text-slate-700 text-xs">
                    {item.categoria}
                  </td>

                  {/* Coluna 3: Toggle Múltiplo Carrossel Hero */}
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleToggleHero(item.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-[2px] cursor-pointer flex items-center gap-1.5 transition-all ${
                        item.isHeroFeatured
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}>
                      <Star
                        size={13}
                        className={item.isHeroFeatured ? "fill-amber-400 text-amber-400" : "text-slate-400"}
                      />
                      <span>{item.isHeroFeatured ? "⭐ No Carrossel Hero" : "+ Adicionar ao Hero"}</span>
                    </button>
                  </td>

                  {/* Coluna 4: Secção Dropdown */}
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={item.secao}
                      onChange={(e) =>
                        handleSecaoChange(
                          item.id,
                          e.target.value as "destaques" | "populares" | "novidades" | "nenhum"
                        )
                      }
                      className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-[2px] text-xs font-bold text-slate-800 focus:outline-none cursor-pointer">
                      <option value="destaques">Secção Destaques</option>
                      <option value="populares">Secção Populares</option>
                      <option value="novidades">Secção Novidades</option>
                      <option value="nenhum">Ocultar da Homepage</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
