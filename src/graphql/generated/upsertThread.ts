/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { chat_thread_insert_input, chat_thread_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertThread
// ====================================================

export interface upsertThread_insert_chat_thread_one_user {
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

export interface upsertThread_insert_chat_thread_one_messages {
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

export interface upsertThread_insert_chat_thread_one {
  __typename: "chat_thread";
  customer_id: any | null;
  id: any;
  project_id: any | null;
  updated_at: any;
  /**
   * An object relationship
   */
  user: upsertThread_insert_chat_thread_one_user | null;
  /**
   * An array relationship
   */
  messages: upsertThread_insert_chat_thread_one_messages[];
}

export interface upsertThread {
  /**
   * insert a single row into the table: "chat_thread"
   */
  insert_chat_thread_one: upsertThread_insert_chat_thread_one | null;
}

export interface upsertThreadVariables {
  object: chat_thread_insert_input;
  on_conflict?: chat_thread_on_conflict | null;
}
