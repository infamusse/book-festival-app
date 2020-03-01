const express = require("express");
const router = express.Router();
const db = require("./../db");

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  res.json(db.concerts.find(obj => obj.id == req.params.id));
});

router.route("/concerts/:id").delete((req, res) => {
  const deleteRecord = index => {
    db.concerts.splice(db.concerts.indexOf(index), 1);
  };
  db.concerts.forEach(record => {
    record.id == req.params.id
      ? deleteRecord(req.params.id)
      : console.log("tego nie usuwam: ", record.id);
  });
  res.send({ message: "OK" });
});

router.route("/concerts/:id").put((req, res) => {
  const { performer, genre, price, day } = req.body;

  db.concerts.forEach(record => {
    if (record.id == req.params.id) {
      record.performer = performer;
      record.genre = genre;
      record.price = price;
      record.day = day;
      record.image = "new Image";
    }
  });
  res.send({ message: "OK" });
});

module.exports = router;
