/** @format */

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowLeft,
  Download,
  FileText,
  Paperclip,
  MessageSquare,
  HelpCircle,
  Edit3,
  Save,
  Check,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  CheckSquare,
} from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";
import AulaMobile from "./mobile/AulaMobile";

interface LicaoPresencial {
  id: string;
  titulo: string;
  duracao: string;
  concluida: boolean;
  conteudo: string;
  sala: string;
  dataSessao: string;
}

interface ModuloPresencial {
  id: string;
  titulo: string;
  licoes: LicaoPresencial[];
}

const mockModulos: ModuloPresencial[] = [
  {
    id: "m1",
    titulo: "Módulo 1 — Introdução ao ERP Primavera V10 & Arquitetura",
    licoes: [
      {
        id: "l1",
        titulo: "1.1 Visão Geral do Sistema e Navegação no ERP",
        duracao: "2h 30m em Sala",
        concluida: true,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "12 de Fevereiro de 2026",
        conteudo:
          "Sessão presencial onde exploramos a interface executiva do Primavera V10, permissões de utilizadores, configuração de empresas e navegação nos menus principais.",
      },
      {
        id: "l2",
        titulo: "1.2 Cadastro de Terceiros: Clientes e Fornecedores",
        duracao: "3h 00m em Sala",
        concluida: true,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "19 de Fevereiro de 2026",
        conteudo:
          "Exercício prático em computador na sala de formação: parametrização de NIF angolano, condições de pagamento, limites de crédito e fiscalidade.",
      },
    ],
  },
  {
    id: "m2",
    titulo: "Módulo 5 — Vendas e Facturação Eletrónica (SAF-T)",
    licoes: [
      {
        id: "l3",
        titulo: "5.1 Emissão de Facturas, Recibos e Notas de Crédito",
        duracao: "3h 30m em Sala",
        concluida: true,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "26 de Fevereiro de 2026",
        conteudo:
          "Passo a passo presencial para emitir documentos de venda certificados em Angola, retenções na fonte (IRT e IVA) e aplicação de isenções de IVA.",
      },
      {
        id: "l4",
        titulo: "5.2 Exportação do Ficheiro SAF-T (AO) para a AGT",
        duracao: "3h 30m em Sala",
        concluida: false,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "05 de Março de 2026",
        conteudo:
          "Nesta aula prática em sala vai aprender a validar a estrutura XML do SAF-T de faturação, corrigir omissões de NIF e exportar o ficheiro oficial para submissão no portal da AGT.",
      },
      {
        id: "l5",
        titulo: "5.3 Anulação de Documentos e Notas de Rectificação",
        duracao: "2h 30m em Sala",
        concluida: false,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "12 de Março de 2026",
        conteudo:
          "Regras legais da AGT explicadas em sala de aula para anulação de faturas emitidas e emissão de notas de crédito com vínculo direto ao documento de origem.",
      },
    ],
  },
];

