const express = require("express");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log(`${process.env.TOKEN}`)
});

app.get("/", (req, res) => {
    res.json(true);
});