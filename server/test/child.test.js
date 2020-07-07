const request = require("supertest");
const app = require("../app");
const { Child } = require("../models");
const { response } = require("express");

beforeAll(() => {
  Child.create({
    id: 100,
    name: "Fadhlan",
    birthDate: new Date(1995, 7, 11),
    phoneNumber: "081212498600",
    condition: "Well",
    gender: "male",
  });
  Child.create({
    id: 101,
    name: "Fadhlan",
    birthDate: new Date(1995, 7, 11),
    phoneNumber: "081212498600",
    condition: "Well",
    gender: "male",
  });
});

afterAll((done) => {
  Child.destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Child CRUD by agency", () => {
  describe("Get all children data", () => {
    it("Should return 200 and array of child object", (done) => {
      request(app)
        .get("/child/")
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
