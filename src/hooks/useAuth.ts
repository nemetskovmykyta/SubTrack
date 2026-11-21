import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context";
import { DEFAULT_USER } from "../services";

const fallbackAuth: AuthContextType = {
  user: DEFAULT_USER,
  token: "fallback-token",
  isAuthenticated: true,
  isLoading: false,
  error: null,
  login: async () => true,
  register: async () => true,
  logout: async () => {},
  updateProfile: async () => true,
  clearError: () => {},
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return fallbackAuth;
  }
  return context;
}
