export type ResponseActionType<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};
