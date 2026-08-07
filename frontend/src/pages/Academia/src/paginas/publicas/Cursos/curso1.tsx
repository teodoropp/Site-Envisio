/** @format */

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useCurso } from "../../../hooks/useCurso";
import { useModulos } from "../../../hooks/useModulos";
import {
  Award,
  ArrowLeft,
  ChevronDown,
  FileText,
  Star,
  Check,
  Clock,
  BarChart,
  Users,
  ShieldCheck,
  CheckCircle2,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Headphones,
} from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../../../componentes/Spinner";
import ModalVideo from "../../../componentes/ModalVideo";
import FormularioInscricao from "../../../componentes/FormularioInscricao"; // Import the FormularioInscricao component
import api from "../../../utils/api";
import { Curso, Modulo, Aula } from "../../../tipos/Curso";
import {
  modulosDataFallback,
  modulosPorCurso as modulosDict,
} from "../../../data/Modulo";
import { motion } from "framer-motion";

interface Avaliacao {
  id: string;
  nota: number;
  comentario: string;
  autor: string;
  criado_em: string;
}

export default function CursoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const dadosCurso = useCurso(id || "");

  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [videoUrl] = useState("");

  const [, setAulas] = useState<any[]>([]);
  const [, setCarregandoAulas] = useState(true);
  const [, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [, setMediaAvaliacoes] = useState(0);
  const [, setCarregandoAvaliacoes] = useState(true);
  const [moduloAberto, setModuloAberto] = useState<number | null>(null);
  const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false);
  const [depoimentoAtual, setDepoimentoAtual] = useState(0);
  const [modalFormadorAberto, setModalFormadorAberto] = useState(false);
  const { modulos, carregando: carregandoModulos } = useModulos(id);

  const listaDepoimentos = [
    {
      id: 1,
      autor: "Carlos Mateus",
      cargo: "Técnico de Contabilidade",
      texto:
        "O curso é totalmente prático. Consegui uma oportunidade de trabalho como gestor de stocks logo após concluir o módulo de logística!",
      estrelas: 5,
    },
    {
      id: 2,
      autor: "Ana Paula Mendes",
      cargo: "Analista Financeira",
      texto:
        "Excelente formador e material de apoio. A Envisio oferece condições de aprendizagem fantásticas com acompanhamento real.",
      estrelas: 5,
    },
    {
      id: 3,
      autor: "Manuel António",
      cargo: "Gestor Operacional",
      texto:
        "Superou todas as minhas expectativas. Domínio técnico impressionante na simulação de cenários reais de ERP em empresa.",
      estrelas: 5,
    },
  ];

  // Fallback local para rota fixa (sem :id)
  const cursoLocal: Curso = {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos",
    descricao:
      "Aprenda a dominar o ERP mais utilizado em Angola e Portugal para gestão empresarial completa.",
    categoria: "Gestão/ERP",
    duracao: "120h" as any,
    horas: "120" as any,
    imagemUrl: "",
    requisitos: ["Nenhum requisito"],
  } as unknown as Curso;

  const cursoExibir = (id ? dadosCurso.curso : (cursoLocal as Curso)) as Curso;

  // Fallback local para quando esta página é acessada sem :id na rotas
  const cursoLocalFallback: Curso = {
    id: "javascript-basico-ao-avancado",
    titulo: "JavaScript Básico ao Avançado",
    descricao:
      "Aprenda JavaScript do zero até conceitos avançados com conteúdo prático e direto ao ponto.",
    categoria: "Programação",
    duracao: "" as any,
    nivel: "iniciante",
    imagemUrl: "",
    requisitos: ["Computador e internet"],
  } as Curso;

  // Seleciona a fonte de dados do curso: API (quando há id) ou local (sem id)
  const curso = id ? dadosCurso.curso : (cursoLocalFallback as Curso);
  const carregando: boolean = id ? dadosCurso.carregando : false;
  const erro: string | null = id ? (dadosCurso as any).erro : null;
  // Busca as aulas do backend
  useEffect(() => {
    if (!id) return;
    setCarregandoAulas(true);
    api
      .get(`/cursos/${id}/aulas`)
      .then((res) => setAulas(res.data))
      .catch(() => setAulas([]))
      .finally(() => setCarregandoAulas(false));
  }, [id]);

  // Busca as avaliações do curso
  useEffect(() => {
    if (!id) return;
    setCarregandoAvaliacoes(true);
    api
      .get(`/avaliacoes/${id}`)
      .then((res) => {
        setAvaliacoes(res.data.avaliacoes || []);
        setMediaAvaliacoes(res.data.media || 0);
      })
      .catch(() => {
        setAvaliacoes([]);
        setMediaAvaliacoes(0);
      })
      .finally(() => setCarregandoAvaliacoes(false));
  }, [id]);

  // Corrige o tipo do instrutor

  // Permissão de acesso às aulas

  // Função para renderizar estrelas

  // normaliza ID para bater com dicionário
  const slugify = (valor: string) =>
    valor
      .normalize("NFD")
      .replace(/{Diacritic}/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const dictById = (() => {
    if (!id && !curso) return undefined;
    const raw = id ? String(id) : "";
    const courseId = cursoExibir?.id ? String(cursoExibir.id) : "";
    const titleSlug = cursoExibir?.titulo ? slugify(cursoExibir.titulo) : "";

    const candidates = [
      raw,
      raw.trim(),
      raw.trim().toLowerCase(),
      slugify(raw),
      courseId,
      courseId.trim().toLowerCase(),
      slugify(courseId),
      titleSlug,
    ].filter(Boolean);

    const key = candidates.find(
      (k) => modulosDict[k] && modulosDict[k].length > 0,
    );

    // Logs úteis de diagnóstico
    console.log("[CursoDetalhe] id da rota:", raw);
    console.log("[CursoDetalhe] candidatos normalizados:", candidates);
    console.log(
      "[CursoDetalhe] chave encontrada no dicionário:",
      key ?? "nenhuma (fallback)",
    );

    return key ? modulosDict[key] : undefined;
  })();

  const modulosDefinidosAqui: Modulo[] = [
    {
      id: "m1",
      titulo: "Módulo 1: Conceitos Base de ERP",
      duracaoTotal: "",
      ordem: 1,
      aulas: [
        { id: "m1-a1", titulo: "O que é um ERP", tipo: "texto", duracao: "" },
        {
          id: "m1-a2",
          titulo: "História e evolução do ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a3",
          titulo: "Por que é importante",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a4",
          titulo: "Como funciona um sistema ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a5",
          titulo: "Tipos de implementação de ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a6",
          titulo: "Seis principais benefícios do ERP",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m2",
      titulo: "Módulo 2: Instalação e Administração do ERP Primavera",
      duracaoTotal: "",
      ordem: 2,
      aulas: [
        { id: "m2-a1", titulo: "Instalação", tipo: "texto", duracao: "" },
        { id: "m2-a2", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        {
          id: "m2-a3",
          titulo: "Criação de Empresas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a4",
          titulo: "Manutenção de Dados",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a5",
          titulo: "Gestão de Utilizadores e Segurança",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a6",
          titulo: "Outras funcionalidades",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m3",
      titulo: "Módulo 3: Logística – Configuração",
      duracaoTotal: "",
      ordem: 3,
      aulas: [
        {
          id: "m3-a1",
          titulo: "Documentos de Compras",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a2",
          titulo: "Documentos de Vendas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a3",
          titulo: "Documentos Internos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a4",
          titulo: "Documentos de Transferência",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a5",
          titulo: "Configurações e Valorização de Stock",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m4",
      titulo: "Módulo 4: Gestão de Inventário – Utilização",
      duracaoTotal: "",
      ordem: 4,
      aulas: [
        { id: "m4-a1", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        {
          id: "m4-a2",
          titulo: "Gestão de Inventário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a3",
          titulo: "Movimentos de Stock",
          tipo: "texto",
          duracao: "",
        },
        { id: "m4-a4", titulo: "Dados Mestre", tipo: "texto", duracao: "" },
        {
          id: "m4-a5",
          titulo: "Operações de Expedição e Receção",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a6",
          titulo: "Valorização do Stock",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a7",
          titulo: "Processo de Inventariação",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m5",
      titulo: "Módulo 5: Compras – Utilização",
      duracaoTotal: "",
      ordem: 5,
      aulas: [
        {
          id: "m5-a1",
          titulo: "Entidades e Artigos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a2",
          titulo: "Registo de Documentos de Compra",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a3",
          titulo: "Circuito Documental",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a4",
          titulo: "Operações de Estorno e Anulação",
          tipo: "texto",
          duracao: "",
        },
        { id: "m5-a5", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m6",
      titulo: "Módulo 6: Vendas – Utilização",
      duracaoTotal: "",
      ordem: 6,
      aulas: [
        {
          id: "m6-a1",
          titulo: "Criar Entidades e Artigos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a2",
          titulo: "Documentos de Venda",
          tipo: "texto",
          duracao: "",
        },
        { id: "m6-a3", titulo: "Editor de Vendas", tipo: "texto", duracao: "" },
        {
          id: "m6-a4",
          titulo: "Operações de Anulação/Estorno",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a5",
          titulo: "Obrigações Fiscais e Comunicação de Documentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a6",
          titulo: "Mapas e Estatísticas de Vendas",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m7",
      titulo: "Módulo 7: POS (Point of Sales)",
      duracaoTotal: "",
      ordem: 7,
      aulas: [
        { id: "m7-a1", titulo: "Configuração POS", tipo: "texto", duracao: "" },
        {
          id: "m7-a2",
          titulo: "Operações (Abertura, Fecho, Vendas, Estornos, Exploração)",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m8",
      titulo: "Módulo 8: Tesouraria – Configuração",
      duracaoTotal: "",
      ordem: 8,
      aulas: [
        { id: "m8-a1", titulo: "Contas Correntes", tipo: "texto", duracao: "" },
        { id: "m8-a2", titulo: "Caixa e Bancos", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m9",
      titulo: "Módulo 9: Tesouraria – Utilização",
      duracaoTotal: "",
      ordem: 9,
      aulas: [
        {
          id: "m9-a1",
          titulo: "Gestão de Contas Correntes",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-a2",
          titulo: "Operações sobre Pendentes",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-a3",
          titulo: "Planos de Pagamento e Retenção",
          tipo: "texto",
          duracao: "",
        },
        { id: "m9-a4", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m10",
      titulo: "Módulo 10: Recursos Humanos – Configuração",
      duracaoTotal: "",
      ordem: 10,
      aulas: [
        {
          id: "m10-a1",
          titulo: "Dados Mestre – Ficha do Funcionário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m10-a2",
          titulo: "Configurações no Administrador",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m10-a3",
          titulo: "Configurações de Processamentos e Alterações Mensais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m11",
      titulo: "Módulo 11: Recursos Humanos – Utilização",
      duracaoTotal: "",
      ordem: 11,
      aulas: [
        {
          id: "m11-a1",
          titulo: "Ficha do Funcionário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a2",
          titulo: "Processamento de Vencimento",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a3",
          titulo: "Alterações Mensais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a4",
          titulo: "Ausências, Férias e Remunerações",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a5",
          titulo: "Obrigações Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a6",
          titulo: "Cadastro e Mapas de Análise",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m12",
      titulo: "Módulo 12: Gestão de Ativos",
      duracaoTotal: "",
      ordem: 12,
      aulas: [
        {
          id: "m12-a1",
          titulo: "Critérios e Planos de Depreciação",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a2",
          titulo: "Criação de Fichas de Bens",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a3",
          titulo: "Operações sobre os Bens",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a4",
          titulo: "Exploração e Mapas Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a5",
          titulo: "Operações de Fim de Vida do Ativo",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m13",
      titulo: "Módulo 13: Financeira – Configuração",
      duracaoTotal: "",
      ordem: 13,
      aulas: [
        {
          id: "m13-a1",
          titulo: "Configurações de Movimentos Contabilísticos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a2",
          titulo: "Criação e Transferência de Contas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a3",
          titulo: "Configurações para Apuramentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a4",
          titulo: "Integração com Contabilidade",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m14",
      titulo: "Módulo 14: Contabilidade e Fiscalidade – Utilização",
      duracaoTotal: "",
      ordem: 14,
      aulas: [
        {
          id: "m14-a1",
          titulo: "Elementos Base da Contabilidade",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a2",
          titulo: "Registo de Movimentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a3",
          titulo: "Reports e Mapas Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a4",
          titulo: "Operações de Validação e Apuramento",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a5",
          titulo: "Fecho e Abertura de Exercício",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
  ];

  const modulosFonte: Modulo[] =
    (modulosDefinidosAqui &&
      modulosDefinidosAqui.length > 0 &&
      modulosDefinidosAqui) ||
    (dictById && dictById.length > 0 && dictById) ||
    (modulos && modulos.length > 0 && modulos) ||
    (curso?.modulos &&
      curso.modulos.length > 0 &&
      (curso.modulos as Modulo[])) ||
    modulosDataFallback;

  if (id && carregando) return <Spinner />;
  if (id && (erro || !cursoExibir)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Curso não encontrado
          </h2>
          <p className="mb-4 text-gray-700">
            {erro || "O curso solicitado não está disponível."}
          </p>
          <Link
            to="/cursos"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Voltar para Cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 text-left">
      {/* ─── 1. HERO SECTION (Coursera / Udemy Dark Header) ───────────────────── */}
      <section className="bg-slate-900 !text-white relative pt-24 pb-16 lg:pb-24 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Bar: Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-slate-300">
            <button
              onClick={() => navigate("/academia/cursos")}
              className="inline-flex items-center gap-2 p-0 bg-transparent border-0 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer">
              <ArrowLeft size={16} />
              <span>Voltar para Cursos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* LEFT COLUMN: Hero text (Col-span 12) */}
            <div className="lg:col-span-12 text-left">
              {/* Categoria */}
              <span className="inline-block px-3 py-1 mb-4 text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 rounded-[4px]">
                {cursoExibir.categoria || "ERP & Gestão"}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white tracking-tight leading-tight mb-4">
                {cursoExibir.titulo || "Cegid Primavera: Funcionalidades e Módulos"}
              </h1>

              <p className="!text-slate-200 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-normal">
                {cursoExibir.descricao}
              </p>

              {/* Botões de Ação na Hero */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setModalInscricaoAberto(true)}
                  className="btn-academia-primary px-6 py-3.5 text-xs uppercase tracking-wider cursor-pointer">
                  Inscrever-se Agora
                </button>
                <button
                  onClick={() => {
                    const elem = document.getElementById("conteudo-programatico");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-academia-secondary px-6 py-3.5 text-xs uppercase tracking-wider cursor-pointer">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MAIN CONTENT & STICKY SIDEBAR SECTION ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative items-start">
          {/* LEFT COLUMN: Course Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Box 1: O que você vai aprender */}
            <div className="bg-white rounded-[5px] p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-red-600" />
                <span>O que você vai aprender neste curso</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Competência Sólida</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Reconhecimento Profissional</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Confiança Total</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Networking</span>
                </div>
              </div>
            </div>

            {/* Box 2: Conteúdo Programático (Acordeão Expansível) */}
            <div id="conteudo-programatico" className="bg-white rounded-[5px] p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Conteúdo Programático
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {modulosFonte.length} Módulos organizados sequencialmente
                  </p>
                </div>
              </div>

              {carregandoModulos ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : (
                <div className="space-y-3">
                  {modulosFonte.length === 0 && (
                    <div className="text-center py-6 text-slate-500 text-sm">
                      Nenhum conteúdo programático disponível.
                    </div>
                  )}
                  {modulosFonte.map((modulo: Modulo, index: number) => (
                    <div
                      key={modulo.id || index}
                      className="border border-slate-200/90 rounded-[6px] overflow-hidden bg-white shadow-2xs">
                      <button
                        onClick={() =>
                          setModuloAberto(moduloAberto === index ? null : index)
                        }
                        className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border border-slate-200/90 flex items-center justify-center text-xs text-slate-500 font-normal flex-shrink-0 bg-slate-50/50">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div>
                            <h3 className="font-normal text-sm sm:text-base text-slate-800 leading-snug">
                              {modulo.titulo.startsWith("Módulo")
                                ? modulo.titulo
                                : `Módulo ${index + 1}: ${modulo.titulo}`}
                            </h3>
                            <p className="text-xs text-slate-400 font-normal mt-0.5">
                              {modulo.aulas
                                ? `${modulo.aulas.length} tópicos`
                                : "Tópicos do módulo"}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                            moduloAberto === index ? "transform rotate-180 text-slate-700" : ""
                          }`}
                          size={18}
                        />
                      </button>

                      {moduloAberto === index &&
                        modulo.aulas &&
                        modulo.aulas.length > 0 && (
                          <div className="divide-y divide-slate-100 bg-white border-t border-slate-200/80">
                            {modulo.aulas.map((aula: Aula) => (
                              <div
                                key={aula.id}
                                className="px-5 py-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                                <div className="flex items-center gap-3">
                                  <FileText
                                    className="text-slate-400"
                                    size={15}
                                  />
                                  <span className="text-xs font-normal text-slate-600">
                                    {aula.titulo}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Formador -> Depoimentos -> Requisitos -> Formulário de Inscrição (4 Cols) */}
          <div className="lg:col-span-4 relative z-30 space-y-6">
            {/* 1. Card do Formador Responsável (Com botão Ver Mais para o Modal) */}
            <div className="bg-white rounded-[5px] p-6 border border-slate-200/80 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Formador Responsável
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80"
                  alt="João Silva"
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900">
                    João Silva
                  </h3>
                  <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-2">
                    CEO & Especialista ERP Primavera
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    Com mais de 12 anos de experiência em projetos de
                    implementação de ERP corporativo em Angola e Portugal.
                  </p>
                  <button
                    onClick={() => setModalFormadorAberto(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-colors">
                    <span>Ver mais sobre o formador</span>
                    <ArrowLeft size={13} className="transform rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Card de Avaliações dos Alunos (Carrossel Horizontal com Setas) */}
            <div className="bg-white rounded-[5px] p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  O que dizem os nossos alunos
                </h2>
                {/* Controlo de Navegação do Carrossel */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setDepoimentoAtual((prev) =>
                        prev === 0 ? listaDepoimentos.length - 1 : prev - 1,
                      )
                    }
                    className="p-1 rounded-[5px] bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Anterior">
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setDepoimentoAtual((prev) =>
                        prev === listaDepoimentos.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="p-1 rounded-[5px] bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Seguinte">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Conteúdo do Depoimento Ativo (Horizontal) */}
              <div className="p-4 bg-slate-50 rounded-[5px] border border-slate-100 min-h-[140px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(listaDepoimentos[depoimentoAtual].estrelas)].map(
                      (_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ),
                    )}
                  </div>
                  <p className="text-xs text-slate-600 italic mb-3 leading-relaxed">
                    "{listaDepoimentos[depoimentoAtual].texto}"
                  </p>
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">
                    {listaDepoimentos[depoimentoAtual].autor}
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {listaDepoimentos[depoimentoAtual].cargo}
                  </span>
                </div>
              </div>

              {/* Indicadores de Pontos (Dots) */}
              <div className="flex justify-center items-center gap-1.5 mt-3">
                {listaDepoimentos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDepoimentoAtual(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      depoimentoAtual === idx
                        ? "w-5 bg-red-600"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Card dos Requisitos da Formação */}
            <div className="bg-white rounded-[5px] p-6 border border-slate-200/80 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Requisitos da Formação
              </h2>
              <ul className="space-y-3 text-xs text-slate-600">
                {cursoExibir.requisitos?.map((req: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <span>{req}</span>
                  </li>
                )) || (
                  <li className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Computador portátil com acesso à internet e
                      disponibilidade para aulas presenciais/práticas.
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* 3. Card de Informações e Inscrição */}
            <div className="bg-white rounded-[5px] border border-slate-200 shadow-xl overflow-hidden">
              {/* Imagem do Curso no Card */}
              <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={
                    (cursoExibir as any).imagem ||
                    cursoExibir.imagemUrl ||
                    "/academia/primavera.svg"
                  }
                  alt={cursoExibir.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Título do Curso */}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-slate-900 leading-snug mb-2">
                    {cursoExibir.titulo}
                  </h3>
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} />
                    <span>Inscrição com Garantia de Vaga</span>
                  </p>
                </div>

                {/* Este Curso Inclui */}
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Este curso inclui:
                </h4>
                <ul className="space-y-3 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-400" />
                    <span>
                      <strong>120 Horas</strong> de formação intensiva
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart size={16} className="text-slate-400" />
                    <span>
                      Nível <strong>Intermédio a Avançado</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award size={16} className="text-slate-400" />
                    <span>
                      <strong>Certificado de Conclusão</strong> Oficial
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText size={16} className="text-slate-400" />
                    <span>
                      Material didático e <strong>Manuais Práticos</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Headphones size={16} className="text-slate-400" />
                    <span>Suporte contínuo com o formador</span>
                  </li>
                </ul>

                {/* Link de Inscrição */}
                <div className="text-center mt-10 mb-8">
                  <button
                    onClick={() => setModalInscricaoAberto(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-red-600 uppercase tracking-wider transition-colors duration-200 cursor-pointer">
                    <span>Inscreva-se Agora</span>
                  </button>
                </div>

                {/* Share Button com Funcionalidade Completa */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: cursoExibir.titulo,
                            text: `Confira o curso de ${cursoExibir.titulo} na Envisio Training Academy!`,
                            url: window.location.href,
                          });
                        } catch (err) {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success(
                            "Link copiado para a área de transferência!",
                          );
                        }
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success(
                          "Link copiado para a área de transferência!",
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors">
                    <Share2 size={13} />
                    <span>Partilhar este curso</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. OUTRAS FORMAÇÕES RECOMENDADAS ──────────────────────────────────── */}
      <section className="bg-slate-100/70 py-16 border-t border-slate-200/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Centralizado */}
          <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
            <span className="inline-block px-3 py-1 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 rounded-[4px]">
              Evolução Contínua
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Outras Formações Recomendadas
            </h2>
            <p className="text-slate-500 text-xs mt-2 font-normal max-w-lg">
              Explore formações práticas e especializadas para impulsionar a sua carreira no mercado corporativo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Primavera ERP */}
            <div
              onClick={() => navigate("/academia/curso1")}
              className="bg-white rounded-[5px] overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-36 overflow-hidden relative bg-slate-900/5">
                <img
                  src="/academia/primavera.svg"
                  alt="Cegid Primavera ERP"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase tracking-wider shadow-sm border border-slate-700/50">
                  ERP & Gestão
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px] mb-1.5">
                  <Star size={12} fill="currentColor" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal text-[10px]">(128)</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                  Cegid Primavera ERP
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed font-normal">
                  Operação e parametrização nos módulos de Vendas, Compras e RH.
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                  <span className="text-slate-400 font-medium text-[10px]">120 Horas</span>
                  <span className="text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-bold">
                    Saber mais &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Frontend */}
            <div
              onClick={() => navigate("/academia/curso2")}
              className="bg-white rounded-[5px] overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-36 overflow-hidden relative bg-slate-900/5">
                <img
                  src="/academia/frontend.jpg"
                  alt="Programação Web Frontend"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase tracking-wider shadow-sm border border-slate-700/50">
                  Programação Web
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px] mb-1.5">
                  <Star size={12} fill="currentColor" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal text-[10px]">(96)</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                  Programação Web & React
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed font-normal">
                  HTML5, CSS3, JavaScript ES6+ e React.js para interfaces modernas.
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                  <span className="text-slate-400 font-medium text-[10px]">80 Horas</span>
                  <span className="text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-bold">
                    Saber mais &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Cibersegurança / Lógica */}
            <div
              onClick={() => navigate("/academia/curso3")}
              className="bg-white rounded-[5px] overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-36 overflow-hidden relative bg-slate-900/5">
                <img
                  src="/academia/logica.png"
                  alt="Redes & Cibersegurança"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase tracking-wider shadow-sm border border-slate-700/50">
                  Cibersegurança
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px] mb-1.5">
                  <Star size={12} fill="currentColor" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal text-[10px]">(84)</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                  Redes & Segurança de Informação
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed font-normal">
                  Infraestrutura Cisco, Firewalls, VPNs e ciberdefesa empresarial.
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                  <span className="text-slate-400 font-medium text-[10px]">100 Horas</span>
                  <span className="text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-bold">
                    Saber mais &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: SQL Server */}
            <div
              onClick={() => navigate("/academia/curso4")}
              className="bg-white rounded-[5px] overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-36 overflow-hidden relative bg-slate-900/5">
                <img
                  src="/academia/sql.png"
                  alt="SQL Server Base de Dados"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase tracking-wider shadow-sm border border-slate-700/50">
                  Base de Dados
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px] mb-1.5">
                  <Star size={12} fill="currentColor" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal text-[10px]">(112)</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                  Base de Dados SQL Server
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed font-normal">
                  Modelagem relacional, T-SQL, Stored Procedures e Backup.
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                  <span className="text-slate-400 font-medium text-[10px]">120 Horas</span>
                  <span className="text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-bold">
                    Saber mais &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/academia/cursos")}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-[5px] transition-all shadow-sm cursor-pointer">
              <span>Ver Todos os Cursos</span>
              <ArrowLeft size={14} className="ml-2 transform rotate-180" />
            </button>
          </div>
        </div>
      </section>


      {/* Modal de Vídeo */}
      <ModalVideo
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        videoUrl={videoUrl}
      />

      {/* Modal de Inscrição */}
      <FormularioInscricao
        isOpen={modalInscricaoAberto}
        onClose={() => setModalInscricaoAberto(false)}
        cursoNome={cursoExibir.titulo}
        cursoArea={cursoExibir.categoria || "Cursos"}
        onSuccess={() => {
          setModalInscricaoAberto(false);
        }}
      />

      {/* Modal de Detalhes do Formador (Réplica Exata da Imagem) */}
      {modalFormadorAberto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[8px] overflow-hidden shadow-2xl relative w-full max-w-3xl border border-slate-100">
            {/* Close Button Floating */}
            <button
              onClick={() => setModalFormadorAberto(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 bg-white hover:bg-slate-100 p-2 rounded-full shadow-md transition-colors border border-slate-100"
              aria-label="Fechar">
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[440px]">
              {/* Left Column: Image (5 cols) */}
              <div className="md:col-span-5 h-64 md:h-auto w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="João Silva"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Info (7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center text-left max-h-[500px] overflow-y-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1e1b4b] mb-1 leading-tight">
                  João Silva
                </h3>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-6">
                  CEO & FORMADOR PRIMAVERA
                </p>

                {/* Formação Académica */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    FORMAÇÃO ACADÉMICA
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Mestre em Gestão de Informação - Universidade Nova de Lisboa
                  </p>
                </div>

                {/* Sobre o Especialista */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    SOBRE O ESPECIALISTA
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Líder e estrategista com vasta experiência em implementação
                    de ERPs, o João guia nossos alunos no desenvolvimento de
                    competências voltadas para liderança empresarial e
                    otimização de processos corporativos.
                  </p>
                </div>

                {/* Áreas de Foco */}
                <div>
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    ÁREAS DE FOCO
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                      ERP PRIMAVERA
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                      GESTÃO ESTRATÉGICA
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded-[3px] tracking-wider">
                      BUSINESS INTELLIGENCE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
