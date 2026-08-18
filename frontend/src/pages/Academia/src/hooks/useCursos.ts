import { useEffect, useState, useCallback, useRef } from "react";
import api from "../utils/api";
import { Curso } from "../tipos/Curso";
import { getCursos } from "../servicos/cursoService";


const SOFT_TIMEOUT_MS = 1500;

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
    let softTimeout: ReturnType<typeof setTimeout> | null = null;

    try {
      if (mountedRef.current) setCarregando(true);

      softTimeout = setTimeout(async () => {
        if (!mountedRef.current) return;
        const localData = await getCursos();
        setCursos((prev) => (prev.length > 0 ? prev : localData));
        setCarregando(false);
      }, SOFT_TIMEOUT_MS);

      // Tenta API backend se existir, senão usa serviço local
      const response = await api.get("/cursos").catch(() => null);

      if (!mountedRef.current) return;
      if (softTimeout) clearTimeout(softTimeout);

      if (response && Array.isArray(response.data) && response.data.length > 0) {
        setCursos(response.data);
      } else {
        const localData = await getCursos();
        setCursos(localData);
      }
      setErro(null);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      if (!mountedRef.current) return;
      if (softTimeout) clearTimeout(softTimeout);

      const localData = await getCursos();
      setCursos(localData);
      setErro("Falha ao carregar cursos (usando dados locais)");
    } finally {
      if (mountedRef.current) setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  return { cursos, carregando, erro, recarregar: carregarCursos };
}