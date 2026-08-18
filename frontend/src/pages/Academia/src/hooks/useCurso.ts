import { useEffect, useState } from "react";
import api from "../utils/api";
import { Curso } from "../tipos/Curso";
import { getCursoById } from "../servicos/cursoService";

export function useCurso(id: string) {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCarregando(false);
      return;
    }
    
    setCarregando(true);
    
    // Tenta API se houver backend, senão usa cursoService local
    api
      .get(`/cursos/${id}?_embed=modulos`)
      .then((res) => {
        if (res.data) setCurso(res.data);
        else return getCursoById(id).then(setCurso);
      })
      .catch(async () => {
        const local = await getCursoById(id);
        setCurso(local);
        if (!local) setErro("Curso não encontrado");
      })
      .finally(() => setCarregando(false));
  }, [id]);

  return { curso, carregando, erro };
}