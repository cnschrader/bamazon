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
      
  
      ]).then((product) => {
        console.log(product);

        if(productName){

            updateProduct(product);
        }
        else{
            (err, res) => {
                if (err) throw err; }
        }
        
        
        
        db.end();
        
      });
    });
    
  }



function updateProduct(product) {

    console.log(product);

    console.log("Updating all bamazon inventory..\n");
    
    

        const query = db.query(
        
            "UPDATE products SET quantity = quantity - ? WHERE product_name = ?", [product.quantity, product.product],
            
            (err, res) => {
                if (err) throw err;   
                console.log(res)
            
            console.log(query.sql);
            },
            
            )

           
            displaySum(product);
        };

        function displaySum(product){
            
            
            if(product.quantity > 0){

                const query = db.query(
                    "SELECT FORMAT(SUM(price * ?), 2) total FROM products", [product.quantity],
                )

                console.log("Your Total is: " + query)
                console.log(query.sql);
            }

            else{
                console.log("Sorry! Not enough in inventory!")
            }
            
        };

        
    
    
    
