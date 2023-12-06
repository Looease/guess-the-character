export const getResults = async () => {
  try {
    const response = await fetch("http://localhost:8000/results", {
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
