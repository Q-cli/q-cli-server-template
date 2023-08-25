declare namespace User {
  interface Params {
    _id?: string;
    username?: string;
  }

  interface User {
    _id: string;
    username: string;
    password: string;
    createTime: number;
    updateTime: number;
  }
}
