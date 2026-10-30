'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AuthModal from '../components/AuthModal';

export type AuthMode = 'login' | 'register';

interface AuthModalContextValue {
  isOpen: boolean;
  mode: AuthMode;
  openModal: (mode?: AuthMode) => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  const openModal = useCallback((nextMode: AuthMode = 'login') => {
    setMode(nextMode);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, mode, openModal, closeModal }),
    [isOpen, mode, openModal, closeModal]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      {/* One modal for the whole app. Mounted only while open, so fields and errors reset each time. */}
      {isOpen && <AuthModal isOpen onClose={closeModal} initialMode={mode} />}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used inside <AuthModalProvider>');
  }
  return context;
}

