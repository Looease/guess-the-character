export const handleStartQuiz = async (page: string) => {
  try {
    const response = await fetch("http://localhost:8000/start-quiz", {
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
