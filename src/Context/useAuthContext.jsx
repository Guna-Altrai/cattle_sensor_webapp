import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authKey } from ".";

const AuthContext = createContext({});

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(authKey)
      ? localStorage.getItem(authKey)
      : undefined;
    setUser(savedUser);
    setLoading(false);
  }, []);

  const saveSession = useCallback(
    (user) => {
      localStorage.setItem(authKey, user.id);
      setUser(user);
    },
    [setUser]
  );

  const removeSession = useCallback(() => {
    localStorage.removeItem(authKey);
    setUser(undefined);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        saveSession,
        removeSession,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
