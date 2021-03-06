import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import mockdata from "./mockdata";
import app from "../index";
import Article from "../models/Message";
import jwt from "jsonwebtoken";

const token = jwt.sign(mockdata.loginUser, process.env.SECRET_KEY);

chai.use(chaiHttp);
chai.should();
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("Post related tests:", async () => {
  beforeEach(async () => {
    await Article.deleteMany({});
  });

  afterEach(async () => {
    await Article.deleteMany({});
  });

  it("Should create an article", async () => {
    const res = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("data");
  });

  it("Should not create an article when user did not provide a token", async () => {
    const res = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", "")
      .send(mockdata.article);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("err");
  });

  it("Should display a list of articles", async () => {
    await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);
    const res = await chai.request(app).get("/articles");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("data");
  });

  it("should update an article", async () => {
    const blogRes = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);

    const res = await chai
      .request(app)
      .put(`/articles/updateArticle/${blogRes.body.data._id}`)
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not update an article if no token provided", async () => {
    const blogRes = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);

    const res = await chai
      .request(app)
      .put(`/articles/updateArticle/${blogRes.body.data._id}`)
      .set("authorization", `Bearer ${token}e`)
      .send(mockdata.article);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property("err");
  });

  // it("should not update an article if article does not exist", async () => {
  //   const articleId = 12;

  //   const res = await chai
  //     .request(app)
  //     .put(`/articles/updateArticle/${articleId}`)
  //     .set("authorization", `Bearer ${token}`)
  //     .send(mockdata.article);
  //   expect(res.status).to.be.equal(404);
  //   expect(res.body).to.have.property("err");
  // });

  it("should delete an article", async () => {
    const blogRes = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);

    const res = await chai
      .request(app)
      .delete(`/articles/deleteArticle/${blogRes.body.data._id}`)
      .set("authorization", `Bearer ${token}`)
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not delete an article if no token provided", async () => {
    const blogRes = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);

    const res = await chai
      .request(app)
      .delete(`/articles/deleteArticle/${blogRes.body.data._id}`)
      .set("authorization", `Bearer e`)
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property("err");
  });

  it("should get one article", async () => {
    const blogRes = await chai
      .request(app)
      .post("/articles/saveArticle")
      .set("authorization", `Bearer ${token}`)
      .send(mockdata.article);

    const res = await chai
      .request(app)
      .get(`/articles/${blogRes.body.data._id}`)
    expect(res.status).to.be.equal(200);
  });

});
