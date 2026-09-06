/** @format */

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cria o transporte SMTP com o servidor de correio próprio da empresa
 * (ex: cPanel Webmail, servidor SMTP próprio do domínio maisresultados.co.ao / envisio.co.ao)
 */
export const criarTransporter = () => {
  const host = process.env.SMTP_HOST || "mail.maisresultados.co.ao";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_FROM || "geral@maisresultados.co.ao";
  const pass = process.env.SMTP_PASS || "";

  // Se não houver senha definida no .env, retorna null para modo de simulação/gravação local
  if (!pass) {
    console.warn(
      "ℹ️ SMTP_PASS não configurado no backend/.env. O sistema operará em modo de persistência local segura."
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // true para 465 (SSL), false para 587 (TLS/STARTTLS)
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // Facilita compatibilidade com certificados auto-assinados/cPanel
    },
  });
};

/**
 * Envia notificação detalhada da candidatura para a caixa oficial da Envisio
 */
export const enviarNotificacaoEnvisio = async (dados, anexos = []) => {
  const transporter = criarTransporter();
  const destinatarioEmpresa =
    process.env.EMAIL_TO || process.env.SMTP_USER || "geral@maisresultados.co.ao";
  const remetente =
    process.env.EMAIL_FROM || `"Envisio Academia" <${destinatarioEmpresa}>`;

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
    data = new Date().toLocaleString("pt-PT"),
  } = dados;

  const nomeCompleto = `${nome} ${sobrenome}`.trim() || "Candidato";

  const attachments = (anexos || []).map((file) => ({
    filename: file.originalname || file.name || "documento",
    content: file.buffer,
    contentType: file.mimetype,
  }));

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .card { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #0f172a; padding: 24px 30px; color: #ffffff; }
        .header h2 { margin: 0 0 6px 0; font-size: 20px; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #94a3b8; }
        .badge { display: inline-block; background: #dc2626; color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-top: 8px; }
        .body { padding: 30px; }
        .section-title { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
        .field-group { margin-bottom: 14px; }
        .field-label { font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .field-value { font-size: 14px; color: #0f172a; font-weight: 500; margin-top: 2px; }
        .highlight-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626; padding: 14px 18px; border-radius: 4px; margin: 18px 0; }
        .footer { background: #f8fafc; padding: 18px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2>Nova Candidatura / Inscrição Recebida</h2>
          <p>Portal Academia Envisio</p>
          <span class="badge">${curso}</span>
        </div>
        <div class="body">
          <div class="section-title">Dados do Candidato</div>
          <div class="field-group">
            <div class="field-label">Nome Completo</div>
            <div class="field-value">${nomeCompleto}</div>
          </div>
          <div class="field-group">
            <div class="field-label">E-mail de Contacto</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Telefone / WhatsApp</div>
            <div class="field-value"><a href="tel:${telefone}" style="color: #0f172a; text-decoration: none;">${telefone}</a></div>
          </div>
          ${empresa ? `
          <div class="field-group">
            <div class="field-label">Empresa / Organização</div>
            <div class="field-value">${empresa}</div>
          </div>` : ""}

          <div class="section-title" style="margin-top: 24px;">Detalhes da Formação</div>
          <div class="highlight-box">
            <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${curso}</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;"><strong>Turno:</strong> ${turno}</div>
            ${nivelExperiencia ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;"><strong>Nível:</strong> ${nivelExperiencia}</div>` : ""}
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;"><strong>Área:</strong> ${area}</div>
          </div>

          ${mensagem ? `
          <div class="section-title" style="margin-top: 20px;">Observações / Mensagem</div>
          <p style="font-size: 13px; color: #334155; line-height: 1.6; background: #f8fafc; padding: 12px 14px; border-radius: 4px; border: 1px solid #e2e8f0; margin: 6px 0;">
            ${mensagem.replace(/\n/g, "<br>")}
          </p>` : ""}

          <div class="section-title" style="margin-top: 20px;">Documentos Anexados</div>
          <p style="font-size: 13px; color: #475569; margin: 4px 0 0 0;">
            ${attachments.length > 0
              ? `Foram anexados <strong>${attachments.length}</strong> ficheiro(s) (cópia do B.I. / documentos em anexo neste e-mail).`
              : "Nenhum ficheiro anexado."}
          </p>
        </div>
        <div class="footer">
          Recebido em ${data} • Sistema de Candidaturas Envisio
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(`[SIMULAÇÃO SMTP] E-mail de notificação gerado para ${destinatarioEmpresa}:`, {
      candidato: nomeCompleto,
      curso,
      anexos: attachments.length,
    });
    return { simulado: true, destinatario: destinatarioEmpresa };
  }

  const mailOptions = {
    from: remetente,
    to: destinatarioEmpresa,
    replyTo: email,
    subject: `Nova Inscrição: ${nomeCompleto} - ${curso}`,
    html: htmlContent,
    attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ E-mail de notificação enviado para a Envisio:", info.messageId);
  return info;
};

/**
 * Envia e-mail oficial de resposta automática e confirmação de candidatura para o cliente
 */
export const enviarConfirmacaoCliente = async (dados) => {
  const transporter = criarTransporter();
  const destinatarioCliente = dados.email;
  const remetente =
    process.env.EMAIL_FROM || `"Envisio Academia" <${process.env.EMAIL_TO || "geral@maisresultados.co.ao"}>`;

  if (!destinatarioCliente) {
    console.warn("⚠️ Nenhum e-mail de cliente fornecido para envio de confirmação.");
    return null;
  }

  const {
    nome = "",
    sobrenome = "",
    curso = "Formação Profissional",
    turno = "",
  } = dados;

  const primeiroNome = nome.trim() || "Estimado(a) Formando(a)";
  const nomeCompleto = `${nome} ${sobrenome}`.trim();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #0f172a; padding: 28px 32px; text-align: center; color: #ffffff; }
        .logo-text { font-size: 22px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; margin: 0; }
        .logo-sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; }
        .body { padding: 32px; font-size: 14px; line-height: 1.65; color: #334155; }
        .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
        .course-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626; border-radius: 6px; padding: 16px 20px; margin: 22px 0; }
        .course-title { font-size: 15px; font-weight: 700; color: #0f172a; }
        .course-details { font-size: 12.5px; color: #64748b; margin-top: 6px; }
        .steps-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 18px 20px; margin: 22px 0; }
        .steps-title { font-size: 13px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
        .step-item { font-size: 13px; color: #1e3a8a; margin-bottom: 6px; }
        .contact-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px 20px; margin-top: 24px; font-size: 13px; color: #475569; }
        .footer { background: #f8fafc; padding: 20px 32px; font-size: 11.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-text">ENVISIO ACADEMIA</h1>
          <p class="logo-sub">Formação Executiva & Soluções Empresariais</p>
        </div>
        <div class="body">
          <div class="greeting">Olá, ${primeiroNome}!</div>
          <p>
            Agradecemos a sua candidatura à <strong>Envisio Academia</strong>.
            Confirmamos que a sua inscrição para o curso <strong>${curso}</strong> foi recebida com sucesso pela nossa equipa pedagógica.
          </p>

          <div class="course-box">
            <div class="course-title">${curso}</div>
            ${turno ? `<div class="course-details"><strong>Turno Selecionado:</strong> ${turno}</div>` : ""}
            ${nomeCompleto ? `<div class="course-details"><strong>Candidato:</strong> ${nomeCompleto}</div>` : ""}
            <div class="course-details"><strong>Status:</strong> <span style="color: #16a34a; font-weight: 600;">Recebida / Em Validação</span></div>
          </div>

          <div class="steps-box">
            <div class="steps-title">Próximos Passos:</div>
            <div class="step-item">• A nossa equipa pedagógica validará os dados e os documentos anexados.</div>
            <div class="step-item">• Entraremos em contacto consigo num prazo de <strong>24 a 48 horas úteis</strong> (por e-mail ou WhatsApp).</div>
            <div class="step-item">• Receberá todas as orientações sobre a turma, cronograma detalhado e formalização da matrícula.</div>
          </div>

          <p>
            Caso necessite de algum esclarecimento urgente ou queira adicionar informações à sua candidatura, estamos à sua inteira disposição:
          </p>

          <div class="contact-box">
            <div>📞 <strong>WhatsApp / Telefone:</strong> +244 947 137 676</div>
            <div style="margin-top: 4px;">✉️ <strong>E-mail Oficial:</strong> <a href="mailto:geral@maisresultados.co.ao" style="color: #dc2626; text-decoration: none;">geral@maisresultados.co.ao</a></div>
            <div style="margin-top: 4px;">📍 <strong>Localização:</strong> Luanda, Angola</div>
          </div>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Envisio Soluções • Este é um e-mail automático de confirmação de receção da sua candidatura.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(`[SIMULAÇÃO SMTP] E-mail de resposta automática gerado para o cliente ${destinatarioCliente}:`, {
      curso,
      nome: primeiroNome,
    });
    return { simulado: true, destinatario: destinatarioCliente };
  }

  const mailOptions = {
    from: remetente,
    to: destinatarioCliente,
    subject: `Confirmação de Inscrição: ${curso} - Envisio Academia`,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ E-mail de resposta automática enviado ao cliente:", info.messageId);
  return info;
};

const emailService = {
  criarTransporter,
  enviarNotificacaoEnvisio,
  enviarConfirmacaoCliente,
};

export default emailService;
