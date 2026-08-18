/** @format */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  User,
  Briefcase,
  FileText,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Upload,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface FormDataState {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  empresa: string;
  mensagem: string;
  turno: string;
  nivelExperiencia: string;
}

interface FormularioInscricaoProps {
  isOpen: boolean;
  onClose: () => void;
  cursoNome: string;
  cursoArea?: string;
  onSuccess?: () => void;
}

const STEPS = [
  { id: 1, title: "Dados Pessoais", description: "Nome e Contato", icon: User },
  {
    id: 2,
    title: "Perfil & Turno",
    description: "Experiência e Horário",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Finalização",
    description: "Anexos e Mensagem",
    icon: FileText,
  },
];

const FormularioInscricao: React.FC<FormularioInscricaoProps> = ({
  isOpen,
  onClose,
  cursoNome,
  cursoArea = "Academia Envisio",
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormDataState>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    turno: "",
    nivelExperiencia: "",
  });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivos(e.target.files);
      setFileNames(Array.from(e.target.files).map((file) => file.name));
    }
  };

  const validateStep = (step: number) => {
    setError("");
    if (step === 1) {
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setError("Por favor, introduza um e-mail válido.");
        return false;
      }
      if (!formData.telefone.trim()) {
        setError("Por favor, introduza o seu número de telefone / WhatsApp.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.nivelExperiencia) {
        setError("Por favor, selecione o seu nível de experiência.");
        return false;
      }
      if (!formData.turno) {
        setError("Por favor, escolha um dos turnos disponíveis.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateStep(currentStep)) {
      setError("");
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentStep !== STEPS.length) {
      return;
    }
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "nome",
        formData.nome || formData.email.split("@")[0],
      );
      formDataToSend.append("sobrenome", formData.sobrenome || "");
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telefone", formData.telefone);
      formDataToSend.append("empresa", formData.empresa);
      formDataToSend.append("mensagem", formData.mensagem);
      formDataToSend.append("turno", formData.turno);
      formDataToSend.append("nivelExperiencia", formData.nivelExperiencia);
      formDataToSend.append("curso", cursoNome);
      formDataToSend.append("area", cursoArea);

      if (arquivos) {
        Array.from(arquivos).forEach((file) => {
          formDataToSend.append("arquivos", file);
        });
      }

      // Tentativa de envio para a API em background
      try {
        const targetUrl = process.env.REACT_APP_API_URL
          ? `${process.env.REACT_APP_API_URL}/api/email`
          : "https://api.maisresultados.co.ao/api/email";

        await axios.post(targetUrl, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (apiErr) {
        console.warn(
          "API de email não disponível, prosseguindo com WhatsApp:",
          apiErr,
        );
      }

      // Preparar mensagem estruturada para o WhatsApp
      const whatsappNumber = "244947137676";
      const nomeCompleto =
        `${formData.nome} ${formData.sobrenome}`.trim() ||
        formData.email.split("@")[0];
      const mensagemWhatsApp = `*Nova Inscrição - Academia Envisio* 🎓

📌 *Curso:* ${cursoNome}
👤 *Candidato:* ${nomeCompleto}
📧 *E-mail:* ${formData.email}
📱 *Telefone / WhatsApp:* ${formData.telefone}
🏢 *Empresa:* ${formData.empresa.trim() || "Particular"}
💼 *Nível de Experiência:* ${formData.nivelExperiencia || "Não especificado"}
⏰ *Turno Preferencial:* ${formData.turno || "A combinar"}
${formData.mensagem.trim() ? `💬 *Mensagem/Obs:* ${formData.mensagem.trim()}` : ""}

Olá, acabei de preencher a minha inscrição no site e aguardo a confirmação da vaga!`;

      // Abrir WhatsApp diretamente
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagemWhatsApp)}`;
      window.open(whatsappUrl, "_blank");

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setCurrentStep(1);
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
          turno: "",
          nivelExperiencia: "",
        });
        setArquivos(null);
        setFileNames([]);

        if (onSuccess) {
          onSuccess();
        }
      }, 2500);
    } catch (err) {
      console.error("Erro ao enviar inscrição:", err);
      setError(
        "Ocorreu um erro ao processar os dados. Por favor, tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setError("");
      setSuccess(false);
      setCurrentStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.35 }}
          className="w-full max-w-2xl bg-white rounded-none shadow-2xl border-0 flex flex-col overflow-hidden relative"
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            e.stopPropagation()
          }>
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-normal uppercase tracking-wider mb-0.5">
                <ShieldCheck size={14} />
                <span>Inscrição</span>
              </div>
              <h3 className="text-lg sm:text-xl font-normal text-white leading-tight">
                {cursoNome}
              </h3>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-slate-400 hover:text-white p-2 rounded-none hover:bg-slate-800 transition-colors border border-slate-700/50"
              aria-label="Fechar">
              <X size={18} />
            </button>
          </div>

          {/* Stepper Header */}
          <div className="bg-slate-50 px-6 sm:px-8 py-4 border-b border-slate-200">
            <div className="grid grid-cols-3 gap-2 relative">
              {STEPS.map((step) => {
                const isCurrent = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center relative z-10">
                    <div className="mb-1 flex items-center justify-center">
                      {isCompleted ? (
                        <Check size={20} className="text-emerald-600" />
                      ) : (
                        <IconComponent
                          size={20}
                          className={
                            isCurrent ? "text-slate-900" : "text-slate-400"
                          }
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-normal transition-colors ${
                        isCurrent || isCompleted
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto shadow-inner">
                  <Check size={36} />
                </div>
                <h4 className="text-2xl font-normal text-slate-900">
                  Inscrição Enviada!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                  A sua vaga foi reservada com sucesso. A nossa equipa entrará
                  em contacto muito em breve para dar segmento à sua matrícula.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep < STEPS.length) {
                    handleNext(e);
                  } else {
                    handleFinalSubmit(e);
                  }
                }}>
                <AnimatePresence mode="wait">
                  {/* ETAPA 1: DADOS PESSOAIS */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <div className="border-b border-slate-100 pb-2 mb-4">
                        <h4 className="text-sm font-normal text-slate-800 uppercase tracking-wider">
                          Passo 1: Identificação Pessoal
                        </h4>
                        <p className="text-xs text-slate-500 font-normal">
                          Preencha os seus dados de contacto para o registo na
                          ficha de inscrição.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1">
                            E-mail *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-sm font-normal focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition-all"
                            placeholder="seu.email@exemplo.com"
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1">
                            Telefone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.telefone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                telefone: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-sm font-normal focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition-all"
                            placeholder="+244 9XX XXX XXX"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ETAPA 2: PERFIL & TURNO */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <div className="border-b border-slate-100 pb-2 mb-4">
                        <h4 className="text-sm font-normal text-slate-800 uppercase tracking-wider">
                          Passo 2: Perfil Profissional e Preferência de Horário
                        </h4>
                        <p className="text-xs text-slate-500 font-normal">
                          Selecione o turno em que deseja frequentar a formação.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1">
                            Nível de Experiência *
                          </label>
                          <select
                            required
                            value={formData.nivelExperiencia}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nivelExperiencia: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-sm font-normal focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition-all"
                            disabled={loading}>
                            <option value="">Selecione o seu nível</option>
                            <option value="Iniciante">Iniciante</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1">
                            Empresa (Opcional)
                          </label>
                          <input
                            type="text"
                            value={formData.empresa}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                empresa: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-sm font-normal focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition-all"
                            placeholder="Nome da sua instituição"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-normal text-slate-800 uppercase tracking-wider mb-2">
                          Selecione o Turno Desejado *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Turno A */}
                          <div
                            onClick={() =>
                              !loading &&
                              setFormData({ ...formData, turno: "Turno A" })
                            }
                            className={`p-3.5 rounded-none border cursor-pointer transition-all ${
                              formData.turno === "Turno A"
                                ? "border-slate-900 bg-slate-100 ring-2 ring-slate-900/20 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-normal text-slate-900">
                                Turno A (Manhã)
                              </span>
                              <input
                                type="radio"
                                name="turno"
                                checked={formData.turno === "Turno A"}
                                onChange={() => {}}
                                className="text-slate-900 focus:ring-slate-900"
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal">
                              Segunda a Sexta — 8h às 17h
                            </p>
                          </div>

                          {/* Turno B */}
                          <div
                            onClick={() =>
                              !loading &&
                              setFormData({ ...formData, turno: "Turno B" })
                            }
                            className={`p-3.5 rounded-none border cursor-pointer transition-all ${
                              formData.turno === "Turno B"
                                ? "border-slate-900 bg-slate-100 ring-2 ring-slate-900/20 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-normal text-slate-900">
                                Turno B (Pós-Laboral)
                              </span>
                              <input
                                type="radio"
                                name="turno"
                                checked={formData.turno === "Turno B"}
                                onChange={() => {}}
                                className="text-slate-900 focus:ring-slate-900"
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal">
                              Terça/Quarta (19h-21h Online) + Domingo (9h-17h)
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ETAPA 3: FINALIZAÇÃO & DOCUMENTOS */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <div className="border-b border-slate-100 pb-2 mb-4">
                        <h4 className="text-sm font-normal text-slate-800 uppercase tracking-wider">
                          Passo 3: Documentação e Observações
                        </h4>
                        <p className="text-xs text-slate-500 font-normal">
                          Bilhete de Identidade.
                        </p>
                      </div>

                      {/* File Upload Box */}
                      <div>
                        <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1.5">
                          Anexar Documentos (PDF / Imagem)
                        </label>
                        <label
                          htmlFor="file-upload-step"
                          className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-none p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-all block cursor-pointer">
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <span className="text-xs font-semibold text-slate-900 hover:text-black underline block">
                            Clique aqui para carregar ficheiros (PDF / Imagem)
                          </span>
                          <input
                            id="file-upload-step"
                            type="file"
                            className="sr-only"
                            multiple
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                          <p className="text-[10px] text-slate-500 mt-1 font-normal">
                            PDF, PNG ou JPG até 10MB
                          </p>
                        </label>
                        {fileNames.length > 0 && (
                          <div className="mt-2 text-xs text-slate-600 bg-slate-100 p-2.5 rounded-none border border-slate-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-800 block">
                                Ficheiros selecionados ({fileNames.length}):
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFileNames([]);
                                  setArquivos(null);
                                }}
                                className="text-[11px] text-red-600 hover:underline">
                                Remover
                              </button>
                            </div>
                            <ul className="list-disc pl-4 space-y-0.5 text-[11px] font-normal text-slate-700">
                              {fileNames.map((name, index) => (
                                <li key={index}>{name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Mensagem Opcional */}
                      <div>
                        <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-1">
                          Observações
                        </label>
                        <textarea
                          value={formData.mensagem}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mensagem: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-xs font-normal focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition-all"
                          placeholder="Tem alguma dúvida ou pedido especial sobre o curso?"
                          disabled={loading}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-none flex items-center gap-2 text-red-700 text-xs font-normal">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Navigation Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                      className="btn-academia-secondary px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                      <ChevronLeft size={16} />
                      <span>Voltar</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-red-600 hover:bg-red-700 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 ml-auto cursor-pointer shadow-xs rounded-none">
                      <span>Próximo Passo</span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 ml-auto disabled:opacity-50 cursor-pointer shadow-xs rounded-none">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Enviando...</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span>Confirmar Inscrição</span>
                          <Check size={16} />
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormularioInscricao;
