import { useMemo, useState } from "react";
import { Subscription } from "../types";
import { subscriptionService } from "../services";
import { calculateMonthlyTotal, calculateYearlyTotal } from "../utils";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() =>
    subscriptionService.getAll()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const addSubscription = (sub: Omit<Subscription, "id">) => {
    const created = subscriptionService.add(sub);
    setSubscriptions(subscriptionService.getAll());
    return created;
  };

  const deleteSubscription = (id: string) => {
    subscriptionService.delete(id);
    setSubscriptions(subscriptionService.getAll());
  };

  const resetSubscriptions = () => {
    subscriptionService.reset();
    setSubscriptions(subscriptionService.getAll());
  };

  return {
    subscriptions,
    filteredSubscriptions,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    monthlyTotal,
    yearlyTotal,
    activeCount: subscriptions.filter((s) => s.status === "active").length,
    addSubscription,
    deleteSubscription,
    resetSubscriptions,
  };
}
