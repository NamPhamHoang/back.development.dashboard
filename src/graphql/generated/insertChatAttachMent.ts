/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { chat_attachment_insert_input, chat_attachment_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertChatAttachMent
// ====================================================

export interface insertChatAttachMent_insert_chat_attachment_one {
  __typename: "chat_attachment";
  message_id: any;
}

export interface insertChatAttachMent {
  /**
   * insert a single row into the table: "chat_attachment"
   */
  insert_chat_attachment_one: insertChatAttachMent_insert_chat_attachment_one | null;
}

export interface insertChatAttachMentVariables {
  object: chat_attachment_insert_input;
  conflict?: chat_attachment_on_conflict | null;
}
