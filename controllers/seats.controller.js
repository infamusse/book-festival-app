const { uuid } = require("uuidv4");
const Seat = require("../models/seats.model");
const sanitize = require("mongo-sanitize");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json(await Seat.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  console.log("seats", req.body);

  const cleanClient = sanitize(req.body.client);
  const cleanEmail = sanitize(req.body.email);

  console.log("clean", cleanClient, cleanEmail);

  try {
    const { day, seat } = req.body;
    const newSeat = new Seat({
      id: uuid(),
      day: day,
      seat: seat,
      client: cleanClient,
      email: cleanEmail
    });
    console.log("newSeat", newSeat);
    await newSeat.save();
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if (dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { seat, day } = req.body;

  const cleanClient = sanitize(req.body.client);
  const cleanEmail = sanitize(req.body.email);

  try {
    await Seat.updateOne(
      { _id: req.params.id },
      { $set: { client: cleanClient } },
      { $set: { seat: seat } },
      { $set: { email: cleanEmail } },
      { $set: { day: day } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
