# bamazon
Fake amazon store to work with mySQL database

Here is a walkthrough of the working Bamazon app: 

Click on the image below for a full walkthrough: 

[![Bamazon](/bamazon_screenshot.png)](https://www.youtube.com/watch?v=qDCLZ4Z8oWQ "Bamazon App")

There are three different apps here, they are separate because there is no authentication as to the user, so I have left them separate. 

# BAMAZON PURCHASER (bamazon.js)

The customer of Bamazon would use this app to purchase and item by ID and quantity. Very straight forward, once loaded, the customer is immediately prompted with a purchashing option. 

You can only purchase by ID, attempting to enter in any other information will be invalid and you will be re-prompted. 

Same thing goes for the quantity amount. 

If you try to purchase more items than are currently available, you will be told there is an "insufficient quantity".

# BAMAZON MANAGER (bamazonManager.js)

View Products: 
This option will simply print out all available items for sale in the database. It will be updated immediatelry so any changes to the database will result in new data every time this gets printed out.

There are no inputs for this function. 

View Low Inventory: Viewing low inventory provides data on all items in the database that have a quantity of 5 or less. 

If you update the inventory with the function below you will notice that this item will be updated as well.

There are no inputs for this function. 

Add New Inventory: 
This function allows the user to input new inventory to the database. The quantity that you input will be added to the existing inventory. 

There are two user inputs: 
1. What product do you want to add inventory to? 
2. How much inventory would you like to add?

Add New Product: This function will add a new product to the database. You can then add further inventory it by using the "add new inventory" function. 

There are 4 user inputs: 
1. What is the name of the product? (you can only enter in a string, if you enter integers, you will be reprompted to enter information again.)
2. What department do you want this product to be associated with? (there is a drop down menu of existing departments, if you want to add a department, you will need to use the bamazonSupervisor app)
3. Enter Cost Per Unit: Enter in the cost for each quantity that you add to the database. If a customer purchased multiple units of this item, the Cost per unit will be multiplied by the amount. 
4. Enter quantity: This is the quantity of items that you have of this item. Each time a customer purchases an item, this number will be dropped, until it is empty. 

Logout: You can logout of the Manager app by clicking on the Logout button, this will end the loop of prompts. 

# BAMAZON SUPERVISOR (bamazonSupervisor.js)

There are two things you can do as a Supervisor. 

1. Look at the profitability of a department by pulling the report with "View Product Sales by Department" and 
2. adding a new department. 

If you add a new department, it will be added to the list of departments that a Manager can add items towards. 

If you add a new department, you will be prompted with two questions. 
1. What is the name of the department? Pretty self-explanatory. 
2. What are the overhead costs? This is used to calculate the profitability of the business. 

You cannot add a new department or add an item to a department that does not exist unless you create it here first. 


