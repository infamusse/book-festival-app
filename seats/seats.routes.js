const express = require("express");
const router = express.Router();
const db = require("./../db");
const uuidv4 = require("uuid/v4");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.find(obj => obj.id == req.params.id));
});

router.route("/seats").post((req, res) => {
  const { performer, genere, price, day } = req.body;

  db.seats.push({
    id: uuidv4(),
    performer: performer,
    genre: genere,
    price: price,
    day: day,
    image: "nowe zdjęcie"
  });

  res.json({ messeage: "OK" });
});

router.route("/seats/:id").delete((req, res) => {
  const deleteRecord = index => {
    db.seats.splice(db.seats.indexOf(index), 1);
  };
  db.seats.forEach(record => {
    record.id == req.params.id
      ? deleteRecord(req.params.id)
      : console.log("tego nie usuwam: ", record.id);
  });
  res.send({ message: "OK" });
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;

  db.seats.forEach(record => {
    if (record.id == req.params.id) {
      record.day = day;
      record.seat = seat;
      record.client = client;
      record.email = email;
    }
  });
  res.send({ message: "OK" });
});

module.exports = router;
