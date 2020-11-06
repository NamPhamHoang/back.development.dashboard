import axios from "axios";
import {upsertOSUser} from "./hasura";

export const fetchUserById = async id => {
    const { data } = await axios.get(
        `https://www.freelancer.com/api/users/0.1/users/${id}/`,
        {
            headers: {
                'freelancer-oauth-v1': process.env.FREELANCE_TOKEN
            }
        }
    );
    if(data.status === 'success') {
        return data.result;
    } else {
        throw new Error(data.result)
    }
}

export const fecthAndSyncUser = async id => {
    const { data } = await axios.get(
        `https://www.freelancer.com/api/users/0.1/users/${id}/`,
        {
            headers: {
                'freelancer-oauth-v1': process.env.FREELANCE_TOKEN
            }
        }
      );
      if (data.status === "success") {
        return upsertOSUser(id, data.result);
      } else {
        throw new Error(data.result);
      }
};

export const fetchFullProjectInformation = async id => {
    const { data } = await axios.get(
        `https://www.freelancer.com/api/projects/0.1/projects/${id}?attachment_details=true&full_description=true&job_details=true&location_details=true&nda_details=true&project_collaboration_details=true&seo_urls%5B%5D=javascript%2FSimple-Javascript-Invoice-creator&selected_bids=true&qualification_details=true&upgrade_details=true&review_availability_details=true&local_details=true&equipment_details=true&invited_freelancer_details=true&webapp=1&compact=true&new_errors=true&user_details=true&user_employer_reputation=true`,
        {
            headers: {
                'freelancer-oauth-v1': process.env.FREELANCE_TOKEN
            }
        }
      );
      if (data.status === "success") {
        return data.result;
      } else {
        throw new Error(data.result);
      }
}