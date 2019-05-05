require("dotenv").config();

const mysql = require("mysql");

const inquirer = require("inquirer");

const keys = require("./keys.js");

const db = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: keys.sql.username,

    password: keys.sql.password,
    database: "bamazon_db"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    db.end();
  });
  