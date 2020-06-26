const app = require("../app");
const response = require("supertest");
const { Parent } = require("../models");

beforeAll(() => {
  Parent.create({
    id: 100,
    name: "Mobil",
    image_url: "gambar_mobil.img",
    price: 500000000,
    stock: 10,
  });
  Parent.create({
    id: 101,
    name: "Mobil",
    image_url: "gambar_mobil.img",
    price: 250000000,
    stock: 11,
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
