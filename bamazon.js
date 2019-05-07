require("dotenv").config();

const mysql = require("mysql");

const inquirer = require("inquirer");

const keys = require("./keys.js");

const { printTable } = require("console-table-printer");

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
    displayProduct();
    selectProduct();
  });

  function displayProduct() {
    db.query("SELECT * FROM products", (err, res) => {
      printTable(res);
      
    });
  
    
  }

  function selectProduct() {
    db.query('SELECT product_name FROM products ORDER BY product_name', (err, res) => {
      if (err) throw err;
      const productName = res.map(row => row.product_name);
      console.log(`Select what product you would like to purchase`);
      inquirer.prompt([{
        name: "product",
        message: "Select your product",
        type: "list",
        choices: productName
      },
      {
        name: "quantity",
        message: "How many would you like?"
      }
      
  
      ]).then(product => {
        console.log(product);
        db.end();
        
      });
    });
  }

  