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
const dbConfig_1 = __importDefault(require("../dbConfig"));
function getAnswers(id, onSuccess) {
    dbConfig_1.default.query("SELECT * FROM answers JOIN questions ON answers.questionid = questions.id WHERE questions.id = ($1)", [id], onSuccess);
}
module.exports.getAnswers = getAnswers;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbConfig_1.default.any("SELECT * FROM your_table");
            console.log(result);
        }
        catch (error) {
            console.error("Error:", error);
        }
        finally {
            pgp.end(); // Close the connection pool when done
        }
    });
}
main();
