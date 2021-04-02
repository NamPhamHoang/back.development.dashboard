import gqlClient from "~@/modules/hasura.module";
import {
    isExist,
    isSkill,
    isGoodBudget
} from "~@/utils/functions/filters";
import { IFLProject } from "~@/types";
import { FETCH_FILTER_SETTINGS } from "~@/graphql/query"
import {
    fetchFilterSettings,
} from "~@/graphql/generated/fetchFilterSettings"
const defaultFilter = [
    // isExist,
    isSkill,
    isGoodBudget
]

const FILTER_SETING = {
    max_budget:8000,
    min_budget:10,
    exchange_rate: 1,
    description_length: 100
}
export default async (
    projects: IFLProject[],
    filter: any[] = defaultFilter
): Promise<IFLProject[]> => {
    let ignoredSkillsId
    let caredSkillsId
    const {
        data: {ignoredSkills, caredSkills}
    } = await gqlClient.query<fetchFilterSettings>({
        query: FETCH_FILTER_SETTINGS
    });
    if(ignoredSkills.length > 0) {
        ignoredSkillsId = ignoredSkills.map(skill => {
            return skill.id
        })
        
    }
    if(caredSkills.length>0) {
        caredSkillsId = caredSkills[0].user_skills.map(skill => {
            return skill.job.id
        })
    }
    const settings = {
        FILTER_SETING,
        caredSkillsId,
        ignoredSkillsId
    }
    const newProjects = await filterBags(
        projects,
        settings,
        ... filter
    )
    console.log(newProjects)
    return newProjects
}

const filterBags = async (
    projeccts: IFLProject[],
    settings: any,
    ... args
) => {
    const newProjects = await args[0](projeccts, settings);
    const newArgs = args.slice(1);
    if(newArgs.length>0 && newProjects.length>0) {
        return filterBags(newProjects, settings, ...newArgs);
    } else {
        return newProjects;
    }
}