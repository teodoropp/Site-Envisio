/** @format */

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Grid,
  List,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  User,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  CheckCircle,
  ArrowLeft,
  GraduationCap,
  Layers,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle2,
  FileText,
  UploadCloud,
  Paperclip,
  Check,
  Download,
} from "lucide-react";
import api from "../../utils/api";

interface CursoItem {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  duracao: string;
  preco: string;
  instrutor: string;
  instrutorCargo: string;
  inscritos: number;
  imagemUrl: string;
  status: "publicado" | "rascunho";
  destaque: boolean;
}

const INITIAL_CURSOS: CursoItem[] = [
  {
    id: "1",
    titulo: "Cegid Primavera — Módulos Corporativos",
    descricao:
      "Domine o ERP mais utilizado em Angola e Portugal para gestão comercial, financeira e de recursos humanos com casos práticos reais.",
    categoria: "ERP & Gestão",
    nivel: "Intermédio",
    duracao: "120h",
    preco: "85.000 Kz",
    instrutor: "Eng. Mateus Silva",
    instrutorCargo: "Consultor Sénior Cegid Primavera",
    inscritos: 142,
    imagemUrl: "/academia/primavera.svg",
    status: "publicado",
    destaque: true,
  },
  {
    id: "2",
    titulo: "Lógica de Programação e Algoritmos",
    descricao:
      "Base sólida para iniciar a carreira de desenvolvimento de software. Pensamento estruturado e resolução de problemas.",
    categoria: "Programação",
    nivel: "Iniciante",
    duracao: "60h",
    preco: "45.000 Kz",
    instrutor: "Dra. Teresa Bento",
    instrutorCargo: "Engenheira de Software & Docente",
    inscritos: 210,
    imagemUrl: "/academia/logica.png",
    status: "publicado",
    destaque: false,
  },
  {
    id: "3",
    titulo: "Programação Web Frontend com React & Tailwind",
    descricao:
      "Construa interfaces modernas, responsivas e profissionais com as tecnologias mais requisitadas do mercado atual.",
    categoria: "Programação",
    nivel: "Intermédio",
    duracao: "90h",
    preco: "60.000 Kz",
    instrutor: "Lic. Carlos Fonseca",
    instrutorCargo: "Desenvolvedor Frontend UI/UX",
    inscritos: 98,
    imagemUrl: "/academia/html.png",
    status: "publicado",
    destaque: false,
  },
  {
    id: "4",
    titulo: "Microsoft Excel Avançado com VBA e Macros",
    descricao:
      "Automatização de folhas de cálculo, dashboards dinâmicos, tabelas dinâmicas e análise avançada de dados corporativos.",
    categoria: "Produtividade",
    nivel: "Avançado",
    duracao: "50h",
    preco: "40.000 Kz",
    instrutor: "Eng. Mateus Silva",
    instrutorCargo: "Especialista em Business Intelligence",
    inscritos: 180,
    imagemUrl: "/academia/logica.png",
    status: "publicado",
    destaque: false,
  },
  {
    id: "5",
    titulo: "SQL Server & Modelação de Bases de Dados",
    descricao:
      "Criação, otimização e administração de bases de dados relacionais corporativas para alta disponibilidade.",
    categoria: "Dados & BI",
    nivel: "Intermédio",
    duracao: "70h",
    preco: "50.000 Kz",
    instrutor: "Msc. António Pedro",
    instrutorCargo: "Administrador de Bases de Dados DBA",
    inscritos: 115,
    imagemUrl: "/academia/primavera.svg",
    status: "publicado",
    destaque: false,
  },
  {
    id: "6",
    titulo: "Power BI para Tomada de Decisão Executiva",
    descricao:
      "Transforme dados brutos em dashboards visuais interativos para relatórios de direção e inteligência de negócio.",
    categoria: "Dados & BI",
    nivel: "Intermédio",
    duracao: "40h",
    preco: "65.000 Kz",
    instrutor: "Msc. António Pedro",
    instrutorCargo: "Consultor de Business Intelligence",
    inscritos: 76,
    imagemUrl: "/academia/html.png",
    status: "rascunho",
    destaque: false,
  },
  {
    id: "7",
    titulo: "Inteligência Artificial Generativa para Empresas",
    descricao:
      "Aplicação de ferramentas modernas de IA para produtividade corporativa, automação de processos e criação de conteúdos.",
    categoria: "IA",
    nivel: "Iniciante",
    duracao: "30h",
    preco: "55.000 Kz",
    instrutor: "Dra. Teresa Bento",
    instrutorCargo: "Investigadora em IA & Sistemas Inteligentes",
    inscritos: 42,
    imagemUrl: "/academia/logica.png",
    status: "rascunho",
    destaque: false,
  },
];

const ITENS_POR_PAGINA = 5;

