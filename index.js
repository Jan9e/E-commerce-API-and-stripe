const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv= require("dotenv");
const userroute = require("./routes/User");
const authroute =require("./routes/auth");
const productroute=require("./routes/Product");
const cartroute=require("./routes/Cart");
const orderroute =require("./routes/Order");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => 
        console.log("DB connection successful"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());    
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use("/api/products", productroute);
app.use("/api/cart", cartroute);
app.use("/api/order", orderroute);

app.listen(process.env.PORT || 5000, () => {
    console.log("server is running !!");
})