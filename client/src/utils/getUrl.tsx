import { env } from "process";

export const getUrl = (param: string, environment?: string) => {
        return `https://darling-choux-63e4e8.netlify.app/.netlify/functions/express/${param}`;   
}
