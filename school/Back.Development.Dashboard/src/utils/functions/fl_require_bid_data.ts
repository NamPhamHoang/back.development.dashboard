

export default async (projects: any[]) => {
      return {
        projects: projects.map((project: { jobs: any[]; }) => {
          return {
            ...project,
            jobs: project.jobs
              .map((job: { job: { id: any; title: any; }; }) => ({
                id: Number(job.job.id),
                title: job.job.title
              }))
              .reduce<Array<{ id: number; title: string }>>(
                (prev: any, current: any) => [...prev, current],
                []
              )
          };
        }),
      };
  };
  