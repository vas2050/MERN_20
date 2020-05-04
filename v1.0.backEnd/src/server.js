// standard modules
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

const { logger } = require("./logger");

// db connection
mongoose.connect("mongodb://localhost:27017/covid20", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const connection = mongoose.connection;

connection.once("open", () => {
  logger.info("mongo db connected");
});

// local modules
const data = require("./route/data");
const country = require("./route/country");

const PORT = "4000";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({ success: "ok" });
});

app.get("/hello/:user", (req, res) => {
  const { user } = req.params;
  res.status(200).send("Hello, " + user[0].toUpperCase() + user.slice(1));
});

app.use("/covid/data", data); 
app.use("/covid/country", country); 

app.listen(PORT, () => {
  logger.info("server started on port: " + PORT);
});
