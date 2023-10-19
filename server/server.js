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

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  // Process the form data here, e.g., save it to a database
  console.log(`Backend works  but form data doesn't pass to backend`);

  // Send a response back to the client
  res.status(200).json({ message: "Form data received and processed." });
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
