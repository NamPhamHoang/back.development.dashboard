import _ from "lodash";
import http from "~@/modules/http.module";
import errorHandling from "~@/modules/error.module";
import logger from "~@/modules/log.module";
import {
    saveProjects,
    fetchProjects,
    filterProjects
} from "~@/utils/functions";
import { IFLProject, DeepPartial, ILocalProject, ILocalProjectAddFields, IFLResponse } from "~@/types";
import { FLResponseStatus, PROJECT_CONFIRM_TYPE } from "~@/constant";
const defaultSerializeOps: ILocalProjectAddFields = {
    isBid: false,
    bidError: null,
    confirm: PROJECT_CONFIRM_TYPE.UNCOFMRIM,
    our_cost: null,
    our_cover_letter: null
}
export const serializeProject = (
    project: IFLProject,
    opts: DeepPartial<ILocalProjectAddFields> = defaultSerializeOps
): ILocalProject => {
    const jobObj = _.zipObject(project.jobs, project.jobString.split(","));
    const jobs = Object.entries(jobObj).map(entry => ({
        id: Number(entry[0]),
        title: entry[1].trim()
    }));
    return {
        jobs,
        actionText: project.actionText,
        appended_descr: project.appended_descr,
        buyer: project.buyer ? Number(project.buyer) : null,
        currency: project.currency,
        currencyCode: project.currencyCode,
        exchangerate: Number(project.exchangerate),
        extended: project.extended,
        featured: project.featured,
        free_bid_until: Number(project.free_bid_until),
        fulltime: project.fulltime,
        hidebids: project.hidebids,
        id: project.id,
        imgUrl: project.imgUrl,
        ipcontract: project.ipcontract,
        jobString: project.jobString,
        linkUrl: project.linkUrl,
        listed: project.listed,
        maxbudget: Number(project.maxbudget),
        minbudget: Number(project.minbudget),
        nda: project.nda,
        nonpublic: project.nonpublic,
        projIsHourly: project.projIsHourly,
        recruiter: project.recruiter,
        submitDate: project.submitDate,
        text: project.text,
        time: Number(project.time),
        title: project.title,
        type: project.type,
        urgent: project.urgent,
        userId: Number(project.userId),
        userName: project.userName,
        ...{ ...defaultSerializeOps, ...opts }
    }
}
errorHandling.listen();

const serializeProjects = (projects: IFLProject[]) => {
    return projects.map(project => serializeProject(project))
}

export const SCRIPT_CONTENT = async () => {
    logger.info("Script: %s is starting", "fetch project");
    const rawProjects = await fetchProjects();
    const projects = serializeProjects(await filterProjects(rawProjects));
    await saveProjects(projects);
    
}

(async () => {
    setTimeout(async () => {
        await SCRIPT_CONTENT();
    }, 1000)
}) ();