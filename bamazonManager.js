var mysql = require("mysql");
var inquirer = require("inquirer");
var b = " ===== ";
var querySelect = "SELECT * FROM items";
var queryUpdate = "UPDATE items SET ? WHERE ?"
var queryInv = "SELECT * FROM items WHERE qty BETWEEN 0 AND 5"

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
inquirer.prompt([
    {
        type: "list",
        name: "theList", 
        message: "What Would You Like to Do?",
        choices: ["List Products For Sale", "View Low Inventory", "Add New Inventory", "Add New Product"]
    }
]).then(function(resp){
    if (resp.theList === "List Products For Sale") {
        console.log("\nListing Products For Sale...\n"); 
        setTimeout(productsForSale, 1000); 
    } else if (resp.theList === "View Low Inventory") {
        console.log("\nSearching for items with low quantity...\n")
        setTimeout(lowInventory, 1000); 
    } else if(resp.theList === "Add New Inventory") {
        // console.log("\nThis functionality is not ready yet\n");
        addInventory(); 
        // setTimeout(runPrompt, 1000); 
    } else { 
        console.log("\nThis functionality is not ready yet\n");
        setTimeout(runPrompt, 1000); 
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
}

function addInventory() {
    connection.query(querySelect, function(err,res){
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

        addProduct(addedInv, chosenOne); 
        
    })
    
}); //end of connection.query 
} //end of addInventory function 

function addProduct(inventory, location) {
    connection.query(queryUpdate, 
    [
        {
            qty: parseInt(inventory)
        },
        {
            id: location.id
        }
    ],
    function(err){
        if (err) throw (err)
        console.log("You changed the inventory!"); 

    })
}



runPrompt(); 