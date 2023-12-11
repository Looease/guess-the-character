import {getUrl} from "../utils/getUrl"

export const getResults = async () => {
  
    //TODO make enum list
const fetchUrl = getUrl('results')

  try {
    const response = await fetch(`${fetchUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to set session data.");
    }
  } catch (error) {
    console.error("Error setting session data:", error);
  }
};
