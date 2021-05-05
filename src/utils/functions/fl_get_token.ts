import httpModule from "~@/modules/http.module";

export default async (linkProject: string) => {
  linkProject = linkProject.replace(/\.html/gi, "");
  try {
    const { data } = await httpModule.axios.get(
      `https://www.freelancer.com/${linkProject}/?w=f`
    );
    const csrfToken = data.search("csrfToken = '");
    const similar1 = data.indexOf("'", csrfToken + "csrfToken = '".length);
    const crsfkey = data.slice(csrfToken + "csrfToken = '".length, similar1);
    return crsfkey;
  } catch (err) {
    throw new Error(`invalid url when fetch csrfToken. link: ${linkProject}`);
  }
};
