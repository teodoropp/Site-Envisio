/** @format */

import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  UserCheck,
  User,
  BookOpen,
  CreditCard,
  Award,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  Eye,
  Grid,
  List,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface CursoMatriculado {
  id: string;
  titulo: string;
  categoria: string;
  dataInscricao: string;
  progresso: number;
  status: "em_curso" | "concluido" | "pendente";
  notaFinal?: string;
  certificadoEmitido: boolean;
}

interface PagamentoAluno {
  id: string;
  recibo: string;
  cursoTitulo: string;
  valor: string;
  metodo: string;
  data: string;
  status: "pago" | "pendente" | "recusado";
}

interface Aluno {
  id: string;
  codigoAluno: string;
  nome: string;
  email: string;
  telefone: string;
  nifBi: string;
  cidade: string;
  empresa?: string;
  dataRegisto: string;
  statusConta: "ativo" | "suspenso" | "pendente";
  cursos: CursoMatriculado[];
  pagamentos: PagamentoAluno[];
  observacoes: string[];
}

const INITIAL_ALUNOS: Aluno[] = [
  {
    id: "1",
    codigoAluno: "ALU-2026-001",
    nome: "Mateus António",
    email: "mateus.antonio@gmail.com",
    telefone: "+244 923 456 789",
    nifBi: "006789123LA045",
    cidade: "Luanda",
    empresa: "BancABC Angola",
    dataRegisto: "15/01/2026",
    statusConta: "ativo",
    cursos: [
      {
        id: "c1",
        titulo: "Cegid Primavera — Módulos Corporativos",
        categoria: "ERP & Gestão",
        dataInscricao: "05/08/2026",
        progresso: 85,
        status: "em_curso",
        notaFinal: "17 / 20",
        certificadoEmitido: false,
      },
      {
        id: "c2",
        titulo: "Microsoft Excel Avançado com VBA e Macros",
        categoria: "Produtividade",
        dataInscricao: "10/02/2026",
        progresso: 100,
        status: "concluido",
        notaFinal: "19 / 20",
        certificadoEmitido: true,
      },
    ],
    pagamentos: [
      {
        id: "p1",
        recibo: "REC-2026/891",
        cursoTitulo: "Cegid Primavera — Módulos Corporativos",
        valor: "85.000 Kz",
        metodo: "Multicaixa Express",
        data: "05/08/2026",
        status: "pago",
      },
      {
        id: "p2",
        recibo: "REC-2026/142",
        cursoTitulo: "Microsoft Excel Avançado com VBA e Macros",
        valor: "40.000 Kz",
        metodo: "Transferência IBAN",
        data: "10/02/2026",
        status: "pago",
      },
    ],
    observacoes: [
      "Aluno muito participativo nas aulas de ERP.",
      "Pagamento da propina liquidado via transferência corporativa.",
    ],
  },
  {
    id: "2",
    codigoAluno: "ALU-2026-002",
    nome: "Ana Paula Silva",
    email: "ana.paula@hotmail.com",
    telefone: "+244 912 345 678",
    nifBi: "005432198LA032",
    cidade: "Benguela",
    empresa: "Sonangol EP",
    dataRegisto: "20/02/2026",
    statusConta: "ativo",
    cursos: [
      {
        id: "c3",
        titulo: "Programação Web Frontend com React & Tailwind",
        categoria: "Programação",
        dataInscricao: "04/08/2026",
        progresso: 60,
        status: "em_curso",
        notaFinal: "16 / 20",
        certificadoEmitido: false,
      },
    ],
    pagamentos: [
      {
        id: "p3",
        recibo: "REC-2026/902",
        cursoTitulo: "Programação Web Frontend com React & Tailwind",
        valor: "60.000 Kz",
        metodo: "Multicaixa Express",
        data: "04/08/2026",
        status: "pago",
      },
    ],
    observacoes: [
      "Comprovativo validado com sucesso pela secretaria académica.",
    ],
  },
  {
    id: "3",
    codigoAluno: "ALU-2026-003",
    nome: "Carlos Eduardo",
    email: "carlos.eduardo@outlook.com",
    telefone: "+244 934 567 890",
    nifBi: "008765432LA089",
    cidade: "Huambo",
    empresa: "Autónomo",
    dataRegisto: "01/03/2026",
    statusConta: "ativo",
    cursos: [
      {
        id: "c4",
        titulo: "SQL Server & Modelação de Bases de Dados",
        categoria: "Dados & BI",
        dataInscricao: "03/08/2026",
        progresso: 15,
        status: "em_curso",
        certificadoEmitido: false,
      },
    ],
    pagamentos: [
      {
        id: "p4",
        recibo: "REC-PEND-003",
        cursoTitulo: "SQL Server & Modelação de Bases de Dados",
        valor: "50.000 Kz",
        metodo: "Aguardando Comprovativo",
        data: "03/08/2026",
        status: "pendente",
      },
    ],
    observacoes: [
      "Solicitou extensão do prazo de pagamento até ao dia 15 deste mês.",
    ],
  },
  {
    id: "4",
    codigoAluno: "ALU-2026-004",
    nome: "Fernanda Costa",
    email: "fernanda.costa@empresa.co.ao",
    telefone: "+244 945 678 901",
    nifBi: "009876543LA012",
    cidade: "Luanda",
    empresa: "Envisio Tech",
    dataRegisto: "12/04/2026",
    statusConta: "ativo",
    cursos: [
      {
        id: "c5",
        titulo: "Microsoft Excel Avançado com VBA e Macros",
        categoria: "Produtividade",
        dataInscricao: "01/08/2026",
        progresso: 100,
        status: "concluido",
        notaFinal: "20 / 20",
        certificadoEmitido: true,
      },
      {
        id: "c6",
        titulo: "Power BI para Tomada de Decisão Executiva",
        categoria: "Dados & BI",
        dataInscricao: "05/08/2026",
        progresso: 40,
        status: "em_curso",
        certificadoEmitido: false,
      },
    ],
    pagamentos: [
      {
        id: "p5",
        recibo: "REC-2026/754",
        cursoTitulo: "Microsoft Excel Avançado com VBA e Macros",
        valor: "40.000 Kz",
        metodo: "Multicaixa Express",
        data: "01/08/2026",
        status: "pago",
      },
      {
        id: "p6",
        recibo: "REC-2026/911",
        cursoTitulo: "Power BI para Tomada de Decisão Executiva",
        valor: "65.000 Kz",
        metodo: "Transferência IBAN",
        data: "05/08/2026",
        status: "pago",
      },
    ],
    observacoes: [
      "Excelente desempenho técnico. Elegível para certificação de mérito.",
    ],
  },
  {
    id: "5",
    codigoAluno: "ALU-2026-005",
    nome: "João Manuel",
    email: "joao.manuel@gmail.com",
    telefone: "+244 956 789 012",
    nifBi: "001234567LA099",
    cidade: "Cabinda",
    empresa: "Chevron Angola",
    dataRegisto: "05/05/2026",
    statusConta: "suspenso",
    cursos: [
      {
        id: "c7",
        titulo: "Inteligência Artificial Generativa para Empresas",
        categoria: "IA",
        dataInscricao: "30/07/2026",
        progresso: 0,
        status: "pendente",
        certificadoEmitido: false,
      },
    ],
    pagamentos: [
      {
        id: "p7",
        recibo: "REC-RECUSADO-09",
        cursoTitulo: "Inteligência Artificial Generativa para Empresas",
        valor: "55.000 Kz",
        metodo: "Recusado pelo Banco",
        data: "30/07/2026",
        status: "recusado",
      },
    ],
    observacoes: [
      "Inscrição cancelada devido a não confirmação bancária do pagamento.",
    ],
  },
];

