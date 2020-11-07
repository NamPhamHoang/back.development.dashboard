/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchOSUserByID
// ====================================================

export interface fetchOSUserByID_user {
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

export interface fetchOSUserByID {
  /**
   * fetch data from the table: "outsource_user" using primary key columns
   */
  user: fetchOSUserByID_user | null;
}

export interface fetchOSUserByIDVariables {
  user_id: any;
}
