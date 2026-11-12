import { useCallback, useEffect, useMemo, useState } from "react";
import { Subscription } from "../types";
import { apiClient } from "../services";
import { calculateMonthlyTotal, calculateYearlyTotal } from "../utils";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<Subscription[]>("/api/subscriptions");
      setSubscriptions(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load subscriptions";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || sub.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [subscriptions, searchQuery, selectedCategory]);

  const monthlyTotal = useMemo(() => calculateMonthlyTotal(subscriptions), [subscriptions]);
  const yearlyTotal = useMemo(() => calculateYearlyTotal(subscriptions), [subscriptions]);
  const activeCount = useMemo(
    () => subscriptions.filter((s) => s.status === "active").length,
    [subscriptions]
  );

  const addSubscription = useCallback(
    async (sub: Omit<Subscription, "id">): Promise<Subscription | null> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const created = await apiClient.post<Subscription>("/api/subscriptions", sub);
        setSubscriptions((prev) => [created, ...prev]);
        return created;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to add subscription";
        setError(msg);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const updateSubscription = useCallback(
    async (id: string, updates: Partial<Subscription>): Promise<Subscription | null> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const updated = await apiClient.put<Subscription>(`/api/subscriptions/${id}`, updates);
        setSubscriptions((prev) => prev.map((item) => (item.id === id ? updated : item)));
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to update subscription";
        setError(msg);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const deleteSubscription = useCallback(async (id: string): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.delete(`/api/subscriptions/${id}`);
      setSubscriptions((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete subscription";
      setError(msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const toggleStatus = useCallback(
    async (id: string): Promise<Subscription | null> => {
      const sub = subscriptions.find((s) => s.id === id);
      if (!sub) return null;
      const nextStatus = sub.status === "active" ? "paused" : "active";
      return updateSubscription(id, { status: nextStatus });
    },
    [subscriptions, updateSubscription]
  );

  return {
    subscriptions,
    filteredSubscriptions,
    isLoading,
    isSubmitting,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    monthlyTotal,
    yearlyTotal,
    activeCount,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    toggleStatus,
    refreshSubscriptions: fetchSubscriptions,
  };
}
