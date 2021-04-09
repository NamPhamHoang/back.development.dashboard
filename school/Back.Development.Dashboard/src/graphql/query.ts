import gql from 'graphql-tag';

export const FETCH_JOB = gql`
    query fetchJobs {
        jobs {
        id
        title
        }
    }
`;

export const FETCH_THREAD_BY_ID = gql`
  query fetchThreadByID($thread_id: bigint!) {
    chat_thread_by_pk(id: $thread_id) {
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
`;

export const FETCH_OS_USER_BY_ID = gql`
  query fetchOSUserByID($user_id: bigint!) {
    user: outsource_user_by_pk(user_id: $user_id) {
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

export const FETCH_PROJECT_BY_ID = gql`
  query fetchProjectById($projectId: Int!) {
    projects(where: { id: { _eq: $projectId } }) {
      jobs: projectsjobs {
        job {
          id
          title
        }
      }
      actionText
      appended_descr
      bidError
      buyer
      confirm
      currency
      currencyCode
      exchangerate
      extended
      featured
      free_bid_until
      fulltime
      hidebids
      id
      imgUrl
      ipcontract
      isBid
      jobString
      linkUrl
      listed
      maxbudget
      minbudget
      nda
      nonpublic
      our_cost
      projIsHourly
      recruiter
      submitDate
      text
      time
      title
      type
      urgent
      userId
      our_cover_letter
      userName
      created_at
      updated_at
    }
  }
`

export const FETCH_FILTER_SETTINGS = gql`
  query fetchFilterSettings {
    ignoredSkills: jobs(where: {isIgnored: {_eq: true}}) {
      id
      title
    }
    caredSkills: users(where: { status: { _eq: "online" } }) {
      user_skills {
        job {
          title
          id
        }
      }
    }
  }
`