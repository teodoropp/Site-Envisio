/** @format */

import React, { useState } from "react";
import {
  Settings,
  Save,
  Bell,
  CheckCircle2,
  Shield,
  Globe,
  CreditCard,
  Award,
  Building,
  Mail,
  Phone,
  Lock,
  Database,
  FileText,
  Upload,
  Check,
} from "lucide-react";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<
    "empresa" | "bancario" | "certificados" | "notificacoes" | "seguranca"
  >("empresa");

  const [salvo, setSalvo] = useState(false);

  // 1. Identidade da Empresa
  const [empresa, setEmpresa] = useState({
    nomeOficial: "Envisio Training Academy — Prestação de Serviços Lda",
    nif: "5417098234",
    emailOficial: "geral@envisio.co.ao",
    telefoneSuporte: "+244 923 000 000",
    enderecoLuanda: "Edifício Envisio, Via AL14, Talatona, Luanda — Angola",
    website: "https://envisio.co.ao",
    moedaPadrao: "Kz (Kwanza Angolano)",
  });

  // 2. Dados Bancários & Propinas
  const [bancario, setBancario] = useState({
    bancoNome: "Banco Angolano de Investimentos (BAI)",
    ibanPrincipal: "AO06 0040 0000 1234 5678 9012 3",
    titularConta: "Envisio Training Academy Lda",
    entidadeMulticaixa: "00142",
    referenciaPrefix: "923",
    instrucoesPagamento:
      "Por favor anexe o comprovativo em PDF/Imagem com o seu número de BI/NIF no portal ou envie para propinas@envisio.co.ao.",
  });

  // 3. Regras Académicas & Certificados
  const [academicos, setAcademicos] = useState({
    notaMinimaAprovacao: "10 / 20 Valores",
    nomeDiretorAssinatura: "Eng. Paulo Teodoro",
    cargoDiretor: "Diretor Geral de Formação Envisio",
    validadeCertificado: "Vitalicío / Sem Expiração",
    permitirDownloadDireto: true,
  });

  // 4. Notificações & E-mails Automáticos
  const [notificacoes, setNotificacoes] = useState({
    emailInscricao: true,
    emailPagamentoConfirmado: true,
    emailNovoMaterial: true,
    alertaFaltas: true,
    relatorioSemanalDirecao: true,
  });

  // 5. Segurança & Manutenção
  const [seguranca, setSeguranca] = useState({
    autenticacaoDoisFatores: false,
    modoManutencao: false,
    backupDiario: true,
    tempoSessaoMinutos: "60",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3500);
  };

  return (
    <div className="space-y-6 font-['Segoe_UI_Variable_Text','Segoe_UI',sans-serif]">
      {/* Top Banner Executivo */}
      <div className="bg-slate-900 text-white rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[2px]">
              ADMINISTRAÇÃO DO SISTEMA
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-[2px]">
              PARÂMETROS GLOBAIS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">
            Configurações da Plataforma
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Central de controlo institucional, definições bancárias de propinas, modelos de emissão
            de certificados oficiais e parâmetros de segurança da Envisio.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-red-800 hover:bg-red-900 text-white px-5 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto flex-shrink-0">
          <Save size={16} />
          <span>Salvar Todas as Alterações</span>
        </button>
      </div>

      {/* Alerta de Sucesso ao Salvar */}
      {salvo && (
        <div className="p-4 bg-slate-900 text-white rounded-[2px] text-xs font-bold flex items-center gap-3 border-l-4 border-l-red-600 shadow-xs animate-in fade-in duration-150">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>Todas as configurações e parâmetros do sistema foram salvos com sucesso!</span>
        </div>
      )}

      {/* Navegação por Separadores (Tabs) */}
      <div className="bg-white rounded-[2px] border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 text-xs font-bold divide-x divide-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab("empresa")}
            className={`px-4 py-3.5 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === "empresa"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Building size={15} />
            <span>1. Identidade & Empresa</span>
          </button>

          <button
            onClick={() => setActiveTab("bancario")}
            className={`px-4 py-3.5 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === "bancario"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <CreditCard size={15} />
            <span>2. Dados Bancários & Propinas</span>
          </button>

          <button
            onClick={() => setActiveTab("certificados")}
            className={`px-4 py-3.5 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === "certificados"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Award size={15} />
            <span>3. Certificados & Regras</span>
          </button>

          <button
            onClick={() => setActiveTab("notificacoes")}
            className={`px-4 py-3.5 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === "notificacoes"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Bell size={15} />
            <span>4. E-mails & Notificações</span>
          </button>

          <button
            onClick={() => setActiveTab("seguranca")}
            className={`px-4 py-3.5 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === "seguranca"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Shield size={15} />
            <span>5. Segurança & Backups</span>
          </button>
        </div>

        {/* Conteúdo dos Formulários por Tab */}
        <form onSubmit={handleSave} className="p-6 text-xs space-y-6">
          {/* TAB 1: IDENTIDADE & DADOS DA EMPRESA */}
          {activeTab === "empresa" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                  Dados Institucionais da Envisio
                </h3>
                <p className="text-[11px] text-slate-500">
                  Estes dados serão apresentados nos cabeçalhos de recibos, faturas e relatórios oficiais.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Razão Social / Nome Oficial da Instituição *</label>
                <input
                  type="text"
                  value={empresa.nomeOficial}
                  onChange={(e) => setEmpresa({ ...empresa, nomeOficial: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Número de Identificação Fiscal (NIF) *</label>
                  <input
                    type="text"
                    value={empresa.nif}
                    onChange={(e) => setEmpresa({ ...empresa, nif: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">E-mail Institucional Oficial *</label>
                  <input
                    type="email"
                    value={empresa.emailOficial}
                    onChange={(e) => setEmpresa({ ...empresa, emailOficial: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Telefone de Suporte Académico *</label>
                  <input
                    type="text"
                    value={empresa.telefoneSuporte}
                    onChange={(e) => setEmpresa({ ...empresa, telefoneSuporte: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Website Oficial</label>
                  <input
                    type="text"
                    value={empresa.website}
                    onChange={(e) => setEmpresa({ ...empresa, website: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Endereço Físico da Sede em Luanda *</label>
                <input
                  type="text"
                  value={empresa.enderecoLuanda}
                  onChange={(e) => setEmpresa({ ...empresa, enderecoLuanda: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DADOS BANCÁRIOS & PROPINAS */}
          {activeTab === "bancario" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                  Contas Bancárias & Instruções de Pagamento (Angola)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Estes IBANs e dados de Multicaixa Express são apresentados diretamente ao aluno no momento do pagamento da propina.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Instituição Bancária Principal *</label>
                  <input
                    type="text"
                    value={bancario.bancoNome}
                    onChange={(e) => setBancario({ ...bancario, bancoNome: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Nome do Titular da Conta *</label>
                  <input
                    type="text"
                    value={bancario.titularConta}
                    onChange={(e) => setBancario({ ...bancario, titularConta: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Número de IBAN Principal *</label>
                <input
                  type="text"
                  value={bancario.ibanPrincipal}
                  onChange={(e) => setBancario({ ...bancario, ibanPrincipal: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Entidade Multicaixa Express</label>
                  <input
                    type="text"
                    value={bancario.entidadeMulticaixa}
                    onChange={(e) => setBancario({ ...bancario, entidadeMulticaixa: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Prefixo de Referência</label>
                  <input
                    type="text"
                    value={bancario.referenciaPrefix}
                    onChange={(e) => setBancario({ ...bancario, referenciaPrefix: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Instruções Exibidas no Portal de Pagamentos</label>
                <textarea
                  rows={3}
                  value={bancario.instrucoesPagamento}
                  onChange={(e) => setBancario({ ...bancario, instrucoesPagamento: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICADOS & REGRAS ACADÉMICAS */}
          {activeTab === "certificados" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                  Modelos de Certificado & Critérios de Aprovação
                </h3>
                <p className="text-[11px] text-slate-500">
                  Defina as assinaturas oficiais e a pontuação necessária para os estudantes emitirem certificados.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Nota Mínima para Aprovação *</label>
                  <input
                    type="text"
                    value={academicos.notaMinimaAprovacao}
                    onChange={(e) => setAcademicos({ ...academicos, notaMinimaAprovacao: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Validade Padrão dos Certificados</label>
                  <input
                    type="text"
                    value={academicos.validadeCertificado}
                    onChange={(e) => setAcademicos({ ...academicos, validadeCertificado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Nome do Responsável pela Assinatura *</label>
                  <input
                    type="text"
                    value={academicos.nomeDiretorAssinatura}
                    onChange={(e) => setAcademicos({ ...academicos, nomeDiretorAssinatura: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Cargo Institucional do Signatário</label>
                  <input
                    type="text"
                    value={academicos.cargoDiretor}
                    onChange={(e) => setAcademicos({ ...academicos, cargoDiretor: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={academicos.permitirDownloadDireto}
                    onChange={(e) =>
                      setAcademicos({
                        ...academicos,
                        permitirDownloadDireto: e.target.checked,
                      })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <span>Permitir download automático de Certificados assim que o aluno conclui 100% dos módulos</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICAÇÕES & E-MAILS */}
          {activeTab === "notificacoes" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                  Disparo de E-mails Automáticos & Alertas
                </h3>
                <p className="text-[11px] text-slate-500">
                  Ative ou desative os avisos automáticos enviados aos formandos e à equipa da secretaria.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800 p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificacoes.emailInscricao}
                    onChange={(e) =>
                      setNotificacoes({ ...notificacoes, emailInscricao: e.target.checked })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="block">E-mail de Boas-Vindas & Confirmação de Inscrição</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Envia credenciais de acesso ao aluno assim que a matrícula é registada.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800 p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificacoes.emailPagamentoConfirmado}
                    onChange={(e) =>
                      setNotificacoes({
                        ...notificacoes,
                        emailPagamentoConfirmado: e.target.checked,
                      })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="block">Confirmação de Recibo & Pagamento Liquidado</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Envia o recibo oficial em PDF para o e-mail do aluno após a secretaria validar a propina.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800 p-3 bg-slate-50 border border-slate-200/60 rounded-[2px] hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificacoes.relatorioSemanalDirecao}
                    onChange={(e) =>
                      setNotificacoes({
                        ...notificacoes,
                        relatorioSemanalDirecao: e.target.checked,
                      })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="block">Relatório Semanal Sintetizado para a Direção</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Envia o resumo de faturação e matrículas semanalmente para a administração.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 5: SEGURANÇA & BACKUPS */}
          {activeTab === "seguranca" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                  Segurança, Sessões & Cópias de Segurança (Backups)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Parâmetros de proteção de contas administrativas e manutenção da base de dados.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Tempo Limite de Sessão Inativa (Minutos)</label>
                  <input
                    type="text"
                    value={seguranca.tempoSessaoMinutos}
                    onChange={(e) => setSeguranca({ ...seguranca, tempoSessaoMinutos: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800 p-3 bg-slate-50 border border-slate-200/60 rounded-[2px]">
                  <input
                    type="checkbox"
                    checked={seguranca.backupDiario}
                    onChange={(e) =>
                      setSeguranca({ ...seguranca, backupDiario: e.target.checked })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="block">Cópias de Segurança (Backups) Diárias Automáticas</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Guarda cópia encriptada dos dados dos alunos e pagamentos todas as noites às 02:00.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-red-900 p-3 bg-red-50/50 border border-red-200 rounded-[2px]">
                  <input
                    type="checkbox"
                    checked={seguranca.modoManutencao}
                    onChange={(e) =>
                      setSeguranca({ ...seguranca, modoManutencao: e.target.checked })
                    }
                    className="rounded-[2px] text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="block">Ativar Modo de Manutenção na Plataforma</span>
                    <span className="text-[10px] text-red-700 font-normal">
                      Apenas administradores poderão entrar. O portal público exibirá aviso de atualização técnica.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Botão de Gravação de Alterações no Fim do Formulário */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <span className="text-[11px] text-slate-400 font-medium">
              Última atualização efetuada por Administrador Envisio.
            </span>

            <button
              type="submit"
              className="bg-red-800 hover:bg-red-900 text-white px-6 py-2.5 text-xs font-bold rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs">
              <Save size={16} />
              <span>Salvar Alterações do Sistema</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
