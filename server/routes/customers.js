const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

const dbConfig = {
  user: "dbadmin",
  password: "S0jF27lOk",
  connectString: "localhost/xe",
};

module.exports = router;
