const express = require("express");
const db = require("./db");
const cors = require("cors");
const path = require("path");

const concertsRoutes = require("./concerts/concerts.routes");
const seatsRoutes = require("./seats/seats.routes");
const testimonialsRoutes = require("./testimonials/testimonials.routes");

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json(db);
});

app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", testimonialsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});
