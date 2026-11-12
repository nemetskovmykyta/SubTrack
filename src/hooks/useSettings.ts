import { useCallback, useEffect, useState } from "react";
import { UserSettings } from "../types";
import { apiClient, DEFAULT_SETTINGS } from "../services";

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<UserSettings>("/api/settings");
      setSettings(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load settings";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(async (updates: Partial<UserSettings>): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await apiClient.put<UserSettings>("/api/settings", updates);
      setSettings(updated);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save settings";
      setError(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    settings,
    isLoading,
    isSaving,
    error,
    updateSettings,
    refreshSettings: fetchSettings,
  };
}
