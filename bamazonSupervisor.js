var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var table = new Table({
    head: ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']
  , colWidths: [5, 20, 20, 20, 20]
});
var tableQuery = "SELECT departments.dept_id, departments.dept_name, departments.overhead_costs, SUM(items.product_sales) AS productsSold FROM items LEFT JOIN departments ON items.department_name = departments.dept_name GROUP BY dept_name, dept_id, overhead_costs;"
var queryUpdate = "INSERT INTO departments SET ?";


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

function supervisor() { 
    connection.query(tableQuery, function(err, res) {
        if (err) throw (err)

    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department", "Logout"]
        }
    ]).then(function(resp){

        if (resp.task === "View Product Sales by Department" ) {
            salesByDept(res); 
        } else if (resp.task === "Create New Department") {
            createNewDept(res); 
        } else {
            process.exit(); 
        }
        
    })
});
}
supervisor(); 

function salesByDept(res) {
    for (var i = 0; i < res.length-1; i++) {

        table.push(
            [res[i].dept_id, res[i].dept_name, "$"+res[i].overhead_costs, "$"+res[i].productsSold, "$"+(res[i].productsSold - res[i].overhead_costs)]
        );
    }
    console.log(table.toString()); 
    setTimeout(supervisor, 3000); 
}

function createNewDept() {
  
        inquirer.prompt([
            {
                type: "input",
                name: "depName",
                message: "What is the Department Name?",
                validate: function(input){
                    var done =  this.async(); 
                    if (!isNaN(input)) {
                        done("You must enter a valid department name")
                        return; 
                    } done(null, true); 
                }
            }, 
            {
                type: "input",
                name: "overhead",
                message: "What are the overhead costs?",
                validate: function(input) {
                    var done = this.async();
                    if (isNaN(input)) {
                        done("Please enter a valid cost, no need for a $ sign")
                    } done(null, true); 
                }
            }
        ]).then(function(resp){
            connection.query(queryUpdate,[

                {
                    dept_name: resp.depName,
                    overhead_costs: resp.overhead
                } 
            ],function(err){
                if (err) throw (err)
                console.log("\nDepartment Updated Successfully\n")
                setTimeout(supervisor, 2000)
            
        })
    })

};