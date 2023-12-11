import { useQuery } from "@tanstack/react-query";
import {getUrl} from "../utils/getUrl"

export const useGetResults = () => {

//TODO make enum list
const fetchUrl = getUrl('check-session')

  return useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const response = await fetch(fetchUrl, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        const caughtError = new Error(
          JSON.stringify({ statusCode: response?.status })
        );

        throw caughtError;
      }

      return await response.json();
    },
  });
};
