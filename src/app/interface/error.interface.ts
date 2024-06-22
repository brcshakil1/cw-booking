export type TErrorMessages = { path: string | number; message: string }[];

export interface TGenericResponse {
  statusCode: number;
  message: string;
  errorMessages: TErrorMessages;
}
