export interface iResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
}
