import { useCallback, useState } from "react";
import { apiClient, ApiError } from "../services";

export type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export interface UseMutationOptions<TData, TVariables> {
  method?: MutationMethod;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables, endpointOverride?: string) => Promise<TData>;
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options: UseMutationOptions<TData, TVariables> = {}
): UseMutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const mutate = useCallback(
    async (variables: TVariables, endpointOverride?: string): Promise<TData> => {
      setIsLoading(true);
      setError(null);
      const targetEndpoint = endpointOverride || endpoint;
      const method = options.method || "POST";

      try {
        let result: TData;
        if (method === "POST") {
          result = await apiClient.post<TData>(targetEndpoint, variables);
        } else if (method === "PUT") {
          result = await apiClient.put<TData>(targetEndpoint, variables);
        } else if (method === "DELETE") {
          result = await apiClient.delete<TData>(targetEndpoint);
        } else {
          result = await apiClient.request<TData>(targetEndpoint, {
            method: "PATCH",
            body: JSON.stringify(variables),
          });
        }

        setData(result);
        options.onSuccess?.(result, variables);
        return result;
      } catch (err) {
        const parsedError =
          err instanceof ApiError
            ? err
            : err instanceof Error
              ? err
              : new Error("An unknown error occurred");

        setError(parsedError.message);
        options.onError?.(parsedError, variables);
        throw parsedError;
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, options]
  );

  return {
    mutate,
    data,
    isLoading,
    error,
    reset,
  };
}
