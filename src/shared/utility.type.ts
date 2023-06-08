export type UtilityRequest = Record<keyof Request | 'user', any>;
export type UtilityResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
};
