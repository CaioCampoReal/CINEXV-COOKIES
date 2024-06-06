// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../firebaseConnection';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  return { user, login, logout };
};

export default useAuth;
