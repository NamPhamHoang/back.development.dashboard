import { Request, Response } from "express";
import axios from "axios";
import { UPSERT_PROJECT } from "~@/graphql/mutation";
import { FETCH_JOB } from "~@/graphql/query";
import {
    upsertProjects, upsertProjectsVariables
} from "~@/graphql/generated/upsertProjects";
import {
    fetchJobs
} from "~@/graphql/generated/fetchJobs";
import hsrClient from "~@/modules/hasura.module";
import { projects_update_column } from "~@/graphql/generated/globalTypes";

export default async (req: Request, res: Response) => {    
    try {
        // let jobsTotal = ""
        // const {
        //     data: {jobs}
        // } = await hsrClient.query<fetchJobs>({
        //     query: FETCH_JOB
        // })
        // jobs.forEach(job => {
        //     jobsTotal = jobsTotal + `&jobs%5B%5D=${job.id}`
        // })
        const projectUrl = `https://www.freelancer.com/ajax/notify/live-feed/pre-populated.php`
        const { data } = await axios.get(projectUrl, {
            headers: {
                'freelancer-oauth-v1': process.env.FREELANCE_TOKEN
            }
        })
        console.log(data)
        // const insertData = projects.map(project => {
        //     return {
        //         id: project.id,
        //         userId: project.owner_id,
        //         userName: "nam",
        //         text: project.preview_description,
        //         title: project.title,
        //         linkUrl: project.seo_url,
        //         submitdate: project.submit,
        //         featured: project.featured,
        //         exchange_rate: project.currency.exchange_rate,
        //         maxbudget: project.budget.maximum,
        //         minbudget: project.budget.minimum,
        //         fulltime: project.upgrades.fulltime,
        //         nonpublic: project.upgrades.nonpublic,
        //         ipcontract: project.upgrades.ip_contract,
        //         nda: project.upgrades.NDA,
        //         currency: project.currency.sign
        //     }
        // })
       
        // const { data } = await hsrClient.mutate<upsertProjects, upsertProjectsVariables>({
        //     mutation: UPSERT_PROJECT,
        //     variables: {
        //         projects: insertData,
        //         projectsUpdateCollumn: [projects_update_column.confirm]
        //     }
        // })
        // if (data) {
        //     return res.status(200).json({
        //         isError: "false",
        //         insertData
        //     })
        // }
        // return res.status(400).json({
        //     isError: "true",
        //     payload: "Failed to fetch projects"
        // })

    } catch (e) {
        return res.status(400).json({
            isError: "true",
            payload: e.toString()
        })
    }
}