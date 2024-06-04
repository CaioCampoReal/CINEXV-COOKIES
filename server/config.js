import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // apiKey: "AIzaSyDup6e1LB-m181x9Vcgav6VopWiJIKWNQQ",
  // authDomain: "agro-43b39.firebaseapp.com",
  // projectId: "agro-43b39",
  // storageBucket: "agro-43b39.appspot.com",
  // messagingSenderId: "88195611214",
  // appId: "1:88195611214:web:04f6742160c1d6aaa4611f"

  //CINEXV
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
export default{ firebaseConfig, auth, db };