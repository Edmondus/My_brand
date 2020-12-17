import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import mockdata from "./mockdata";
import app from "../index";
import User from "../models/User";
import jwt from "jsonwebtoken";

const token = jwt.sign(mockdata.loginUser, process.env.SECRET_KEY);

chai.use(chaiHttp);
chai.should();
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("User related tests:", () => {
    
    beforeEach(async () => {
      await User.deleteMany({});
    });
    afterEach(async () => {
      await User.deleteMany({});
    });
  
    it("Should create a user", async () => {
      const res = await chai
        .request(app)
        .post("/user/signup")
        .send(mockdata.signUpUser);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("message");
    });

    it("Should login a user", async () => {
      await chai
        .request(app)
        .post("/user/signup")
        .send(mockdata.signUpUser);
  
      const res = await chai
        .request(app)
        .post("/user/loginuser")
        .send(mockdata.loginUser);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("token");
    });

    it("Should not login a user with invalid", async () => {
      await chai
        .request(app)
        .post("/user/signup")
        .send(mockdata.signUpUser);
  
      const res = await chai
        .request(app)
        .post("/user/loginuser")
        .send(mockdata.loginInvalidUser);
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.a("object");
    });

});