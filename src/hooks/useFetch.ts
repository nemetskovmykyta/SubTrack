import { useCallback, useEffect, useState } from "react";
import { apiClient, ApiError } from "../services";

export interface UseFetchOptions {
  immediate?: boolean;
}

export interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  endpoint: string,
  options: UseFetchOptions = { immediate: true }
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options.immediate));
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await apiClient.get<T>(endpoint);
      setData(responseData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (options.immediate) {
      void execute();
    }
  }, [execute, options.immediate]);

  return {
    data,
    isLoading,
    error,
    refetch: execute,
  };
}
