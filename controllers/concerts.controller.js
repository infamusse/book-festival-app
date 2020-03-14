const Concert = require("../models/concerts.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json(await Concert.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if (dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day } = req.body;

  try {
    await Concert.updateOne(
      { _id: req.params.id },
      { $set: { performer: performer } },
      { $set: { genre: genre } },
      { $set: { price: price } },
      { $set: { day: day } },
      { $set: { image: "new image" } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
