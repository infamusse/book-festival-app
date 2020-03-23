const Concert = require("../models/concerts.model");
const sanitize = require("mongo-sanitize");

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

exports.getPerfomer = async (req, res) => {
  try {
    res.json(await Concert.find({ performer: { $eq: req.params.performer } }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    res.json(await Concert.find({ genre: { $eq: req.params.genre } }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    res.json(await Concert.find({ day: { $eq: req.params.day } }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPriceRange = async (req, res) => {
  try {
    res.json(
      await Concert.find({
        price: { $gte: req.params.price_min },
        price: { $lte: req.params.price_max }
      })
    );
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
  const { price, day } = req.body;

  const cleanPerformer = sanitize(req.body.performer);
  const cleanGenre = sanitize(req.body.genre);

  try {
    await Concert.updateOne(
      { _id: req.params.id },
      { $set: { performer: cleanPerformer } },
      { $set: { genre: cleanGenre } },
      { $set: { price: price } },
      { $set: { day: day } },
      { $set: { image: "new image" } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
