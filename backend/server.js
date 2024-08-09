const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config({
  path: ".env",
});

const minorRouter = require("./routes/minorRoutes");
const sportRouter = require("./routes/sportRoutes");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(morgan("short"));
app.use(express.json());

app.use("/api", minorRouter);
app.use("/api/sport", sportRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
