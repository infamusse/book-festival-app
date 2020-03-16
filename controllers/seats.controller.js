const { uuid } = require("uuidv4");
const Seat = require("../models/seats.model");

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
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      id: uuid(),
      day: day,
      seat: seat,
      client: client,
      email: email
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
  const { client, seat, email, day } = req.body;

  try {
    await Seat.updateOne(
      { _id: req.params.id },
      { $set: { client: client } },
      { $set: { seat: seat } },
      { $set: { email: email } },
      { $set: { day: day } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
