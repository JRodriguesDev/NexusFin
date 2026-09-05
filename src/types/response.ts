export type ResponseAction<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};
