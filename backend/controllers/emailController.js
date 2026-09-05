/** @format */

import multer from "multer";
import path from "path";
import fs from "fs";
import {
  enviarNotificacaoEnvisio,
  enviarConfirmacaoCliente,
} from "../servicos/emailService.js";

// Configuração do multer para upload de arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  fileFilter: (req, file, cb) => {
    // Permite PDF e Imagens (PNG, JPG, JPEG, WEBP)
    const allowedMimeTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas ficheiros PDF ou Imagens (PNG, JPG) são permitidos"), false);
    }
  },
});

export const uploadMiddleware = upload.array("arquivos", 5);

const getBaseBackendDir = () => {
  if (fs.existsSync(path.join(process.cwd(), "controllers"))) {
    return process.cwd();
  }
  return path.join(process.cwd(), "backend");
};

/**
 * Grava ficheiros anexados no disco para arquivo seguro
 */
const salvarFicheirosDisco = (arquivos, candidaturaId) => {
  try {
    const uploadDir = path.join(getBaseBackendDir(), "uploads", "candidaturas");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    return (arquivos || []).map((file) => {
      const sanitizedName = (file.originalname || "documento").replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${candidaturaId}_${Date.now()}_${sanitizedName}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, file.buffer);
      return {
        originalName: file.originalname,
        filename,
        path: filePath,
        size: file.size,
        mimetype: file.mimetype,
      };
    });
  } catch (err) {
    console.error("⚠️ Erro ao salvar ficheiros no disco:", err.message);
    return [];
  }
};

/**
 * Grava a candidatura em JSON local (data/candidaturas.json e data/inscricoes.json)
 */
const salvarCandidaturaLocalmente = (dados, ficheirosSalvos = []) => {
  try {
    const dataDir = path.join(getBaseBackendDir(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const registo = {
      ...dados,
      ficheiros: ficheirosSalvos,
      recebidoEm: new Date().toISOString(),
      status: "recebida",
    };

    // Salva em candidaturas.json
    const candidaturasPath = path.join(dataDir, "candidaturas.json");
    let candidaturas = [];
    if (fs.existsSync(candidaturasPath)) {
      try {
        candidaturas = JSON.parse(fs.readFileSync(candidaturasPath, "utf-8"));
      } catch {
        candidaturas = [];
      }
    }
    candidaturas.unshift(registo);
    fs.writeFileSync(candidaturasPath, JSON.stringify(candidaturas, null, 2), "utf-8");

    // Salva também em inscricoes.json para retrocompatibilidade
    const inscricoesPath = path.join(dataDir, "inscricoes.json");
    let inscricoes = [];
    if (fs.existsSync(inscricoesPath)) {
      try {
        inscricoes = JSON.parse(fs.readFileSync(inscricoesPath, "utf-8"));
      } catch {
        inscricoes = [];
      }
    }
    inscricoes.unshift(registo);
    fs.writeFileSync(inscricoesPath, JSON.stringify(inscricoes, null, 2), "utf-8");

    console.log(`💾 Candidatura [${dados.id}] gravada com sucesso nos ficheiros locais!`);
    return registo;
  } catch (err) {
    console.error("⚠️ Erro ao salvar candidatura localmente:", err.message);
    return dados;
  }
};

/**
 * Endpoint principal: Processa a candidatura, salva os dados,
 * envia notificação à Envisio e envia confirmação ao cliente
 */
export const enviarEmail = async (req, res) => {
  try {
    console.log("📥 Nova candidatura recebida no backend:", req.body);

    const {
      nome = "",
      sobrenome = "",
      email = "",
      telefone = "",
      empresa = "",
      mensagem = "",
      turno = "Não especificado",
      curso = "Formação Geral",
      area = "Academia Envisio",
      nivelExperiencia = "",
    } = req.body;

    if (!email || (!nome && !sobrenome)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Nome e e-mail são campos de preenchimento obrigatório.",
      });
    }

    const candidaturaId = `CAND-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const dadosCandidatura = {
      id: candidaturaId,
      nome: (nome || "").trim(),
      sobrenome: (sobrenome || "").trim(),
      nomeCompleto: `${nome} ${sobrenome}`.trim(),
      email: (email || "").trim(),
      telefone: (telefone || "").trim(),
      empresa: (empresa || "").trim(),
      mensagem: (mensagem || "").trim(),
      turno,
      curso,
      area,
      nivelExperiencia,
      data: new Date().toLocaleString("pt-PT"),
      destinatario: req.body.destinatario || req.body.emailDestino || process.env.EMAIL_TO || "teodorop990@gmail.com",
    };

    const anexos = req.files || [];

    // 1. Grava ficheiros em disco
    const ficheirosSalvos = salvarFicheirosDisco(anexos, candidaturaId);

    // 2. Grava a candidatura em JSON local (garantia de dados 100%)
    salvarCandidaturaLocalmente(dadosCandidatura, ficheirosSalvos);

    // 3. Dispara os e-mails em paralelo usando o serviço próprio
    const [resultadoEnvisio, resultadoCliente] = await Promise.allSettled([
      enviarNotificacaoEnvisio(dadosCandidatura, anexos),
      enviarConfirmacaoCliente(dadosCandidatura),
    ]);

    const notifEnvisioSucesso = resultadoEnvisio.status === "fulfilled";
    const confClienteSucesso = resultadoCliente.status === "fulfilled";

    console.log("📊 Resumo do envio de e-mails:", {
      notificacaoEnvisio: notifEnvisioSucesso ? "Sucesso" : resultadoEnvisio.reason?.message,
      confirmacaoCliente: confClienteSucesso ? "Sucesso" : resultadoCliente.reason?.message,
    });

    return res.status(200).json({
      sucesso: true,
      mensagem:
        "Candidatura submetida com sucesso! Foi enviada uma confirmação para o seu e-mail.",
      candidaturaId,
      emailNotificado: dadosCandidatura.destinatario,
      emailCliente: dadosCandidatura.email,
    });
  } catch (error) {
    console.error("❌ Erro ao processar candidatura:", error);
    return res.status(500).json({
      sucesso: false,
      erro: "Ocorreu um erro interno ao processar a sua candidatura. Por favor, tente novamente.",
    });
  }
};

export default {
  enviarEmail,
  uploadMiddleware,
};