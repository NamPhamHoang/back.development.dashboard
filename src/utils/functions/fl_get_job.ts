
import { FLResponseStatus } from "~@/constant";
import http from "~@/modules/http.module";
import logger from "~@/modules/log.module";
import { IFLProject, IFLResponse } from "~@/types";
export default async (): Promise<IFLProject[]> => {
    logger.info("crawling projects");
    const { data } = await http.axios.get<IFLResponse<IFLProject[]>>("https://www.freelancer.com/ajax/notify/live-feed/pre-populated.php");
    if (data.result === FLResponseStatus.SUCCESS) {
        return data.data;
    } else {
        //need to handle error
    }
    return [];
};