export default function AdminGerirCursos() {
  const [cursos, setCursos] = useState<CursoItem[]>(INITIAL_CURSOS);
  const [search, setSearch] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [nivelFilter, setNivelFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  // PADRÃO SOLICITADO: Vista em TABELA por definição
  const [vistaModo, setVistaModo] = useState<"tabela" | "cards">("tabela");
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Estado de Página de Detalhe do Curso
  const [detalhesCurso, setDetalhesCurso] = useState<CursoItem | null>(null);
  const [moduloPagina, setModuloPagina] = useState(0);

  // Assistente Multi-Passos no Modal
  const [modalStep, setModalStep] = useState<1 | 2 | 3 | 4>(1);
  const [pdfFile, setPdfFile] = useState<string>(
    "Manual_Formacao_Cegid_v10.pdf",
  );

  // Modal Criar / Editar
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<CursoItem | null>(null);

  // Upload de Imagem no Modal
  const [imagePreview, setImagePreview] = useState<string>(
    "/academia/primavera.svg",
  );

  // Form State
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "ERP & Gestão",
    nivel: "Intermédio",
    duracao: "60h",
    preco: "50.000 Kz",
    instrutor: "",
    instrutorCargo: "",
    imagemUrl: "/academia/primavera.svg",
    status: "publicado" as "publicado" | "rascunho",
    destaque: false,
  });

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/cursos");
        if (response.data?.sucesso && Array.isArray(response.data.dados)) {
          // Merge se necessário
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchCursos();
  }, []);

  const handleOpenModal = (curso?: CursoItem) => {
    setModalStep(1);
    if (curso) {
      setEditingCurso(curso);
      setImagePreview(curso.imagemUrl);
      setFormData({
        titulo: curso.titulo,
        descricao: curso.descricao,
        categoria: curso.categoria,
        nivel: curso.nivel,
        duracao: curso.duracao,
        preco: curso.preco,
        instrutor: curso.instrutor,
        instrutorCargo: curso.instrutorCargo,
        imagemUrl: curso.imagemUrl,
        status: curso.status,
        destaque: curso.destaque,
      });
    } else {
      setEditingCurso(null);
      setImagePreview("/academia/primavera.svg");
      setFormData({
        titulo: "",
        descricao: "",
        categoria: "ERP & Gestão",
        nivel: "Intermédio",
        duracao: "60h",
        preco: "50.000 Kz",
        instrutor: "Eng. Mateus Silva",
        instrutorCargo: "Consultor Técnico Senior",
        imagemUrl: "/academia/primavera.svg",
        status: "publicado",
        destaque: false,
      });
    }
    setModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setImagePreview(resultStr);
        setFormData((prev) => ({ ...prev, imagemUrl: resultStr }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCurso) {
      const updatedItem = { ...editingCurso, ...formData };
      setCursos((prev) =>
        prev.map((c) => (c.id === editingCurso.id ? updatedItem : c)),
      );
      if (detalhesCurso?.id === editingCurso.id) {
        setDetalhesCurso(updatedItem);
      }
    } else {
      const newCurso: CursoItem = {
        id: String(Date.now()),
        ...formData,
        inscritos: 0,
      };
      setCursos((prev) => [newCurso, ...prev]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Tem a certeza que deseja eliminar esta formação do catálogo?",
      )
    ) {
      setCursos((prev) => prev.filter((c) => c.id !== id));
      if (detalhesCurso?.id === id) {
        setDetalhesCurso(null);
      }
    }
  };

  const toggleStatus = (id: string) => {
    setCursos((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "publicado" ? "rascunho" : "publicado",
            }
          : c,
      ),
    );
    if (detalhesCurso?.id === id) {
      setDetalhesCurso((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "publicado" ? "rascunho" : "publicado",
            }
          : null,
      );
    }
  };

  // Filtragem
  const filteredCursos = cursos.filter((c) => {
    const matchSearch =
      c.titulo.toLowerCase().includes(search.toLowerCase()) ||
      c.categoria.toLowerCase().includes(search.toLowerCase()) ||
      c.instrutor.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoriaFilter === "todos" ||
      c.categoria.toLowerCase() === categoriaFilter.toLowerCase();
    const matchNivel =
      nivelFilter === "todos" ||
      c.nivel.toLowerCase() === nivelFilter.toLowerCase();
    const matchStatus = statusFilter === "todos" || c.status === statusFilter;

    return matchSearch && matchCat && matchNivel && matchStatus;
  });

  // Paginação
  const totalPaginas = Math.ceil(filteredCursos.length / ITENS_POR_PAGINA) || 1;
  const indexInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const cursosPaginados = filteredCursos.slice(
    indexInicio,
    indexInicio + ITENS_POR_PAGINA,
  );

  // ── PÁGINA DE DETALHE DEDICADA ─────────────────────────────────────────────
  if (detalhesCurso) {
    const CEGID_MODULOS_TODOS = [
      {
        ordem: 1,
        titulo: "Módulo 1 — Conceitos Base de ERP",
        duracao: "12 Horas",
        descricao:
          "O que é um ERP, arquitetura de sistemas corporativos, enquadramento e os 6 principais benefícios para a gestão empresarial.",
      },
      {
        ordem: 2,
        titulo: "Módulo 2 — Instalação e Administração do ERP Primavera",
        duracao: "15 Horas",
        descricao:
          "Instalação do ambiente, criação de empresas, manutenção de dados, gestão de utilizadores, perfis e permissões de segurança.",
      },
      {
        ordem: 3,
        titulo: "Módulo 3 — Logística – Configuração",
        duracao: "15 Horas",
        descricao:
          "Configuração de documentos de compras, vendas, documentos internos, transferências de armazém e valorização de stock.",
      },
      {
        ordem: 4,
        titulo: "Módulo 4 — Gestão de Inventário – Utilização",
        duracao: "12 Horas",
        descricao:
          "Enquadramento operacional de inventários, contagem física de artigos, acertos de stock e rastreabilidade de lotes.",
      },
      {
        ordem: 5,
        titulo: "Módulo 5 — Vendas e Facturação Eletrónica",
        duracao: "18 Horas",
        descricao:
          "Emissão de cotações, proformas, facturas, recibos e notas de crédito com comunicação automatizada do SAF-T à AGT Angola.",
      },
      {
        ordem: 6,
        titulo: "Módulo 6 — Compras e Gestão de Fornecedores",
        duracao: "12 Horas",
        descricao:
          "Ordens de compra, recepção de guias de remessa, registo de facturas de fornecedores e gestão da conta corrente de terceiros.",
      },
      {
        ordem: 7,
        titulo: "Módulo 7 — Tesouraria, Bancos e Reconciliação",
        duracao: "12 Horas",
        descricao:
          "Gestão de caixas e contas bancárias, encontros de contas, liquidações de pendentes e reconciliação bancária automática.",
      },
      {
        ordem: 8,
        titulo: "Módulo 8 — Recursos Humanos & Processamento de Salários",
        duracao: "12 Horas",
        descricao:
          "Cadastro de colaboradores, tabela de rendimentos, apuramento de IRT, contribuições para o INSS e emissão de recibos de vencimento.",
      },
      {
        ordem: 9,
        titulo: "Módulo 9 — Contabilidade & Ficheiro SAF-T Angola",
        duracao: "12 Horas",
        descricao:
          "Plano de contas SNC-AO, lançamentos contabilísticos, apuramento de IVA, balancetes e exportação oficial do SAF-T de contabilidade.",
      },
    ];

    const modulosExibidos = CEGID_MODULOS_TODOS.slice(
      moduloPagina * 3,
      (moduloPagina + 1) * 3,
    );
    const totalPaginasModulos = Math.ceil(CEGID_MODULOS_TODOS.length / 3);

    return (
      <div className="space-y-4 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif] animate-in fade-in duration-150 -mt-2">
        {/* Barra de Topo Limpa (SEM FUNDO NEM BORDA, POSICIONADA NO TOPO) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-1 px-1 text-xs mb-10">
          <button
            onClick={() => setDetalhesCurso(null)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-800 transition-colors cursor-pointer w-fit">
            <ArrowLeft size={15} />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleStatus(detalhesCurso.id)}
              className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-[2px] cursor-pointer transition-colors ${
                detalhesCurso.status === "publicado"
                  ? "bg-slate-900 text-white"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}>
              {detalhesCurso.status === "publicado"
                ? "Publicado no Site"
                : "Rascunho Interno"}
            </button>

            <button
              onClick={() => handleOpenModal(detalhesCurso)}
              className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-1 text-xs font-bold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs">
              <Edit size={14} />
              <span>Editar Formação</span>
            </button>
          </div>
        </div>

        {/* Banner do Curso */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2px] shadow-xs space-y-3 relative overflow-hidden mt-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
              {detalhesCurso.categoria}
            </span>
            {detalhesCurso.destaque && (
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
                DESTAQUE HERO
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {detalhesCurso.titulo}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {detalhesCurso.descricao}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-800 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">
                Instrutor
              </span>
              <span className="font-bold text-white text-xs">
                {detalhesCurso.instrutor}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">
                Duração
              </span>
              <span className="font-bold text-white text-xs">
                {detalhesCurso.duracao}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">
                Nível
              </span>
              <span className="font-bold text-white text-xs">
                {detalhesCurso.nivel}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">
                Alunos Matriculados
              </span>
              <span className="font-bold text-emerald-400 text-xs">
                {detalhesCurso.inscritos} Estudantes
              </span>
            </div>
          </div>
        </div>

        {/* Conteúdo Detalhado Grid Layout 8:4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Lado Esquerdo (8 Cols): Conteúdo Programático & Visão Geral */}
          <div className="lg:col-span-8 space-y-6">
            {/* Visão Geral do Programa */}
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen size={16} className="text-red-800" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Visão Geral do Programa Formativo
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {detalhesCurso.descricao} Este programa foi desenvolvido para
                responder rigorosamente às exigências operacionais e fiscais das
                empresas em Angola. A formação aborda desde os conceitos
                essenciais de ERP até ao encerramento de contas e exportação
                legal do SAF-T.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5 py-1 px-0">
                  <CheckCircle
                    size={15}
                    className="text-red-800 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Formação 100% Prática
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Casos práticos e simulações reais de trabalho
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 py-1 px-0">
                  <Award
                    size={15}
                    className="text-red-800 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Certificado Oficial
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Emitido diretamente pela Envisio Training Academy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo Programático Oficial com Navegação por Setas */}
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-red-800" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Conteúdo Programático Oficial ({CEGID_MODULOS_TODOS.length}{" "}
                    Módulos)
                  </h3>
                </div>

                {/* Controlo de Páginas de Módulos (Navegação por Setas) */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    Módulos {moduloPagina * 3 + 1}–
                    {Math.min(
                      (moduloPagina + 1) * 3,
                      CEGID_MODULOS_TODOS.length,
                    )}{" "}
                    de {CEGID_MODULOS_TODOS.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={moduloPagina === 0}
                      onClick={() =>
                        setModuloPagina((prev) => Math.max(prev - 1, 0))
                      }
                      className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700 rounded-[2px] text-slate-700 transition-colors cursor-pointer"
                      title="Módulos Anteriores">
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      disabled={moduloPagina === totalPaginasModulos - 1}
                      onClick={() =>
                        setModuloPagina((prev) =>
                          Math.min(prev + 1, totalPaginasModulos - 1),
                        )
                      }
                      className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700 rounded-[2px] text-slate-700 transition-colors cursor-pointer"
                      title="Próximos Módulos">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista dos 3 Módulos Atuais */}
              <div className="space-y-3">
                {modulosExibidos.map((mod) => (
                  <div
                    key={mod.ordem}
                    className="p-4 bg-slate-50 rounded-[2px] border border-slate-200/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">
                        {mod.titulo}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {mod.duracao}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {mod.descricao}
                    </p>
                  </div>
                ))}
              </div>

              {/* Indicador de Pontos do Carrossel de Módulos */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                {Array.from({ length: totalPaginasModulos }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModuloPagina(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === moduloPagina
                        ? "w-6 bg-red-800"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    title={`Página ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito (4 Cols): Formador & Informações da Capa */}
          <div className="lg:col-span-4 space-y-6">
            {/* Perfil do Formador Responsável */}
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                Formador Responsável
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-[2px] flex items-center justify-center font-bold flex-shrink-0">
                  <User size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">
                    {detalhesCurso.instrutor}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-500">
                    {detalhesCurso.instrutorCargo}
                  </p>
                  <span className="mt-1 inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase rounded-[2px]">
                    Formador Certificado
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-[2px] border border-slate-200/60">
                Profissional sénior com sólida experiência no mercado
                corporativo angolano. Especialista na capacitação de equipas
                administrativas e técnicas.
              </p>
            </div>

            {/* Imagem Oficial da Capa */}
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                Imagem Oficial da Capa
              </h3>
              <div className="flex items-center justify-center p-3 bg-slate-50 rounded-[2px] min-h-[140px] border border-slate-200/60">
                <img
                  src={detalhesCurso.imagemUrl}
                  alt={detalhesCurso.titulo}
                  className="max-h-32 max-w-full object-contain"
                />
              </div>
            </div>

            {/* Recursos & Manuais da Formação (PDF) */}
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-red-800" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Recursos PDF da Formação
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-red-50 text-red-800 text-[9px] font-extrabold rounded-[2px] uppercase">
                  PDF
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Paperclip size={16} className="text-red-800 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Manual Prático Oficial
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {pdfFile || "Manual_Oficial_Formacao_v10.pdf"} • 14.8 MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`A transferir ficheiro PDF: ${pdfFile}`)}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-[2px] cursor-pointer transition-colors shadow-2xs"
                    title="Baixar Manual PDF">
                    <Download size={13} />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Paperclip size={16} className="text-red-800 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Guia de Exercícios & Casos Práticos
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Guia_Exercicios_Praticos_2026.pdf • 5.2 MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("A transferir Guia de Exercícios PDF")}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-[2px] cursor-pointer transition-colors shadow-2xs"
                    title="Baixar Guia PDF">
                    <Download size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Edição na página de Detalhe */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
              
              {/* Topo do Modal */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-red-400" />
                  <h3 className="font-extrabold text-xs uppercase tracking-wider">
                    {editingCurso ? "Editar Formação Formativa" : "Criação de Formação Corporativa Completa"}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-[2px] cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {/* Barra de Passos do Assistente */}
              <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-xs font-bold divide-x divide-slate-200">
                <button
                  type="button"
                  onClick={() => setModalStep(1)}
                  className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    modalStep === 1
                      ? "bg-white text-red-800 border-b-2 border-red-800"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}>
                  <BookOpen size={14} />
                  <span>1. Geral</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalStep(2)}
                  className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    modalStep === 2
                      ? "bg-white text-red-800 border-b-2 border-red-800"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}>
                  <User size={14} />
                  <span>2. Formador</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalStep(3)}
                  className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    modalStep === 3
                      ? "bg-white text-red-800 border-b-2 border-red-800"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}>
                  <Layers size={14} />
                  <span>3. Módulos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalStep(4)}
                  className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    modalStep === 4
                      ? "bg-white text-red-800 border-b-2 border-red-800"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}>
                  <FileText size={14} />
                  <span>4. Recursos PDF</span>
                </button>
              </div>

              {/* Conteúdo dos Passos */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
                
                {/* PASSO 1: DADOS GERAIS */}
                {modalStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Título Oficial do Curso *</label>
                      <input
                        type="text"
                        required
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        placeholder="Ex: Cegid Primavera — Módulos Corporativos"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Categoria *</label>
                        <select
                          value={formData.categoria}
                          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800">
                          <option value="ERP & Gestão">ERP & Gestão</option>
                          <option value="Programação">Programação</option>
                          <option value="Dados & BI">Dados & BI</option>
                          <option value="Produtividade">Produtividade</option>
                          <option value="IA">Inteligência Artificial</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Nível de Dificuldade</label>
                        <select
                          value={formData.nivel}
                          onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800">
                          <option value="Iniciante">Iniciante</option>
                          <option value="Intermédio">Intermédio</option>
                          <option value="Avançado">Avançado</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Carga Horária Total (Ex: 120h) *</label>
                        <input
                          type="text"
                          required
                          value={formData.duracao}
                          onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Preço da Propina (Ex: 85.000 Kz) *</label>
                        <input
                          type="text"
                          required
                          value={formData.preco}
                          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Descrição Resumida do Programa *</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        placeholder="Objetivos gerais do programa formativo e competências desenvolvidas..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="font-bold text-slate-700 block">Imagem Oficial da Capa do Curso</label>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-[2px] flex items-center justify-center p-1 flex-shrink-0">
                          <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-[2px] file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PASSO 2: FORMADOR & EQUIPA */}
                {modalStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center gap-2 text-slate-700">
                      <User size={16} className="text-red-800 flex-shrink-0" />
                      <span>Atribua o formador responsável e as especificações de instrução da turma.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Nome do Formador Responsável *</label>
                        <input
                          type="text"
                          required
                          value={formData.instrutor}
                          onChange={(e) => setFormData({ ...formData, instrutor: e.target.value })}
                          placeholder="Ex: Eng. Mateus Silva"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Cargo / Especialidade *</label>
                        <input
                          type="text"
                          required
                          value={formData.instrutorCargo}
                          onChange={(e) => setFormData({ ...formData, instrutorCargo: e.target.value })}
                          placeholder="Ex: Consultor Técnico Sénior Cegid Primavera"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Biografia Resumida do Formador</label>
                      <textarea
                        rows={3}
                        defaultValue="Profissional certificado com sólida experiência na formação técnica corporativa em Angola. Mais de 10 anos de prática no setor."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-[2px] flex items-center justify-between text-emerald-900 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-700" />
                        <span>Emitir Certificado de Conclusão Assinado pelo Formador</span>
                      </div>
                      <span className="font-bold text-[10px] uppercase bg-emerald-700 text-white px-2 py-0.5 rounded-[2px]">ATIVO</span>
                    </div>
                  </div>
                )}

                {/* PASSO 3: MÓDULOS & CONTEÚDO PROGRAMÁTICO */}
                {modalStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-600 font-medium">
                        Defina os módulos programáticos que compõem esta formação corporativa.
                      </p>
                      <button
                        type="button"
                        onClick={() => alert("Novo módulo adicionado com sucesso ao programa.")}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-[2px] flex items-center gap-1">
                        <Plus size={13} />
                        <span>Adicionar Módulo</span>
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Módulo 1 — Conceitos Base de ERP & Instalação</span>
                          <span className="text-[10px] font-mono text-slate-500">20h</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Instalação do ambiente, parametrização inicial e segurança.</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Módulo 2 — Funcionalidades Operacionais & Facturação</span>
                          <span className="text-[10px] font-mono text-slate-500">40h</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Emissão de facturas, recibos, proformas e comunicação SAF-T AGT.</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Módulo 3 — Recursos Humanos, Tesouraria & Contabilidade</span>
                          <span className="text-[10px] font-mono text-slate-500">35h</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Processamento de salários, IRT, INSS, reconciliação e balancetes.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PASSO 4: RECURSOS PDF & MATERIAIS */}
                {modalStep === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FileText size={16} className="text-red-800" />
                        <span>Manuais de Apoio & Documentos da Formação (PDF)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Anexe manuais práticos, e-books ou guias de exercícios em formato PDF para os formandos.
                      </p>
                    </div>

                    <div className="p-4 border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/50 rounded-[2px] text-center space-y-2">
                      <UploadCloud size={28} className="mx-auto text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-800 text-xs">Arraste manuais PDF ou clique para selecionar</p>
                        <p className="text-[10px] text-slate-400 font-mono">Formatos aceites: .pdf, .docx (Máx: 50MB)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setPdfFile(file.name);
                        }}
                        className="hidden"
                        id="pdf-upload-input-detail"
                      />
                      <label
                        htmlFor="pdf-upload-input-detail"
                        className="inline-block px-4 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-[2px] cursor-pointer hover:bg-slate-800 transition-colors">
                        Selecionar Ficheiro PDF
                      </label>
                    </div>

                    {pdfFile && (
                      <div className="p-3 bg-slate-900 text-white rounded-[2px] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Paperclip size={15} className="text-red-400" />
                          <div>
                            <p className="font-bold text-xs">{pdfFile}</p>
                            <p className="text-[10px] text-slate-400 font-mono">Manual Oficial de Apoio • Anexado</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold uppercase rounded-[2px]">
                          PRONTO
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
                        <input
                          type="checkbox"
                          checked={formData.destaque}
                          onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                          className="rounded-[2px] text-red-800 focus:ring-0"
                        />
                        <span>Destacar como Curso Hero no Portal Público</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Barra de Controlo e Navegação do Assistente */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                  {modalStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setModalStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px] flex items-center gap-1">
                      <ChevronLeft size={15} />
                      <span>Anterior</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px]">
                      Cancelar
                    </button>
                  )}

                  {modalStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setModalStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)}
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-[2px] flex items-center gap-1.5 shadow-xs cursor-pointer">
                      <span>Seguinte</span>
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white font-bold rounded-[2px] flex items-center gap-2 shadow-xs cursor-pointer">
                      <Save size={15} />
                      <span>Finalizar & Guardar Formação</span>
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── VISTA PRINCIPAL DE GESTÃO DO CATÁLOGO DE CURSOS ─────────────────────────
  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* ── 1. BANNER EMPRESARIAL NO TOPO ───────────────────────────────── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800">
        <div className="space-y-3 z-10 max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Gestão dos cursos
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Painel de controlo centralizado do catálogo de cursos. Adicione
            novos programas, controle vagas ativas, gira o estado de publicação
            no portal e acompanhe métricas de capacitação.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-red-400" />
              <span className="font-bold text-white">
                {cursos.length} Cursos Registados
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-emerald-400" />
              <span className="font-bold text-white">
                863 Alunos Matriculados
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span className="font-bold text-white">Certificação Envisio</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. BARRA DE FILTROS MODERNA ESTILO SAAS / LINEAR ───────────────────── */}
      <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
        {/* Abas de Pílulas para Categorias (Segmented Control Bar) */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "todos", label: "Todas as Categorias" },
              { id: "ERP & Gestão", label: "ERP & Gestão" },
              { id: "Programação", label: "Programação" },
              { id: "Dados & BI", label: "Dados & BI" },
              { id: "Produtividade", label: "Produtividade" },
              { id: "IA", label: "Inteligência Artificial" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoriaFilter(cat.id);
                  setPaginaAtual(1);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-[2px] transition-all whitespace-nowrap cursor-pointer ${
                  categoriaFilter === cat.id
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Alternador de Modo de Vista (TABELA POR DEFINIÇÃO) */}
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

            {/* Botão Novo Curso */}
            <button
              onClick={() => handleOpenModal()}
              className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs">
              <Plus size={15} />
              <span>Adicionar Curso</span>
            </button>
          </div>
        </div>

        {/* Linha Secundária de Pesquisa + Nível + Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Campo de Pesquisa Minimalista */}
          <div className="relative w-full sm:w-80">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Pesquisar curso ou instrutor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPaginaAtual(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-medium"
            />
          </div>

          {/* Filtros de Nível e Status em Pílulas Select */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-[2px] border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Nível:
              </span>
              <select
                value={nivelFilter}
                onChange={(e) => {
                  setNivelFilter(e.target.value);
                  setPaginaAtual(1);
                }}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer">
                <option value="todos">Todos</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermédio">Intermédio</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-[2px] border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPaginaAtual(1);
                }}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer">
                <option value="todos">Todos</option>
                <option value="publicado">Publicados</option>
                <option value="rascunho">Rascunhos</option>
              </select>
            </div>

            {(search ||
              categoriaFilter !== "todos" ||
              nivelFilter !== "todos" ||
              statusFilter !== "todos") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategoriaFilter("todos");
                  setNivelFilter("todos");
                  setStatusFilter("todos");
                  setPaginaAtual(1);
                }}
                className="text-[11px] text-red-800 font-bold hover:underline cursor-pointer px-2">
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. VISTA EM TABELA (CABEÇALHO PRETO BANNER, COLUNAS LIMPAS E SEPARADAS) ── */}
      {vistaModo === "tabela" && (
        <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <th className="py-3 px-4 w-[30%]">Curso & Instrutor</th>
                  <th className="py-3 px-3 w-[16%]">Categoria</th>
                  <th className="py-3 px-3 w-[12%]">Status</th>
                  <th className="py-3 px-3 w-[14%]">Carga / Nível</th>
                  <th className="py-3 px-3 w-[12%]">Preço</th>
                  <th className="py-3 px-3 w-[8%]">Inscritos</th>
                  <th className="py-3 px-4 w-[8%] text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {cursosPaginados.map((curso) => (
                  <tr
                    key={curso.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    {/* Coluna 1: Imagem Real + Título + Instrutor */}
                    <td className="py-3 px-4 truncate">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[2px] bg-slate-100 border border-slate-200/60 flex items-center justify-center p-1 flex-shrink-0">
                          <img
                            src={curso.imagemUrl}
                            alt={curso.titulo}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="truncate">
                          <p
                            className="font-bold text-slate-900 text-xs truncate"
                            title={curso.titulo}>
                            {curso.titulo}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {curso.instrutor}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Coluna 2: Categoria (Limpa, sem fundo nem borda) */}
                    <td className="py-3 px-3 font-semibold text-slate-700 text-xs">
                      {curso.categoria}
                    </td>

                    {/* Coluna 3: Status (Limpo, separado, sem fundo verde nem borda) */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleStatus(curso.id)}
                        className={`text-xs font-semibold cursor-pointer transition-colors ${
                          curso.status === "publicado"
                            ? "text-slate-900 font-bold hover:underline"
                            : "text-amber-700 font-semibold hover:underline"
                        }`}>
                        {curso.status === "publicado"
                          ? "Publicado"
                          : "Rascunho"}
                      </button>
                    </td>

                    {/* Coluna 4: Duração & Nível */}
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-900 text-xs block">
                        {curso.duracao}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {curso.nivel}
                      </span>
                    </td>

                    {/* Coluna 5: Preço */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 text-xs whitespace-nowrap">
                      {curso.preco}
                    </td>

                    {/* Coluna 6: Inscritos */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-700 text-xs whitespace-nowrap">
                      {curso.inscritos}
                    </td>

                    {/* Coluna 7: Ações Rápidas */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDetalhesCurso(curso)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Ver Detalhes">
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(curso)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Editar">
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(curso.id)}
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

      {/* ── 4. VISTA ALTERNATIVA EM CARDS ─────────────────────────────────── */}
      {vistaModo === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cursosPaginados.map((curso) => (
            <div
              key={curso.id}
              className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs flex flex-col justify-between overflow-hidden hover:border-slate-300 transition-all">
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-red-50 text-red-800 border border-red-200 font-extrabold text-[9px] uppercase tracking-wider rounded-[2px]">
                    {curso.categoria}
                  </span>
                  <button
                    onClick={() => toggleStatus(curso.id)}
                    className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] cursor-pointer ${
                      curso.status === "publicado"
                        ? "bg-slate-900 text-white"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}>
                    {curso.status}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={curso.imagemUrl}
                    alt={curso.titulo}
                    className="w-10 h-10 object-contain flex-shrink-0"
                  />
                  <div>
                    <h3
                      className="font-bold text-slate-900 text-xs leading-snug line-clamp-2"
                      title={curso.titulo}>
                      {curso.titulo}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {curso.instrutor}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {curso.descricao}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                  <div>
                    <span className="text-slate-400 block text-[9px]">
                      Duração
                    </span>
                    <span className="font-bold text-slate-800">
                      {curso.duracao}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">
                      Preço
                    </span>
                    <span className="font-bold text-slate-800">
                      {curso.preco}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">
                      Alunos
                    </span>
                    <span className="font-bold text-slate-800">
                      {curso.inscritos}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setDetalhesCurso(curso)}
                  className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs">
                  <Eye size={13} />
                  <span>Detalhes</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(curso)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-[2px] transition-colors cursor-pointer"
                    title="Editar">
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(curso.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-[2px] transition-colors cursor-pointer"
                    title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 5. BARRA DE PAGINAÇÃO (SEM FUNDO NEM BORDAS) ──────────────────── */}
      <div className="py-2 px-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="text-slate-500 font-medium text-[11px]">
          Exibindo{" "}
          <span className="font-bold text-slate-900">
            {filteredCursos.length === 0 ? 0 : indexInicio + 1}–
            {Math.min(indexInicio + ITENS_POR_PAGINA, filteredCursos.length)}
          </span>{" "}
          de{" "}
          <span className="font-bold text-slate-900">
            {filteredCursos.length}
          </span>{" "}
          formações
        </div>

        <div className="flex items-center gap-2 self-center sm:self-auto">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent flex items-center gap-1 font-bold rounded-[2px] transition-colors cursor-pointer text-xs">
            <ChevronLeft size={14} />
            <span>Anterior</span>
          </button>

          <span className="px-2 font-mono font-bold text-slate-800 text-xs">
            {paginaAtual} / {totalPaginas}
          </span>

          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() =>
              setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
            }
            className="px-3 py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent flex items-center gap-1 font-bold rounded-[2px] transition-colors cursor-pointer text-xs">
            <span>Seguinte</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── MODAL EXECUTIVO MULTI-PASSOS PARA CRIAÇÃO DE FORMAÇÃO ─────────── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Topo do Modal */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-red-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider">
                  {editingCurso
                    ? "Editar Formação Formativa"
                    : "Criação de Formação Corporativa Completa"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-[2px] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Barra de Passos do Assistente (Suave & Organizado) */}
            <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-xs font-bold divide-x divide-slate-200">
              <button
                type="button"
                onClick={() => setModalStep(1)}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalStep === 1
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <BookOpen size={14} />
                <span>1. Geral</span>
              </button>
              <button
                type="button"
                onClick={() => setModalStep(2)}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalStep === 2
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <User size={14} />
                <span>2. Formador</span>
              </button>
              <button
                type="button"
                onClick={() => setModalStep(3)}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalStep === 3
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <Layers size={14} />
                <span>3. Módulos</span>
              </button>
              <button
                type="button"
                onClick={() => setModalStep(4)}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalStep === 4
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <FileText size={14} />
                <span>4. Recursos PDF</span>
              </button>
            </div>

            {/* Conteúdo dos Passos */}
            <form
              onSubmit={handleSave}
              className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              {/* PASSO 1: DADOS GERAIS */}
              {modalStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Título Oficial do Curso *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titulo}
                      onChange={(e) =>
                        setFormData({ ...formData, titulo: e.target.value })
                      }
                      placeholder="Ex: Cegid Primavera — Módulos Corporativos"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Categoria *
                      </label>
                      <select
                        value={formData.categoria}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoria: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800">
                        <option value="ERP & Gestão">ERP & Gestão</option>
                        <option value="Programação">Programação</option>
                        <option value="Dados & BI">Dados & BI</option>
                        <option value="Produtividade">Produtividade</option>
                        <option value="IA">Inteligência Artificial</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Nível de Dificuldade
                      </label>
                      <select
                        value={formData.nivel}
                        onChange={(e) =>
                          setFormData({ ...formData, nivel: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800">
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermédio">Intermédio</option>
                        <option value="Avançado">Avançado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Carga Horária Total (Ex: 120h) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.duracao}
                        onChange={(e) =>
                          setFormData({ ...formData, duracao: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Preço da Propina (Ex: 85.000 Kz) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.preco}
                        onChange={(e) =>
                          setFormData({ ...formData, preco: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Descrição Resumida do Programa *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.descricao}
                      onChange={(e) =>
                        setFormData({ ...formData, descricao: e.target.value })
                      }
                      placeholder="Objetivos gerais do programa formativo e competências desenvolvidas..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="font-bold text-slate-700 block">
                      Imagem Oficial da Capa do Curso
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-[2px] flex items-center justify-center p-1 flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-[2px] file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 2: FORMADOR & EQUIPA */}
              {modalStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center gap-2 text-slate-700">
                    <User size={16} className="text-red-800 flex-shrink-0" />
                    <span>
                      Atribua o formador responsável e as especificações de
                      instrução da turma.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Nome do Formador Responsável *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.instrutor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instrutor: e.target.value,
                          })
                        }
                        placeholder="Ex: Eng. Mateus Silva"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Cargo / Especialidade *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.instrutorCargo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instrutorCargo: e.target.value,
                          })
                        }
                        placeholder="Ex: Consultor Técnico Sénior Cegid Primavera"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Biografia Resumida do Formador
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Profissional certificado com sólida experiência na formação técnica corporativa em Angola. Mais de 10 anos de prática no setor."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-[2px] flex items-center justify-between text-emerald-900 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-700" />
                      <span>
                        Emitir Certificado de Conclusão Assinado pelo Formador
                      </span>
                    </div>
                    <span className="font-bold text-[10px] uppercase bg-emerald-700 text-white px-2 py-0.5 rounded-[2px]">
                      ATIVO
                    </span>
                  </div>
                </div>
              )}

              {/* PASSO 3: MÓDULOS & CONTEÚDO PROGRAMÁTICO */}
              {modalStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600 font-medium">
                      Defina os módulos programáticos que compõem esta formação
                      corporativa.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        alert("Novo módulo adicionado com sucesso ao programa.")
                      }
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-[2px] flex items-center gap-1">
                      <Plus size={13} />
                      <span>Adicionar Módulo</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>
                          Módulo 1 — Conceitos Base de ERP & Instalação
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          20h
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Instalação do ambiente, parametrização inicial e
                        segurança.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>
                          Módulo 2 — Funcionalidades Operacionais & Facturação
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          40h
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Emissão de facturas, recibos, proformas e comunicação
                        SAF-T AGT.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>
                          Módulo 3 — Recursos Humanos, Tesouraria &
                          Contabilidade
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          35h
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Processamento de salários, IRT, INSS, reconciliação e
                        balancetes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 4: RECURSOS PDF & MATERIAIS */}
              {modalStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <FileText size={16} className="text-red-800" />
                      <span>
                        Manuais de Apoio & Documentos da Formação (PDF)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Anexe manuais práticos, e-books ou guias de exercícios em
                      formato PDF para os formandos.
                    </p>
                  </div>

                  <div className="p-4 border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/50 rounded-[2px] text-center space-y-2">
                    <UploadCloud size={28} className="mx-auto text-slate-400" />
                    <div>
                      <p className="font-bold text-slate-800 text-xs">
                        Arraste manuais PDF ou clique para selecionar
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Formatos aceites: .pdf, .docx (Máx: 50MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPdfFile(file.name);
                      }}
                      className="hidden"
                      id="pdf-upload-input"
                    />
                    <label
                      htmlFor="pdf-upload-input"
                      className="inline-block px-4 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-[2px] cursor-pointer hover:bg-slate-800 transition-colors">
                      Selecionar Ficheiro PDF
                    </label>
                  </div>

                  {pdfFile && (
                    <div className="p-3 bg-slate-900 text-white rounded-[2px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Paperclip size={15} className="text-red-400" />
                        <div>
                          <p className="font-bold text-xs">{pdfFile}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Manual Oficial de Apoio • Anexado
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold uppercase rounded-[2px]">
                        PRONTO
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
                      <input
                        type="checkbox"
                        checked={formData.destaque}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            destaque: e.target.checked,
                          })
                        }
                        className="rounded-[2px] text-red-800 focus:ring-0"
                      />
                      <span>Destacar como Curso Hero no Portal Público</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Barra de Controlo e Navegação do Assistente */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                {modalStep > 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setModalStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)
                    }
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px] flex items-center gap-1">
                    <ChevronLeft size={15} />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px]">
                    Cancelar
                  </button>
                )}

                {modalStep < 4 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setModalStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)
                    }
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-[2px] flex items-center gap-1.5 shadow-xs cursor-pointer">
                    <span>Seguinte</span>
                    <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white font-bold rounded-[2px] flex items-center gap-2 shadow-xs cursor-pointer">
                    <Save size={15} />
                    <span>Finalizar & Guardar Formação</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
