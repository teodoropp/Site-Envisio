/** @format */

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  User,
  Users,
  Award,
  CheckCircle,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  ShieldCheck,
  Sparkles,
  FileText,
  ArrowRight,
  Download,
} from "lucide-react";

interface ModuloItem {
  titulo: string;
  duracao: string;
  topicos: string[];
}

interface CursoInfo {
  id: string;
  titulo: string;
  categoria: string;
  subtitulo: string;
  descricaoCompleta: string;
  imagem: string;
  instrutor: string;
  cargoInstrutor: string;
  bioInstrutor: string;
  duracao: string;
  nivel: string;
  alunosMatriculados: string;
  localidade: string;
  horario: string;
  modulos: ModuloItem[];
}

const cegidPrimaveraData: CursoInfo = {
  id: "cegid-primavera",
  titulo: "Cegid Primavera — Módulos Corporativos",
  categoria: "ERP & GESTÃO",
  subtitulo:
    "Domine o ERP mais utilizado em Angola e Portugal para gestão comercial, financeira e de recursos humanos com casos práticos reais.",
  descricaoCompleta:
    "Este programa foi desenvolvido para responder rigorosamente às exigências operacionais e fiscais das empresas em Angola. A formação aborda desde os conceitos essenciais de ERP até ao encerramento de contas e exportação legal do SAF-T (AO) para a AGT.",
  imagem: "/academia/primavera.svg",
  instrutor: "Eng. Mateus Silva",
  cargoInstrutor: "Consultor Sénior Cegid Primavera",
  bioInstrutor:
    "Profissional sénior com sólida experiência no mercado corporativo angolano. Especialista na capacitação de equipas administrativas, financeiras e técnicas.",
  duracao: "120h",
  nivel: "Intermédio",
  alunosMatriculados: "142 Estudantes",
  localidade: "Envisio Luanda - Sala de reunião",
  horario: "Segunda, Quarta e Quinta • 09:00 - 12:00",
  modulos: [
    {
      titulo: "Módulo 1 — Introdução ao ERP Primavera V10 & Arquitetura",
      duracao: "3 tópicos",
      topicos: [
        "Navegação executiva na interface V10",
        "Parametrização inicial de empresas",
        "Gestão de utilizadores e permissões",
      ],
    },
    {
      titulo: "Módulo 2 — Vendas, Faturação Eletrónica & Retenções",
      duracao: "3 tópicos",
      topicos: [
        "Emissão de faturas, recibos e notas de crédito",
        "Cálculo de retenções de IRT e IVA",
        "Regras fiscais da AGT aplicadas a vendas",
      ],
    },
    {
      titulo: "Módulo 3 — Compras, Stocks e Gestão de Inventários",
      duracao: "3 tópicos",
      topicos: [
        "Registo de encomendas e faturas de fornecedores",
        "Gestão de artigos, lotes e armazéns",
        "Valorização de inventários e fichas de stock",
      ],
    },
    {
      titulo: "Módulo 4 — Recursos Humanos & Processamento de Salários",
      duracao: "3 tópicos",
      topicos: [
        "Ficha de colaboradores e remunerações",
        "Cálculo de IRT, INSS e descontos legais",
        "Emissão de recibos de vencimento e guias",
      ],
    },
    {
      titulo: "Módulo 5 — Exportação Legal do SAF-T (AO) para a AGT",
      duracao: "3 tópicos",
      topicos: [
        "Validação de ficheiros XML SAF-T",
        "Auditoria de omissões de NIF e erros de faturação",
        "Submissão direta no portal da AGT",
      ],
    },
  ],
};

