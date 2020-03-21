const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concerts.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET api/concerts/", () => {
  before(async () => {
    const testConcOne = new Concert({
      id: 1,
      performer: "U2",
      genre: "Rock",
      price: 100,
      day: 1,
      image: "src/img/u2.jpg"
    });
    await testConcOne.save();
  });

  after(async () => {
    await Concert.deleteOne({ id: 1 });
  });

  it("/ should return choosen perfomer", async () => {
    const res = await request(server).get("/api/concerts/performer/U2");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/ should return choosen genre", async () => {
    const res = await request(server).get("/api/concerts/genre/Rock");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/ should return choosen day", async () => {
    const res = await request(server).get("/api/concerts/day/1");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/ should return price range", async () => {
    const res = await request(server).get("/api/concerts/price/50/80");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(0);
  });
});
