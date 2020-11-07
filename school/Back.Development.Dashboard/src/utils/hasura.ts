import hsrClient from "~@/modules/hasura.module";
import {UPSERT_OUTSOURCE_USER} from "~@/graphql/mutation";
import { 
    upsertOutsourceUser, upsertOutsourceUserVariables
} from "~@/graphql/generated/upsertOutsourceUser";
import {
    outsource_user_constraint,
    outsource_user_update_column
  } from "~@/graphql/generated/globalTypes";
import {
  FETCH_OS_USER_BY_ID
} from "~@/graphql/query";
import {
  fetchOSUserByID,
  fetchOSUserByIDVariables
} from "~@/graphql/generated/fetchOSUserByID";
import {
  fetchAndSyncUser
} from "~@/utils/freelancer"
export const upsertOSUser = (userId, data) => {
    return hsrClient.mutate<upsertOutsourceUser, upsertOutsourceUserVariables>({
      mutation: UPSERT_OUTSOURCE_USER,
      variables: {
        obj: {
          _data: data,
          user_id: userId
        },
        conflict: {
          constraint: outsource_user_constraint.outsource_user_pkey,
          update_columns: [outsource_user_update_column._data]
        }
      }
    });
  };

export const getOSUByID = async id => {
  const {
    data: { user }
  } = await hsrClient.query<fetchOSUserByID, fetchOSUserByIDVariables>({
    query: FETCH_OS_USER_BY_ID,
    variables: {
      user_id: id
    }
  });
  return user;
}

export const syncOSUserIfNotExisted = async id => {
  if (!id) {
    return null;
  }
  const user = await getOSUByID(id);
  if (user) {
    return user;
  } else {
    return fetchAndSyncUser(id);
  }
};