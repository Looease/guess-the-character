export const getUrl = (param: string) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(process.env.NODE_ENV)

        return   param = `https://darling-choux-63e4e8.netlify.app/.netlify/functions/express/${param}`;
      } else {
        console.log(process.env.NODE_ENV)
        return param = `http://localhost:8000/${param}`;
      }
   
}