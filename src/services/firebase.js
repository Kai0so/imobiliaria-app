// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// A configuração do seu app web do Firebase
// As variáveis de ambiente são acessadas via `import.meta.env` no Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que vamos usar na aplicação
// Exportamos a instância do serviço de autenticação
export const auth = getAuth(app);
// Exportamos a instância do Firestore (nosso banco de dados)
export const db = getFirestore(app);

// Documentação:
// Este arquivo centraliza toda a configuração e inicialização do Firebase.
// 1. Importamos as funções necessárias do SDK do Firebase.
// 2. Montamos o objeto de configuração lendo as variáveis de ambiente seguras.
//    O Vite expõe as variáveis do .env no objeto `import.meta.env`.
// 3. Inicializamos a aplicação com `initializeApp`.
// 4. Obtemos e exportamos as instâncias dos serviços de Autenticação (`auth`) e
//    Banco de Dados (`db`) para serem usadas em outras partes do código.