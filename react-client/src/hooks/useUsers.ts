import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:4000/";

const useUsers = () => {
  return useQuery(["users"], async () => {
    const { users: data } = await request(
      endpoint,
      gql`
        query {
          users {
            id
            name
            email
            phone
            avatar
          }
        }
      `
    );
    return data;
  });
};

export { useUsers };
