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

router.post("/get-product-by-id", async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res
        .status(400)
        .json({ error: "Product ID is required in the request body" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    // Read the SQL query from the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "get-product-by-id.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    // Bind the product_id parameter to the SQL query
    const result = await connection.execute(sqlQuery, { product_id });

    res.json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

router.post("/insert-multiple-products", async (req, res) => {
  try {
    const { productData } = req.body;

    if (!productData || !Array.isArray(productData)) {
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
      "insert-multiple-products.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    await connection.execute(sqlQuery, { productData }, { autoCommit: true });

    res.json({ message: "Products inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-product", async (req, res) => {
  try {
    const { product_id, product_name, product_price, product_stock } = req.body;

    if (!product_id || !product_name || !product_price || !product_stock) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    // Read the SQL query from the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "update-product.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    // Execute the dynamic PL/SQL block with req.body parameters
    await connection.execute(sqlQuery, req.body, { autoCommit: true });

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-multiple-products", async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const productIds = req.body.productIds;
    const productNames = req.body.productNames;
    const productPrices = req.body.productPrices;
    const productStocks = req.body.productStocks;

    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "update-multiple-products.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const bindVars = {
      productIds: { dir: oracledb.BIND_IN, val: productIds },
      productNames: { dir: oracledb.BIND_IN, val: productNames },
      productPrices: { dir: oracledb.BIND_IN, val: productPrices },
      productStocks: { dir: oracledb.BIND_IN, val: productStocks },
    };

    const result = await connection.execute(sqlQuery, bindVars);

    res.json({ message: "Products updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // {
  //   "error": "ORA-01008: not all variables bound\nHelp: https://docs.oracle.com/error-help/db/ora-01008/"
  // }
});

router.delete("/delete-product", async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "delete-product.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(sqlQuery, { product_id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/delete-multiple-products", async (req, res) => {
  try {
    const productData = req.body.productData;

    const connection = await oracledb.getConnection({
      user: "HR",
      password: "123",
      connectString: "localhost/xe",
    });

    const sqlFilePath = path.join(
      __dirname,
      "../sql/products",
      "delete-multiple-products.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

    const result = await connection.execute(sqlQuery, { productData });

    res.json({ message: "Products deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
