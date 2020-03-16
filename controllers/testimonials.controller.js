const Testimonial = require("../models/testimonials.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json(await Testimonial.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  console.log("testimonials", req.body);
  try {
    const { id, author, text } = req.body;
    const newTestimonial = new Testimonial({
      id: id,
      author: author,
      text: text
    });
    await newTestimonial.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if (dep) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { id, author, text } = req.body;

  try {
    await Testimonial.updateOne(
      { _id: req.params.id },
      { $set: { id: id } },
      { $set: { author: author } },
      { $set: { text: text } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
