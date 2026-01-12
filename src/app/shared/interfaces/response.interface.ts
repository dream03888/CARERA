export interface IResponseMessage {
  status: IResponseStatus;
  header: string;
  msg: any;
  errorMessage?: unknown;
  total: number;
}

export type IResponseStatus  = 200 | 201 | 404 | 500 | 203;
