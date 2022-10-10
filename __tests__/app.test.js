const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed")
const {categoryData, commentData, reviewData, userData} = require("../db/data/test-data")

beforeEach(() => {
  return seed({categoryData, commentData, reviewData, userData});
});
afterAll(() => {
  return db.end();
});

describe("Categories tests", () => {
  describe("Get/categories", () => {
    test("status 200, should responde withan array of categories ", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result)=>{
            expect(result.body.categories).toBeInstanceOf(Array)
        })
    });
  });
});
// "status 200, should responde withan array of category objects, each of which should have the following properties: slug & description properties"