import _, { unset } from "lodash";
import gqlClient from "~@/modules/hasura.module";
import { IFLProject } from "~@/types";
import {
    fetchProjectById as IFetchProjectById,
    fetchProjectByIdVariables
} from "~@/graphql/generated/fetchProjectById";
import { FETCH_PROJECT_BY_ID } from "~@/graphql/query";

export default async (projects: IFLProject[]) => {
    let unSaveProject: IFLProject[] = [];
    await Promise.all(
        projects.map(async project => {
            const isExisted = await isExist(project.id)
            if(!isExisted) {
                unSaveProject.push(project);
            }
            return
        })
    )
    return unSaveProject;
}
const fetchProjectById = async (projectId: number) => {
    const {
        data: {projects}
    } = await gqlClient.query<IFetchProjectById, fetchProjectByIdVariables>({
        query: FETCH_PROJECT_BY_ID,
        variables: {
            projectId
        }
    })
    return projects;
}

const isExist = async (projectId: number) => {
    const projects = await fetchProjectById(projectId);
    return projects.length > 0;
}