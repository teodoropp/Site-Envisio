/** @format */

import { useState } from "react";
import { Star, BookOpen, Trash2, Plus, MessageSquare, X } from "lucide-react";

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

export default function AvaliacoesMobile() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(mockAvaliacoes);
  const [modalNova, setModalNova] = useState(false);
  const [novoCurso, setNovoCurso] = useState("Gestão Avançada de ERP Cegid Primavera V10");
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState("");

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
    <div className="space-y-4">
      {/* ── BANNER AZUL ESCURO MOBILE ── */}
      <div className="bg-slate-900 text-white rounded-[2px] p-5 shadow-md border border-slate-800 space-y-2">
        <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800/60 text-[9px] font-extrabold uppercase rounded-[2px]">
          Feedback de Sala
        </span>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Star className="text-amber-400 fill-amber-400" size={20} />
          <span>Minhas Avaliações</span>
        </h1>
        <p className="text-xs text-slate-300">
          Avalie as formações presenciais concluídas e ajude-nos a aprimorar as sessões.
        </p>

        <button
          onClick={() => setModalNova(true)}
          className="w-full mt-2 py-2 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 shadow-2xs">
          <Plus size={15} />
          <span>Avaliar Formação</span>
        </button>
      </div>

      {/* ── LISTA DE AVALIAÇÕES MOBILE ── */}
      {avaliacoes.map((av) => (
        <div
          key={av.id}
          className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-xs text-slate-900 leading-tight">{av.curso}</h3>
              <p className="text-[10px] text-slate-500">Avaliado em {av.criado_em}</p>
            </div>

            <button
              onClick={() => handleRemover(av.id)}
              className="p-1 text-slate-400 hover:text-red-700">
              <Trash2 size={15} />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-[2px] border border-amber-200/60 w-fit">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < av.nota ? "text-amber-500 fill-amber-400" : "text-slate-300"}
              />
            ))}
            <span className="text-[10px] font-black text-amber-900 ml-1">{av.nota}.0</span>
          </div>

          <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-[2px] border border-slate-100">
            "{av.comentario}"
          </p>
        </div>
      ))}

      {/* ── MODAL NOVA AVALIAÇÃO MOBILE ── */}
      {modalNova && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[2px] border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-xs uppercase text-slate-900">Avaliar Formação Presencial</h3>
              <button onClick={() => setModalNova(false)} className="text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmeter} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classificação</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNovaNota(n)}
                      className="p-1 cursor-pointer">
                      <Star
                        size={22}
                        className={n <= novaNota ? "text-amber-500 fill-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Seu Comentário sobre a Sessão</label>
                <textarea
                  rows={3}
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  placeholder="Escreva a sua opinião sobre as aulas em sala..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-[2px] text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNova(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-800 font-bold text-xs rounded-[2px]">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-red-800 text-white font-extrabold text-xs rounded-[2px]">
                  Submeter Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
