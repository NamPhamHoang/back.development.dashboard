/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { outsource_user_insert_input, outsource_user_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertOutsourceUser
// ====================================================

export interface upsertOutsourceUser_insert_outsource_user_one {
  __typename: "outsource_user";
  user_id: any;
  country: any | null;
  timezone: any | null;
  username: any | null;
  public_name: any | null;
  email_verified: any | null;
  payment_verified: any | null;
  identity_verified: any | null;
}

export interface upsertOutsourceUser {
  /**
   * insert a single row into the table: "outsource_user"
   */
  insert_outsource_user_one: upsertOutsourceUser_insert_outsource_user_one | null;
}

export interface upsertOutsourceUserVariables {
  obj: outsource_user_insert_input;
  conflict?: outsource_user_on_conflict | null;
}
