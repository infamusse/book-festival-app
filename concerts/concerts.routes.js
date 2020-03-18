const express = require("express");
const router = express.Router();

const ConcertController = require("../controllers/concerts.controller");

router.get("/concerts", ConcertController.getAll);

router.get("/concerts/:id", ConcertController.getOne);

//TESTS TO DO !!!

router.get("/concerts/performer/:performer", ConcertController.getPerfomer);

router.get("/concerts/genre/:genre", ConcertController.getGenre);

router.get("/concerts/day/:day", ConcertController.getDay);

router.get(
  "/concerts/price/:price_min/:price_max",
  ConcertController.getPriceRange
);

//

router.put("/concerts/:id", ConcertController.put);

router.delete("/concerts/:id", ConcertController.delete);

module.exports = router;
