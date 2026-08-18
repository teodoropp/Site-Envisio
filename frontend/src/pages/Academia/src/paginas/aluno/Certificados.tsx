/** @format */

import { useState } from "react";
import {
  Award,
  Download,
  Calendar,
  CheckCircle,
  Eye,
  ShieldCheck,
  QrCode,
  X,
  Printer,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";
import CertificadosMobile from "./mobile/CertificadosMobile";

interface Certificado {
  id: string;
  titulo: string;
  data_conclusao: string;
  codigoVerificacao: string;
  horas: number;
  instrutor: string;
  alunoNome: string;
  localidade: string;
}

const mockCertificados: Certificado[] = [
  {
    id: "1",
    titulo: "Análise Contabilística e SAF-T Angola (SNC-AO)",
    data_conclusao: "01 de Março de 2026",
    codigoVerificacao: "ENV-2026-8849-SFT",
    horas: 32,
    instrutor: "Dr. Carlos Eduardo",
    alunoNome: "Mateus Silva",
    localidade: "Envisio Academy (Luanda)",
  },
];

export default function Certificados() {
  const isMobile = useIsMobile();
  const [certificados] = useState<Certificado[]>(mockCertificados);
  const [modalCertificado, setModalCertificado] = useState<Certificado | null>(null);

  if (isMobile) {
    return <CertificadosMobile />;
  }

  const handleDownload = (cert: Certificado) => {
    alert(`A transferir diploma de formação presencial em PDF: ${cert.codigoVerificacao}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
            Acreditação Presencial Oficial
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Meus Certificados Presenciais
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Diplomas oficiais emitidos após a conclusão e validação de presenças nas formações práticas em sala da Envisio Academy.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-[2px] border border-slate-700">
          <Sparkles size={24} className="text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Emitidos & Verificados</p>
            <p className="text-lg font-black leading-none text-white">{certificados.length} Certificado</p>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      {/* ── TABELA EXECUTIVA DE CERTIFICADOS OFICIAIS ── */}
      {certificados.length === 0 ? (
        <div className="bg-white p-12 rounded-[2px] border border-slate-200 text-center space-y-3">
          <Award className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">Ainda não possui certificados</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Complete todas as aulas presenciais dos seus cursos em andamento para obter o seu diploma oficial.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4">Formação Presencial & Formador</th>
                  <th className="py-3.5 px-4">Local da Formação</th>
                  <th className="py-3.5 px-4 text-center">Carga Horária</th>
                  <th className="py-3.5 px-4">Data de Conclusão</th>
                  <th className="py-3.5 px-4 font-mono">Código Verificação</th>
                  <th className="py-3.5 px-4 text-right">Ações Disponíveis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {certificados.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Formação & Formador */}
                    <td className="py-4 px-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[9px] font-extrabold uppercase rounded-[2px] inline-flex items-center gap-1">
                          <ShieldCheck size={12} className="text-amber-700" />
                          Verificado
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {cert.titulo}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Formador(a): <strong className="text-slate-800">{cert.instrutor}</strong>
                      </p>
                    </td>

                    {/* Localidade */}
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-slate-800 font-semibold">
                        <MapPin size={13} className="text-red-800" />
                        {cert.localidade}
                      </span>
                    </td>

                    {/* Carga Horária */}
                    <td className="py-4 px-4 text-center font-bold text-slate-900">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-[2px] text-slate-800 font-mono">
                        {cert.horas}h Presenciais
                      </span>
                    </td>

                    {/* Data Conclusão */}
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Calendar size={13} className="text-slate-400" />
                        {cert.data_conclusao}
                      </span>
                    </td>

                    {/* Código Verificação */}
                    <td className="py-4 px-4 font-mono text-[11px] font-extrabold text-slate-800">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-[2px] border border-slate-200">
                        {cert.codigoVerificacao}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setModalCertificado(cert)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-[2px] flex items-center gap-1 cursor-pointer transition-colors">
                          <Eye size={13} />
                          <span>Visualizar</span>
                        </button>

                        <button
                          onClick={() => handleDownload(cert)}
                          className="px-3 py-1.5 bg-red-800 hover:bg-red-900 text-white font-bold text-[11px] rounded-[2px] flex items-center gap-1 cursor-pointer shadow-2xs transition-colors">
                          <Download size={13} />
                          <span>Baixar PDF</span>
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

      {/* ── MODAL EXECUTIVO DE VISUALIZAÇÃO DO CERTIFICADO OFICIAL ── */}
      {modalCertificado && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[95vh]">
            {/* Topo do Modal */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider">
                  Visualização do Certificado Oficial Presencial • Envisio Academy
                </h3>
              </div>
              <button
                onClick={() => setModalCertificado(null)}
                className="text-slate-400 hover:text-white p-1 rounded-[2px] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Corpo do Diploma HD */}
            <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-center bg-[#FAF9F6] border-8 border-slate-900 relative m-4">
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-slate-500 uppercase font-extrabold block">
                  República de Angola • Envisio Training Academy
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                  Certificado de Conclusão Presencial
                </h2>
              </div>

              <p className="text-xs text-slate-600 font-serif italic max-w-md mx-auto">
                Certifica-se para os devidos efeitos legais que
              </p>

              <div className="py-2 border-b-2 border-slate-900 max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-black text-red-900 font-serif">
                  {modalCertificado.alunoNome}
                </h1>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto font-medium">
                concluiu com êxito e aproveitamento a Formação Profissional Presencial de
              </p>

              <div className="p-4 bg-slate-900 text-white rounded-[2px] max-w-xl mx-auto space-y-1">
                <h3 className="font-extrabold text-base tracking-wide">
                  {modalCertificado.titulo}
                </h3>
                <p className="text-[11px] text-slate-300 font-mono">
                  Carga Horária Total: {modalCertificado.horas} Horas de Formação Prática em Sala
                </p>
              </div>

              {/* Rodapé com Assinatura e QR Code */}
              <div className="pt-8 grid grid-cols-3 items-end border-t border-slate-300 text-left text-xs gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-mono">CÓDIGO DE VERIFICAÇÃO:</p>
                  <p className="font-mono font-extrabold text-slate-900 text-xs">
                    {modalCertificado.codigoVerificacao}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                    <CheckCircle size={12} /> Autêntico & Válido
                  </p>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded-[2px] mx-auto flex items-center justify-center p-1">
                    <QrCode size={36} className="text-slate-800" />
                  </div>
                  <p className="text-[9px] text-slate-400 font-mono">Validar no Portal</p>
                </div>

                <div className="text-right space-y-1">
                  <div className="border-b border-slate-800 pb-1 font-serif italic text-slate-900 font-bold text-sm">
                    Dra. Ana Paula Santos
                  </div>
                  <p className="text-[10px] font-bold text-slate-700">Direção Académica</p>
                </div>
              </div>
            </div>

            {/* Ações do Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-[2px] flex items-center gap-1.5 cursor-pointer">
                <Printer size={14} />
                <span>Imprimir Documento</span>
              </button>

              <button
                onClick={() => handleDownload(modalCertificado)}
                className="px-5 py-2 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-[2px] flex items-center gap-1.5 shadow-2xs cursor-pointer">
                <Download size={14} />
                <span>Descarregar PDF Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