const frontendData: CursoInfo = {
  id: "programacao-web-frontend",
  titulo: "Programação Web Front-end Completo",
  categoria: "DESENVOLVIMENTO",
  subtitulo:
    "Construa aplicações web modernas e responsivas utilizando HTML5, CSS3, JavaScript ES6+ e React.",
  descricaoCompleta:
    "Aprenda na prática a criar interfaces web de nível profissional. Da estruturação semântica com HTML5 ao desenvolvimento de sistemas dinâmicos com React e Tailwind CSS.",
  imagem: "/academia/frontend.jpg",
  instrutor: "Pedro Costa",
  cargoInstrutor: "Engenheiro de Software Front-end",
  bioInstrutor:
    "Desenvolvedor full-stack e formador técnico na Envisio Academy com vasta experiência no desenvolvimento de portais corporativos.",
  duracao: "80h Presenciais",
  nivel: "Iniciante ao Avançado",
  alunosMatriculados: "98 Estudantes",
  localidade: "Envisio Luanda — Auditório Principal",
  horario: "Terça e Quinta • 14:00 - 17:00",
  modulos: [
    {
      titulo: "Módulo 1 — Fundamentos de HTML5 e Estrutura Semântica",
      duracao: "3 tópicos",
      topicos: [
        "Tags semânticas",
        "Formulários e validações",
        "Acessibilidade web",
      ],
    },
    {
      titulo: "Módulo 2 — CSS3 Avançado, Flexbox e Grid Layout",
      duracao: "3 tópicos",
      topicos: [
        "Design responsivo",
        "Arquitetura CSS",
        "Animações e transições",
      ],
    },
    {
      titulo: "Módulo 3 — JavaScript ES6+ e Lógica de Interface",
      duracao: "3 tópicos",
      topicos: [
        "Manipulação do DOM",
        "Consumo de APIs REST",
        "Promises e Async/Await",
      ],
    },
    {
      titulo: "Módulo 4 — React.js Fundamentos e Estado",
      duracao: "1 tópico",
      topicos: ["Componentes", "Hooks", "Roteamento SPA"],
    },
    {
      titulo: "Módulo 5 — Projeto Final de Aplicação Web Completa",
      duracao: "3 tópicos",
      topicos: [
        "Integração final",
        "Deploy no servidor",
        "Apresentação presencial",
      ],
    },
  ],
};

const sqlData: CursoInfo = {
  id: "sql-server",
  titulo: "SQL Server — Banco de Dados Essencial",
  categoria: "DADOS & BI",
  subtitulo:
    "Consultas SQL avançadas, modelagem de bancos relacionais, views, stored procedures e manutenção.",
  descricaoCompleta:
    "Formação intensiva presencial cobrindo desde a criação de tabelas e relacionamentos até à otimização de consultas SQL complexas para ambiente empresarial.",
  imagem: "/academia/sql.png",
  instrutor: "Ana Santos",
  cargoInstrutor: "Administradora de Bases de Dados (DBA)",
  bioInstrutor:
    "Especialista em arquitetura de dados e otimização de sistemas corporativos SQL Server.",
  duracao: "60h Presenciais",
  nivel: "Intermédio",
  alunosMatriculados: "115 Estudantes",
  localidade: "Envisio Luanda — Sala ",
  horario: "Sábado • 08:30 - 13:30",
  modulos: [
    {
      titulo: "Módulo 1 — DDL, DML e Linguagem SQL Fundamental",
      duracao: "3 tópicos",
      topicos: [
        "CREATE, ALTER, DROP",
        "SELECT, INSERT, UPDATE, DELETE",
        "JOINs e Filtros",
      ],
    },
    {
      titulo: "Módulo 2 — Stored Procedures, Triggers e Views",
      duracao: "1 tópico",
      topicos: ["Automação com T-SQL", "Regras de negócio", "Views otimizadas"],
    },
    {
      titulo: "Módulo 3 — Indexação, Backup e Performance Tuning",
      duracao: "3 tópicos",
      topicos: [
        "Índices Clustered e Non-Clustered",
        "Planos de execução",
        "Rotinas de Backup",
      ],
    },
  ],
};

