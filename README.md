# E-Commerce Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The primary goal of this project is to develop the backend for an e-commerce website. The project involves configuring a pre-existing Express.js API to interact with a MySQL database using Sequelize. To build the MySQL database, the project employs the use of models that represent database tables. The Categories, Products, Tags, and ProductTags models are utilized in this application, with each model defining the relevant fields and their properties. The next step is to establish model associations that define the relationships between the four models. Finally, the project creates API routes to support CRUD (create, read, update, and delete) operations on the MySQL database. During this project, Abdelrahman learnt the following skills:
- Creating MySQL tables as JavaScript models using Sequelize.
- Setting up fields and defining their rules and properties within the Sequelize models.
- Establishing model associations to define relationships between models.
- Designing a table to act as a bridge or junction table to handle models with many-to-many relationships.
- Performing Sequelize methods to perform CRUD (create, read, update, and delete) operations on data in the MySQL database.
- Performing CRUD operations on the bridge tables when performing CRUD operations on a table with a many-to-many relationship. This will allow us to maintain data consistency.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

As the project does not use publishing softwares like Heroku and is only availabe in the command line, the user will have to install the project packages (bcrypt, dotenv, express, mysql2, sequelize). To install these packages, the user must navigate to the main directory of the project where the package.json file is contained and run the command `npm i` or `npm install` in the terminal. Once the packages are installed, the user must create a .env file with their MySQL credentials. The .env file must be constructed as shown below:


DB_NAME='ecommerce_db'

DB_USER='`<insert MySQL username>`'

DB_PW='`<insert MySQL password>`'


After creating the .env file, the user should navigate to the db folder in the terminal and login to the MySQL server by entering the command `mysql -u root -p`. After entering the MySQL password, run the command `source schema.sql` to create the e-commerce database. Finally, exit the MySQL terminal, return to the main directory where the package.json file is located and run the command `npm start` to start the application. It is important to note that the command `npm run seed` can be used to seed the database with sample data for testing purposes.

Note: If you would like to seed sample data to the database to test out the models, run the command `npm run seed` before running `npm run start`

## Usage

For a walkthrough of how to use the application, refer to the following demonstration: https://drive.google.com/file/d/1wDMNqx_N6CG8D8voXcgfIfbvXeuM7PcO/view

To use the application, the user must follow the installation instructions and create the necessary database. Once the packages are installed and the database is created, the user can run the application by entering `npm start` in the terminal. To perform CRUD operations, the user can use an API client or REST API client, such as Insomnia or Postman. The user can access the following routes to manipulate the database:

GET requests:

http://localhost:3001/api/categories/ to view all categories in the database <br/>
http://localhost:3001/api/categories/:id to view the category with the selected id in the database <br/>
http://localhost:3001/api/products/ to view all products in the database <br/>
http://localhost:3001/api/products/:id to view the product with the selected id in the database <br/>
http://localhost:3001/api/tags/ to view all tags in the database <br/>
http://localhost:3001/api/tags/:id to view the tag with the selected id in the database <br/>


Note: replace :id with the id of the selected data entry (ex. http://localhost:3001/api/categories/6 to view the category with an id of 6) 
  
POST requests:

http://localhost:3001/api/categories/ to create a new category in the database <br/>
http://localhost:3001/api/products/ to create a new product in the database <br/>
http://localhost:3001/api/tags/ to create a new tag in the database <br/>

PUT/DELETE requests:

http://localhost:3001/api/categories/:id to update or delete a category with the selected id in the database <br/>
http://localhost:3001/api/products/:id to update or delete a product with the selected id in the database <br/>
http://localhost:3001/api/tags/:id to update or delete a tag with the selected id in the database <br/>


The required formatting of the body for POST and PUT requests are as shown below:

  
Category: <br/>
{ <br/>
  "category_name" : "`<insert category name>`" <br/>
} <br/>
  
  
Product: <br/>
{ <br/>
  "product_name": "`<insert product name>`", <br/>
  "price": `<insert product price>`, <br/>
  "stock": `<insert amount of stock inventory for product>`, <br/>
  "category_id": `<insert category id associated with the product>`, <br/>
  "tagIds": `[<insert id's of tags associated with the product separated by commas>]` <br/>
  } <br/>
  
Tag: <br/>
{ <br/>
    "tag_name": "`<insert tag name>`", <br/>
    "productIds": `[<insert id's of products associated with the tag separated by commas>]` <br/>
} 


## License

This project is licensed under the MIT License. To see the license permissions for commercial and non-commercial use, modification, and distribution of the software, please see the full text of the license, available at https://opensource.org/licenses/MIT.

## How to Contribute

N/A

## Tests

N/A

## Questions

If you have any questions regarding this application, feel free to reach me at abdelrahman.ahmed605@hotmail.com with the subject title "Questions for E-commerce Backend"
You can also find me on github here: https://github.com/AbdelrahmanAhmed605