export default function GerirAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>(INITIAL_ALUNOS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [vistaModo, setVistaModo] = useState<"tabela" | "cards">("tabela");

  // Estado de Perfil / Detalhes do Aluno
  const [detalhesAluno, setDetalhesAluno] = useState<Aluno | null>(null);
  const [activeTab, setActiveTab] = useState<
    "cursos" | "pagamentos" | "modulos" | "notas"
  >("cursos");
  const [novaNota, setNovaNota] = useState("");

  // Modal Matricular Aluno (Manual)
  const [modalMatriculaOpen, setModalMatriculaOpen] = useState(false);
  const [modoMatricula, setModoMatricula] = useState<"novo" | "existente">(
    "novo",
  );
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState("");

  const [novoAlunoData, setNovoAlunoData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nifBi: "",
    empresa: "",
    cidade: "Luanda",
    cursoTitulo: "Cegid Primavera — Módulos Corporativos",
    categoria: "ERP & Gestão",
    valor: "85.000 Kz",
    metodo: "Multicaixa Express",
    statusPagamento: "pago" as "pago" | "pendente",
  });

  const handleOpenModalMatricula = () => {
    setModoMatricula("novo");
    setNovoAlunoData({
      nome: "",
      email: "",
      telefone: "",
      nifBi: "",
      empresa: "",
      cidade: "Luanda",
      cursoTitulo: "Cegid Primavera — Módulos Corporativos",
      categoria: "ERP & Gestão",
      valor: "85.000 Kz",
      metodo: "Multicaixa Express",
      statusPagamento: "pago",
    });
    if (alunos.length > 0) {
      setAlunoSelecionadoId(alunos[0].id);
    }
    setModalMatriculaOpen(true);
  };

  const handleSaveMatricula = (e: React.FormEvent) => {
    e.preventDefault();
    const dataHoje = new Date().toLocaleDateString("pt-PT");

    if (modoMatricula === "novo") {
      const novoAluno: Aluno = {
        id: String(Date.now()),
        codigoAluno: `ALU-2026-${String(alunos.length + 1).padStart(3, "0")}`,
        nome: novoAlunoData.nome,
        email: novoAlunoData.email,
        telefone: novoAlunoData.telefone,
        nifBi: novoAlunoData.nifBi || "000000000LA000",
        cidade: novoAlunoData.cidade,
        empresa: novoAlunoData.empresa,
        dataRegisto: dataHoje,
        statusConta: "ativo",
        cursos: [
          {
            id: `c_${Date.now()}`,
            titulo: novoAlunoData.cursoTitulo,
            categoria: novoAlunoData.categoria,
            dataInscricao: dataHoje,
            progresso: 0,
            status: "em_curso",
            certificadoEmitido: false,
          },
        ],
        pagamentos: [
          {
            id: `p_${Date.now()}`,
            recibo: `REC-2026/${Math.floor(100 + Math.random() * 900)}`,
            cursoTitulo: novoAlunoData.cursoTitulo,
            valor: novoAlunoData.valor,
            metodo: novoAlunoData.metodo,
            data: dataHoje,
            status: novoAlunoData.statusPagamento,
          },
        ],
        observacoes: [
          `Matrícula efetuada manualmente pela secretaria em ${dataHoje}.`,
        ],
      };
      setAlunos((prev) => [novoAluno, ...prev]);
    } else {
      setAlunos((prev) =>
        prev.map((aluno) => {
          if (aluno.id !== alunoSelecionadoId) return aluno;
          const novoCurso: CursoMatriculado = {
            id: `c_${Date.now()}`,
            titulo: novoAlunoData.cursoTitulo,
            categoria: novoAlunoData.categoria,
            dataInscricao: dataHoje,
            progresso: 0,
            status: "em_curso",
            certificadoEmitido: false,
          };
          const novoPagamento: PagamentoAluno = {
            id: `p_${Date.now()}`,
            recibo: `REC-2026/${Math.floor(100 + Math.random() * 900)}`,
            cursoTitulo: novoAlunoData.cursoTitulo,
            valor: novoAlunoData.valor,
            metodo: novoAlunoData.metodo,
            data: dataHoje,
            status: novoAlunoData.statusPagamento,
          };
          return {
            ...aluno,
            cursos: [novoCurso, ...aluno.cursos],
            pagamentos: [novoPagamento, ...aluno.pagamentos],
          };
        }),
      );
    }
    setModalMatriculaOpen(false);
  };

  const toggleStatusPagamento = (alunoId: string, pagamentoId: string) => {
    setAlunos((prev) =>
      prev.map((aluno) => {
        if (aluno.id !== alunoId) return aluno;
        const updatedPagamentos: PagamentoAluno[] = aluno.pagamentos.map(
          (p) => {
            if (p.id !== pagamentoId) return p;
            const nextStatus: "pago" | "pendente" | "recusado" =
              p.status === "pago" ? "pendente" : "pago";
            return { ...p, status: nextStatus };
          },
        );
        return { ...aluno, pagamentos: updatedPagamentos };
      }),
    );

    if (detalhesAluno && detalhesAluno.id === alunoId) {
      setDetalhesAluno((prev) => {
        if (!prev) return null;
        const updatedPagamentos: PagamentoAluno[] = prev.pagamentos.map((p) => {
          if (p.id !== pagamentoId) return p;
          const nextStatus: "pago" | "pendente" | "recusado" =
            p.status === "pago" ? "pendente" : "pago";
          return { ...p, status: nextStatus };
        });
        return { ...prev, pagamentos: updatedPagamentos };
      });
    }
  };

  const handleAddNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaNota.trim() || !detalhesAluno) return;
    const updatedNotas = [novaNota, ...detalhesAluno.observacoes];

    setAlunos((prev) =>
      prev.map((a) =>
        a.id === detalhesAluno.id ? { ...a, observacoes: updatedNotas } : a,
      ),
    );
    setDetalhesAluno({ ...detalhesAluno, observacoes: updatedNotas });
    setNovaNota("");
  };

  const filteredAlunos = alunos.filter((aluno) => {
    const matchSearch =
      aluno.nome.toLowerCase().includes(search.toLowerCase()) ||
      aluno.email.toLowerCase().includes(search.toLowerCase()) ||
      aluno.codigoAluno.toLowerCase().includes(search.toLowerCase()) ||
      aluno.nifBi.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "todos" || aluno.statusConta === statusFilter;

    const matchCategoria =
      categoriaFilter === "todos" ||
      aluno.cursos.some((c) => c.categoria === categoriaFilter);

    return matchSearch && matchStatus && matchCategoria;
  });

  // KPI Calculations
  const totalAlunos = alunos.length;
  const matriculasAtivas = alunos.reduce(
    (acc, a) => acc + a.cursos.filter((c) => c.status === "em_curso").length,
    0,
  );
  const totalPropinasConfirmadas = alunos.reduce((acc, a) => {
    return (
      acc +
      a.pagamentos
        .filter((p) => p.status === "pago")
        .reduce(
          (sum, p) => sum + parseInt(p.valor.replace(/\D/g, "") || "0"),
          0,
        )
    );
  }, 0);
  const totalCertificados = alunos.reduce(
    (acc, a) => acc + a.cursos.filter((c) => c.certificadoEmitido).length,
    0,
  );

  // ── SEÇÃO 1: PERFIL COMPLETO / DETALHES DO ALUNO ──────────────────────────────
  if (detalhesAluno) {
    const totalPagoAluno = detalhesAluno.pagamentos
      .filter((p) => p.status === "pago")
      .reduce((sum, p) => sum + parseInt(p.valor.replace(/\D/g, "") || "0"), 0);

    const mediaProgresso = Math.round(
      detalhesAluno.cursos.length === 0
        ? 0
        : detalhesAluno.cursos.reduce((acc, c) => acc + c.progresso, 0) /
            detalhesAluno.cursos.length,
    );

    return (
      <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif] animate-in fade-in duration-150 -mt-2">
        {/* Barra Superior de Ações do Perfil */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-1 px-1 text-xs mb-4">
          <button
            onClick={() => setDetalhesAluno(null)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-800 transition-colors cursor-pointer w-fit">
            <ArrowLeft size={15} />
            <span>Voltar à Lista de Alunos</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() =>
                alert(`A gerar dossiê académico de ${detalhesAluno.nome}`)
              }
              className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1 text-xs font-bold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs">
              <Download size={14} />
              <span>Exportar Dossiê Académico</span>
            </button>
            <button
              onClick={() =>
                alert(
                  `A emitir certificado de conclusão para ${detalhesAluno.nome}`,
                )
              }
              className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-1 text-xs font-bold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs">
              <Award size={14} />
              <span>Emitir Certificado</span>
            </button>
          </div>
        </div>

        {/* Executive Profile Card do Aluno */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2px] shadow-xs space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-start sm:items-center gap-4">
              {/* Avatar do Estudante com Iniciais */}
              <div className="w-16 h-16 bg-red-800 text-white font-extrabold text-xl rounded-[2px] flex items-center justify-center flex-shrink-0 shadow-md">
                {detalhesAluno.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {detalhesAluno.nome}
                  </h1>
                  <span className="px-2 py-0.5 bg-red-900/80 text-white text-[9px] font-extrabold font-mono uppercase tracking-widest rounded-[2px]">
                    {detalhesAluno.codigoAluno}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-red-400" />
                    {detalhesAluno.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={13} className="text-red-400" />
                    {detalhesAluno.telefone}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-300">
                    NIF/BI: {detalhesAluno.nifBi}
                  </span>
                </p>
              </div>
            </div>

            {/* Status da Conta do Aluno */}
            <div className="flex items-center gap-2.5">
              <span
                className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-[2px] ${
                  detalhesAluno.statusConta === "ativo"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}>
                CONTA {detalhesAluno.statusConta.toUpperCase()}
              </span>
            </div>
          </div>

          {/* KPI Dashboard do Estudante */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700/60">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                Cursos Inscritos
              </span>
              <span className="text-lg font-extrabold text-white">
                {detalhesAluno.cursos.length} Formações
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700/60">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                Média de Progresso
              </span>
              <span className="text-lg font-extrabold text-amber-400 font-mono">
                {mediaProgresso}%
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700/60">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                Total Propinas Paga
              </span>
              <span className="text-lg font-extrabold text-emerald-400">
                {totalPagoAluno.toLocaleString()} Kz
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700/60">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                Certificados Válidos
              </span>
              <span className="text-lg font-extrabold text-white">
                {
                  detalhesAluno.cursos.filter((c) => c.certificadoEmitido)
                    .length
                }{" "}
                Emitidos
              </span>
            </div>
          </div>
        </div>

        {/* Separador de Separadores do Perfil */}
        <div className="flex border-b border-slate-200 text-xs font-bold space-x-6">
          <button
            onClick={() => setActiveTab("cursos")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "cursos"
                ? "text-red-800 border-b-2 border-red-800"
                : "text-slate-500 hover:text-slate-900"
            }`}>
            <BookOpen size={15} />
            <span>Cursos & Progresso ({detalhesAluno.cursos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pagamentos")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "pagamentos"
                ? "text-red-800 border-b-2 border-red-800"
                : "text-slate-500 hover:text-slate-900"
            }`}>
            <CreditCard size={15} />
            <span>
              Histórico de Pagamentos ({detalhesAluno.pagamentos.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("modulos")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "modulos"
                ? "text-red-800 border-b-2 border-red-800"
                : "text-slate-500 hover:text-slate-900"
            }`}>
            <UserCheck size={15} />
            <span>Desempenho & Módulos</span>
          </button>

          <button
            onClick={() => setActiveTab("notas")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "notas"
                ? "text-red-800 border-b-2 border-red-800"
                : "text-slate-500 hover:text-slate-900"
            }`}>
            <FileText size={15} />
            <span>
              Notas Internas da Direção ({detalhesAluno.observacoes.length})
            </span>
          </button>
        </div>

        {/* TAB 1: CURSOS & PROGRESSO DO ESTUDANTE */}
        {activeTab === "cursos" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detalhesAluno.cursos.map((curso) => (
                <div
                  key={curso.id}
                  className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-red-50 text-red-800 border border-red-200 text-[9px] font-extrabold uppercase rounded-[2px]">
                        {curso.categoria}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                          curso.status === "concluido"
                            ? "bg-slate-900 text-white"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}>
                        {curso.status === "concluido"
                          ? "Concluído"
                          : "Em Curso"}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                      {curso.titulo}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Data da Matrícula: {curso.dataInscricao}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-slate-700">Progresso Geral</span>
                        <span className="font-mono text-slate-900">
                          {curso.progresso}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-[2px] overflow-hidden">
                        <div
                          className="bg-slate-900 h-full rounded-[2px] transition-all duration-300"
                          style={{ width: `${curso.progresso}%` }}
                        />
                      </div>
                    </div>

                    {curso.notaFinal && (
                      <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50 border border-slate-200/60 rounded-[2px]">
                        <span className="text-slate-600 font-semibold">
                          Avaliação Final / Nota:
                        </span>
                        <span className="font-bold font-mono text-slate-900">
                          {curso.notaFinal}
                        </span>
                      </div>
                    )}

                    {curso.certificadoEmitido ? (
                      <button
                        onClick={() =>
                          alert(
                            `A descarregar certificado oficial de ${curso.titulo}`,
                          )
                        }
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
                        <Award size={14} className="text-amber-400" />
                        <span>Descarregar Certificado Oficial</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-slate-500 text-center py-1 font-medium bg-slate-50 rounded-[2px]">
                        Certificado disponível após 100% de conclusão.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HISTÓRICO FINANCEIRO & PROPINAS */}
        {activeTab === "pagamentos" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    <th className="py-3 px-4">Recibo / ID</th>
                    <th className="py-3 px-4">Formação Correspondente</th>
                    <th className="py-3 px-4">Valor Pago</th>
                    <th className="py-3 px-4">Método de Pagamento</th>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {detalhesAluno.pagamentos.map((pag) => (
                    <tr
                      key={pag.id}
                      className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {pag.recibo}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {pag.cursoTitulo}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                        {pag.valor}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {pag.metodo}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {pag.data}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                            pag.status === "pago"
                              ? "bg-slate-900 text-white"
                              : pag.status === "pendente"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-red-50 text-red-800 border border-red-200"
                          }`}>
                          {pag.status === "pago"
                            ? "Confirmado"
                            : pag.status === "pendente"
                              ? "Pendente"
                              : "Recusado"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() =>
                            toggleStatusPagamento(detalhesAluno.id, pag.id)
                          }
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-[2px] cursor-pointer transition-colors shadow-2xs">
                          {pag.status === "pago"
                            ? "Marcar Pendente"
                            : "Confirmar Pago"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DESEMPENHO & MÓDULOS */}
        {activeTab === "modulos" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                Registo de Frequência & Módulos da Formação
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-700" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        Módulo 1 — Conceitos Base de ERP & Instalação
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Concluído em 18/02/2026 • Nota no Teste Prático: 18/20
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-extrabold uppercase rounded-[2px]">
                    CONCLUÍDO
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-700" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        Módulo 2 — Funcionalidades Operacionais & Facturação
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Concluído em 02/03/2026 • Nota no Teste Prático: 17/20
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-extrabold uppercase rounded-[2px]">
                    CONCLUÍDO
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-amber-600" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        Módulo 3 — Recursos Humanos, Tesouraria & Contabilidade
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Em curso • Próxima avaliação agendada
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-extrabold uppercase rounded-[2px]">
                    EM PROGRESSO
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTAS INTERNAS DA DIREÇÃO */}
        {activeTab === "notas" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                Registo de Observações Internas da Administração
              </h3>

              <form onSubmit={handleAddNota} className="flex gap-2">
                <input
                  type="text"
                  value={novaNota}
                  onChange={(e) => setNovaNota(e.target.value)}
                  placeholder="Escreva uma nova nota interna sobre o aluno..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer shadow-2xs">
                  <Plus size={14} />
                  <span>Adicionar Nota</span>
                </button>
              </form>

              <div className="space-y-2.5 pt-2">
                {detalhesAluno.observacoes.map((nota, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-start gap-2.5">
                    <FileText
                      size={15}
                      className="text-red-800 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {nota}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── SEÇÃO 2: CATÁLOGO GERAL DE GESTÃO DE ALUNOS ──────────────────────────────
  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* Top Banner Executivo */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
              SECRETARIA ACADÉMICA
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-[2px]"></span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">
            Gestão de Alunos
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Painel inteligente de acompanhamento de estudantes, progresso nas
            formações, validação de propinas e emissão de dossiês académicos.
          </p>
        </div>

        <button
          onClick={handleOpenModalMatricula}
          className="bg-red-800 hover:bg-red-900 text-white px-4 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto flex-shrink-0">
          <Plus size={16} />
          <span>Matricular Novo Aluno</span>
        </button>
      </div>

      {/* KPI Cards em Grelha */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Total de Alunos
            </span>
            <UserCheck size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {totalAlunos}
          </p>
          <span className="text-[10px] font-bold text-emerald-700 block">
            Matrículas Confirmadas
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Em Formação
            </span>
            <BookOpen size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {matriculasAtivas}
          </p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Turmas Ativas no Portal
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Propinas Validadas
            </span>
            <CreditCard size={16} className="text-slate-700" />
          </div>
          <p className="text-xl font-extrabold text-emerald-800">
            {totalPropinasConfirmadas.toLocaleString()} Kz
          </p>
          <span className="text-[10px] font-bold text-emerald-700 block">
            Receita Liquidada
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Certificados
            </span>
            <Award size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {totalCertificados}
          </p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Emitidos pela Envisio
          </span>
        </div>
      </div>

      {/* Barra de Pesquisa & Filtros Executiva */}
      <div className="bg-white p-3.5 rounded-[2px] border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Campo de Pesquisa Minimalista */}
        <div className="relative w-full md:w-96">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Pesquisar por nome, e-mail, NIF ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-[2px] font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 transition-all text-xs"
          />
        </div>

        {/* Grupo de Filtros & Alternador de Vista */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Ícone Indicador de Filtro */}
          <div className="flex items-center gap-1.5 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider pr-1">
            <Filter size={13} className="text-red-800" />
            <span>Filtrar:</span>
          </div>

          {/* Selector de Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none focus:border-slate-800 cursor-pointer text-xs transition-colors">
            <option value="todos">Todos os Status</option>
            <option value="ativo">Contas Ativas</option>
            <option value="suspenso">Contas Suspensas</option>
          </select>

          {/* Selector de Categoria */}
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[2px] font-bold text-slate-800 focus:outline-none focus:border-slate-800 cursor-pointer text-xs transition-colors">
            <option value="todos">Todas as Áreas</option>
            <option value="ERP & Gestão">ERP & Gestão</option>
            <option value="Programação">Programação</option>
            <option value="Dados & BI">Dados & BI</option>
            <option value="Produtividade">Produtividade</option>
            <option value="IA">Inteligência Artificial</option>
          </select>

          {/* Alternador Tabela / Cards */}
          <div className="flex items-center bg-slate-100 rounded-[2px] p-0.5 border border-slate-200/80 ml-1">
            <button
              onClick={() => setVistaModo("tabela")}
              className={`px-3 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                vistaModo === "tabela"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <List size={14} />
              <span>Tabela</span>
            </button>
            <button
              onClick={() => setVistaModo("cards")}
              className={`px-3 py-1.5 text-xs font-bold rounded-[2px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                vistaModo === "cards"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}>
              <Grid size={14} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* VISTA 1: TABELA EXECUTIVA (CABEÇALHO PRETO) */}
      {vistaModo === "tabela" ? (
        <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Código & Registo</th>
                  <th className="py-3.5 px-4">Estudante</th>
                  <th className="py-3.5 px-4">Empresa / NIF</th>
                  <th className="py-3.5 px-4">Cursos Matriculados</th>
                  <th className="py-3.5 px-4">Estado Propina</th>
                  <th className="py-3.5 px-4">Conta</th>
                  <th className="py-3.5 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAlunos.map((aluno) => {
                  const ultPagamento = aluno.pagamentos[0];
                  return (
                    <tr
                      key={aluno.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setDetalhesAluno(aluno)}>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {aluno.codigoAluno}
                        <span className="block text-[10px] text-slate-400 font-sans font-normal">
                          {aluno.dataRegisto}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{aluno.nome}</p>
                        <p className="text-[10px] text-slate-400">
                          {aluno.email}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <p className="font-semibold">
                          {aluno.empresa || "Autónomo"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {aluno.nifBi}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">
                          {aluno.cursos.length} Formações
                        </span>
                        <p className="text-[10px] text-slate-500 line-clamp-1">
                          {aluno.cursos.map((c) => c.titulo).join(", ")}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-[2px] ${
                            ultPagamento?.status === "pago"
                              ? "bg-slate-900 text-white"
                              : ultPagamento?.status === "pendente"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-red-50 text-red-800 border border-red-200"
                          }`}>
                          {ultPagamento?.status === "pago"
                            ? "Liquidado"
                            : ultPagamento?.status === "pendente"
                              ? "Pendente"
                              : "Recusado"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                            aluno.statusConta === "ativo"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}>
                          {aluno.statusConta}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetalhesAluno(aluno);
                          }}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-[2px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Ver Perfil Completo">
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VISTA 2: GRELHA DE CARDS DE ALUNOS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlunos.map((aluno) => (
            <div
              key={aluno.id}
              className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-[2px]">
                    {aluno.codigoAluno}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-[2px] ${
                      aluno.statusConta === "ativo"
                        ? "bg-slate-900 text-white"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}>
                    {aluno.statusConta}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-800 text-white font-extrabold text-sm rounded-[2px] flex items-center justify-center flex-shrink-0">
                    {aluno.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs">
                      {aluno.nome}
                    </h3>
                    <p className="text-[10px] text-slate-400">{aluno.email}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Empresa:</span>
                    <span className="font-bold text-slate-800">
                      {aluno.empresa || "Autónomo"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cursos Ativos:</span>
                    <span className="font-bold text-slate-800">
                      {aluno.cursos.length} Formações
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDetalhesAluno(aluno)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
                <Eye size={14} />
                <span>Ver Perfil & Dossiê Completo</span>
              </button>
            </div>
          ))}
        </div>
      )}
      {/* ── MODAL EXECUTIVO DE MATRÍCULA MANUAL DE ALUNO ────────────────── */}
      {modalMatriculaOpen && (
        <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header do Modal */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-red-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider">
                  Matrícula Manual na Secretaria
                </h3>
              </div>
              <button
                onClick={() => setModalMatriculaOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-[2px] cursor-pointer">
                <XCircle size={18} />
              </button>
            </div>

            {/* Alternador de Modo: Registar Novo Aluno vs Matricular Existente */}
            <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200 text-xs font-bold divide-x divide-slate-200">
              <button
                type="button"
                onClick={() => setModoMatricula("novo")}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modoMatricula === "novo"
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <User size={14} />
                <span>1. Registar & Matricular Novo Aluno</span>
              </button>
              <button
                type="button"
                onClick={() => setModoMatricula("existente")}
                className={`p-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modoMatricula === "existente"
                    ? "bg-white text-red-800 border-b-2 border-red-800"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}>
                <BookOpen size={14} />
                <span>2. Matricular Aluno Já Registado</span>
              </button>
            </div>

            {/* Formulário de Matrícula */}
            <form
              onSubmit={handleSaveMatricula}
              className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              {modoMatricula === "novo" ? (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Nome Completo do Aluno *
                    </label>
                    <input
                      type="text"
                      required
                      value={novoAlunoData.nome}
                      onChange={(e) =>
                        setNovoAlunoData({
                          ...novoAlunoData,
                          nome: e.target.value,
                        })
                      }
                      placeholder="Ex: Mateus António"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        E-mail de Contacto *
                      </label>
                      <input
                        type="email"
                        required
                        value={novoAlunoData.email}
                        onChange={(e) =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            email: e.target.value,
                          })
                        }
                        placeholder="mateus.antonio@gmail.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Telefone *
                      </label>
                      <input
                        type="text"
                        required
                        value={novoAlunoData.telefone}
                        onChange={(e) =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            telefone: e.target.value,
                          })
                        }
                        placeholder="+244 923 456 789"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        NIF / BI do Estudante
                      </label>
                      <input
                        type="text"
                        value={novoAlunoData.nifBi}
                        onChange={(e) =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            nifBi: e.target.value,
                          })
                        }
                        placeholder="006789123LA045"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Empresa / Instituição
                      </label>
                      <input
                        type="text"
                        value={novoAlunoData.empresa}
                        onChange={(e) =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            empresa: e.target.value,
                          })
                        }
                        placeholder="Ex: Sonangol EP ou Autónomo"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Selecionar Aluno da Base de Dados *
                    </label>
                    <select
                      value={alunoSelecionadoId}
                      onChange={(e) => setAlunoSelecionadoId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-900 focus:outline-none">
                      {alunos.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.codigoAluno} — {a.nome} ({a.email})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Dados do Curso & Propina */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider">
                  Especificações da Matrícula
                </h4>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Formação Pretendida *
                  </label>
                  <select
                    value={novoAlunoData.cursoTitulo}
                    onChange={(e) => {
                      const titulo = e.target.value;
                      let cat = "ERP & Gestão";
                      let val = "85.000 Kz";
                      if (
                        titulo.includes("React") ||
                        titulo.includes("Programação")
                      ) {
                        cat = "Programação";
                        val = "60.000 Kz";
                      } else if (
                        titulo.includes("SQL") ||
                        titulo.includes("Power BI")
                      ) {
                        cat = "Dados & BI";
                        val = "50.000 Kz";
                      } else if (titulo.includes("Excel")) {
                        cat = "Produtividade";
                        val = "40.000 Kz";
                      }
                      setNovoAlunoData({
                        ...novoAlunoData,
                        cursoTitulo: titulo,
                        categoria: cat,
                        valor: val,
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800">
                    <option value="Cegid Primavera — Módulos Corporativos">
                      Cegid Primavera — Módulos Corporativos
                    </option>
                    <option value="Programação Web Frontend com React & Tailwind">
                      Programação Web Frontend com React & Tailwind
                    </option>
                    <option value="SQL Server & Modelação de Bases de Dados">
                      SQL Server & Modelação de Bases de Dados
                    </option>
                    <option value="Microsoft Excel Avançado com VBA e Macros">
                      Microsoft Excel Avançado com VBA e Macros
                    </option>
                    <option value="Power BI para Tomada de Decisão Executiva">
                      Power BI para Tomada de Decisão Executiva
                    </option>
                    <option value="Inteligência Artificial Generativa para Empresas">
                      Inteligência Artificial Generativa para Empresas
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Valor da Propina *
                    </label>
                    <input
                      type="text"
                      required
                      value={novoAlunoData.valor}
                      onChange={(e) =>
                        setNovoAlunoData({
                          ...novoAlunoData,
                          valor: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Método de Pagamento
                    </label>
                    <select
                      value={novoAlunoData.metodo}
                      onChange={(e) =>
                        setNovoAlunoData({
                          ...novoAlunoData,
                          metodo: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800">
                      <option value="Multicaixa Express">
                        Multicaixa Express
                      </option>
                      <option value="Transferência IBAN">
                        Transferência IBAN
                      </option>
                      <option value="Pagamento Presencial TPA">
                        Pagamento Presencial TPA
                      </option>
                      <option value="Numerário / Secretaria">
                        Numerário / Secretaria
                      </option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between">
                  <span className="font-bold text-slate-700">
                    Estado Inicial da Propina:
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="statusPag"
                        checked={novoAlunoData.statusPagamento === "pago"}
                        onChange={() =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            statusPagamento: "pago",
                          })
                        }
                        className="text-red-800 focus:ring-0"
                      />
                      <span>Liquidado (Pago)</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="statusPag"
                        checked={novoAlunoData.statusPagamento === "pendente"}
                        onChange={() =>
                          setNovoAlunoData({
                            ...novoAlunoData,
                            statusPagamento: "pendente",
                          })
                        }
                        className="text-red-800 focus:ring-0"
                      />
                      <span>Pendente</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Botões do Modal */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalMatriculaOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-[2px]">
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white font-bold rounded-[2px] flex items-center gap-2 shadow-xs cursor-pointer">
                  <CheckCircle2 size={16} />
                  <span>Confirmar & Concluir Matrícula</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
