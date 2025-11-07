export type BaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type BaseResponsePagination<T> = BaseResponse<T> & {
  page: number;
  size: number;
  totalElement: number;
  totalPage: number;
};

export type Combobox = { id: number; name: string };
