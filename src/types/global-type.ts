export type BaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type BaseResponsePagination<T> = BaseResponse<T> & {
  pagination: BasePagination;
};

export type BasePagination = {
  page: number;
  size: number;
  totalRecords: number;
  totalPage: number;
};

export type Combobox = { id: number; name: string };
