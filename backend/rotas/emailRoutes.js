/** @format */

import express from "express";
import {
  enviarEmail,
  uploadMiddleware,
} from "../controllers/emailController.js";

const router = express.Router();

// Rota para envio de email com upload de arquivos (compatibilidade retroativa e semântica)
router.post("/email", uploadMiddleware, enviarEmail);
router.post("/candidaturas", uploadMiddleware, enviarEmail);
router.post("/inscricoes", uploadMiddleware, enviarEmail);

export default router;
