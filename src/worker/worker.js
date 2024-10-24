import axios from "axios";
//const axios = require('axios');

// const api = {
//   someMethod(code) {
//     return axios.post(`http://localhost:5000/v?reseller=a&card=${code}&email=talkin2007%40bk.ru`)
//   }
// }

// expose(api);

// onmessage = async function(e) {
//   console.log('Worker: Message received from main script', e.data);
  
//   // const result = axios.post(`http://localhost:5000/v?reseller=a&card=${e.data}&email=talkin2007%40bk.ru`)
//   // postMessage(result);
//   const result = axios.post(`http://localhost:5000/v?reseller=a&card=${e.data}&email=talkin2007%40bk.ru`)
//   postMessage(result);

//   // if (!result) {
//   //   postMessage('Please write two numbers');
//   // } else {
//   //   const workerResult = result.data;
//   //   console.log(typeof result.data)
//   //   //console.log('Worker: Posting message back to main script', workerResult);
//   //   postMessage(workerResult);
//   // }
// }


export const getCodeFunc = (code, email, letter) => {
  const result = axios.post(`http://localhost:5000/v?reseller=${letter}&card=${code}&email=${email}`)
  return result
}