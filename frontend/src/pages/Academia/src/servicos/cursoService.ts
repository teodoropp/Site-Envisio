import { Curso } from "../tipos/Curso";
import cursosDataRaw from "../data/cursos.json";

// Cast JSON data to Curso[]
const cursosData: Curso[] = cursosDataRaw as Curso[];

export const isCursoAtivo = (curso?: Curso | null): boolean => {
  if (!curso) return false;
  return curso.status === "active" || curso.available === true || curso.status === "disponivel";
};

export const getCursos = async (): Promise<Curso[]> => {
  // Simulação de camada de serviço (pode ser trocada futuramente por fetch('/api/cursos'))
  return Promise.resolve(cursosData);
};

export const getCursoById = async (id: string): Promise<Curso | null> => {
  if (!id) return Promise.resolve(null);
  const normalizedId = id.trim().toLowerCase();
  
  const cursoEncontrado = cursosData.find((c) => {
    const candidateId = c.id.trim().toLowerCase();
    return (
      candidateId === normalizedId ||
      (normalizedId === "primavera" && candidateId === "cegid-primavera") ||
      (normalizedId === "gestao-rh" && candidateId === "gestao-recursos-humanos") ||
      (normalizedId === "curso1" && candidateId === "gestao-recursos-humanos")
    );
  });

  return Promise.resolve(cursoEncontrado || null);
};

export const getCursoDestaque = async (): Promise<Curso | null> => {
  const destaque = cursosData.find((c) => c.destaque) || cursosData.find((c) => isCursoAtivo(c));
  return Promise.resolve(destaque || null);
};

export const getFormacoesAtivas = async (): Promise<Curso[]> => {
  return Promise.resolve(cursosData.filter((c) => isCursoAtivo(c)));
};

export const getFormacoesFuturas = async (): Promise<Curso[]> => {
  return Promise.resolve(cursosData.filter((c) => !isCursoAtivo(c)));
};

const cursoService = {
  getCursos,
  getCursoById,
  getCursoDestaque,
  getFormacoesAtivas,
  getFormacoesFuturas,
  isCursoAtivo,
};

export default cursoService;

