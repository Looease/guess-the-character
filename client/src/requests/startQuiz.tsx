import {getUrl} from "../utils/getUrl"

export const handleStartQuiz = async (page: string, environment? : string) => {

  //TODO make enum list
const fetchUrl = getUrl('start-quiz', environment)

  try {
    const response = await fetch(`${fetchUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = page === "home" ? "/game" : "/";
    }
  } catch (error) {
    console.error("Error setting session data:", error);
  }
};
