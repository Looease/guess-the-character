"use strict";
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
const api = (0, express_1.default)();
api.use((0, cors_1.default)({
    origin: "https://main--steady-kitten-11d7a8.netlify.app/",
    credentials: true,
}));
api.use(express_1.default.json());
api.use((0, express_session_1.default)({
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
api.use(express_1.default.urlencoded({ extended: true }));
api.get("/", (_req, res) => {
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
api.get("/start-quiz", (req, res) => {
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
api.get("/quiz", async (_req, res) => {
    try {
        const axiosResponse = await axios_1.default.get("https://api.disneyapi.dev/character");
        const round = (0, gameData_1.shuffleArray)(axiosResponse.data.data);
        const options = (0, gameData_1.getRandomAnswers)(round);
        res.json({ options });
    }
    catch (error) {
        console.error("Error fetching data:", error instanceof Error && error.message);
        res.status(500).send("Internal server error");
    }
});
api.post("/update-answer", (req, res) => {
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
api.get("/check-answers", (req, res) => {
    //req.session = req.session || {};
    const sessionData = (req.session || {}).data || [];
    // const sessionData = req.session.data || [];
    res.json({ sessionData });
});
api.get("/results", (req, res) => {
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
exports.handler = (0, serverless_http_1.default)(api);