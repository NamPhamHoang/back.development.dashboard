import hsrClient from "~@/modules/hasura.module";
import {UPSERT_OUTSOURCE_USER} from "~@/graphql/mutation";
import { 
    upsertOutsourceUser, upsertOutsourceUserVariables
} from "~@/graphql/generated/upsertOutsourceUser";
import {
    outsource_user_constraint,
    outsource_user_update_column
  } from "~@/graphql/generated/globalTypes";
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
  