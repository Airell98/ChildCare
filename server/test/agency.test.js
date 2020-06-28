const request = require("supertest");
const app = require("../app");
const { Agency } = require("../models");
const { response } = require("express");

beforeAll(() => {
  Agency.create({
    id: 100,
    name: "Baby Sitter Agency",
    email: "agency@outlook.co.id",
    password: "rahasia",
    address: "Bumi Mas Raya Blok B4 Nomor 2",
    city: "Tangerang",
    logoUrl:
      "https://image.shutterstock.com/image-vector/shield-letter-s-logosafesecureprotection-logomodern-260nw-633031571.jpg",
    phoneNumber: "081212498600",
  });
  Agency.create({
    id: 100,
    name: "Super Nanny Agency",
    email: "agency1@outlook.co.id",
    password: "secret",
    address: "Bumi Mas Raya Blok B4 Nomor 2",
    city: "Tangerang",
    logoUrl:
      "https://image.shutterstock.com/image-vector/shield-letter-s-logosafesecureprotection-logomodern-260nw-633031571.jpg",
    phoneNumber: "081212498600",
  });
});

afterAll((done) => {
  Agency.destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Agency CRUD by agency", () => {
  describe("Get all agencies data", () => {
    it("Should return 200 and array of agency object", (done) => {
      request(app)
        .get("/agency/")
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

  describe("Get one agency data by its id", () => {
    describe("Success (id is found)", () => {
      it("Should return 200 and agency object", (done) => {
        request(app)
          .get("/agency/100")
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(200);
            expect(body.id).toBe(100);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Failed (id is not found)", () => {
      it("Should return 404 and message", (done) => {
        request(app)
          .get("/agency/1000")
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty("error", "ERR_NOT_FOUND");
            expect(body).toHaveProperty("errorMessages");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
