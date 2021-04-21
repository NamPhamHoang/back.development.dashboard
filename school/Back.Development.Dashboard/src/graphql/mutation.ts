import gql from "graphql-tag";

export const UPSERT_PROJECTS = gql`
  mutation upsertProjects(
    $jobs: [jobs_insert_input!]!
    $jobsUpdateColumns: [jobs_update_column!]!
    $projects: [projects_insert_input!]!
    $projectsUpdateCollumn: [projects_update_column!]!
    $projectsjobs: [projectsjobs_insert_input!]!
  ) {
    insert_jobs(
      objects: $jobs
      on_conflict: { constraint: jobs_pkey, update_columns: $jobsUpdateColumns }
    ) {
      affected_rows
    }
    insert_projects(
      objects: $projects
      on_conflict: {
        constraint: projects_pkey
        update_columns: $projectsUpdateCollumn
      }
    ) {
      affected_rows
    }
    insert_projectsjobs(
      objects: $projectsjobs
      on_conflict: {
        constraint: projectsjobs_pkey
        update_columns: [job_id, project_id]
      }
    ) {
      affected_rows
    }
  }
`;

export const UPSERT_OUTSOURCE_USER = gql`
  mutation upsertOutsourceUser(
    $obj: outsource_user_insert_input!
    $conflict: outsource_user_on_conflict
  ) {
    insert_outsource_user_one(object: $obj, on_conflict: $conflict) {
      user_id
      country: _data(path: "location.country.name")
      timezone: _data(path: "timezone.timezone")
      username: _data(path: "username")
      public_name: _data(path: "public_name")
      email_verified: _data(path: "status.email_verified")
      payment_verified: _data(path: "status.payment_verified")
      identity_verified: _data(path: "status.identity_verified")
    }
  }
`;


export const INSERT_CHAT_LOG = gql`
  mutation insertChatLog(
    $data: [chat_log_insert_input!]!
    $on_conflict: chat_log_on_conflict!
  ) {
    insert_chat_log(objects: $data, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const INSERT_THREAD = gql `
  mutation upsertThread(
    $object: chat_thread_insert_input!
    $on_conflict: chat_thread_on_conflict
  ) {
    insert_chat_thread_one(object: $object, on_conflict: $on_conflict) {
      customer_id
      id
      project_id
      updated_at
      user {
        user_id
        country: _data(path: "location.country.name")
        timezone: _data(path: "timezone.timezone")
        username: _data(path: "username")
        public_name: _data(path: "public_name")
        email_verified: _data(path: "status.email_verified")
        payment_verified: _data(path: "status.payment_verified")
        identity_verified: _data(path: "status.identity_verified")
      }
      messages(order_by: { created_at: desc }, limit: 40) {
        message_id: _data(path: "data.id")
        message: _data(path: "data.message")
        onwer_id: _data(path: "data.from_user")
        message_source: _data(path: "data.message_source")
        thread_id
        is_readed
        created_at
        id
      }
    }
  }
`

export const INSERT_CHAT_ATTACHMENT = gql`
  mutation insertChatAttachMent(
    $object: chat_attachment_insert_input!
    $conflict: chat_attachment_on_conflict
  ) {
    insert_chat_attachment_one(object: $object, on_conflict: $conflict) {
      message_id
    }
  }
`;

export const INSERT_CHAT_GROUP_LOG = gql`
  mutation insertChatGrLog($data: Chat_gr_log_insert_input!, $on_conflict: Chat_gr_log_on_conflict!) {
    insert_Chat_gr_log_one(object: $data, on_conflict: $on_conflict) {
      _data
      user_id
      thread_id
      id
      isAttachment
    }
  }
`;