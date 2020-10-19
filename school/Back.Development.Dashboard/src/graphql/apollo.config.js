require("../../dotenv.config");
module.exports = {
  client: {
    includes: ["./*.ts"],
    service: {
      name: "hasura",
      url: `${process.env.HASURA_ENDPOINT}/v1/graphql`,
      // optional headers
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
};
