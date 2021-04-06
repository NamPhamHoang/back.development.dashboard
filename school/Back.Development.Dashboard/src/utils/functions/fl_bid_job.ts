import { FLResponseStatus, PROJECT_CONFIRM_TYPE } from "~@/constant";
import httpModule from "~@/modules/http.module";
import {ILocalProject} from "~@/types/index";
import getToken from "~@/utils/functions/fl_get_token"
import logger from "../logger";
import querystring from "querystring";
import { saveProjects } from ".";

const FILTER_SETING = {
    max_budget:8000,
    min_budget:30,
    exchange_rate: 5,
    description_length: 100
}

const aiCost =  (project: ILocalProject) => {
    if (project.our_cost) {
      return project.our_cost;
    }
    let minReal = project.minbudget * project.exchangerate;
    let maxReal = project.maxbudget * project.exchangerate;
    let cost = (minReal + maxReal) / 2 + (maxReal / 100) * FILTER_SETING.min_budget;
    if (cost < FILTER_SETING.min_budget) {
      cost = FILTER_SETING.min_budget;
    }
    cost = cost / project.exchangerate;
    return Math.round(cost);
  };

export default async (project: ILocalProject) => {
    const cost = aiCost(project);
    const BID_DATA = {
        id: project.id,
        sum: cost,
        period: 3,
        milestone_percentage: 100,
        csrf_token: await getToken(project.linkUrl),
        descr: "Hello sir - I am confident about this project, I can start right now.           Hoping that you will review my cover letter and feedback, I am looking forward to hearing from you.Kind Regards"
    }
    return requestToBid(project, BID_DATA);
}

const requestToBid = async (project: ILocalProject, bidData) => {
    logger.info(
        "going to bid project %s with data %s",
        project.id,
        JSON.stringify(bidData)
    )

    const { data } = await httpModule.axios.post<{
        status: FLResponseStatus;
        bid: any;
    }> (
        "https://www.freelancer.com/ajax/sellers/onplacebid.php", querystring.stringify(bidData), {
        headers: {
            "x-xsrf-token": bidData.csrf_token
        }
    })

    const { status } = data;
    if(status === FLResponseStatus.SUCCESS) {
        project.isBid = true;
        project.our_cost = bidData.sum;
        project.our_cover_letter = bidData.descr
        logger.info(`bid project: ${project.id} was completed`);
    } else {
        project.isBid = false;
        project.bidError = "error_when_request_to_bid";
        project.confirm = PROJECT_CONFIRM_TYPE.SKIPPED;
        logger.info(`bid project: ${project.id} was unsuccessful: `);   
    }
    await saveProjects([project]);
};