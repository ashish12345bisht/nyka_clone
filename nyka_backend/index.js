require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./controllers/userController");
const mongoose = require("mongoose");
var cors = require("cors");
app.use(express.json());

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

app.use(cors());
app.use("/", userRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server Running at port ", process.env.PORT);
});
