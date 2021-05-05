import { IFLProject } from "~@/types";

import { PROJECT_CONFIRM_TYPE } from "~@/constant";
import { saveProjects } from "~@/utils/functions";
import { serializeProject } from "~@/boot/services/auto_fetch_projects";

export default (project: IFLProject, error: string) => {
  const serializedProject = serializeProject(project, {
    bidError: error,
    isBid: false,
    confirm: PROJECT_CONFIRM_TYPE.REJECT,
    our_cost: null
  });
  return saveProjects([serializedProject]);
};
