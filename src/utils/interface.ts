import Router from "@koa/router";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

export type CTX<T = any> = ParameterizedContext<
  DefaultState,
  DefaultContext & Router.RouterParamContext<DefaultState, DefaultContext>,
  T
>;

export interface Response {
  code: 0 | 1;
  success: boolean;
  message: string;
  [key: string]: any;
}
