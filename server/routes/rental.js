const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

router.post("/insert-order-and-items", async (req, res) => {
  const { order_id, nic, product_ids, stock } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const bindVars = {
      p_order_id: order_id,
      p_nic: nic,
      p_product_ids: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_IN,
        val: product_ids,
      },
      p_stock: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: stock },
    };

    const result = await connection.execute(
      "BEGIN insert_order_and_items(:p_order_id, :p_nic, :p_product_ids, :p_stock); END;",
      bindVars
    );

    await connection.commit();
    await connection.close();

    res.json({ message: "Data inserted successfully." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data." });
  }
});
module.exports = router;
