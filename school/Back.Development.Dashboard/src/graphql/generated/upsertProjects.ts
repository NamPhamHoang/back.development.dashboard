/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { projects_insert_input, projects_update_column } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertProjects
// ====================================================

export interface upsertProjects_insert_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertProjects {
  /**
   * insert data into the table: "projects"
   */
  insert_projects: upsertProjects_insert_projects | null;
}

export interface upsertProjectsVariables {
  projects: projects_insert_input[];
  projectsUpdateCollumn: projects_update_column[];
}
