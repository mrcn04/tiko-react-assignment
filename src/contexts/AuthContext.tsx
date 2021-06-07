/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import AuxProps from '../interfaces/aux.interface';
import { auth } from '../firebase';

interface IContext {
  user: firebase.User | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<IContext | null>(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: AuxProps) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: any = { user, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
