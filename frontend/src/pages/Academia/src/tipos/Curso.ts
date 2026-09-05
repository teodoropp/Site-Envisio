import { ReactNode } from "react";

export interface Instrutor {
  id?: string;
  nome: string;
  avaliacao?: number;
  alunos?: number;
  aulas?: number;
  foto?: string;
  bio?: string;
  cargo?: string;
}

export interface Aula {
  id: string;
  titulo: string;
  tipo?: 'video' | 'texto' | 'material' | 'quiz';
  duracao?: string;
  formato?: string;
  livre?: boolean;
}

export interface TopicoItem {
  titulo: string;
  subtopicos?: string[];
}

export interface ModuloItem {
  id?: string;
  ordem?: number;
  titulo: string;
  duracao?: string;
  regime?: string;
  conteudos?: string[];
  topicos?: TopicoItem[];
  aulas?: Aula[];
  duracaoTotal?: string;
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao?: string;
  ordem: number;
  aulas: Aula[];
  duracaoTotal?: string;
  regime?: string;
  conteudos?: string[];
  topicos?: TopicoItem[];
}

export interface Curso {
  subcategoria?: ReactNode | string;
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: string | number;
  nivel: string;
  preco?: number;
  status: 'active' | 'upcoming' | 'disponivel' | 'breve' | string;
  available?: boolean;
  destaque?: boolean;
  format?: string;
  idioma?: string;
  targetAudience?: string;
  numModulos?: number;
  acessoVitalicio?: boolean;
  suporte?: boolean;
  certificado?: boolean;
  visualizacoes?: number;
  avaliacao?: number;
  instrutor?: Instrutor | string;
  imagemUrl?: string;
  modulos?: ModuloItem[] | Modulo[];
  objetivos?: string[];
  requisitos?: string[];
  conteudoDetalhado?: string;
  avaliacoes?: number;
  alunos?: number;
  criado_em?: string;
  aulas?: number;
  horas?: number;
  novo?: boolean;
}