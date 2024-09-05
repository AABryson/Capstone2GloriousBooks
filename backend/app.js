const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const {OAuth2Client} = require('google-auth-library');
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("tiny"));


//create new object instance of oauth2client class
const oAuth2Client = new OAuth2Client(
  //CLIENT_ID and CLIENT_SECRET were supplied by google when I registered the app.
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
);


app.post('/auth/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  
  res.json(tokens);
});

app.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})








module.exports = app;

/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   return next(new NotFoundError());
// });
/** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {nopd
//   return res.status(status).json({
//     error: { message, status },
//   });
// });
