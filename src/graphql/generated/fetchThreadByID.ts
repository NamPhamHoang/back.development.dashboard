/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchThreadByID
// ====================================================

export interface fetchThreadByID_chat_thread_by_pk_user {
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

export interface fetchThreadByID_chat_thread_by_pk_messages {
  __typename: "chat_log";
  message_id: any;
  message: any;
  onwer_id: any;
  message_source: any;
  thread_id: any;
  is_readed: boolean | null;
  created_at: any | null;
  id: number;
}

export interface fetchThreadByID_chat_thread_by_pk {
  __typename: "chat_thread";
  customer_id: any | null;
  id: any;
  project_id: any | null;
  updated_at: any;
  /**
   * An object relationship
   */
  user: fetchThreadByID_chat_thread_by_pk_user | null;
  /**
   * An array relationship
   */
  messages: fetchThreadByID_chat_thread_by_pk_messages[];
}

export interface fetchThreadByID {
  /**
   * fetch data from the table: "chat_thread" using primary key columns
   */
  chat_thread_by_pk: fetchThreadByID_chat_thread_by_pk | null;
}

export interface fetchThreadByIDVariables {
  thread_id: any;
}
