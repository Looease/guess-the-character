import { useQuery } from "react-query";

export const useGetSessionData = () => {
  const fetchUrl = "http://localhost:8000/check-session";

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
