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