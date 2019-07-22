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
    // console.log("connected as id" + connection.threadId + "\n");

    await readProducts();

    var whatToBuy = await askWhatToBuy();
    // console.log(whatToBuy)

    var productInfo = await checkProductsQuantity(whatToBuy);
    // console.log('>>>>', productInfo);

    await updateProduct(productInfo);
    connection.end()

  })
}

async function readProducts() {
  return new Promise((resolve, reject) => {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) reject(err);
      // console.log(res);
      for (i = 0; i < res.length; i++) {
        console.log(
          `Item ID: ${res[i].item_id} | Item Name: ${res[i].product_name} | Department: ${res[i].department_name} | Quantity: ${res[i].stock_quantity} | Price: $${res[i].price}`)
        }
      resolve();
    })
  })
}

async function checkProductsQuantity(whatToBuy) {
  // console.log('whatToBuy', whatToBuy);
  return new Promise((resolve, reject) => {
    console.log(`
Checking product quantity...
    `);
    let id = parseInt(whatToBuy.id);
    let query = connection.query("SELECT * FROM products WHERE ?", [
      {
        item_id: id
      }
    ],
    function (err, res) {
      if (err) reject(err);
      // console.log('res', res);
      // console.log(parseInt(whatToBuy.quantity))
      if (res[0].stock_quantity > parseInt(whatToBuy.quantity)) {
        console.log(`Success!

You have purchased your item.
        
Your total was $${res[0].price * whatToBuy.quantity}.
`);
        let new_quantity = parseInt(res[0].stock_quantity) - parseInt(whatToBuy.quantity);
        let updateInfo = {
          id: id,
          new_quantity: new_quantity
        }
        resolve(updateInfo);
      } else {
        console.log(`Insufficient quantity!

Please make a new selection. Thank you for choosing Bamazon.
`);
        connection.end()
      }
    })
    // console.log("checkproductsquantity function query.sql", query.sql);
    // resolve();
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


async function updateProduct(productInfo) {
  console.log("Thank you for choosing Bamazon! Please come again.\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: productInfo.new_quantity
      },
      {
        item_id: productInfo.id
      }
    ],
    function(err, res) {
      if (err) throw err;
      // console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
    }
  );

  // logs the actual query being run
  // console.log("update products query.sql", query.sql);
}