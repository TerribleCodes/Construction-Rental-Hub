const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT;

const customerRoute = require("./routes/customers");
app.use("/customers", customerRoute);
const productsRoute = require("./routes/products");
app.use("/products", productsRoute);
const rentalRoute = require("./routes/rental");
app.use("/rental", rentalRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
