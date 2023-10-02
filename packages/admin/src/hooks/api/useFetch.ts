import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { ERROR_MESSAGE } from "../../constants";

export function useFetch<
  TQueryKey extends [string, (Record<string, unknown> | string)?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1]) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<unknown, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const { openMessageModalWithMessage } = useMessageModalState();

  return useQuery({
    queryKey,
    queryFn: async () => fetcher(queryKey[1]),
    ...options,
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 500) {
          openMessageModalWithMessage(ERROR_MESSAGE.serverError);
          return;
        }
        if (error.status === 404) {
          return undefined;
        }
      }
    },
  });
}
