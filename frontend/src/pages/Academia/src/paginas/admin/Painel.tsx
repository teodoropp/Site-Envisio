/** @format */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  ChevronRight,
  UserPlus,
  FileText,
  Sparkles,
  ArrowUpRight,
  Calendar,
  Award,
  ShieldCheck,
  Zap,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import api from "../../utils/api";

export default function AdminPainel() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCursos: 7,
    totalAlunos: 863,
    receitaTotal: "485.000 Kz",
    avaliacaoMedia: 4.9,
    taxaConclusao: "94.2%",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/dashboard-completo");
        if (response.data?.sucesso) {
          const d = response.data.dados;
          setStats((prev) => ({
            ...prev,
            receitaTotal: d?.estatisticasFinanceiras?.receitaTotal
              ? `${d.estatisticasFinanceiras.receitaTotal.toLocaleString()} Kz`
              : prev.receitaTotal,
          }));
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchStats();
  }, []);

  const ultimasInscricoes = [
    {
      id: "INS-0941",
      aluno: "Mateus António",
      email: "mateus.antonio@gmail.com",
      curso: "Cegid Primavera — Módulos Corporativos",
      data: "Hoje, 11:24",
      valor: "85.000 Kz",
      pagamento: "Confirmado",
    },
    {
      id: "INS-0940",
      aluno: "Ana Paula Silva",
      email: "ana.paula@hotmail.com",
      curso: "Programação Web Frontend",
      data: "Hoje, 09:40",
      valor: "60.000 Kz",
      pagamento: "Confirmado",
    },
    {
      id: "INS-0939",
      aluno: "Carlos Eduardo",
      email: "carlos.eduardo@outlook.com",
      curso: "SQL Server — Banco de Dados",
      data: "Ontem, 16:15",
      valor: "50.000 Kz",
      pagamento: "Pendente",
    },
    {
      id: "INS-0938",
      aluno: "Fernanda Costa",
      email: "fernanda.costa@empresa.co.ao",
      curso: "Microsoft Excel Avançado",
      data: "Ontem, 14:02",
      valor: "40.000 Kz",
      pagamento: "Confirmado",
    },
  ];

  return (
    <div className="space-y-12 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* ── 1. Header Fora de Card (Tipografia Elegante e Compacta) ───────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-200/70">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <Calendar size={13} className="text-red-800" />
            <span className="capitalize">
              {new Date().toLocaleDateString("pt-PT", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Visão geral de gestão da Envisio Training Academy.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => navigate("/academia/admin/relatorios")}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-[3px] border border-slate-200/80 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs">
            <FileText size={14} />
            <span>Relatório</span>
          </button>
          <button
            onClick={() => navigate("/academia/admin/cursos")}
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-1.5 text-xs font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs">
            <Plus size={14} />
            <span>Adicionar Curso</span>
          </button>
        </div>
      </div>

      {/* ── 2. Bento Grid Primavera ERP (Tipografia Elegante e Reduzida) ── */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-red-800" />
            <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
              Recursos Principais & Indicadores Chave
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            Visão Primavera ERP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Bento Tile 1: GRANDE (Spans 2 cols) - Feature Principal Cegid Primavera */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-900 text-white p-5 sm:p-6 rounded-[2px] shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10 space-y-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block mb-1.5">
                  QUALIFICAÇÃO PROFISSIONAL • CERTIFICAÇÃO ENVISIO
                </span>
                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  Cegid Primavera: Funcionalidades e Módulos Corporativos
                </h3>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  O software de gestão mais robusto de Portugal não precisa ser
                  um mistério. Aprenda na prática, do zero ao avançado, e
                  torne-se o profissional que resolve problemas, não que os
                  cria.
                </p>
              </div>

              {/* Estatísticas Rápidas Integradas */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Inscrições Ativas
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    142 Alunos
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Carga Horária
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    120 Horas
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 flex items-center justify-between border-t border-slate-800/60 mt-3">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1"></span>
              <button
                onClick={() => navigate("/academia/admin/destaques")}
                className="text-[11px] font-bold text-white hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer">
                <span>Gerir Destaque</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Bento Tile 2: Certificação */}
          <div className="bg-white p-5 sm:p-6 rounded-[2px] border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Certificação
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <Award size={15} />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                315
              </p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                Certificados Emitidos
              </p>
              <p className="text-[10px] text-slate-400">
                Reconhecidos pelo mercado
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">
                Validação Online
              </span>
              <span className="font-bold text-red-800">100% Ativa</span>
            </div>
          </div>

          {/* Bento Tile 3: Faturação Acumulada */}
          <div className="bg-white p-5 sm:p-6 rounded-[2px] border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Faturação Acumulada
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                $
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {stats.receitaTotal}
              </p>
              <p className="text-xs font-bold text-red-800 flex items-center gap-1 mt-0.5">
                <TrendingUp size={13} /> +12.4% no mês
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Moeda oficial:</span>
              <span className="font-bold text-slate-800">Kz (Kwanza)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Métricas de Retenção & Matrículas Recentes ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Lado Esquerdo (4 cols): Taxa de Retenção & Conclusão */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white p-5 sm:p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-slate-700" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Taxa de Retenção & Conclusão
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded-[2px] border border-red-200">
                {stats.taxaConclusao}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Alto nível de engajamento dos alunos com média de{" "}
              <strong className="text-slate-900">42 horas/estudante</strong> e
              avaliação de satisfação de{" "}
              <strong className="text-slate-900">4.9/5.0</strong> estrelas.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>{stats.totalAlunos} Alunos Inscritos</span>
              <span className="text-slate-500 font-normal">
                {stats.totalCursos} Formações Ativas
              </span>
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="bg-white p-5 sm:p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Distribuição por Área Formativa
            </h3>

            <div className="space-y-2.5">
              {[
                {
                  cat: "ERP & Gestão",
                  pct: 35,
                  count: "302 alunos",
                  color: "bg-red-800",
                },
                {
                  cat: "Programação",
                  pct: 28,
                  count: "241 alunos",
                  color: "bg-slate-700",
                },
                {
                  cat: "Dados & BI",
                  pct: 20,
                  count: "172 alunos",
                  color: "bg-slate-500",
                },
                {
                  cat: "Produtividade",
                  pct: 17,
                  count: "148 alunos",
                  color: "bg-slate-400",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700">
                    <span>{item.cat}</span>
                    <span className="font-mono text-slate-500">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito (8 cols): Últimas Matrículas Operacionais */}
        <div className="lg:col-span-8 bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Últimas Matrículas Registadas
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Fluxo em tempo real de inscrições no portal
                </p>
              </div>
              <button
                onClick={() => navigate("/academia/admin/inscricoes")}
                className="text-xs font-bold text-red-800 hover:underline flex items-center gap-1 cursor-pointer">
                <span>Ver Todas</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="w-full">
              <table className="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/60 border-b border-slate-200 text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-2.5 px-3 w-[26%]">Aluno</th>
                    <th className="py-2.5 px-3 w-[32%]">Curso Formativo</th>
                    <th className="py-2.5 px-2 w-[15%]">Valor</th>
                    <th className="py-2.5 px-2 w-[12%]">Data</th>
                    <th className="py-2.5 px-3 w-[15%] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {ultimasInscricoes.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 truncate">
                        <p className="font-bold text-slate-900 truncate text-[11px]" title={item.aluno}>{item.aluno}</p>
                        <p className="text-[10px] text-slate-400 truncate" title={item.email}>
                          {item.email}
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-slate-800 font-semibold text-[11px] truncate" title={item.curso}>
                          {item.curso}
                        </p>
                      </td>
                      <td className="py-3 px-2 font-mono font-bold text-slate-900 text-[11px] whitespace-nowrap">
                        {item.valor}
                      </td>
                      <td className="py-3 px-2 text-slate-500 text-[10px] whitespace-nowrap">
                        {item.data}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold tracking-tight rounded-[2px] ${
                            item.pagamento === "Confirmado"
                              ? "bg-slate-900 text-white"
                              : item.pagamento === "Pendente"
                                ? "bg-slate-100 text-slate-700 border border-slate-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                          }`}>
                          {item.pagamento}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-right">
            <button
              onClick={() => navigate("/academia/admin/inscricoes")}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer">
              Gerir Matrículas no Painel &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
