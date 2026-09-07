/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Previne quedas inesperadas do processo em produção
process.on("uncaughtException", (err) => {
  console.error("⚠️ [Process] Uncaught Exception capturada:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ [Process] Unhandled Rejection capturada:", reason);
});

// Necessário para usar __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente (.env)
dotenv.config();

const app = express();

// 🧩 Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Importação direta das rotas (sem top-level await para compatibilidade com LiteSpeed/Hostinger lsnode.js)
import cursosRouter from "./rotas/cursos.js";
import usuariosRouter from "./rotas/usuarios.js";
import loginRouter from "./rotas/login.js";
import inscricoesRouter from "./rotas/inscricoes.js";
import instrutorRouter from "./rotas/instrutor.js";
import avaliacoesRouter from "./rotas/avaliacoes.js";
import favoritosRouter from "./rotas/favoritos.js";
import adminRouter from "./rotas/admin.js";
import certificadosRouter from "./rotas/certificados.js";
import uploadRouter from "./rotas/upload.js";
import recuperarSenhaRouter from "./rotas/recuperarSenha.js";
import perfilAlunoRouter from "./rotas/perfilAluno.js";
import pagamentosRouter from "./rotas/pagamentos.js";
import webhookRouter from "./rotas/webhook.js";
import modulosRouter from "./rotas/modulos.js";
import licoesRouter from "./rotas/licoes.js";
import emailRouter from "./rotas/emailRoutes.js";

// 🔄 Registro das rotas
app.use("/cursos", cursosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/login", loginRouter);
app.use("/inscricoes", inscricoesRouter);
app.use("/instrutor", instrutorRouter);
app.use("/avaliacoes", avaliacoesRouter);
app.use("/favoritos", favoritosRouter);
app.use("/admin", adminRouter);
app.use("/certificados", certificadosRouter);
app.use("/upload", uploadRouter);
app.use("/recuperar-senha", recuperarSenhaRouter);
app.use("/perfil-aluno", perfilAlunoRouter);
app.use("/pagamentos", pagamentosRouter);
app.use("/webhook", webhookRouter);
app.use("/modulos", modulosRouter);
app.use("/licoes", licoesRouter);
app.use("/api", emailRouter);

console.log("✅ Todas as rotas registradas com sucesso");

// 🖼️ Servir uploads (imagens, certificados, etc.)
app.use("/uploads", express.static(join(__dirname, "uploads")));

// 🧱 Servir o build do React (frontend)
app.use(express.static(join(__dirname, "public")));

// 🛠️ Rota de teste da API e Saúde
app.get("/api", (req, res) => {
  res.send("🚀 API da Envisio está no ar!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ⚛️ Rota fallback → React Router cuida das rotas do frontend
// Rota fallback: envia index.html para qualquer rota React
app.use((req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send("🚀 Envisio Backend API Online. (public/index.html não encontrado)");
  }
});

// 🚀 Inicialização do servidor: Escuta em 0.0.0.0 (obrigatório para Docker/Hostinger)
const primaryPort = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

const primaryServer = app.listen(primaryPort, HOST, () => {
  console.log(`🟢 Servidor principal rodando em http://${HOST}:${primaryPort}`);
});

primaryServer.on("error", (err) => {
  console.error(`⚠️ Erro ao iniciar na porta ${primaryPort}:`, err.message);
});

// Escuta também em portas alternativas comuns (3000, 3001, 8080) caso o proxy da Hostinger
// esteja configurado para encaminhar requisições em outra porta
const candidatePorts = [3000, 3001, 8080].filter((p) => p !== primaryPort);
candidatePorts.forEach((altPort) => {
  try {
    const altServer = http.createServer(app);
    altServer.listen(altPort, HOST, () => {
      console.log(`🟢 Servidor espelho (fallback) ativo em http://${HOST}:${altPort}`);
    });
    altServer.on("error", (err) => {
      // Ignora silenciosamente se a porta já estiver em uso localmente (ex.: React na 3000)
      if (err.code !== "EADDRINUSE") {
        console.warn(`⚠️ Aviso na porta alternativa ${altPort}:`, err.message);
      }
    });
  } catch (e) {
    // Ignora erros em portas espelho
  }
});

export default app;
