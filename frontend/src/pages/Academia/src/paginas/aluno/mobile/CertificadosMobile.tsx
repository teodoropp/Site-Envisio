/** @format */

import { useState } from "react";
import {
  Award,
  Download,
  Calendar,
  Eye,
  ShieldCheck,
  QrCode,
  X,
  Printer,
  Sparkles,
  MapPin,
} from "lucide-react";

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

export default function CertificadosMobile() {
  const [certificados] = useState<Certificado[]>(mockCertificados);
  const [modalCertificado, setModalCertificado] = useState<Certificado | null>(
    null,
  );

  const handleDownload = (cert: Certificado) => {
    alert(
      `A transferir diploma PDF de formação presencial: ${cert.codigoVerificacao}.pdf`,
    );
  };

  return (
    <div className="space-y-4">
      {/* ── BANNER AZUL ESCURO MOBILE ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 space-y-2">
        <h1 className="text-xl font-black text-white">Meus Certificados</h1>
        <p className="text-xs text-slate-300">
          Certificados emitidos após o termino da formação na Envisio Academy.
        </p>
      </div>

      {/* ── LISTA DE CARTÕES TOUCH DE CERTIFICADO ── */}
      {certificados.map((cert) => (
        <div
          key={cert.id}
          className="bg-white rounded-[2px] border border-slate-200 shadow-2xs p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[9px] font-extrabold uppercase rounded-[2px] flex items-center gap-1">
              <ShieldCheck size={12} className="text-amber-700" />
              Diploma Verificado
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">
              {cert.horas} Horas
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
              {cert.titulo}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Formador:{" "}
              <strong className="text-slate-800">{cert.instrutor}</strong>
            </p>
            <p className="text-[11px] text-slate-600 flex items-center gap-1">
              <MapPin size={13} className="text-red-800 flex-shrink-0" />
              {cert.localidade}
            </p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-[2px] flex items-center justify-between text-[10px] text-slate-600 font-medium">
            <span>
              Concluído: <strong>{cert.data_conclusao}</strong>
            </span>
            <span className="font-mono text-slate-800 font-extrabold">
              {cert.codigoVerificacao}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setModalCertificado(cert)}
              className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[2px] flex items-center justify-center gap-1">
              <Eye size={14} />
              <span>Visualizar</span>
            </button>

            <button
              onClick={() => handleDownload(cert)}
              className="py-2 px-3 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-[2px] flex items-center justify-center gap-1 shadow-2xs">
              <Download size={14} />
              <span>Baixar PDF</span>
            </button>
          </div>
        </div>
      ))}

      {/* ── MODAL MOBILE DO DIPLOMA OFICIAL ── */}
      {modalCertificado && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-h-[92vh] overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs">
              <span className="font-extrabold uppercase text-[10px]">
                Certificado Oficial Envisio
              </span>
              <button
                onClick={() => setModalCertificado(null)}
                className="text-slate-400">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-center bg-[#FAF9F6] border-4 border-slate-900 m-2 text-xs">
              <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                República de Angola • Envisio Academy
              </p>
              <h2 className="text-xl font-black text-slate-900 uppercase">
                Certificado Presencial
              </h2>
              <p className="text-[11px] text-slate-600 italic">
                Certifica-se que
              </p>
              <h1 className="text-lg font-black text-red-900 font-serif border-b-2 border-slate-900 pb-1">
                {modalCertificado.alunoNome}
              </h1>
              <p className="text-[11px] text-slate-700">
                concluiu com êxito a formação de
              </p>
              <div className="p-3 bg-slate-900 text-white rounded-[2px] space-y-0.5">
                <h3 className="font-bold text-xs">{modalCertificado.titulo}</h3>
                <p className="text-[10px] text-slate-300 font-mono">
                  Carga Horária: {modalCertificado.horas}h Práticas
                </p>
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-between text-[9px] text-left">
                <div>
                  <p className="text-slate-500">CÓDIGO:</p>
                  <p className="font-mono font-bold text-slate-900">
                    {modalCertificado.codigoVerificacao}
                  </p>
                </div>
                <div className="text-center">
                  <QrCode size={28} className="mx-auto text-slate-800" />
                  <p className="text-[8px] text-slate-400">Validar no Portal</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-200 text-slate-800 font-bold text-xs rounded-[2px]">
                Imprimir
              </button>
              <button
                onClick={() => handleDownload(modalCertificado)}
                className="px-4 py-1.5 bg-red-800 text-white font-bold text-xs rounded-[2px]">
                Baixar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
