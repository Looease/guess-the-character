export const updateAnswer = async (answer: any) => {
  try {
    const transformedData = {
      answer: answer.answer,
      id: answer.id,
      isCorrect: answer.isCorrect,
    };

    const response = await fetch("http://localhost:8000/update-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(transformedData),
    });

    if (response.ok) {
      window.location.href = response.headers.get("Location") || "/quiz";
    }
  } catch (error) {
    console.error("Error setting session data:", error);
  }
};
