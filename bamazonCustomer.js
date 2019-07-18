 const mysql = require("mysql");
 const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "thegman69!",
  database: "bamazon"
});

connectDB();

function connectDB() {
    connection.connect(async function (err) {
        if (err) throw err;
        console.log("connected as id" + connection.threadId + "\n");

        await readProducts();

        var whatToBuy = await askWhatToBuy();
        console.log(whatToBuy)

        await checkProductsQuantity(whatToBuy);


        connection.end()

    })
}

async function readProducts() {
  return new Promise((resolve, reject) => {
      console.log("Selecting all products...\n");
      connection.query("SELECT * FROM products", function (err, res) {
          if (err) reject(err);
          for (i = 0; i < res.length; i++) {
              console.log(
                  res[i].id + " | Name: "
                  + res[i].product_name + " | Department: "
                  + res[i].department_name + " | Price: $"
                  + res[i].price
              );
          }
          resolve();
      })
  })
}


async function checkProductsQuantity(x) {
  return new Promise((resolve, reject) => {
  console.log("Checking all products quantity...\n");
  connection.query("SELECT * FROM products WHERE id=?", [x.id], function(err, res){
      if (err) reject(err);
      console.log(res)
      console.log(parseInt(x.quantity))
      if (res[0].stock_quantity > parseInt(x.quantity)){
          console.log("You have purchased your item");
      }else{
          console.log("insufficient quantity!");
      }
  })
  resolve();
  }) 
}



async function askWhatToBuy() {
  return new Promise((resolve, reject) => {
      inquirer.prompt([
          {
              type: "input",
              name: "id",
              message: "What is the id of the item you would like to purchase?"
          },
          {
              type: "input",
              name: "quantity",
              message: "How many would you like to purchase?"
          }
      ]).then(function (askResponse) {
          resolve(askResponse);

      }).catch(function (err) {
          reject(err);
      })
  });
  ;
}

// async function updateProducts( {

// })