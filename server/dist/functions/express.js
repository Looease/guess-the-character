"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const gameData_1 = require("../utils/gameData");
const express_session_1 = __importDefault(require("express-session"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://remarkable-cendol-7a7936.netlify.app"],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "qwerty",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        path: "/",
        sameSite: "none",
        secure: true,
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
console.log('here');
router.get("/", (_req, res) => {
    console.log('here1');
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
router.get("/start-quiz", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send("Quiz started! Session cleared.");
        }
    });
});
router.get("/quiz", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const axiosResponse = yield axios_1.default.get("https://api.disneyapi.dev/character");
        const round = (0, gameData_1.shuffleArray)(axiosResponse.data.data);
        const options = (0, gameData_1.getRandomAnswers)(round);
        res.json({ options });
    }
    catch (error) {
        console.error("Error fetching data:", error instanceof Error && error.message);
        res.status(500).send("Internal server error");
    }
}));
router.post("/update-answer", (req, res) => {
    try {
        const data = req.body;
        req.session.data = req.session.data || [];
        req.session.data.push(data);
        if (req.session.data) {
            const redirectLocation = "/quiz";
            return res.redirect(302, redirectLocation);
        }
        res.send({ success: true });
    }
    catch (error) {
        console.error("Error setting updating answer:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.get("/check-answers", (req, res) => {
    //req.session = req.session || {};
    const sessionData = (req.session || {}).data || [];
    // const sessionData = req.session.data || [];
    res.json({ sessionData });
});
router.get("/results", (req, res) => {
    const sessionData = (req.session || {}).data || [];
    //req.session = req.session || {};
    //const sessionData = req.session.data || [];
    const correct = [];
    const incorrect = [];
    //TODO update type
    sessionData.map((data) => {
        try {
            if (data.isCorrect) {
                correct.push(data);
            }
            else {
                incorrect.push(data);
            }
        }
        catch (error) {
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
exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=express.js.map