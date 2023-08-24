declare namespace User {
  interface Params {
    _id?: string;
    name?: string;
  }

  interface User {
    _id: string;
    name: string;
    password: string;
    createTime: number;
    updateTime: number;
  }
}