const logicaData: CursoInfo = {
  id: "logica-de-programacao",
  titulo: "Lógica de Programação e Algoritmos",
  categoria: "PROGRAMAÇÃO",
  subtitulo:
    "Aprenda a pensar como um programador: estruturas condicionais, laços de repetição e resolução de problemas.",
  descricaoCompleta:
    "A base de conhecimento fundamental para qualquer profissional de tecnologia. Exercícios práticos desenvolvidos em sala para dominar algoritmos e estruturas de dados.",
  imagem: "/academia/logica.png",
  instrutor: "Pedro Costa",
  cargoInstrutor: "Engenheiro de Software & Formador",
  bioInstrutor:
    "Formador especialista em introdução à ciência da computação e raciocínio lógico.",
  duracao: "40h Presenciais",
  nivel: "Iniciante",
  alunosMatriculados: "210 Estudantes",
  localidade: "Envisio Luanda — Lab de Informática 1",
  horario: "Segunda e Quarta • 17:30 - 19:30",
  modulos: [
    {
      titulo: "Módulo 1 — Variáveis, Operadores e Algoritmos",
      duracao: "15h em Sala",
      topicos: ["Tipos de dados", "Entrada e saída", "Expressões lógicas"],
    },
    {
      titulo: "Módulo 2 — Estruturas de Decisão e Laços de Repetição",
      duracao: "15h em Sala",
      topicos: ["IF, ELSE, SWITCH", "FOR, WHILE", "Resolução de problemas"],
    },
    {
      titulo: "Módulo 3 — Vetores, Matrizes e Funções",
      duracao: "10h em Sala",
      topicos: [
        "Arrays unidimensionais",
        "Matrizes bidimensionais",
        "Modularização",
      ],
    },
  ],
};

const cibersegurancaData: CursoInfo = {
  id: "ciberseguranca-redes",
  titulo: "Cibersegurança & Defesa de Redes",
  categoria: "CIBERSEGURANÇA & REDES",
  subtitulo:
    "Infraestrutura Cisco, Firewalls, VPNs corporativas e ciberdefesa de sistemas empresariais.",
  descricaoCompleta:
    "Capacitação técnica em redes de computadores, arquitetura Cisco, roteamento avançado e proteção contra ciberataques em ambientes corporativos.",
  imagem: "/academia/logica.png",
  instrutor: "Eng. Pedro Santos",
  cargoInstrutor: "Consultor Senior & Especialista Cisco",
  bioInstrutor:
    "Líder e instrutor certificado Cisco com vasta experiência em auditoria de segurança de informação e arquitetura de redes corporativas.",
  duracao: "65h Presenciais",
  nivel: "Intermédio a Avançado",
  alunosMatriculados: "94 Estudantes",
  localidade: "Envisio Luanda — Auditório Principal",
  horario: "Sábado • 09:00 - 14:00",
  modulos: [
    {
      titulo: "Módulo 1 — Fundamentos de Redes, Arquitetura & Protocolos",
      duracao: "2 tópicos",
      topicos: ["Modelo OSI e Pilha TCP/IP", "Endereçamento IP, Subredes e CIDR"],
    },
    {
      titulo: "Módulo 2 — Switching, VLANs e Roteamento Avançado",
      duracao: "2 tópicos",
      topicos: ["Configuração de Switches e VLANs", "Protocolos de Roteamento (OSPF, BGP)"],
    },
    {
      titulo: "Módulo 3 — Segurança Perimetral, Firewalls e VPNs",
      duracao: "2 tópicos",
      topicos: ["Configuração de Firewalls e regras de acesso", "VPNs corporativas e criptografia"],
    },
    {
      titulo: "Módulo 4 — Análise de Tráfego, Auditoria & Ciberdefesa",
      duracao: "2 tópicos",
      topicos: ["Análise de Tráfego com Wireshark", "Prevenção de Intrusões (IDS/IPS)"],
    },
  ],
};

