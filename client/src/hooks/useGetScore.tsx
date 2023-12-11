import { useQuery } from "react-query";
import {getUrl} from "../utils/getUrl"


export const useGetSessionData = () => {

//TODO make enum list
const fetchUrl = getUrl('check-session')

  return useQuery("sessionData", async () => {
    const response = await fetch(fetchUrl, {
      credentials: "include",
    });

    if (!response.ok) {
      const caughtError = new Error(
        JSON.stringify({ statusCode: response?.status })
      );
      throw caughtError;
    }

    return await response.json();
  });
};
