import _ from "lodash";
import moment from "moment";
import hsrClient from "~@/modules/hasura.module";
import SockJS from "sockjs-client";
import { saveMessageLog } from "~@/utils/websocket";
import { syncOSUserIfNotExisted } from "~@/utils/hasura";
import {
    upsertThread,
    upsertThreadVariables
} from "~@/graphql/generated/upsertThread";
import {
    chat_thread_constraint,
    chat_thread_update_column,
    chat_attachment_constraint,
    chat_attachment_update_column
} from "~@/graphql/generated/globalTypes";
import {
    insertChatAttachMent,
    insertChatAttachMentVariables
} from "~@/graphql/generated/insertChatAttachMent";
import { INSERT_CHAT_ATTACHMENT ,INSERT_THREAD } from "~@/graphql/mutation";

const onClose = () => {
    console.log("retry connect");
    listen();
}

const onUserTyping = body => {
    console.log("on user typing message");
  };
  
  const onUserRead = body => {
    console.log("on user read message");
  };

const onUserUploadAttachMent = body => {
    hsrClient.mutate<insertChatAttachMent, insertChatAttachMentVariables>({
        mutation: INSERT_CHAT_ATTACHMENT,
        variables: {
          object: {
            _data: body,
            message_id: body.data.message_id,
            thread_id: body.data.thread_id,
            user_id: body.data.from_user
          },
          conflict: {
            constraint: chat_attachment_constraint.chat_attachment_pkey,
            update_columns: [chat_attachment_update_column._data]
          }
        }
      });
      console.log("on user upload attachment");
}
export const insertThread = async thread => 
    hsrClient.mutate<upsertThread, upsertThreadVariables>({
        mutation: INSERT_THREAD,
        variables: {
            object: {
                id: thread.id,
                project_id: _.get(thread, "thread.context.id", null),
                customer_id: _.get(thread, "thread.owner", null),
                updated_at: moment.utc()
            },
            on_conflict: {
                update_columns: [chat_thread_update_column.updated_at],
                constraint: chat_thread_constraint.chat_thread_pkey
            }
        }
    })
const onCustomerReply = body => {
    console.log("on customer reply");
    Promise.all([
        insertThread(body.data.thread),
        syncOSUserIfNotExisted(_.get(body, "data.thread.thread.owner", null)),
        saveMessageLog(body)
    ])
}


const deliveryResponse = message => {
    console.log("message reached");
    const msg = JSON.parse(message);
    if(msg.channel === "user") {
        const { body:data } = msg;
        console.log(data)
        switch(data.type) {
            case "private": {
                return onCustomerReply(data);
            }
            case "typing": {
                return onUserTyping(data);
            }
            case "user_read": {
                return onUserRead(data);
            }
            case "attach": {
                return onUserUploadAttachMent(data);
              }
        }
    }
}
export const listen = () => {
    const sock = new SockJS("https://notifications.freelancer.com");
   
    sock.onopen = () => {
        console.log("init socket");
        const autheticate = () => {
            sock.send(
                JSON.stringify({
                    channel: "auth",
                    body: {
                        user_id: 50562889,
                        hash2: process.env.HASH_V2,

                    }
                })
            )
        }
        autheticate();
    };
    sock.onmessage = event => {
        const { data: message } = event;
        deliveryResponse(message);
    }
    sock.onclose = error => {
        console.log("Socket closed because", error);
        onClose();
    }
}