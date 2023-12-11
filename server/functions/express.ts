import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { getRandomAnswers, shuffleArray } from "../utils/gameData";
import session from "express-session";
import axios from "axios";
import cors from "cors";

const app = express();
const router = express.Router();


type AnswerData = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

declare module "express-session" {
  interface SessionData {
    //TODO implment API type
    data: any;
  }
}

app.use(
  cors({
    origin: ["http://localhost:3000", "https://remarkable-cendol-7a7936.netlify.app", "https://elaborate-tarsier-256666.netlify.app"],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);


app.use(express.json());

app.use(
  session({
    secret: "qwerty",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      path: "/",
      sameSite: "none",
    },
  })
);

app.use(express.urlencoded({ extended: true }));
console.log('here')

router.get("/", (_req: Request, res: Response) => {
  console.log('here1')
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

router.get("/start-quiz", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Quiz started! Session cleared.");
    }
  });
});

router.get("/quiz", async (_req: Request, res: Response) => {
  try {
    const axiosResponse = await axios.get(
      "https://api.disneyapi.dev/character"
    );

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

router.post("/update-answer", (req: Request, res: Response) => {
  try {
    const data = req.body;
    req.session.data = req.session.data || [];
    req.session.data.push(data);

    // if (req.session.data) {
    //   const redirectLocation = "/quiz";
    //   return res.redirect(302, redirectLocation);
    // }
    res.send({ success: true });
  } catch (error) {
    console.error("Error setting updating answer:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/check-answers", (req: Request, res: Response) => {
  //req.session = req.session || {};

  const sessionData = (req.session || {}).data || [];

  // const sessionData = req.session.data || [];
  res.json({ sessionData });
});

router.get("/results", (req: Request, res: Response) => {
  const sessionData = (req.session || {}).data || [];

  //req.session = req.session || {};

  //const sessionData = req.session.data || [];
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

app.use('/.netlify/functions/express', router);
export const handler = serverless(app);