const rhData: CursoInfo = {
  id: "gestao-recursos-humanos",
  titulo: "Gestão de Recursos Humanos",
  categoria: "GESTÃO & RH",
  subtitulo:
    "Formação prática desenvolvida para Técnicos, Gestores de RH e Juristas Laborais, com componente prática em ambiente ERP.",
  descricaoCompleta:
    "Dotar os participantes de competências técnicas, jurídicas e operacionais que lhes permitam gerir, de forma íntegra e eficiente, o ciclo completo da relação laboral - da admissão ao processamento salarial e à prestação de contas à Administração - em conformidade com a Lei n.º 12/23 e demais legislação complementar aplicável em Angola.",
  imagem: "/academia/RH.png",
  instrutor: "Dorivaldo José",
  cargoInstrutor: "Especialista em Gestão de Pessoas & Legislação Laboral",
  bioInstrutor:
    "Formador especialista em gestão de recursos humanos e aplicação prática da legislação laboral angolana.",
  duracao: "60h",
  nivel: "Intermédio / Avançado",
  alunosMatriculados: "Inscrições Abertas",
  localidade: "Envisio Luanda — Sala de Formação",
  horario: "Presencial / Misto",
  modulos: [
    {
      titulo: "Módulo 1 — Introdução à Gestão de Recursos Humanos",
      duracao: "6h (Teórico)",
      topicos: [],
    },
    {
      titulo: "Módulo 2 — Direito do Trabalho à luz da Lei n.º 12/23",
      duracao: "16h (Teórico-prático)",
      topicos: [],
    },
    {
      titulo: "Módulo 3 — Leis Doutrinais e Complementares no Âmbito Laboral",
      duracao: "8h (Teórico)",
      topicos: [
        "Regime Jurídico da Segurança Social Obrigatória",
        "Regime de Acidentes de Trabalho e Doenças Profissionais",
        "Legislação de SHST: direitos e deveres, EPI e prevenção de riscos",
        "Regime jurídico do trabalho de estrangeiros e regularização de mão de obra",
        "Regulamento Interno de Empresa: elaboração, conteúdo e valor jurídico",
        "Convenções coletivas de trabalho e o seu impacto na gestão de RH",
        "Legislação sobre salário mínimo nacional e atualizações salariais",
        "Regime tributário do trabalho (IRT) e obrigações declarativas",
        "Proteção de dados pessoais do trabalhador e confidencialidade",
        "Papel da Inspeção Geral do Trabalho e procedimentos de fiscalização",
      ],
    },
    {
      titulo: "Módulo 4 — Processamento de Salários no ERP Primavera",
      duracao: "14h (Prático)",
      topicos: [],
    },
    {
      titulo: "Módulo 5 — Gestão de Conflitos, Mediação e Relações Laborais",
      duracao: "8h (Teórico-prático)",
      topicos: [],
    },
    {
      titulo: "Módulo 6 — Indicadores, Relatórios e Dashboards de RH para a Administração",
      duracao: "8h (Prático)",
      topicos: [],
    },
  ],
};


const bancoDeCursos: Record<string, CursoInfo> = {
  "gestao-recursos-humanos": rhData,
  "gestao-rh": rhData,
  "cegid-primavera": cegidPrimaveraData,
  curso1: cegidPrimaveraData,
  "programacao-web-frontend": frontendData,
  curso2: frontendData,
  "ciberseguranca-redes": cibersegurancaData,
  curso3: cibersegurancaData,
  "sql-server": sqlData,
  curso4: sqlData,
  "logica-de-programacao": logicaData,
};

