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

export interface fetchFilterSettings_caredSkills_user_skills_job {
  __typename: "jobs";
  title: string;
  id: number;
}

export interface fetchFilterSettings_caredSkills_user_skills {
  __typename: "user_skill";
  /**
   * An object relationship
   */
  job: fetchFilterSettings_caredSkills_user_skills_job;
}

export interface fetchFilterSettings_caredSkills {
  __typename: "users";
  /**
   * An array relationship
   */
  user_skills: fetchFilterSettings_caredSkills_user_skills[];
}

export interface fetchFilterSettings {
  /**
   * fetch data from the table: "jobs"
   */
  ignoredSkills: fetchFilterSettings_ignoredSkills[];
  /**
   * fetch data from the table: "users"
   */
  caredSkills: fetchFilterSettings_caredSkills[];
}
