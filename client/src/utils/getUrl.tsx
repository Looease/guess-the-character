import { env } from "process";

export const getUrl = (param: string, environment?: string) => {
  console.log(environment, 'environment')
    if (environment === 'production') {
        return   param = `https://darling-choux-63e4e8.netlify.app/.netlify/functions/express/${param}`;
      } else {
        return param = `http://localhost:8000/${param}`;
      }
   
}