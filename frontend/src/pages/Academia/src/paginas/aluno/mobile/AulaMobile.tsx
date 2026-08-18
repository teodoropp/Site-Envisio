/** @format */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  UserCheck,
} from "lucide-react";

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
    titulo: "Módulo 1 — Introdução ao ERP Primavera V10",
    licoes: [
      {
        id: "l1",
        titulo: "1.1 Visão Geral do Sistema e Navegação no ERP",
        duracao: "2h 30m em Sala",
        concluida: true,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "12 de Fevereiro de 2026",
        conteudo: "Sessão presencial onde exploramos a interface executiva do Primavera V10 e permissões de utilizadores.",
      },
    ],
  },
  {
    id: "m2",
    titulo: "Módulo 5 — Vendas e Facturação Eletrónica (SAF-T)",
    licoes: [
      {
        id: "l4",
        titulo: "5.2 Exportação do Ficheiro SAF-T (AO) para a AGT",
        duracao: "3h 30m em Sala",
        concluida: false,
        sala: "Sala Executiva 302 (Luanda)",
        dataSessao: "05 de Março de 2026",
        conteudo: "Nesta aula prática em sala vai aprender a validar a estrutura XML do SAF-T de faturação e exportar para o portal da AGT.",
      },
    ],
  },
];

export default function AulaMobile() {
  const { id } = useParams();
  const [modulos] = useState<ModuloPresencial[]>(mockModulos);
  const [minhasNotas, setMinhasNotas] = useState("Notas da sessão presencial em sala de aula...");
  const [notaSalva, setNotaSalva] = useState(false);

  let licaoAtual = modulos[1].licoes[0];

  const handleSalvarNotas = () => {
    setNotaSalva(true);
    setTimeout(() => setNotaSalva(false), 2000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* ── BANNER AZUL ESCURO AULA MOBILE ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-4 shadow-md border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Link to="/academia/aluno/cursos" className="p-1 bg-slate-800 rounded-[2px] text-white hover:bg-slate-700">
            <ArrowLeft size={16} />
          </Link>
          <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[9px] font-extrabold uppercase rounded-[2px]">
            Aula Presencial em Sala
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold block">
            {modulos[1].titulo}
          </span>
          <h1 className="text-base font-black text-white leading-tight">
            {licaoAtual.titulo}
          </h1>
        </div>

        {/* Informação Oficial de Validação pelo Formador (Sem Botão de Auto-Marcação) */}
        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-[2px] space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs">
            <UserCheck size={15} />
            <span>Validação de Presença pelo Formador</span>
          </div>
          <p className="text-[10px] text-slate-300 font-normal leading-relaxed">
            As presenças são confirmadas pelo formador responsável (<strong className="text-white">João Silva</strong>) na pauta digital da Envisio no final da aula.
          </p>
        </div>
      </div>

      {/* ── DETAILS CARD MOBILE ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-black uppercase text-slate-900">Ficha da Sessão</span>
          <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded-[2px]">
            {licaoAtual.duracao}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-700">
          <p className="flex items-center gap-1 font-bold text-slate-900">
            <MapPin size={14} className="text-red-800" /> {licaoAtual.sala}
          </p>
          <p className="flex items-center gap-1 text-slate-500 font-medium">
            <Calendar size={14} /> Data: {licaoAtual.dataSessao}
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] text-slate-700 leading-relaxed text-xs font-medium">
            {licaoAtual.conteudo}
          </div>
        </div>
      </div>

      {/* ── CADERNO DE NOTAS MOBILE ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xs uppercase text-slate-900">Suas Anotações de Sala</h3>
          {notaSalva && <span className="text-[10px] font-bold text-emerald-700">Guardado com sucesso!</span>}
        </div>

        <textarea
          rows={3}
          value={minhasNotas}
          onChange={(e) => setMinhasNotas(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] text-xs text-slate-900 focus:outline-none focus:border-red-800"
        />

        <button
          onClick={handleSalvarNotas}
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase rounded-[2px] flex items-center justify-center gap-1 cursor-pointer transition-colors">
          <Save size={14} />
          <span>Guardar Anotação</span>
        </button>
      </div>
    </div>
  );
}
