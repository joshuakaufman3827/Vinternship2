"use client";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  mode: "login" | "register";
  openModal: (mode?: "login" | "register") => void;
  closeModal: () => void;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  guestLogin: () => Promise<any>;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const openModal = (newMode: "login" | "register" = "login") => {
    setMode(newMode);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // ⭐ Firebase Auth functions
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const guestLogin = () => {
    return signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        mode,
        openModal,
        closeModal,
        login,
        register,
        guestLogin,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
};

