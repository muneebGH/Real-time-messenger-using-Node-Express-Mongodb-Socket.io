// const tunnel = require("tunnel");
// const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
// const { IamAuthenticator } = require("ibm-watson/auth");

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: "2019-07-12",
//   authenticator: new IamAuthenticator({
//     apikey: String.raw`{give key here}`
//   }),
//   httpsAgent: tunnel.httpsOverHttp({
//     proxy: {
//       host: "localhost",
//       port: 3301
//     }
//   }),
//   proxy: false,
//   url: String.raw`{give adress here}`
// });

// const analyzeParams = {
//   url: "www.ibm.com",
//   features: {
//     categories: {
//       limit: 3
//     }
//   }
// };

// function analyze() {
//   naturalLanguageUnderstanding
//     .analyze(analyzeParams)
//     .then(analysisResults => {
//       return JSON.stringify(analysisResults, null, 2);
//     })
//     .catch(err => {
//       console.log("error:", err);
//     });
// }

// module.exports = {
//   anaylze: analyze
// };
