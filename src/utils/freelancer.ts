import axios from "axios";
import {upsertOSUser} from "./hasura";
import http from "~@/modules/http.module";
export const fetchUserById = async id => {
    const { data } = await http.axios.get(
        `https://www.freelancer.com/api/users/0.1/users/${id}/`,
    );
    if(data.status === 'success') {
        return data.result;
    } else {
        throw new Error(data.result)
    }
}

export const fetchAndSyncUser = async id => {
    const { data } = await http.axios.get(
        `https://www.freelancer.com/api/users/0.1/users/${id}/`,
      );
      if (data.status === "success") {
        return upsertOSUser(id, data.result);
      } else {
        throw new Error(data.result);
      }
};

export const fetchFullProjectInformation = async id => {
    const { data } = await http.axios.get(
        `https://www.freelancer.com/api/projects/0.1/projects/${id}?attachment_details=true&full_description=true&job_details=true&location_details=true&nda_details=true&project_collaboration_details=true&seo_urls%5B%5D=javascript%2FSimple-Javascript-Invoice-creator&selected_bids=true&qualification_details=true&upgrade_details=true&review_availability_details=true&local_details=true&equipment_details=true&invited_freelancer_details=true&webapp=1&compact=true&new_errors=true&user_details=true&user_employer_reputation=true`,
      );
      if (data.status === "success") {
        return data.result;
      } else {
        throw new Error(data.result);
      }
}