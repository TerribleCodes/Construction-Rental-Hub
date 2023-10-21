const express = require("express");
const dotenv = require("dotenv");
const oracledb = require("oracledb");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // create express app
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); //
dotenv.config(); // read .env file
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

const PORT = process.env.PORT; // server port

// Route to test the server
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  console.log(formData);
  res.status(200).json({ message: "Form data received and processed." });
});

// Route to test the database connection
app.get("/customers", (req, res) => {
  async function fetchDataCustomers() {
    try {
      const connection = await oracledb.getConnection({
        user: "HR",
        password: "123",
        connectString: "localhost/xe",
      });
      const result = await connection.execute(`SELECT * FROM hr.customers`);
      return result.rows;
    } catch (error) {
      return error;
    }
  }

  fetchDataCustomers()
    .then((result) => {
      res.json({ result });
      console.log(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Route to insert data into the "customers" table
app.post("/insert-customer", async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: "hr_xe",
      password: "123",
      connectString: "localhost/xe",
    });

    // Read the PL/SQL code from the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "sql-scripts",
      "insert_customer.sql"
    );
    const plsqlBlock = fs.readFileSync(sqlFilePath, "utf8");

    // Execute the PL/SQL block
    await connection.execute(plsqlBlock);

    // Respond with a success message
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    // Respond with an error message if an error occurs
    res.status(500).json({ error: error.message });
  }
});

// TODO

// Fetch the products to the frontend
// app.get("/products", async (req, res) => {
//   try {
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       connectString: process.env.DB_CONNECTION_STRING,
//     });

//     const query = "SELECT name, id, price, stock FROM products";
//     const result = await connection.execute(query);

//     connection.close();

//     const products = result.rows.map((row) => ({
//       name: row[0],
//       id: row[1],
//       price: row[2],
//       stock: row[3],
//     }));

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching product data" });
//   }
// });

// CRUD for the customers_table

// CRUD for the products_table

// CRUD for the rental_information table

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
