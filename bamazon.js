var mysql = require("mysql");
var inquirer = require("inquirer");
var b = " ===== ";
var query = "SELECT * FROM items";

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


function listItems() { 
    connection.query(query, function(err,res) {
        if (err) throw (err); 

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " " + res[i].product_name + " $" + res[i].price + " Qty: " + res[i].qty)
        };
        whichItem(); 
     
    })
}

function whichItem() { 
    connection.query(query, function(err,results) {
        if (err) throw (err); 


    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "\nWhich item would you like to buy?",
            
        },
        {   type: "input",
            name: "howMany",
            message: "\nHow many would you like to buy?",
          
        }

    ]).then(function(resp) {
        phowMany = parseInt(resp.howMany);
        pchoice = parseInt(resp.choice)+1; 

        console.log(b + " Purchasing: " + results[pchoice].product_name + b + " \n" + b + " Qty: " + phowMany + b); 

        if (pchoice > results.length) {
            console.log(b + "\nThat is not a valid ID Number\n" + b); 
            setTimeout(whichItem, 2000)
        }  else if (phowMany >= results[pchoice].qty) {
            console.log("Insufficient Quantity")
            setTimeout(whichItem, 2000)
        } else {
            connection.query("UPDATE items SET ? WHERE ? ", 
            [
            {
                //is a string, need it to be 
                qty: (results[pchoice].qty - phowMany)
            },
            {
                id: pchoice
            } 
            ],
            function(err) {
                if (err) throw (err)
                console.log("\nYour purchase has been made\n");
                console.log("Total Cost: $" +  results[pchoice].price * phowMany);
            });
        
        };
           
    }); //then statement
}); 
}; 

listItems(); 

