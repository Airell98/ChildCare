const request = require("supertest");
const app = require("../app");
const { Nanny } = require("../models");

afterAll((done) => {
    Nanny.destroy({ where: {} })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
});

describe("Nanny CRUD", () => {
    describe("Register Nanny", () => {
        it("Should return 200 and nanny object", (done) => {
        let form = {
            name : 'Siti',
            gender : 'female',
            phoneNumber : '02111234567',
            birthDate: new Date(),
            address: 'Kebayoran',
            imageUrl: 'https://www.jetorbit.com/blog/wp-content/uploads/2019/06/apa-itu-url.jpg',
            city: 'Jakarta',
            expectedSalary: 1000000,
        }
          request(app)
            .post("/nanny/register")
            .send(form)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("name");
                expect(body).toHaveProperty("gender");
                expect(body).toHaveProperty("phoneNumber");
                expect(body).toHaveProperty("birthDate");
                expect(body).toHaveProperty("address");
                expect(body).toHaveProperty("imageUrl");
                expect(body).toHaveProperty("city");
                expect(body).toHaveProperty("expectedSalary");  
                done()              
            })
            .catch((err) => {
              done(err);
            });
        });
      });
})