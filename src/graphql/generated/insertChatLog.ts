/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { chat_log_insert_input, chat_log_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertChatLog
// ====================================================

export interface insertChatLog_insert_chat_log {
  __typename: "chat_log_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface insertChatLog {
  /**
   * insert data into the table: "chat_log"
   */
  insert_chat_log: insertChatLog_insert_chat_log | null;
}

export interface insertChatLogVariables {
  data: chat_log_insert_input[];
  on_conflict: chat_log_on_conflict;
}
