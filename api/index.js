const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const contactRoute= require("./routes/contact");
const cloudinary = require("cloudinary");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "10mb"}));
const port=process.env.PORT;

mongoose
.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/contact", contactRoute);

app.listen(port, () => {
  console.log(`server is running`);
});
