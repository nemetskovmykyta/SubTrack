import { useCallback, useEffect, useState, ReactNode } from "react";
import { AuthResponse, LoginCredentials, RegisterCredentials, UserProfile } from "../types";
import { apiClient, DEFAULT_USER } from "../services";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const existingToken = apiClient.getToken();
    return existingToken ? DEFAULT_USER : null;
  });
  const [token, setToken] = useState<string | null>(() => apiClient.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const initAuth = useCallback(async () => {
    const currentToken = apiClient.getToken();
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await apiClient.get<UserProfile>("/api/auth/me");
      setUser(currentUser);
      setToken(currentToken);
    } catch {
      apiClient.setToken(null);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void initAuth();
  }, [initAuth]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AuthResponse>("/api/auth/login", credentials);
      apiClient.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AuthResponse>("/api/auth/register", credentials);
      apiClient.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create account";
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await apiClient.post("/api/auth/logout");
    } catch (err) {
      void err;
    } finally {
      apiClient.setToken(null);
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await apiClient.put<UserProfile>("/api/auth/profile", updates);
      setUser(updated);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
