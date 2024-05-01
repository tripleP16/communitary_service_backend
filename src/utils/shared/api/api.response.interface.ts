export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  error?: any;
}
