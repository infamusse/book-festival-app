const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../../../server.js");
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

  //   after(async () => {
  //     await Concert.deleteMany();
  //   });

  it("/ should return choosen perfomer", async () => {
    const res = await request(server).get("http://localhost:8000/api");
    // expect(res.status).to.be.equal(200);
    // expect(res.body).to.be.an("object");
    // expect(res.body.length).to.be.equal(2);
  });
});
