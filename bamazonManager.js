var mysql = require("mysql");
var inquirer = require("inquirer");
var b = " ===== ";
var querySelect = "SELECT * FROM items";
var queryUpdate = "UPDATE items SET ? WHERE ?"
var queryInv = "SELECT * FROM items WHERE qty BETWEEN 0 AND 5"
var queryInsert = "INSERT INTO items VALUES (?"

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "password",
    database: "bamazonDB",

});

connection.connect(function(err) {
    if (err) throw (err)
})
function runPrompt() {
    console.log("\n")
inquirer.prompt([
    {
        type: "list",
        name: "theList", 
        message: "Main Menu",
        choices: ["List Products For Sale", "View Low Inventory", "Add New Inventory", "Add New Product"]
    }
]).then(function(resp){
    if (resp.theList === "List Products For Sale") {
        console.log("\nListing Products For Sale...\n"); 
        setTimeout(productsForSale, 1000); 
    } else if (resp.theList === "View Low Inventory") {
        console.log("\nSearching for items with low inventory...\n")
        setTimeout(lowInventory, 1000); 
    } else if(resp.theList === "Add New Inventory") {
        console.log("\nAdding Inventory\n");
        setTimeout(addProduct, 1000); 
    } else { 
        console.log("\nAdding New Item\n");
        setTimeout(newInventory, 1000); 
    }

}) // end of then statement
}; // end of runPrompt function

//done
function productsForSale() { 
    connection.query(querySelect, function(err,res) {
        if (err) throw (err); 

        for (var i = 0; i < res.length; i++) {

            console.log("ID: " + res[i].id + " " + res[i].product_name + " $" + res[i].price + " Qty: " + res[i].qty)
        }
    setTimeout(runPrompt, 1000)
    });
};
//done
function lowInventory() { 
    connection.query(queryInv, function (err,res){
        if (err) throw (err)

        for (var i = 0; i < res.length; i++) {

            console.log("ID: " + res[i].id + " " + res[i].product_name + " $" + res[i].price + " Qty: " + res[i].qty)
        }
    })
    setTimeout(runPrompt, 1000)
}

function addProduct() {
    connection.query(querySelect, function(err,res){
        if (err) throw (err)
    inquirer.prompt([
        {
            type: "rawlist", 
            name: "addInv",
            message: "What item do you want to add inventory to?",
            choices: function(){
                    choiceArray = []; 
                    for (var i = 0; i <res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    } 
                    return choiceArray; 
            }
        }, 
        {
            type: "input",
            name: "amountInv",
            message: "How much inventory would you like to add?"
        }
    ]).then(function(response){
        var addedInv = parseInt(response.amountInv); 
    
        var chosenOne;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === response.addInv) {
                chosenOne = res[i]; 
            }
        }
        console.log("chosen one " + chosenOne.id);
        console.log("added inv: " + addedInv);

        addInventory(addedInv, chosenOne); 
        
    })
    
}); //end of connection.query 
} //end of addInventory function 

function addInventory(inventory, location) {
    connection.query(queryUpdate, 
    [
        {
            qty: location.qty + inventory
        },
        {
            id: location.id
        }
    ],
    function(err){
        if (err) throw (err)
        console.log("You changed the inventory! Now at QTY: "); 

    })
    setTimeout(runPrompt, 1000)
}

function newInventory() { 
    inquirer.prompt([
        {
            type: "input",
            name: "addProd",
            message: "What is the product name that you would like to add?"
        },
        {
            type: "input",
            name: "addDept",
            message: "What department does it belong to?",
        },
        {
            type: "input",
            name: "addCost",
            message: "Enter cost per unit"
        },
        {
            type: "input",
            name: "addQty",
            message: "Enter quanity"
        }
    ]).then(function(resp){
        var newItem = resp.addProd; 
        var dept = resp.addDept;
        var unitCost = parseInt(resp.addCost); 
        var unitQty = parseInt(resp.addQty); 

        addNew(newItem, dept, unitCost, unitQty)
    })
}

function addNew(newItem, dept, unitCost, unitQty) {
    connection.query("INSERT INTO items SET ?",
    [
        {
            product_name: newItem,
            department_name: dept,
            price: unitCost,
            qty: unitQty
        }
    ], function(err){
        if (err) throw (err)
        console.log("\nsuccesfully inserted item");
    })
    setTimeout(runPrompt, 1000)
}

runPrompt(); 