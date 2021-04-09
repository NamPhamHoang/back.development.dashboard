import _ from "lodash";
import gqlClient from "~@/modules/hasura.module";
import { ILocalProject } from "~@/types";
import {
    upsertProjects,
    upsertProjectsVariables
} from "~@/graphql/generated/upsertProjects";
import {
    projects_insert_input,
    projects_update_column,
    jobs_update_column
} from "~@/graphql/generated/globalTypes";
import {
    UPSERT_PROJECTS
} from "~@/graphql/mutation";
export default async (projects: ILocalProject[]) => {
    const jobs = _.uniqBy(
        projects
            .map(project => {
                return project.jobs;
            })
            .reduce((prev, current) => {
                return [... prev, ... current]
            })
    , "id");
    const projectsjobs = projects
    .map(project => {
      // @TODO: merge to map object above
      return project.jobs.map(job => {
        return {
          project_id: project.id,
          job_id: job.id
        };
      });
    })
    .reduce((prevs, current) => {
      return [...prevs, ...current];
    }, []);

  const serializedProjects = projects.map(
    (project): projects_insert_input => {
      return {
        actionText: project.actionText,
        appended_descr: project.appended_descr,
        bidError: project.bidError,
        buyer: project.buyer ? Number(project.buyer) : null,
        confirm: project.confirm,
        currency: project.currency,
        currencyCode: project.currencyCode,
        exchangerate: project.exchangerate,
        extended: project.extended,
        featured: project.featured,
        free_bid_until: Number(project.free_bid_until),
        fulltime: project.fulltime,
        hidebids: project.hidebids,
        id: project.id,
        imgUrl: project.imgUrl,
        ipcontract: project.ipcontract,
        isBid: project.isBid,
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
        userId: project.userId,
        userName: project.userName,
        our_cost: project.our_cost,
        our_cover_letter: project.our_cover_letter
      };
    }
  );

  await gqlClient.mutate<upsertProjects, upsertProjectsVariables>({
    mutation: UPSERT_PROJECTS,
    variables: {
      projects: serializedProjects,
      projectsUpdateCollumn: [
        projects_update_column.isBid,
        projects_update_column.bidError,
        projects_update_column.maxbudget,
        projects_update_column.minbudget,
        projects_update_column.title,
        projects_update_column.appended_descr,
        projects_update_column.confirm,
        projects_update_column.jobString,
        projects_update_column.updated_at,
        projects_update_column.our_cover_letter,
        projects_update_column.our_cost
      ],
      jobs,
      jobsUpdateColumns: [jobs_update_column.id, jobs_update_column.title],
      projectsjobs
    }
  });
}