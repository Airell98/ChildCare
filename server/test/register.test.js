const request = require("supertest");
const app = require("../app");
const { Parent, Agency, sequelize } = require("../models");
const hashPass = require("../helper/hashPass");

afterAll((done) => {
  Parent.destroy({})
    .then(() => done())
    .catch((err) => done(err));

  Agency.destroy({})
    .then(() => done())
    .catch((err) => done(err));
});

describe("Parent register", () => {
  describe("Successfully create parent", () => {
    it("Should return 201 and obj (parent)", (done) => {
      let input = {
        name: "Fadhlan",
        email: "fadhlan@outlook.co.id",
        password: "rahasia",
        city: "Tangerang",
        birthDate: new Date(1995, 7, 11),
        address: "Bumi Mas Raya Blok B4 Nomor 2",
        phoneNumber: "081212498600",
        gender: "male",
      };
      request(app)
        .post("/parent/register")
        .send(input)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(201);
          expect(body).toHaveProperty("email", input.email);
          expect(body).toHaveProperty("password", hashPass(input.password));
          expect(body).toHaveProperty("city", input.city);
          expect(body).toHaveProperty("birthDate", input.birthDate);
          expect(body).toHaveProperty("address", input.address);
          expect(body).toHaveProperty("phoneNumber", input.phoneNumber);
          expect(body).toHaveProperty("gender", input.gender);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Failed to create parent", () => {
    it("Should return 400 and obj (status, msg)", (done) => {
      let input = {
        email: "",
        password: "",
        role: "",
      };
      let output = [
        "Email cannot be empty",
        "Password cannot be empty",
        "Role must be User or Admin",
      ];
      request(app)
        .post("/users/register")
        .send(input)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(400);
          expect(body).toHaveProperty("status");
          expect(body.status).toBe(400);
          expect(body).toHaveProperty("msg");
          expect(Array.isArray(body.msg)).toBe(true);
          expect(body.msg).toEqual(expect.arrayContaining(output));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
