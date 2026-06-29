import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";

export const useApiMutation = <
  TData = any,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  return useMutation({
    mutationFn,
    ...options,
  });
};
