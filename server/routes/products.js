const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const { error } = require("console");

const dbConfig = {
  user: "dbadmin",
  password: "S0jF27lOk",
  connectString: "localhost/xe",
};

// Works with POSTMAN :3 Not with the frontend
router.post("/insert-product", async (req, res) => {
  const { product_id, name, price, stock } = req.body;

  if (!isNumeric(price) || !isNumeric(stock) || !product_id || !name) {
    return res.status(400).json({
      error: "Invalid input. Please enter valid data.",
    });
  }

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO products (product_id, name, rent, stock) VALUES (:product_id, :name, :rent, :stock)`;
    const bindParams = {
      product_id: product_id,
      name: name,
      rent: parseFloat(price),
      stock: parseFloat(stock),
    };

    const result = await connection.execute(sql, bindParams, {
      autoCommit: true,
    });

    console.log("Data inserted into products table.");
    res.json({ message: "Product data received and processed successfully." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data." });
  }
});

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports = router;
