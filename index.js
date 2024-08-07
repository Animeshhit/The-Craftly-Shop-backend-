require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const os = require("os");

const numberOfCpus = os.cpus().length;

const connectToDb = require("./db/db");
const {
  authRoutes,
  adminRoutes,
  productsRoutes,
  ctgRoutes,
} = require("./routes");
const errorHandler = require("./functions/ErrorHandler");
const { adminMiddalware } = require("./middalware/adminMiddalware");
const { authMiddalware } = require("./middalware/authMiddalware");

// if (cluster.isPrimary) {
//   console.log(`Master ${process.pid} is running`);

//   console.log(numberOfCpus);

//   for (let i = 0; i < numberOfCpus; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.error(`worker ${worker.process.pid} is died. Restarting...`);
//     cluster.fork();
//   });
// } else {
const app = express();
const PORT = process.env.PORT || "8080";
// app.use(cors({ origin: "*" }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://thecraftly.shop",
      "https://admin.thecraftly.shop",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", ctgRoutes);
app.use("/api/v1/admin", authMiddalware, adminMiddalware, adminRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: `all systems are working perfect response given by ${process.pid} `,
    });
  } catch (err) {
    errorHandler(err, res);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error in worker ${process.pid}: ${err.message}`);
  res.status(500).send({ error: "Internal Server Error" });
});

connectToDb((connection) => {
  if (connection) {
    app.listen(PORT, () => {
      console.log(
        `server is running with the connection of database at  http://localhost:${PORT}`
      );
    });
  } else {
    console.log(`database connection error`);
  }
});
// }
