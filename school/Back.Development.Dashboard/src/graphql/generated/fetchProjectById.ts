/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchProjectById
// ====================================================

export interface fetchProjectById_projects_jobs_job {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchProjectById_projects_jobs {
  __typename: "projectsjobs";
  /**
   * An object relationship
   */
  job: fetchProjectById_projects_jobs_job;
}

export interface fetchProjectById_projects {
  __typename: "projects";
  /**
   * An array relationship
   */
  jobs: fetchProjectById_projects_jobs[];
  id: number;
  title: string;
  text: string;
  userId: number;
  status: string | null;
  our_cost: number | null;
  featured: boolean | null;
  maxbudget: number | null;
  minbudget: number | null;
  linkUrl: string;
  exchangerate: number | null;
  nonpublic: boolean | null;
  ipcontract: boolean | null;
  nda: boolean | null;
  confirm: number | null;
  submitDate: any | null;
  fulltime: boolean | null;
  userName: string;
  created_at: any;
  updated_at: any;
}

export interface fetchProjectById {
  /**
   * fetch data from the table: "projects"
   */
  projects: fetchProjectById_projects[];
}

export interface fetchProjectByIdVariables {
  projectId: number;
}
