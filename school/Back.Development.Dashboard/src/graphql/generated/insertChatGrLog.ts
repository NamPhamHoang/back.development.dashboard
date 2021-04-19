/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Chat_gr_log_insert_input, Chat_gr_log_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertChatGrLog
// ====================================================

export interface insertChatGrLog_insert_Chat_gr_log_one {
  __typename: "Chat_gr_log";
  _data: any;
  user_id: number | null;
  thread_id: any;
  id: number;
}

export interface insertChatGrLog {
  /**
   * insert a single row into the table: "Chat_gr_log"
   */
  insert_Chat_gr_log_one: insertChatGrLog_insert_Chat_gr_log_one | null;
}

export interface insertChatGrLogVariables {
  data: Chat_gr_log_insert_input;
  on_conflict: Chat_gr_log_on_conflict;
}
