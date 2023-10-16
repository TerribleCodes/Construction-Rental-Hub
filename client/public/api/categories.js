// Created to check the connectivity between the frontend and the database
const express = require("express");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const app = express();

app.use(bodyParser.json());

const dbConfig = {
  user: "HR",
  password: "123",
  connectString: "localhost/xe",
};

oracledb.autoCommit = true;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Category API");
});

app.get("/all", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const query = "SELECT * FROM hr.customer";
    const result = await connection.execute(query);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

app.post("/category", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const { name, description } = req.body;
    const categoryId = Math.floor(Date.now() / 1000);

    const query =
      "INSERT INTO categories (id, name, description) VALUES (:id, :name, :description)";
    const binds = { id: categoryId, name, description };
    const options = { autoCommit: true };

    await connection.execute(query, binds, options);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

app.delete("/category/:categoryId", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const categoryId = parseInt(req.params.categoryId);

    const query = "DELETE FROM categories WHERE id = :id";
    const binds = { id: categoryId };
    const options = { autoCommit: true };

    const result = await connection.execute(query, binds, options);

    if (result.rowsAffected === 1) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

app.put("/category", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const { id, name, description } = req.body;

    const query =
      "UPDATE categories SET name = :name, description = :description WHERE id = :id";
    const binds = { id, name, description };
    const options = { autoCommit: true };

    const result = await connection.execute(query, binds, options);

    if (result.rowsAffected === 1) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});
