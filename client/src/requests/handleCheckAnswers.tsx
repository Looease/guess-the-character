import {getUrl} from "../utils/getUrl"

export const handleCheckAnswers = async (
  data: any,
  setSessionData: (data: any) => void,
  environment?: string
) => {

  //TODO make enum list
  const fetchUrl = getUrl('check-answers', environment)

  try {
    const response = await fetch(`${fetchUrl}`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        setSessionData(data.sessionData);
      }
    } else {
      console.error("Failed to retrieve session data.");
    }
  } catch (error) {
    console.error("Error retrieving session data:", error);
  }
};
