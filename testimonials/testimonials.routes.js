const express = require("express");
const db = require("./../db");
const uuidv4 = require("uuid/v4");

const router = express.Router();

router.route("/testimonials/random").get((req, res) => {
  const random = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[random]);
});

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/:id").get((req, res) => {
  res.json(db.testimonials.find(obj => obj.id == req.params.id));
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;

  db.testimonials.push({ id: uuidv4(), author: author, text: text });

  res.json({ message: "OK" });
});

router.route("/testimonials/:id").delete((req, res) => {
  console.log("req.params.id: ", req.params.id);
  const deleteRecord = index => {
    console.log("deleteRecord id: ", index);
    db.testimonials.splice(db.testimonials.indexOf(index), 1);
  };
  db.testimonials.forEach(record => {
    record.id == req.params.id
      ? deleteRecord(req.params.id)
      : console.log("tego nie usuwam: ", record.id);
  });
  res.send({ message: "OK" });
});

router.route("/testimonials/:id").put((req, res) => {
  const { author, text } = req.body;

  db.testimonials.forEach(record => {
    if (record.id == req.params.id) {
      record.author = author;
      record.text = text;
    }
  });
  res.send({ message: "OK" });
});

module.exports = router;
