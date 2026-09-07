/** @format */

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Previne queda do processo caso o banco esteja inacessível ou desconecte
db.on("error", (err) => {
  console.error("⚠️ Erro no Pool do PostgreSQL (não fatal):", err.message);
});
