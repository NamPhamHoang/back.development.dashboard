import { PROJECT_CONFIRM_TYPE } from "~@/constant";
export * from "./global";
import { Nullable } from "./global"
export interface ILocalProjectAddFields {
  isBid: boolean;
  bidError: Nullable<string>;
  confirm: PROJECT_CONFIRM_TYPE;
  our_cost: Nullable<number>;
  our_cover_letter: Nullable<string>;
}
export type ILocalProject = Omit<
  IFLProject,
  | "jobs"
  | "exchangerate"
  | "time"
  | "maxbudget"
  | "minbudget"
  | "free_bid_until"
  | "buyer"
  | "userId"
> & {
  exchangerate: number;
  time: number;
  maxbudget: number;
  minbudget: number;
  free_bid_until: number;
  userId: number;
  buyer: number;
  jobs: Array<{
    id: number;
    title: string;
  }>;
} & ILocalProjectAddFields;
export interface IFLProject {
  id: number;
  type: string;
  userName: string;
  actionText: string;
  projIsHourly: Nullable<boolean>;
  jobs: string[];
  jobString: string;
  linkUrl: string;
  title: string;
  text: string;
  userId: string;
  submitDate: string; // yyyy-MM-dd hh:mm:ss
  currency: string; // $
  currencyCode: string;
  exchangerate: string;
  nonpublic: Nullable<boolean>;
  time: string; // timestamp
  maxbudget: string;
  minbudget: string;
  appended_descr: string;
  urgent: Nullable<boolean>;
  featured: Nullable<boolean>;
  fulltime: Nullable<boolean>;
  nda: Nullable<boolean>;
  hidebids: Nullable<boolean>;
  ipcontract: Nullable<any>;
  recruiter: Nullable<boolean>;
  listed: Nullable<boolean>;
  extended: Nullable<any>;
  imgUrl: string;
  free_bid_until: string;
  buyer: Nullable<string>;
}
