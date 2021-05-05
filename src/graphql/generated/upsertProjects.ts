/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { jobs_insert_input, jobs_update_column, projects_insert_input, projects_update_column, projectsjobs_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertProjects
// ====================================================

export interface upsertProjects_insert_jobs {
  __typename: "jobs_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertProjects_insert_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertProjects_insert_projectsjobs {
  __typename: "projectsjobs_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertProjects {
  /**
   * insert data into the table: "jobs"
   */
  insert_jobs: upsertProjects_insert_jobs | null;
  /**
   * insert data into the table: "projects"
   */
  insert_projects: upsertProjects_insert_projects | null;
  /**
   * insert data into the table: "projectsjobs"
   */
  insert_projectsjobs: upsertProjects_insert_projectsjobs | null;
}

export interface upsertProjectsVariables {
  jobs: jobs_insert_input[];
  jobsUpdateColumns: jobs_update_column[];
  projects: projects_insert_input[];
  projectsUpdateCollumn: projects_update_column[];
  projectsjobs: projectsjobs_insert_input[];
}