export default function CursoDetalheMobile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [favorito, setFavorito] = useState(false);
  const [moduloAberto, setModuloAberto] = useState<number | null>(null);
  const [mostrarTodosModulos, setMostrarTodosModulos] = useState(false);

  // Normaliza o ID para bater com o dicionário de cursos
  const key = id ? id.toLowerCase().trim() : "";
  const curso = bancoDeCursos[key] || rhData;


  const toggleModulo = (index: number) => {
    setModuloAberto(moduloAberto === index ? null : index);
  };

  // Se houver mais de 4 módulos, limita a visualização inicial aos 4 primeiros
  const modulosExibidos = mostrarTodosModulos
    ? curso.modulos
    : curso.modulos.slice(0, 4);

  return (
    <div className="space-y-4 pb-12">
      {/* ── BARRA DE SUB-NAVEGAÇÃO COM BOTÃO VOLTAR E TÍTULO ── */}
      <div className="text-gray-900 px-3 py-1 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-700  cursor-pointer">
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>

        <span className="font-extrabold text-xs text-gray-700 truncate max-w-[170px]">
          {curso.titulo}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFavorito(!favorito)}
            className="p-1 text-gray-700 hover:text-red-400 cursor-pointer">
            <Heart
              size={17}
              className={favorito ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button className="p-1 text-gray-700 hover:text-gray-700 cursor-pointer">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* ── SESSÃO HERO: CARTÃO EXECUTIVO CORRIGIDO E ALINHADO (SEM CORTAR INFORMAÇÕES) ── */}
      <div className="bg-slate-900 text-white p-4 rounded-[2px] border border-slate-800 shadow-md space-y-3">
        {/* Badges de Categoria & Destaque */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 bg-red-800 text-white text-[9px] font-black uppercase rounded-[2px] tracking-wider">
            {curso.categoria}
          </span>
          <span className="px-2.5 py-1 text-amber-300 text-[9px] font-black uppercase rounded-[2px] flex items-center gap-1">
            DESTAQUE HERO
          </span>
        </div>

        {/* Título em Destaque & Subtítulo */}
        <div className="space-y-1 pt-0.5">
          <h1 className="text-base font-black text-white leading-snug">
            {curso.titulo}
          </h1>
          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            {curso.subtitulo}
          </p>
        </div>

        {/* Grelha de Métricas Rápidas Perfeitamente Alinhadas */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
          <div className=" p-2.5 rounded-[2px] space-y-0.5 min-w-0">
            <p className="text-[8px] text-slate-400  uppercase tracking-wider">
              Duração
            </p>
            <p className="text-[11px] font-black text-white flex items-center gap-1 ">
              <Clock size={11} className="text-gray-400 flex-shrink-0" />{" "}
              {curso.duracao}
            </p>
          </div>

          <div className="p-2.5 rounded-[2px] space-y-0.5 min-w-0">
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
              Nível
            </p>
            <p className="text-[11px] font-black text-amber-300 truncate">
              {curso.nivel}
            </p>
          </div>
        </div>
      </div>

      {/* ── CAPA DE IMAGEM DO CURSO EM DESTAQUE ── */}
      <div className="rounded-[2px] overflow-hidden border border-slate-200 shadow-2xs h-40 bg-slate-900 relative">
        <img
          src={curso.imagem}
          alt={curso.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      {/* ── SECÇÃO 1: VISÃO GERAL DO PROGRAMA FORMATIVO ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <BookOpen size={16} className="text-red-800" />
          <h2 className="font-black text-xs text-slate-900 uppercase tracking-tight">
            Visão Geral do Programa
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {curso.descricaoCompleta}
        </p>
      </div>

      {/* ── SECÇÃO 2: FORMADOR RESPONSÁVEL (IDÊNTICO AO ADMIN PAINEL) ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User size={16} className="text-red-800" />
          <h2 className="font-black text-xs text-slate-900 uppercase tracking-tight">
            Formador
          </h2>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-[2px] bg-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 border border-slate-800">
            <User size={22} />
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-extrabold text-xs text-slate-900">
              {curso.instrutor}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              {curso.cargoInstrutor}
            </p>

            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8px] font-black uppercase rounded-[2px]">
              Formador Certificado
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[2px]">
          <p className="text-[11px] text-slate-600 leading-relaxed font-normal italic">
            "{curso.bioInstrutor}"
          </p>
        </div>
      </div>

      {/* ── SECÇÃO 3: MÓDULOS E CONTEÚDO CURRICULAR (COM SETA PARA MAIS DE 4 MÓDULOS) ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-red-800" />
            <h2 className="font-black text-xs text-slate-900 uppercase tracking-tight">
              Módulos do Curso ({curso.modulos.length})
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-bold">
            {curso.duracao}
          </span>
        </div>

        <div className="space-y-2">
          {modulosExibidos.map((modulo, idx) => {
            const temTopicos = modulo.topicos && modulo.topicos.length > 0;
            const estaAberto = moduloAberto === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-[2px] overflow-hidden bg-white">
                {temTopicos ? (
                  <button
                    onClick={() => toggleModulo(idx)}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 text-left cursor-pointer transition-colors">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                        {modulo.titulo}
                      </h4>
                      <p className="text-[9px] text-slate-500 font-medium pt-0.5">
                        {modulo.duracao}
                      </p>
                    </div>

                    {estaAberto ? (
                      <ChevronUp
                        size={16}
                        className="text-slate-600 flex-shrink-0"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="text-slate-600 flex-shrink-0"
                      />
                    )}
                  </button>
                ) : (
                  <div className="w-full p-3 bg-slate-50 flex items-center justify-between gap-2 text-left">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                        {modulo.titulo}
                      </h4>
                      <p className="text-[9px] text-slate-500 font-medium pt-0.5">
                        {modulo.duracao}
                      </p>
                    </div>
                  </div>
                )}

                {temTopicos && estaAberto && (

                  <div className="p-3 bg-white border-t border-slate-100 space-y-1.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      Tópicos:
                    </p>
                    <ul className="space-y-1">
                      {modulo.topicos.map((topico, tIdx) => (
                        <li
                          key={tIdx}
                          className="text-[11px] text-slate-700 flex items-start gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-800 flex-shrink-0 mt-1" />
                          <span>{topico}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Seta / Botão Expansor quando há mais de 4 módulos */}
          {curso.modulos.length > 4 && (
            <button
              onClick={() => setMostrarTodosModulos(!mostrarTodosModulos)}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-[2px] flex items-center justify-center gap-1.5 transition-colors border border-slate-200 shadow-2xs cursor-pointer">
              <span>
                {mostrarTodosModulos
                  ? "Ver Menos Módulos"
                  : `Ver Todos os Módulos (${curso.modulos.length})`}
              </span>
              {mostrarTodosModulos ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── SECÇÃO 4: MANUAIS E FICHEIROS PDF DE SALA ── */}
      <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-red-800" />
            <h2 className="font-black text-xs text-slate-900 uppercase tracking-tight">
              Manuais & Ficheiros PDF
            </h2>
          </div>
          <span className="text-[9px] font-extrabold text-red-800 bg-red-50 px-2 py-0.5 rounded-[2px]">
            3 Ficheiros PDF
          </span>
        </div>

        <div className="space-y-2">
          <div className="p-3  flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[2px]  text-gray-500 flex items-center justify-center font-bold flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-xs text-slate-900 truncate">
                  Manual Oficial Cegid Primavera V10
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  PDF • 12.4 MB
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs flex-shrink-0 cursor-pointer">
              <Download size={12} />
              <span>Baixar</span>
            </a>
          </div>

          <div className="p-3  flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[2px] text-gray-500  flex items-center justify-center font-bold flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-xs text-slate-900 truncate">
                  Guia Prático de Faturação SAF-T (AO)
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  PDF • 4.8 MB
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs flex-shrink-0 cursor-pointer">
              <Download size={12} />
              <span>Baixar</span>
            </a>
          </div>

          <div className="p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[2px] text-gray-500 flex items-center justify-center font-bold flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-xs text-slate-900 truncate">
                  Ficha de Exercícios de Sala & Retenções IRT/IVA
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  PDF • 2.1 MB
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase rounded-[2px] flex items-center gap-1 shadow-2xs flex-shrink-0 cursor-pointer">
              <Download size={12} />
              <span>Baixar</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── SECÇÃO 5: LOCALIZAÇÃO E HORÁRIO EM SALA ── */}
      <div className="bg-slate-900 text-white p-4 rounded-[2px] border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <MapPin size={16} className="text-red-400" />
          <h2 className="font-black text-xs text-white uppercase tracking-tight">
            Localização e Horário
          </h2>
        </div>

        <div className="space-y-1 text-xs">
          <p className="font-extrabold text-white flex items-center gap-1.5">
            <BuildingIcon /> {curso.localidade}
          </p>
          <p className="text-slate-300 font-medium flex items-center gap-1.5 text-[11px]">
            <Calendar size={13} className="text-red-400 flex-shrink-0" />
            {curso.horario}
          </p>
        </div>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-red-400 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V9m0 0h5M12 9V5"
      />
    </svg>
  );
}
