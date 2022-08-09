require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./controllers/userController");
const mongoose = require("mongoose");
app.use(express.json());
app.use("/", userRoutes);

const mongoURI = "mongodb://localhost:27017/nyka";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("error ", err);
  });
app.listen(process.env.PORT, () => {
  console.log("Server Running at port ", process.env.PORT);
});
