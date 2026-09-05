import { useEffect, useState, useCallback, useRef } from "react";
import { Curso } from "../tipos/Curso";
import { getCursos } from "../servicos/cursoService";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const carregarCursos = useCallback(async () => {
    try {
      if (mountedRef.current) setCarregando(true);

      // Carrega diretamente o catálogo oficial da Academia Envisio (cursos.json)
      const localData = await getCursos();
      
      if (mountedRef.current) {
        setCursos(localData);
        setCarregando(false);
        setErro(null);
      }
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      if (!mountedRef.current) return;
      const localData = await getCursos();
      setCursos(localData);
      setCarregando(false);
      setErro("Falha ao carregar cursos");
    } finally {
      if (mountedRef.current) setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  return { cursos, carregando, erro, recarregar: carregarCursos };
}