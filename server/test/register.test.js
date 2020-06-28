const request = require("supertest");
const app = require("../app");

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
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", input.name);
          expect(body).toHaveProperty("email", input.email);
          expect(body).toHaveProperty("password");
          expect(body).toHaveProperty("city", input.city);
          expect(body).toHaveProperty("birthDate");
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
    it("Should return 400 and error messages", (done) => {
      let input = {
        email: "",
        password: "",
      };
      let output = [
        "Please insert name",
        "Please insert password",
        "name field is not found",
      ];
      request(app)
        .post("/parent/register")
        .send(input)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("error");
          expect(body).toHaveProperty("errorMessages");
          expect(Array.isArray(body.errorMessages)).toBe(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

describe("Agency register", () => {
  describe("Successfully create agency", () => {
    it("Should return 201 and obj (agency)", (done) => {
      let input = {
        name: "Baby Sitter Agency",
        email: "agency@outlook.co.id",
        password: "rahasia",
        address: "Bumi Mas Raya Blok B4 Nomor 2",
        city: "Tangerang",
        logoUrl:
          "https://image.shutterstock.com/image-vector/shield-letter-s-logosafesecureprotection-logomodern-260nw-633031571.jpg",
        phoneNumber: "081212498600",
      };
      request(app)
        .post("/agency/register")
        .send(input)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", input.name);
          expect(body).toHaveProperty("email", input.email);
          expect(body).toHaveProperty("password");
          expect(body).toHaveProperty("address", input.address);
          expect(body).toHaveProperty("city", input.city);
          expect(body).toHaveProperty("logoUrl", input.logoUrl);
          expect(body).toHaveProperty("phoneNumber", input.phoneNumber);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Failed to create agency", () => {
    it("Should return 400 and error messages", (done) => {
      let input = {
        email: "",
        password: "",
      };
      let output = [
        "Please insert name",
        "Please insert password",
        "name field is not found",
      ];
      request(app)
        .post("/agency/register")
        .send(input)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("error");
          expect(body).toHaveProperty("errorMessages");
          expect(Array.isArray(body.errorMessages)).toBe(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
