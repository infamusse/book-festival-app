const Testimonial = require("../models/testimonials.model");
const sanitize = require("mongo-sanitize");

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

  const cleanAuthor = sanitize(req.body.author);
  const cleanText = sanitize(req.body.text);

  try {
    const { id } = req.body;
    const newTestimonial = new Testimonial({
      id: id,
      author: cleanAuthor,
      text: cleanText
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
  const { id } = req.body;

  const cleanAuthor = sanitize(req.body.author);
  const cleanText = sanitize(req.body.text);

  try {
    await Testimonial.updateOne(
      { _id: req.params.id },
      { $set: { id: id } },
      { $set: { author: cleanAuthor } },
      { $set: { text: cleanText } }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
