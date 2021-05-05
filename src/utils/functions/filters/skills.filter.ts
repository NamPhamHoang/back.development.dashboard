import _ from "lodash";
import { IFLProject } from "~@/types";
import {
    isUnquality
} from "~@/utils/functions"
export default async (projects: IFLProject[], settings) => {
    const passedProjects = [];
    await Promise.all(
        projects.map(async project => {
            const isPassed = isPassCaredSkill(
                settings.caredSkillsId,
                project.jobs
            );
            if(isPassed) {
                passedProjects.push(project);
            }
            else {
                await isUnquality(project, "skill");
            }
        })
    )
    return passedProjects;
}

const isPassCaredSkill = (
    caredSkillId,
    projectsSkills: string[],
) => {
    const formattedSkilss = projectsSkills.map(skill => Number(skill));
    const matchdIgnoredSkills = _.intersection(caredSkillId, formattedSkilss);
    return matchdIgnoredSkills.length !== 0;
}