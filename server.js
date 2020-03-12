const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");

const concertsRoutes = require("./concerts/concerts.routes");
const seatsRoutes = require("./seats/seats.routes");
const testimonialsRoutes = require("./testimonials/testimonials.routes");

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/api", (req, res) => {
  res.json(db);
});

app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", testimonialsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// connects our backend code with the database
// mongoose.connect("mongodb://localhost:27017/festivalDB", {
//   useNewUrlParser: true
// });
// const db = mongoose.connection;

// db.once("open", () => {
//   console.log("Connected to the database");
// });
// db.on("error", err => console.log("Error " + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});

const io = socket(server);

io.on("connection", socket => {
  console.log("New socket!");
});
