const morgan = require("morgan");
const express = require("express");
const cors=require('cors');
const authRouter = require("../routes/auth");

module.exports = function (app) {
  app.use(cors({origin:"*"}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("tiny"));
  app.get("/", async (req, res) => {
    res.send("working");
  });
  app.use("/api/user", authRouter);
};
