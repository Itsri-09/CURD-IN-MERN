const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected Successfully"))
  .catch(() => console.log("failed to connect"));

  // for image uploads from static folder

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/cat", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Running at", PORT);
});
