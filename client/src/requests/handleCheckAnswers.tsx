export const handleCheckAnswers = async (
  data: any,
  setSessionData: (data: any) => void
) => {
  try {
    const response = await fetch("http://localhost:8000/check-answers", {
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
