import axios from 'axios';
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.error(
    'A variável NEXT_PUBLIC_API_BASE_URL não está definida. Verifique o arquivo .env.local.',
  );
}
if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    'A variável GOOGLE_API_KEY não está definida. Certifique-se de configurá-la no .env.local.',
  );
}
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(
  'URL base configurada para o backend:',
  process.env.NEXT_PUBLIC_API_BASE_URL,
);
console.log(
  'Chave de API do Google carregada:',
  process.env.GOOGLE_API_KEY ? 'Definida' : 'Não definida',
);

export default apiClient;
