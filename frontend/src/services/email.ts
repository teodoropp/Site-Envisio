import axios from 'axios';



interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}


const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api/email`;
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/api/email`;
  }
  return "https://envisio.co.ao/api/email";
};

const API_URL = getApiUrl();


export async function enviarEmail(formData: any, tipoCliente: string): Promise<EmailResponse> {
  try {
    console.log('🌐 Fazendo requisição para:', API_URL);
    console.log('📦 Dados enviados:', { ...formData, tipoCliente });
    
    const response = await axios.post(API_URL, {
      ...formData,
      tipoCliente
    });
    
    console.log('✅ Resposta recebida:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro na requisição:', error);
    console.error('📄 Detalhes do erro:', error.response?.data);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Erro ao enviar email'
    };
  }
}