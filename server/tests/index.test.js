import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

chai.use(chaiHttp);
const { it, describe } = mocha;
const { expect } = chai;

describe("index test:", () => {
  it("should display a Not found message", async () => {
    const res = await chai.request(app).get("/edmond");
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

});