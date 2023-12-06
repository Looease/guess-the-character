import express, { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { getRandomAnswers, shuffleArray } from "./utils/gameData";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(
  session({
    //TODO extract to env var
    secret: "qwerty",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      path: "/",
      secure: false,
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

declare module "express-session" {
  interface SessionData {
    //TODO implment API type
    data: any;
  }
}

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  const endpointList = [
    "/start-quiz",
    "/quiz",
    "/get",
    "/update-answer",
    "/check-answers",
    "/results",
  ];

  res.json({ endpoints: endpointList });
});

app.get("/start-quiz", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Quiz started! Session cleared.");
    }
  });
});

type AnswerData = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

app.get("/quiz", async (req: Request, res: Response) => {
  try {
    const axiosResponse = await axios.get(
      "https://api.disneyapi.dev/character"
    );

    req.session.data = req.session.data || [];

    const round = shuffleArray(axiosResponse.data.data);

    const options = getRandomAnswers(round);

    res.json({ options });
  } catch (error) {
    console.error(
      "Error fetching data:",
      error instanceof Error && error.message
    );
    res.status(500).send("Internal server error");
  }
});

app.post("/update-answer", (req: Request, res: Response) => {
  try {
    const data = req.body;
    req.session.data = req.session.data || [];
    req.session.data.push(data);
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
  res.send({ success: true });
});

app.get("/check-answers", (req: Request, res: Response) => {
  req.session = (req.session || {}) as Session & Partial<SessionData>;
  const sessionData = req.session.data || [];
  res.json({ sessionData });
});

app.get("/results", (req: Request, res: Response) => {
  req.session = (req.session || {}) as Session & Partial<SessionData>;

  const sessionData = req.session.data || [];
  const correct: AnswerData[] = [];
  const incorrect: AnswerData[] = [];

  //TODO update type
  sessionData.map((data: any) => {
    try {
      if (data.isCorrect) {
        correct.push(data);
      } else {
        incorrect.push(data);
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
  });

  const score = {
    correct: {
      score: correct.length,
      answers: correct,
    },
    incorrect: {
      score: incorrect.length,
      answers: incorrect,
    },
  };

  res.json({ score });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
