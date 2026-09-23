import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function run() {
  const form = new FormData();
  form.append('nome', 'Teste Axios Correto');
  form.append('email', 'teodorop990@gmail.com');
  form.append('curso', 'Axios');
  
  console.time('Tempo Axios');
  try {
    const res = await axios.post('https://envisio.co.ao/api/email', form);
    console.timeEnd('Tempo Axios');
    console.log(res.status, res.data);
  } catch (err) {
    console.timeEnd('Tempo Axios');
    console.error(err.response?.status, err.response?.data || err.message);
  }
}
run();
