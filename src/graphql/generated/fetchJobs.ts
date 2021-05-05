/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchJobs
// ====================================================

export interface fetchJobs_jobs {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchJobs {
  /**
   * fetch data from the table: "jobs"
   */
  jobs: fetchJobs_jobs[];
}
