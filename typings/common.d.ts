declare namespace Common {
  interface TokenVO {
    _id?: string;
    token: string;
  }

  interface PageParams {
    current?: number;
    pageSize?: number;
  }
}