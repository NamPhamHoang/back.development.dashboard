import _ from "lodash";
import http from "~@/modules/http.module";
import errorHandling from "~@/modules/error.module";

import logger from "~@/modules/log.module";
import { IFLProject, DeepPartial, ILocalProject, ILocalProjectAddFields, IFLResponse } from "~@/types";
import { FLResponseStatus } from "~@/constant";
// const defaultSerializeOps
// const serializeProject = (
//     project: IFLProject,
//     opt: DeepPartial<ILocalProjectAddFields> = defaultSerializeOps
// ): ILocalProject => {
//     const jobObj = _.zipObject(project.jobs, project.jobString.split(","));
// }
errorHandling.listen();

// const serializeProjects = (projects: IFLProject[]) => {
//     return projects.map(project => serializeProjects(project))
// }

export const SCRIPT_CONTENT = async () => {
    logger.info("Script: %s is starting", "fetch project");
    const { data } = await http.axios.get<IFLResponse<IFLProject[]>>("https://www.freelancer.com/ajax/notify/live-feed/pre-populated.php")
    if(data.result === FLResponseStatus.SUCCESS) {
        const rawProjects = data.data;
        
    } else {

    }
    return [];
}

(async () => {
    setTimeout(async () => {
        await SCRIPT_CONTENT();
    }, 1000)
}) ();