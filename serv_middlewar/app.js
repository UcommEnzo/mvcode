const express = require("express");
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/', createProxyMiddleware({ 
    target: `https://mcpromo.ru`,
    changeOrigin: true, 
    //secure: false,
    // onProxyRes: function (proxyRes, req, res) {
    //    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    // }
}));

// const qwe = async () => {
//     try {
//         const result = await axios.post(`https://mcpromo.ru/v?reseller=a&card=11233116678266838&email=talkin2007%40bk.ru`)
//         console.log('--qwe--', result)
//     } catch (error) {
//         console.log('error', error )
//     }
// }

// qwe()

app.listen(5000);