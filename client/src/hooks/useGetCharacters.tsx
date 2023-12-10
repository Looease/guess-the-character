// import { environment } from '@utils/get-environment-variable';
import { useQuery } from "react-query";
import {getUrl} from "../utils/getUrl"


export const useGetCharacters = () => {

    //TODO make enum list
const fetchUrl = getUrl('quiz')

  return useQuery({
    queryKey: ["characters"],
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
