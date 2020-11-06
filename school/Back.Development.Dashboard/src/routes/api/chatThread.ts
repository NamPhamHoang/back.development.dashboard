import { Request, Response } from "express";
import axios from "axios";
// import { INSERT_THREAD } from "~@/graphql/mutation";
import { FETCH_THREAD_BY_ID } from "~@/graphql/query";
import hsrClient from "~@/modules/hasura.module";
import {
    fetchThreadByID,
    fetchThreadByIDVariables
} from "~@/graphql/generated/fetchThreadByID";

export default async (req: Request, res: Response) => {  
    const threadId = req.params.id;
    const {
        data: { chat_thread_by_pk } 
    } = await hsrClient.query<fetchThreadByID, fetchThreadByIDVariables>({
        query: FETCH_THREAD_BY_ID,
        variables: {
            thread_id: threadId
        }
    });
    if(chat_thread_by_pk) {
        return res.json({
            isError: false,
            message: chat_thread_by_pk
        });
    } else {
        const { data } = await axios.get(
            `https://www.freelancer.com/api/messages/0.1/threads/${threadId}`,
            {
                params: {
                    last_message: true,
                    context_details: true,
                    thread_attachments: true
                },
                headers: {
                    'freelancer-oauth-v1': process.env.FREELANCE_TOKEN
                }
            },
        )
        if(data.status === "success") {
            const threads = data.result.threads;
            if(threads.length > 0) {
                const thread = threads[0];
                
            }
        }
    }
}