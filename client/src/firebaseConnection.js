// Importações modulares do Firebase v9+
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaNOPTDcywulIvJn4-a1KXHDAVU6zieGE",
  authDomain: "cinexv-3414e.firebaseapp.com",
  databaseURL: "https://cinexv-3414e-default-rtdb.firebaseio.com",
  projectId: "cinexv-3414e",
  storageBucket: "cinexv-3414e.appspot.com",
  messagingSenderId: "848324262364",
  appId: "1:848324262364:web:7655eb23807993237c3719"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export { db, auth, googleAuthProvider };
