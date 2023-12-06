// import { environment } from '@utils/get-environment-variable';
import { useQuery } from "react-query";

export const useGetCharacters = () => {
  const fetchUrl = "http://localhost:8000/quiz";

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
