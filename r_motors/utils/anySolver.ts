export type AnyError = unknown;

export const getErrorMessage = (error: AnyError) =>
  error instanceof Error ? error.message : "Something went wrong";
