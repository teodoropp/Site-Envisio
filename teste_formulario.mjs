import FormData from 'form-data';

const formData = new FormData();
formData.append('nome', 'Teste');
formData.append('sobrenome', 'Formulario');
formData.append('email', 'teodorop990@gmail.com');
formData.append('telefone', '947137676');
formData.append('empresa', '');
formData.append('mensagem', 'Teste enviado simulando o formulario reconstruido');
formData.append('turno', 'Manhã');
formData.append('nivelExperiencia', 'Básico');
formData.append('curso', 'ERP Cegid Primavera: Funcionalidades e Módulos');
formData.append('area', 'ERP & Gestão');

const res = await fetch('https://envisio.co.ao/api/email', {
  method: 'POST',
  body: formData,
  headers: formData.getHeaders()
});
const data = await res.json();
console.log('Status:', res.status);
console.log('Resposta completa:', JSON.stringify(data, null, 2));
