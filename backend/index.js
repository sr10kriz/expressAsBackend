const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;

const eventWinner = { winnerIs: "LionelMessi", count: "8 numbers" };

app.use(bodyParser.json());
// this also a middleware to check incoming request bodies type matches with express bodies
// express js accepts only json bodies

app.use(cors({ origin: "http://localhost:3000" }));
// this middleware helps to allowing cross-origin requests from different domain
// cors - cross-origin resource sharing

app.post("/post", (req, res) => {
  const event = {
    occation: req.body.occation,
    occationDate: req.body.occationDate,
  };
  console.log("event-post", event);

  //  req.body
  //  This example assumes that the body-parser middleware has been added to the Express app to parse the request body. If the middleware has not been added, req.body will be undefined and the function will throw an error.

  res.send("working as expected");
  //   res.status(200).json();
});

app.get("/get", (req, res) => {
  res.send(eventWinner);
  //   res.status(200).json();
});

app.listen(port, () => {
  console.log(`listening from port ${port}`);
});