export default function Aula() {
  const isMobile = useIsMobile();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modulos, setModulos] = useState<ModuloPresencial[]>(mockModulos);
  const [licaoAtivaId, setLicaoAtivaId] = useState<string>("l4");
  const [activeTab, setActiveTab] = useState<"visao" | "pdfs" | "notas" | "duvidas">("visao");

  // Anotações
  const [minhasNotas, setMinhasNotas] = useState<string>(
    "Anotação da Aula Presencial: O formador explicou que a validação da estrutura XML do SAF-T deve ser feita com a aplicação da AGT antes do envio."
  );
  const [notaSalva, setNotaSalva] = useState(false);

  // Dúvidas
  const [duvidaTexto, setDuvidaTexto] = useState("");
  const [duvidaEnviada, setDuvidaEnviada] = useState(false);

  if (isMobile) {
    return <AulaMobile />;
  }

  // Encontrar lição ativa
  let licaoAtual: LicaoPresencial | undefined;
  let moduloAtual: ModuloPresencial | undefined;

  for (const m of modulos) {
    const l = m.licoes.find((item) => item.id === licaoAtivaId);
    if (l) {
      licaoAtual = l;
      moduloAtual = m;
      break;
    }
  }

  if (!licaoAtual) {
    licaoAtual = modulos[1].licoes[1];
    moduloAtual = modulos[1];
  }

  const toggleConcluida = (licaoId: string) => {
    setModulos((prev) =>
      prev.map((m) => ({
        ...m,
        licoes: m.licoes.map((l) =>
          l.id === licaoId ? { ...l, concluida: !l.concluida } : l
        ),
      }))
    );
  };

  const handleSalvarNotas = () => {
    setNotaSalva(true);
    setTimeout(() => setNotaSalva(false), 2500);
  };

  const handleEnviarDuvida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duvidaTexto.trim()) return;
    setDuvidaEnviada(true);
    setDuvidaTexto("");
    setTimeout(() => setDuvidaEnviada(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO (TOPO DA PÁGINA) ── */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2px] border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <Link
              to="/academia/aluno/cursos"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-[2px] transition-colors"
              title="Voltar aos Meus Cursos">
              <ArrowLeft size={16} />
            </Link>

            <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
              Formação Presencial em Sala
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400 block pt-1 font-bold">
            {moduloAtual?.titulo}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {licaoAtual.titulo}
          </h1>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => toggleConcluida(licaoAtual!.id)}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-[2px] flex items-center gap-2 cursor-pointer transition-all ${
              licaoAtual.concluida
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-red-800 hover:bg-red-900 text-white shadow-md"
            }`}>
            <CheckCircle size={16} />
            <span>{licaoAtual.concluida ? "Aula Marcada como Assistida" : "Marcar Aula como Assistida"}</span>
          </button>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      {/* ── PAINEL DA AULA PRESENCIAL & SIDEBAR DE LIÇÕES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lado Esquerdo: Ficha de Acompanhamento da Aula Presencial */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-red-800" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Resumo da Sessão Presencial Leccionada
                </h3>
              </div>

              <span
                className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-[2px] ${
                  licaoAtual.concluida
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}>
                {licaoAtual.concluida ? "Presença Confirmada" : "Pendente de Validação"}
              </span>
            </div>

            {/* Detalhes da Sessão em Sala */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-[2px] text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Local da Formação</span>
                <span className="font-extrabold text-slate-900 flex items-center gap-1">
                  <MapPin size={13} className="text-red-800" /> {licaoAtual.sala}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Data da Sessão</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Calendar size={13} className="text-slate-500" /> {licaoAtual.dataSessao}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Duração em Sala</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Clock size={13} className="text-slate-500" /> {licaoAtual.duracao}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Tópicos e Exercícios Práticos Desenvolvidos em Sala
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 border border-slate-100 rounded-[2px]">
                {licaoAtual.conteudo}
              </p>
            </div>
          </div>

          {/* ── SEPARADORES DE RECURSOS E APOIO AO ALUNO ── */}
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xs overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
              <button
                onClick={() => setActiveTab("visao")}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  activeTab === "visao"
                    ? "bg-white text-red-800 border-b-2 border-red-800 font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}>
                Visão Geral
              </button>

              <button
                onClick={() => setActiveTab("pdfs")}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === "pdfs"
                    ? "bg-white text-red-800 border-b-2 border-red-800 font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}>
                <FileText size={14} />
                <span>Manuais PDF de Apoio</span>
              </button>

              <button
                onClick={() => setActiveTab("notas")}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === "notas"
                    ? "bg-white text-red-800 border-b-2 border-red-800 font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}>
                <Edit3 size={14} />
                <span>Caderno de Anotações</span>
              </button>

              <button
                onClick={() => setActiveTab("duvidas")}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === "duvidas"
                    ? "bg-white text-red-800 border-b-2 border-red-800 font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}>
                <HelpCircle size={14} />
                <span>Dúvidas ao Formador</span>
              </button>
            </div>

            <div className="p-6">
              {/* TAB 1: VISÃO GERAL */}
              {activeTab === "visao" && (
                <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Objetivos da Sessão Presencial
                  </h3>
                  <p>{licaoAtual.conteudo}</p>
                </div>
              )}

              {/* TAB 2: RECURSOS PDF */}
              {activeTab === "pdfs" && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-2">
                    Manuais de Apoio para Acompanhamento da Aula
                  </h4>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Paperclip size={18} className="text-red-800 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">
                          Guia de Exercícios Presenciais SAF-T Angola (AGT V10).pdf
                        </h5>
                        <p className="text-[10px] text-slate-500 font-mono">14.8 MB • Manual Oficial para Sala</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("A descarregar manual de apoio...")}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[2px] flex items-center gap-1 cursor-pointer">
                      <Download size={13} />
                      <span>Baixar</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: ANOTAÇÕES PESSOAIS */}
              {activeTab === "notas" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                      Suas Anotações da Aula Presencial
                    </h4>
                    {notaSalva && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <Check size={13} /> Anotação Guardada!
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={4}
                    value={minhasNotas}
                    onChange={(e) => setMinhasNotas(e.target.value)}
                    placeholder="Escreva aqui as suas notas sobre a sessão em sala..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-[2px] text-xs text-slate-900 focus:outline-none font-medium"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSalvarNotas}
                      className="px-4 py-1.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-[2px] flex items-center gap-1.5 cursor-pointer shadow-2xs">
                      <Save size={14} />
                      <span>Guardar Anotação</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: DÚVIDAS AO FORMADOR */}
              {activeTab === "duvidas" && (
                <form onSubmit={handleEnviarDuvida} className="space-y-3">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Enviar Pergunta de Seguimento ao Formador
                  </h4>

                  {duvidaEnviada && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-[2px]">
                      A sua dúvida foi enviada! O formador responderá na próxima sessão presencial ou por e-mail.
                    </div>
                  )}

                  <textarea
                    rows={3}
                    value={duvidaTexto}
                    onChange={(e) => setDuvidaTexto(e.target.value)}
                    placeholder="Descreva a sua dúvida sobre os exercícios de sala..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-[2px] text-xs text-slate-900 focus:outline-none font-medium"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[2px] flex items-center gap-1.5 cursor-pointer">
                      <MessageSquare size={14} />
                      <span>Submeter Questão</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Lado Direito: Playlist de Aulas Presenciais */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Plano de Aulas Presenciais
              </h3>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                5 Sessões
              </span>
            </div>

            <div className="space-y-4">
              {modulos.map((mod) => (
                <div key={mod.id} className="space-y-2">
                  <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-700 bg-slate-50 p-2 rounded-[2px] border border-slate-100">
                    {mod.titulo}
                  </h4>

                  <div className="space-y-1.5 pl-1">
                    {mod.licoes.map((lic) => {
                      const isSelected = lic.id === licaoAtivaId;
                      return (
                        <button
                          key={lic.id}
                          onClick={() => setLicaoAtivaId(lic.id)}
                          className={`w-full p-2.5 rounded-[2px] flex items-center justify-between text-left transition-colors cursor-pointer text-xs ${
                            isSelected
                              ? "bg-slate-900 text-white font-bold shadow-2xs"
                              : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/60"
                          }`}>
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span
                              className={
                                lic.concluida
                                  ? "text-emerald-500"
                                  : isSelected
                                  ? "text-red-400"
                                  : "text-slate-400"
                              }>
                              <CheckCircle size={15} />
                            </span>
                            <span className="truncate">{lic.titulo}</span>
                          </div>

                          <span
                            className={`text-[10px] font-mono flex-shrink-0 ${
                              isSelected ? "text-slate-300" : "text-slate-500"
                            }`}>
                            {lic.duracao}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
