import { enviarNotificacaoEnvisio, enviarConfirmacaoCliente } from './servicos/emailService.js';
import dotenv from 'dotenv';
dotenv.config();

async function testEmails() {
  console.log('Testing SMTP connection for envisio.co.ao...');
  try {
    const dadosFormulario = {
      nome: 'Teste Sistema',
      sobrenome: 'Varredura',
      email: 'teodorop990@gmail.com',
      telefone: '999999999',
      empresa: 'Teste',
      mensagem: 'Esta é uma mensagem de teste para verificar o envio de emails.',
      turno: 'Manhã',
      curso: 'Teste',
      area: 'Teste',
      nivelExperiencia: 'Teste',
      candidaturaId: 'CAND-TESTE-123'
    };

    console.log('2. Enviando email de confirmação para o cliente (teodorop990@gmail.com)...');
    const resultCliente = await enviarConfirmacaoCliente(dadosFormulario);
    console.log('Resultado Confirmação Cliente:', resultCliente);

    console.log('Testes concluídos com sucesso.');
  } catch (err) {
    console.error('Erro durante o teste de email:', err);
  }
}

testEmails();
