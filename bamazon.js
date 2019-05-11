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
        
        updateProduct();
        db.end();
        
      });
    });
  }

//   function updateProduct(product){
//       console.log(product.quantity);
//       console.log(product.product);
//       // update products set quanity = ? where productName = 'Brocolli'
//     //   db.query("UPDATE products SET quantity = ? WHERE product_name = ?", (err, res) => {
//     //       if (err) throw err;
//     //       const quantity = res.map(row => row.quantity);
//     //   })
//   };

function updateProduct() {
    console.log("Updating all bamazon inventory..\n");
    const productName = res.map(row => row.product_name);
    const quantity = res.map(row => row.quantity);

     db.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          product: productName
        },
        {
          quantity: quantity - inquirer.name
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        console.log(query.sql);
    }
    )};
    
