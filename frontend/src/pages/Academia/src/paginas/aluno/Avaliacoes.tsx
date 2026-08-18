/** @format */

import { useState } from "react";
import { Star, BookOpen, Calendar, Trash2, Plus, MessageSquare, Check, X, Sparkles } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";
import AvaliacoesMobile from "./mobile/AvaliacoesMobile";

interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  curso: string;
  criado_em: string;
}

const mockAvaliacoes: Avaliacao[] = [
  {
    id: 1,
    nota: 5,
    comentario: "Formação presencial extremamente prática e adaptada à realidade fiscal de Angola. Excelente dinamismo do formador em sala de aula!",
    curso: "Análise Contabilística e SAF-T Angola (SNC-AO)",
    criado_em: "02 de Março de 2026",
  },
];

export default function Avaliacoes() {
  const isMobile = useIsMobile();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(mockAvaliacoes);
  const [modalNova, setModalNova] = useState(false);
  const [novoCurso, setNovoCurso] = useState("Gestão Avançada de ERP Cegid Primavera V10");
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState("");

  if (isMobile) {
    return <AvaliacoesMobile />;
  }

  const handleRemover = (id: number) => {
    setAvaliacoes((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmeter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    const nova: Avaliacao = {
      id: Date.now(),
      nota: novaNota,
      comentario: novoComentario,
      curso: novoCurso,
      criado_em: "Hoje",
    };

    setAvaliacoes([nova, ...avaliacoes]);
    setModalNova(false);
    setNovoComentario("");
  };

  return (
    <div className="space-y-6">
      {/* ── BANNER EXECUTIVO AZUL ESCURO ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-extrabold uppercase rounded-[2px]">
            Qualidade & Feedback de Sala
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Star className="text-amber-400 fill-amber-400" size={24} />
            <span>Avaliações de Formações Presenciais</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Partilhe a sua avaliação sobre os formadores, instalações e conteúdos das formações presenciais concluídas.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => setModalNova(true)}
            className="px-5 py-3 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center gap-2 shadow-md transition-colors cursor-pointer">
            <Plus size={16} />
            <span>Avaliar Formação Presencial</span>
          </button>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />
      </div>

      {/* ── LISTA ORGANIZADA DE AVALIAÇÕES ── */}
      {avaliacoes.length === 0 ? (
        <div className="bg-white p-12 rounded-[2px] border border-slate-200 text-center space-y-3">
          <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">Ainda não enviou avaliações</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Partilhe a sua opinião sobre a formação presencial concluída para nos ajudar a aprimorar o ensino em sala.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {avaliacoes.map((av) => (
            <div
              key={av.id}
              className="bg-white p-6 rounded-[2px] border border-slate-200 shadow-2xs space-y-3 hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-red-800" />
                    <h3 className="font-extrabold text-sm text-slate-900">{av.curso}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Avaliado em {av.criado_em}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-[2px] border border-amber-200/60">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < av.nota ? "text-amber-500 fill-amber-400" : "text-slate-300"}
                      />
                    ))}
                    <span className="text-xs font-black text-amber-900 ml-1">{av.nota}.0</span>
                  </div>

                  <button
                    onClick={() => handleRemover(av.id)}
                    className="p-1 text-slate-400 hover:text-red-700 transition-colors cursor-pointer"
                    title="Eliminar Avaliação">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-[2px] text-xs text-slate-700 italic leading-relaxed">
                "{av.comentario}"
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL NOVA AVALIAÇÃO ── */}
      {modalNova && (
        <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-extrabold text-xs uppercase tracking-wider">
                Submeter Avaliação de Curso
              </h3>
              <button onClick={() => setModalNova(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmeter} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Selecionar Curso *</label>
                <select
                  value={novoCurso}
                  onChange={(e) => setNovoCurso(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] font-bold text-slate-900 focus:outline-none">
                  <option value="Gestão Avançada de ERP Cegid Primavera V10">
                    Gestão Avançada de ERP Cegid Primavera V10
                  </option>
                  <option value="Análise Contabilística e SAF-T Angola (SNC-AO)">
                    Análise Contabilística e SAF-T Angola (SNC-AO)
                  </option>
                  <option value="Power BI para Tomada de Decisão Executiva">
                    Power BI para Tomada de Decisão Executiva
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Sua Classificação (1 a 5 Estrelas) *</label>
                <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setNovaNota(i + 1)}
                      className="p-1 cursor-pointer">
                      <Star
                        size={20}
                        className={i < novaNota ? "text-amber-500 fill-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                  <span className="font-black text-slate-900 ml-2">{novaNota} de 5 Estrelas</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Comentário / Opinião *</label>
                <textarea
                  rows={4}
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  placeholder="Escreva a sua avaliação detalhada..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-[2px] font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalNova(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-[2px]">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-800 text-white font-bold rounded-[2px]">
                  Publicar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
