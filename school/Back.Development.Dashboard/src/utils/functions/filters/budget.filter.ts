import { IFLProject } from "~@/types";
import {
    isUnquality
} from "~@/utils/functions"
export default async (projects: IFLProject[], setting) => {
    const passedProjects = [];
    await Promise.all(
        projects.map(async project => {
            const isPassed = await isGoodBudget(
                setting.FILTER_SETING,
                Number(project.maxbudget),
                Number(project.exchangerate)
            )
            if(isPassed) {
                passedProjects.push(project);
            } else {
                await isUnquality(project, "budget");
            }
        })
    )
    return passedProjects;
};

const isGoodBudget = async (
    setting,
    maxbudget: number,
    exchangerate: number
) => {
    const maxReal = Number(maxbudget * exchangerate);
    if(maxReal >= setting.min_budget && maxReal <= setting.max_budget) {
        return true;
    }
    return false;
};