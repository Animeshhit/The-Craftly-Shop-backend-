require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToDb = require("./db/db");
const { authRoutes, adminRoutes, productsRoutes } = require("./routes");
const errorHandler = require("./functions/ErrorHandler");
const { adminMiddalware } = require("./middalware/adminMiddalware");

const app = express();
const PORT = process.env.PORT || "8080";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1/admin", adminMiddalware, adminRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "all systems are working perfect" });
  } catch (err) {
    errorHandler(err, res);
  }
});

connectToDb((connection) => {
  if (connection) {
    app.listen(PORT, () => {
      console.log(
        `server is running with the connection of database at port ${PORT}`
      );
    });
  } else {
    console.log(`server can't be start something went wrong`);
  }
});
