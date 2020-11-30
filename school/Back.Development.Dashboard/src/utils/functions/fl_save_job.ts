import _ from "lodash";
import gqlClient from "~@/modules/hasura.module";
import { ILocalProject } from "~@/types";
export default async (projects: ILocalProject[]) => {
    console.log(projects[0])
}