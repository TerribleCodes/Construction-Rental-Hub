const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

// There's an error associated with passing data via frontend due to data types. But works fine with POSTMAN.
router.post("/insert-customer", async (req, res) => {
  const { customer_nic, name, address, phone } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql =
      "INSERT INTO CUSTOMERS (CUSTOMER_NIC, NAME, ADDRESS, PHONE) VALUES (:customer_nic, :name, :address, :phone)";
    const bindParams = {
      customer_nic: customer_nic,
      name: name,
      address: address,
      phone: parseInt(phone),
    };

    const result = await connection.execute(sql, bindParams, {
      autoCommit: true,
    });

    console.log("Data inserted into CUSTOMER table.");
    res.json({ message: "Customer data received and processed successfully." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data." });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = "SELECT * FROM CUSTOMERS";
    const result = await connection.execute(sql);
    connection.close();

    const customers = result.rows;
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ error: "Failed to fetch customer data." });
  }
});

module.exports = router;
