const app = require("../app");
const response = require("supertest");
const { Parent } = require("../models");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxMjE3MzQ2fQ.ALIgmxZb8YbtAbF6x-Xs425Zg_F2qlRIZ1_xTvj2j6c"; // role = 'Parent'
let falseToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkxMjE3NjY2fQ.HnJpcDmXufFoKYYR-775gpvX9QjTnQvg-pHsDHtsM8Q"; // role = 'Agency'

beforeAll(() => {
  Parent.create({
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

describe("Parent's CRUD using ");
