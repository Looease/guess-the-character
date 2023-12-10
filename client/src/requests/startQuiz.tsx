import {getUrl} from "../utils/getUrl"

export const handleStartQuiz = async (page: string) => {

  //TODO make enum list
const fetchUrl = getUrl('start-quiz')

  try {
    const response = await fetch(`${fetchUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = page === "home" ? "/quiz" : "/";
    }
  } catch (error) {
    console.error("Error setting session data:", error);
  }
};
