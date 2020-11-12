import { FLResponseStatus } from "~@/constant";
export interface IFLResponse<T> {
  result: FLResponseStatus;
  data: T;
}
export type Unpromisify<T> = T extends Promise<infer U> ? U : never;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>> // tslint:disable-next-line:no-shadowed-variable
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};
export type Nullable<T> = T | null;
export interface IFLResponse<T> {
    result: FLResponseStatus;
    data: T;
  }
  