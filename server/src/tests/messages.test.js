import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import mockdata from "./mockdata";
import app from "../index";
import Message from "../models/Message";
import jwt from "jsonwebtoken";

const token = jwt.sign(mockdata.loginUser, process.env.SECRET_KEY);

chai.use(chaiHttp);
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("Query related tests:", async() => {
   
    afterEach(async () => {
      await Message.deleteMany({});
    });

    it('It should save a message', async ()=> {
        const res = await chai.request(app).post('/messages/saveMessage').send(mockdata.query);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("Message");
    });

    it('It should not save a message', async ()=> {
      const res = await chai.request(app).post('/messages/saveMessage').send({});
      expect(res.status).to.be.equal(403);
      expect(res.body.message).to.equal('Invalid email.');
  });
  it("Should allow the admin to view all queries sent", async () => {
    await chai.request(app).post("/saveMessage").send(mockdata.query);
    const res = await chai
      .request(app)
      .get("/messages")
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
    
  });
  it("Should not allow a user with no token to view queries ", async () => {
    await chai.request(app).post("/saveMessage").send(mockdata.query);
    const res = await chai.request(app).get("/messages").set("authorization", "");
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("err");
  });
  it("Should not allow a user with invalid token to view queries ", async () => {
    await chai.request(app).post("/saveMessage").send(mockdata.query);
    const res = await chai
      .request(app)
      .get("/messages")
      .set("authorization", "Bearer Invalid_token");
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    
  });
});
