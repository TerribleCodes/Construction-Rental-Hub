const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const fs = require("fs");
const path = require("path");

// Get all customers
router.get("/all-customers", async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "get-customers.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(sqlQuery);

    res.json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single customer
router.post("/customer-by-nic", async (req, res) => {
  try {
    const { nic } = req.body;

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    // Read the SQL query from the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "../sql/customers",
      "get-customer-by-nic.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    // Execute the SQL query with the NIC parameter
    const result = await connection.execute(sqlQuery, [nic]);

    res.json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Insert a single record
router.post("/insert-customer", async (req, res) => {
  try {
    const customerData = req.body;
    if (!customerData || typeof customerData !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/customers",
      "insert-customer.sql"
    );
    const plsqlBlock = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(plsqlBlock, {
      customer_nic: customerData.customer_nic,
      customer_name: customerData.customer_name,
      customer_phone: customerData.customer_phone,
      customer_email: customerData.customer_email,
      customer_address: customerData.customer_address,
    });

    await connection.commit();

    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Insert multiple records
router.post("/insert-multiple-customers", async (req, res) => {
  res.json(
    `Oracle's Node.js driver is not straightforward when it comes to handling PL/SQL tables (arrays) as bind variables`
  );
});

// Update a single record
router.put("/update-customer", async (req, res) => {
  try {
    const customerData = req.body;

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    // Read the SQL query from the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "../sql/customers",
      "update-customer.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    // Execute the SQL query with the customer data
    const result = await connection.execute(sqlQuery, customerData, {
      autoCommit: true,
    });

    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update multiple records
router.put("/update-multiple-customers", async (req, res) => {
  res.json(
    `Oracle's Node.js driver is not straightforward when it comes to handling PL/SQL tables (arrays) as bind variables`
  );
});

// Delete a single record
router.delete("/delete-customer", async (req, res) => {
  try {
    const customer_nic = req.body.customer_nic;

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/customers",
      "delete-customer.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(sqlQuery, { customer_nic });

    res.json({ message: "Customer record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete multiple records
router.delete("/delete-multiple-customers", async (req, res) => {
  try {
    const { nicNumbers } = req.body;

    if (!nicNumbers || !Array.isArray(nicNumbers)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/customers",
      "delete-multiple-customers.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(sqlQuery, {
      nic_numbers: {
        val: nicNumbers,
        type: oracledb.DB_TYPE_VARCHAR2,
        dir: oracledb.BIND_IN,
        maxArraySize: nicNumbers.length,
      },
    });

    res.json({ message: "Multiple customer records deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
