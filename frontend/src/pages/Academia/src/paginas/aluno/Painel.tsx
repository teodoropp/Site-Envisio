/** @format */

import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Award,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  Flame,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckSquare,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import PainelMobile from "./mobile/PainelMobile";

interface CursoInscrito {
  id: string;
  titulo: string;
  categoria: string;
  status: string;
  progresso: number;
  instrutor: string;
  moduloAtual: string;
  localidade: string;
  aulasPresenciaisConcluidas: number;
  totalAulasPresenciais: number;
}

const mockCursos: CursoInscrito[] = [
  {
    id: "1",
    titulo: "Gestão Avançada de ERP Cegid Primavera V10",
    categoria: "Sistemas & ERP",
    status: "em_andamento",
    progresso: 70,
    instrutor: "Eng.ª Sofia Martins",
    moduloAtual: "Módulo 5 — Vendas, Impostos e Facturação Eletrónica (SAF-T)",
    localidade: "Envisio Academy — Sala Executiva 302 (Luanda)",
    aulasPresenciaisConcluidas: 14,
    totalAulasPresenciais: 20,
  },
  {
    id: "2",
    titulo: "Análise Contabilística e SAF-T Angola (SNC-AO)",
    categoria: "Contabilidade & Fiscalidade",
    status: "concluido",
    progresso: 100,
    instrutor: "Dr. Carlos Eduardo",
    moduloAtual: "Concluído",
    localidade: "Envisio Academy — Auditório Principal (Luanda)",
    aulasPresenciaisConcluidas: 16,
    totalAulasPresenciais: 16,
  },
];

export default function Painel() {
  const isMobile = useIsMobile();
  const [aulaRegistada, setAulaRegistada] = useState(false);
  const [cursos] = useState<CursoInscrito[]>(mockCursos);

  if (isMobile) {
    return <PainelMobile />;
  }

  const cursoAtivo = cursos.find((c) => c.status === "em_andamento") || cursos[0];

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO DA PÁGINA ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px] flex items-center gap-1">
              <Flame size={12} className="text-red-500 fill-red-500" />
              Formação Presencial Executiva
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase rounded-[2px] flex items-center gap-1">
              <Sparkles size={12} className="text-amber-400" />
              Presenças em Dia (95%)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Olá, Mateus Silva! 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Bem-vindo ao seu portal de acompanhamento de presenças e aproveitamento da <strong className="text-white">Envisio Academy</strong>. Após cada sessão em sala de aula, registe a aula como vista para atualizar o seu progresso oficial.
          </p>
        </div>

        {cursoAtivo && (
          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <Link
              to={`/academia/aluno/aula/${cursoAtivo.id}`}
              className="w-full sm:w-auto px-5 py-3 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
              <CheckSquare size={16} />
              <span>Marcar Aula Presencial Vista</span>
            </Link>
          </div>
        )}

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      {/* ── METRICAS ORGANIZADAS E COMPACTAS (4 CARDS KPI) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Formações Inscritas</span>
            <div className="w-8 h-8 rounded-[2px] bg-red-50 text-red-800 flex items-center justify-center font-bold">
              <BookOpen size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{cursos.length}</span>
            <p className="text-[11px] text-slate-500 font-medium">Cursos presenciais ativos</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Aulas Assistidas</span>
            <div className="w-8 h-8 rounded-[2px] bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">30 / 36</span>
            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <TrendingUp size={12} /> 83% Presença Confirmada
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Certificados Emotidos</span>
            <div className="w-8 h-8 rounded-[2px] bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Award size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">1</span>
            <p className="text-[11px] text-amber-700 font-medium">Diploma Presencial Oficial</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Carga Horária Total</span>
            <div className="w-8 h-8 rounded-[2px] bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">56 Horas</span>
            <p className="text-[11px] text-blue-700 font-medium">Formação Prática em Sala</p>
          </div>
        </div>
      </div>

      {/* ── PAINEL PRINCIPAL: CURSO PRESENCIAL ATIVO + AGENDA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lado Esquerdo: Detalhes do Curso Presencial em Andamento */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-red-800" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Formação Presencial Ativa
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-red-50 text-red-800 text-[10px] font-extrabold uppercase rounded-[2px]">
                Em Andamento
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                    {cursoAtivo.titulo}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Formador(a): <strong className="text-slate-800">{cursoAtivo.instrutor}</strong>
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1 font-medium pt-1">
                    <MapPin size={14} className="text-red-800" />
                    {cursoAtivo.localidade}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-2xl font-black text-red-800 leading-none block">
                    {cursoAtivo.progresso}%
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                    Aproveitamento
                  </span>
                </div>
              </div>

              {/* Barra de Progresso Presencial */}
              <div className="space-y-1 pt-1">
                <div className="w-full bg-slate-100 h-2.5 rounded-[2px] overflow-hidden">
                  <div
                    className="bg-red-800 h-full transition-all duration-500"
                    style={{ width: `${cursoAtivo.progresso}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-1">
                  <span>{cursoAtivo.moduloAtual}</span>
                  <span className="font-bold text-slate-900">
                    {cursoAtivo.aulasPresenciaisConcluidas} de {cursoAtivo.totalAulasPresenciais} Aulas Vistas
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-600 font-medium">
                Próxima Sessão Presencial: <strong className="text-slate-900">Quinta-feira às 14:00</strong>
              </span>

              <Link
                to={`/academia/aluno/aula/${cursoAtivo.id}`}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <CheckSquare size={14} />
                <span>Registar Presença / Marcar Aula</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Lado Direito: Agenda de Aulas Presenciais & Apoio */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar size={16} className="text-red-800" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Horário das Aulas Presenciais
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">Quinta-feira • 14:00 - 17:30</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[9px] font-extrabold uppercase rounded-[2px]">
                    Presencial
                  </span>
                </div>
                <h5 className="font-bold text-xs text-slate-900">
                  Modulo 5.2 — Exportação do Ficheiro SAF-T (AO) para a AGT
                </h5>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin size={12} className="text-slate-400" />
                  Sala Executiva 302 • Centro Envisio Luanda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
