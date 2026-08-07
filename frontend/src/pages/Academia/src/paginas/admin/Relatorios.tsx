/** @format */

import React, { useState } from "react";
import {
  FileText,
  Download,
  Users,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  CreditCard,
  Building,
  ArrowUpRight,
  Printer,
  FileSpreadsheet,
} from "lucide-react";

export default function Relatorios() {
  const [periodo, setPeriodo] = useState("ano");
  const [dataInicio, setDataInicio] = useState("2026-01-01");
  const [dataFim, setDataFim] = useState("2026-08-07");
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  const handleExportPdf = () => {
    setExportingPdf(true);
    setTimeout(() => {
      setExportingPdf(false);
      alert("Relatório Executivo em formato PDF gerado e pronto para transferência!");
    }, 1500);
  };

  const handleExportExcel = () => {
    setExportingExcel(true);
    setTimeout(() => {
      setExportingExcel(false);
      alert("Dossiê Analítico exportado com sucesso para formato Excel (.XLSX)!");
    }, 1500);
  };

  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* Top Banner Executivo */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
              BUSINESS INTELLIGENCE
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-[2px]">
              RELATÓRIOS & ANALYTICS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">
            Inteligência Analítica & Relatórios
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Consolidação executiva de faturação de propinas, análise de rentabilidade de formações,
            indicadores de liquidação e métricas de desempenho académico.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto flex-shrink-0">
          <button
            onClick={handleExportExcel}
            disabled={exportingExcel}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs">
            <FileSpreadsheet size={15} className="text-emerald-400" />
            <span>{exportingExcel ? "A Exportar..." : "Exportar Excel (.xlsx)"}</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs">
            <Download size={15} />
            <span>{exportingPdf ? "A Gerar PDF..." : "Exportar Relatório PDF"}</span>
          </button>
        </div>
      </div>

      {/* Controlos de Período & Calendário */}
      <div className="bg-white p-3.5 rounded-[2px] border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-extrabold">
          <Calendar size={16} className="text-red-800" />
          <span className="uppercase tracking-wider">Filtrar por Período ou Calendário:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Preset Selector */}
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[2px] font-bold text-slate-900 focus:outline-none focus:border-slate-800 cursor-pointer text-xs transition-colors">
            <option value="30dias">Últimos 30 Dias (Agosto 2026)</option>
            <option value="trimestre">2º Trimestre (Maio — Julho)</option>
            <option value="ano">Ano Letivo 2026 (Acumulado)</option>
            <option value="custom">📅 Selecionar Dia / Período Específico...</option>
          </select>

          {/* Date Picker Inputs (Abre Calendário ao Clicar) */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 border border-slate-200 rounded-[2px]">
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase">De:</span>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => {
                  setDataInicio(e.target.value);
                  setPeriodo("custom");
                }}
                className="bg-transparent font-bold font-mono text-slate-900 focus:outline-none cursor-pointer text-xs"
              />
            </div>

            <span className="text-slate-300 font-bold">•</span>

            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase">Até:</span>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => {
                  setDataFim(e.target.value);
                  setPeriodo("custom");
                }}
                className="bg-transparent font-bold font-mono text-slate-900 focus:outline-none cursor-pointer text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards em Grelha (4 Colunas) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Receita de Propinas
            </span>
            <DollarSign size={16} className="text-emerald-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            14.850.000 Kz
          </p>
          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+14.2% vs período anterior</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Média por Aluno
            </span>
            <Users size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            104.577 Kz
          </p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Investimento Médio em Formação
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Taxa de Conclusão
            </span>
            <CheckCircle2 size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">84.2%</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Aprovação em Exames Práticos
          </span>
        </div>

        <div className="bg-white p-5 rounded-[2px] border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">
              Certificados Emitidos
            </span>
            <Award size={16} className="text-slate-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">315</p>
          <span className="text-[10px] font-bold text-slate-500 block">
            Dossiês Validados Envisio
          </span>
        </div>
      </div>

      {/* Painel Princial de Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRÁFICO DE EVOLUÇÃO DE FATURAÇÃO MENSAL (2/3 da largura) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-red-800" />
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Evolução Mensal da Receita de Propinas (Ano 2026 em Kz)
              </h3>
            </div>
            <span className="text-[10px] font-bold font-mono text-slate-400">
              Valores em Kwanzas (AOA)
            </span>
          </div>

          {/* Barras de Faturação Simuladas */}
          <div className="space-y-4 pt-2">
            {[
              { mes: "Janeiro", valor: "1.200.000 Kz", pct: 40, rec: "1.2M Kz" },
              { mes: "Fevereiro", valor: "1.650.000 Kz", pct: 55, rec: "1.65M Kz" },
              { mes: "Março", valor: "2.100.000 Kz", pct: 70, rec: "2.1M Kz" },
              { mes: "Abril", valor: "1.850.000 Kz", pct: 60, rec: "1.85M Kz" },
              { mes: "Maio", valor: "2.400.000 Kz", pct: 80, rec: "2.4M Kz" },
              { mes: "Junho", valor: "2.800.000 Kz", pct: 90, rec: "2.8M Kz" },
              { mes: "Julho", valor: "2.850.000 Kz", pct: 95, rec: "2.85M Kz" },
            ].map((item, index) => (
              <div key={index} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>{item.mes}</span>
                  <span className="font-mono font-bold text-slate-900">{item.valor}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-[2px] overflow-hidden flex items-center">
                  <div
                    className="bg-slate-900 h-full rounded-[2px] transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Média de Faturação Mensal:</span>
            <span className="font-mono font-extrabold text-red-900">2.121.428 Kz / Mês</span>
          </div>
        </div>

        {/* MÉTODOS DE PAGAMENTO E DISTRIBUIÇÃO (1/3 da largura) */}
        <div className="space-y-6">
          {/* Métodos de Pagamento */}
          <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Canais de Pagamento Preferidos
              </h3>
              <CreditCard size={15} className="text-slate-400" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Multicaixa Express</span>
                  <span className="font-mono text-slate-900">65% (9.65M Kz)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-[2px] overflow-hidden">
                  <div className="bg-red-800 h-full rounded-[2px]" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Transferência IBAN</span>
                  <span className="font-mono text-slate-900">25% (3.71M Kz)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-[2px] overflow-hidden">
                  <div className="bg-slate-800 h-full rounded-[2px]" style={{ width: "25%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Presencial TPA / Numerário</span>
                  <span className="font-mono text-slate-900">10% (1.48M Kz)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-[2px] overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-[2px]" style={{ width: "10%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Retenção & Satisfação */}
          <div className="bg-slate-900 text-white p-6 rounded-[2px] border border-slate-800 shadow-xs space-y-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-red-400">
              Qualidade Pedagógica Envisio
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-300">Avaliação Média dos Instrutores:</span>
                <span className="font-bold text-amber-400">4.9 / 5.0 ★</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-300">Taxa de Recomendação (NPS):</span>
                <span className="font-bold text-emerald-400">96% dos Estudantes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Dossiês Emitidos sem Erros:</span>
                <span className="font-bold text-white">100% em Conformidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEGUNDA LINHA: RANKING DOS CURSOS MAIS RENTÁVEIS */}
      <div className="bg-white p-6 rounded-[2px] border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-red-800" />
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              Ranking de Formações Mais Rentáveis & Populares
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Total de 6 Formações Ativas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4">Posição & Formação</th>
                <th className="py-3 px-4">Área de Conhecimento</th>
                <th className="py-3 px-4">Matrículas Ativas</th>
                <th className="py-3 px-4">Preço Unitário</th>
                <th className="py-3 px-4">Receita Acumulada</th>
                <th className="py-3 px-4 text-right">Taxa de Aprovação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  pos: "1º",
                  titulo: "Cegid Primavera — Módulos Corporativos",
                  cat: "ERP & Gestão",
                  alunos: "142 Alunos",
                  preco: "85.000 Kz",
                  total: "12.070.000 Kz",
                  aprovacao: "94%",
                },
                {
                  pos: "2º",
                  titulo: "Programação Web Frontend com React & Tailwind",
                  cat: "Programação",
                  alunos: "60 Alunos",
                  preco: "60.000 Kz",
                  total: "3.600.000 Kz",
                  aprovacao: "88%",
                },
                {
                  pos: "3º",
                  titulo: "Power BI para Tomada de Decisão Executiva",
                  cat: "Dados & BI",
                  alunos: "50 Alunos",
                  preco: "50.000 Kz",
                  total: "2.500.000 Kz",
                  aprovacao: "91%",
                },
                {
                  pos: "4º",
                  titulo: "SQL Server & Modelação de Bases de Dados",
                  cat: "Dados & BI",
                  alunos: "38 Alunos",
                  preco: "50.000 Kz",
                  total: "1.900.000 Kz",
                  aprovacao: "85%",
                },
                {
                  pos: "5º",
                  titulo: "Microsoft Excel Avançado com VBA e Macros",
                  cat: "Produtividade",
                  alunos: "25 Alunos",
                  preco: "40.000 Kz",
                  total: "1.000.000 Kz",
                  aprovacao: "96%",
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-red-800 text-xs w-6">
                        {item.pos}
                      </span>
                      <span className="font-bold text-slate-900">{item.titulo}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {item.cat}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {item.alunos}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {item.preco}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">
                    {item.total}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 bg-slate-900 text-white font-extrabold text-[10px] rounded-[2px]">
                      {item.aprovacao}
                    </span>
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
