const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const fs = require("fs");
const path = require("path");

router.get("/all-products", (req, res) => {
  async function fetchDataCustomers() {
    try {
      const connection = await oracledb.getConnection({
        user: "HR",
        password: "123",
        connectString: "localhost/xe",
      });
      const result = await connection.execute(`SELECT * FROM hr.products`);
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

router.post("/insert-product", async (req, res) => {
  try {
    const productData = req.body;

    if (!productData || typeof productData !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "insert-product.sql"
    );
    const plsqlBlock = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(plsqlBlock, {
      product_id: productData.product_id,
      product_name: productData.product_name,
      product_price: productData.product_price,
      product_stock: productData.product_stock,
    });

    await connection.commit();

    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
