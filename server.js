const express = require("express"); // importing express
const cors=require("cors");

const connectDB = require("./config/DbConnect"); // importing database

const app = express(); //initialisation
require("dotenv").config(); // importing dotenv

//connect to db
connectDB();

//routes
app.use(express.json());  //convert json middleware
app.use(cors());
app.use("/user", require ("./routes/user"))
app.use("/order", require ("./routes/order"))
app.use("/product", require ("./routes/product"))

// server
const PORT=process.env.PORT
app.listen(PORT, (err) =>
  err? console.log("err"): console.log(`server is running on ${PORT}`));

