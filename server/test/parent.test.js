const request = require("supertest");
const app = require("../app");
const { Parent } = require("../models");
const { response } = require("express");
let correctToken = "";
let falseToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6Im1hcnlAb3V0bG9vay5jby5pZCIsImlhdCI6MTU5MzM0NDUzNn0.HWqzCDLrElbxaImPiDdpssYbRzaH8ZBrHDbp32FNgEo"; // role = 'Agency'

beforeAll(() => {
  Parent.create({
    id: 100,
    name: "Fadhlan",
    email: "fadhlan@outlook.co.id",
    password: "rahasia",
    birthDate: new Date(1995, 7, 11),
    phoneNumber: "081212498600",
    address: "Bumi Mas Raya Blok B4 Nomor 2",
    city: "Tangerang",
    gender: "male",
  });
  Parent.create({
    id: 101,
    name: "Mary",
    email: "mary@outlook.co.id",
    password: "secret",
    birthDate: new Date(1996, 7, 11),
    phoneNumber: "081212490000",
    address: "Bumi Mas Raya Blok B4 Nomor 5",
    city: "Jakarta",
    gender: "female",
  });
});

afterAll((done) => {
  Parent.destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Parent CRUD by agency", () => {
  describe("Get all parents data", () => {
    it("Should return 200 and array of parent object", (done) => {
      request(app)
        .get("/parent/")
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

  describe("Get one parent data by its id", () => {
    describe("Success (id is found)", () => {
      it("Should return 200 and parent object", (done) => {
        request(app)
          .get("/parent/100")
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
          .get("/parent/1000")
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

  describe("Update parent", () => {
    describe("Failed: ", () => {
      describe("Parent not logged in", () => {
        it("Should return 403", (done) => {
          request(app)
            .put("/parent/100")
            .then((response) => {
              const { body, status } = response;
              expect(status).toBe(403);
              expect(body.error).toBe("TOKEN_NOT_FOUND");
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });

      describe("Agency logged in", () => {
        it("Should return 403", (done) => {
          request(app)
            .put("/parent/100")
            .set("access_token", falseToken)
            .then((response) => {
              const { body, status } = response;
              expect(status).toBe(401);
              expect(body.error).toBe("AUTHORIZATION_FAILED");
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });
    });
  });
});
