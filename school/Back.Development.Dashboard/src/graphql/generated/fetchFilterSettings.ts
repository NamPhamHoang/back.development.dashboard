/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchFilterSettings
// ====================================================

export interface fetchFilterSettings_ignoredSkills {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchFilterSettings_caredSkills {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchFilterSettings {
  /**
   * fetch data from the table: "jobs"
   */
  ignoredSkills: fetchFilterSettings_ignoredSkills[];
  /**
   * fetch data from the table: "jobs"
   */
  caredSkills: fetchFilterSettings_caredSkills[];
}
