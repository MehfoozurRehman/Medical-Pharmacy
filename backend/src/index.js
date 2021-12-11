const express = require("express");
const monk = require("monk");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

const api = require("./Routes/index");

// api config

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// middleware

app.use(cors());
app.use(express.json());
app.use("/api/v1", api);
// db config
const db = monk(
  "mongodb+srv://admin:adminhasaccess@cluster0.nvrd4.mongodb.net/medical_pharmacy?retryWrites=true&w=majority"
);
// api endpoints

app.get("/", (req, res) => {
  res.send("api woking");
});

// listners

app.listen(port, () => console.log(`api working on ${port}`));
