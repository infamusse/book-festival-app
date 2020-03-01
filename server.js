const express = require("express");
const db = require("./db");
const concertsRoutes = require("./concerts/concerts.routes");
const seatsRoutes = require("./seats/seats.routes");
const testimonialsRoutes = require("./testimonials/testimonials.routes");

const app = express();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", testimonialsRoutes);

app.listen(8000, () => {
  console.log("App runing on port 8000");
});
