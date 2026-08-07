/** @format */

import React, { useState } from "react";
import {
  Tags,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BookOpen,
  List,
  Grid,
  Search,
  CheckCircle2,
  FolderTree,
} from "lucide-react";

interface CategoriaItem {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  cursosCount: number;
}

const INITIAL_CATEGORIAS: CategoriaItem[] = [
  {
    id: "1",
    nome: "ERP & Gestão",
    slug: "erp-gestao",
    descricao: "Formações em sistemas de gestão empresarial, Cegid Primavera e processos corporativos.",
    cursosCount: 4,
  },
  {
    id: "2",
    nome: "Programação",
    slug: "programacao",
    descricao: "Desenvolvimento web, mobile, algoritmos e estruturas de dados modernos.",
    cursosCount: 6,
  },
  {
    id: "3",
    nome: "Dados & BI",
    slug: "dados-bi",
    descricao: "Banco de dados, SQL Server, Power BI e inteligência de negócios executiva.",
    cursosCount: 5,
  },
  {
    id: "4",
    nome: "Produtividade",
    slug: "produtividade",
    descricao: "Ferramentas de escritório corporativo, Excel avançado com VBA e automação.",
    cursosCount: 3,
  },
  {
    id: "5",
    nome: "Inteligência Artificial",
    slug: "ia",
    descricao: "Machine Learning, IA Generativa e ferramentas inteligentes de produtividade empresarial.",
    cursosCount: 2,
  },
];

export default function GerirCategorias() {
  const [categorias, setCategorias] = useState<CategoriaItem[]>(INITIAL_CATEGORIAS);
  const [vistaModo, setVistaModo] = useState<"tabela" | "cards">("tabela");
  const [search, setSearch] = useState("");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoriaItem | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    slug: "",
    descricao: "",
  });

  const handleOpenModal = (cat?: CategoriaItem) => {
    if (cat) {
      setEditingCat(cat);
      setFormData({
        nome: cat.nome,
        slug: cat.slug,
        descricao: cat.descricao,
      });
    } else {
      setEditingCat(null);
      setFormData({
        nome: "",
        slug: "",
        descricao: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) return;

    if (editingCat) {
      setCategorias(
        categorias.map((c) =>
          c.id === editingCat.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCat: CategoriaItem = {
        id: String(Date.now()),
        ...formData,
        cursosCount: 0,
      };
      setCategorias([...categorias, newCat]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem a certeza que deseja eliminar esta categoria do catálogo?")) {
      setCategorias(categorias.filter((c) => c.id !== id));
    }
  };

  const filteredCategorias = categorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.descricao.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalCursos = categorias.reduce((acc, curr) => acc + curr.cursosCount, 0);

  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      
      {/* ── 1. BANNER EMPRESARIAL EXECUTIVE NO TOPO ───────────────────────── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800">
        <div className="space-y-3 z-10 max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Gestão de Categorias
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Estruturação e organização do catálogo por áreas funcionais, especialidades tecnológicas e ramos de conhecimento corporativo.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <FolderTree size={14} className="text-red-400" />
              <span className="font-bold text-white">{categorias.length} Categorias Registadas</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-emerald-400" />
              <span className="font-bold text-white">{totalCursos} Formações Associadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CONTROLOGOS DE VISTA & PESQUISA ────────────────────────────── */}
      <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar categoria ou slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-medium"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Alternador de Vista (Tabela por Definição) */}
          <div className="flex border border-slate-200 bg-slate-100/70 rounded-[2px] p-0.5">
            <button
              onClick={() => setVistaModo("tabela")}
              className={`px-3 py-1 text-xs font-bold flex items-center gap-1.5 rounded-[2px] cursor-pointer transition-colors ${
                vistaModo === "tabela"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <List size={14} />
              <span>Tabela</span>
            </button>

            <button
              onClick={() => setVistaModo("cards")}
              className={`px-3 py-1 text-xs font-bold flex items-center gap-1.5 rounded-[2px] cursor-pointer transition-colors ${
                vistaModo === "cards"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <Grid size={14} />
              <span>Cards</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs">
            <Plus size={15} />
            <span>Nova Categoria</span>
          </button>
        </div>

      </div>

      {/* ── 3. VISTA EM TABELA (CABEÇALHO PRETO BANNER & COLUNAS LIMPAS) ──── */}
      {vistaModo === "tabela" && (
        <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <th className="py-3 px-4 w-[30%]">Nome & Identificador Slug</th>
                  <th className="py-3 px-3 w-[45%]">Descrição da Área</th>
                  <th className="py-3 px-3 w-[15%]">Formações Associadas</th>
                  <th className="py-3 px-4 w-[10%] text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCategorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Coluna 1: Nome + Slug */}
                    <td className="py-3.5 px-4 truncate">
                      <p className="font-bold text-slate-900 text-xs">{cat.nome}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">slug: {cat.slug}</p>
                    </td>

                    {/* Coluna 2: Descrição */}
                    <td className="py-3.5 px-3 text-slate-600 text-xs leading-relaxed truncate" title={cat.descricao}>
                      {cat.descricao}
                    </td>

                    {/* Coluna 3: Cursos Count */}
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 text-xs whitespace-nowrap">
                      {cat.cursosCount} cursos
                    </td>

                    {/* Coluna 4: Ações Rápidas */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenModal(cat)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Editar Categoria">
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                          title="Eliminar">
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

      {/* ── 4. VISTA EM CARDS (GRELHA MODERNA) ────────────────────────────── */}
      {vistaModo === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategorias.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs flex flex-col justify-between p-5 space-y-4 hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[2px] bg-slate-900 text-white flex items-center justify-center">
                      <Tags size={15} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs">{cat.nome}</h3>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-700">
                    {cat.cursosCount} cursos
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{cat.descricao}</p>
                <p className="text-[10px] font-mono text-slate-400 mt-2">slug: {cat.slug}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => handleOpenModal(cat)}
                  className="px-3 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-[2px] font-bold transition-colors cursor-pointer flex items-center gap-1">
                  <Edit size={14} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-[2px] font-bold transition-colors cursor-pointer flex items-center gap-1">
                  <Trash2 size={14} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL CRIAR / EDITAR CATEGORIA ───────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2px] shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Tags size={16} className="text-red-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wide">
                  {editingCat ? "Editar Categoria" : "Criar Nova Categoria"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-[2px] transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => {
                    const nome = e.target.value;
                    const slug = nome.toLowerCase().replace(/[^a-z0-9]/g, "-");
                    setFormData({ ...formData, nome, slug });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                  placeholder="Ex: ERP & Gestão"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Identificador Único (Slug)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-xs font-mono text-slate-600 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Descrição da Área *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                  placeholder="Descreva o foco e âmbito dos cursos desta categoria..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px]">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-800 hover:bg-red-900 text-white font-bold rounded-[2px] flex items-center gap-1.5 shadow-xs">
                  <Save size={15} />
                  <span>Guardar Categoria</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
