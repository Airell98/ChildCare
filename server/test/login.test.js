const request = require("supertest");
const app = require("../app");
const { Parent, Agency, sequelize } = require("../models");

beforeAll(() => {
  Parent.create({
    name: "Fadhlan",
    email: "fadhlan@outlook.co.id",
    password: "rahasia",
    city: "Tangerang",
    birthDate: new Date(1995, 7, 11),
    address: "Bumi Mas Raya Blok B4 Nomor 2",
    phoneNumber: "081212498600",
    gender: "male",
  });

  Agency.create({
    name: "Baby Sitter Agency",
    email: "agency@outlook.co.id",
    password: "rahasia",
    address: "Bumi Mas Raya Blok B4 Nomor 2",
    city: "Tangerang",
    logoUrl:
      "https://image.shutterstock.com/image-vector/shield-letter-s-logosafesecureprotection-logomodern-260nw-633031571.jpg",
    phoneNumber: "081212498600",
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

  Agency.destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Parent try to login:", () => {
  describe("Success:", () => {
    it("Should return 200 and access_token", (done) => {
      let input = {
        email: "fadhlan@outlook.co.id",
        password: "rahasia",
      };
      request(app)
        .post("/parent/login")
        .send(input)
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          console.log("parent's token", body.access_token);
          expect(body).toHaveProperty("access_token");
          expect(typeof body.access_token).toBe("string");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Failed:", () => {
    describe("Wrong email", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "jajaja@outlook.co.id",
          password: "rahasia",
        };
        request(app)
          .post("/parent/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Wrong password", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "fadhlan@outlook.co.id",
          password: "rafsdhasia",
        };
        request(app)
          .post("/parent/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Email or password is not found or empty", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "",
        };
        request(app)
          .post("/parent/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});

describe("Agency try to login:", () => {
  describe("Success:", () => {
    it("Should return 200 and access_token", (done) => {
      let input = {
        email: "agency@outlook.co.id",
        password: "rahasia",
      };
      request(app)
        .post("/agency/login")
        .send(input)
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          console.log("agency's token", body.access_token);
          expect(body).toHaveProperty("access_token");
          expect(typeof body.access_token).toBe("string");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Failed:", () => {
    describe("Wrong email", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "jajaja@outlook.co.id",
          password: "rahasia",
        };
        request(app)
          .post("/agency/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Wrong password", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "agency@outlook.co.id",
          password: "rafsdhasia",
        };
        request(app)
          .post("/agency/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Email or password is not found or empty", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "",
        };
        request(app)
          .post("/agency/login")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
