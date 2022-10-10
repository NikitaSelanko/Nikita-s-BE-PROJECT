const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data");

beforeEach(() => {
  return seed({ categoryData, commentData, reviewData, userData });
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
        .then((result) => {
          const catArr = result.body.categories;
          expect(catArr).toBeInstanceOf(Array);
          expect(catArr.length).toBe(4)
          catArr.forEach((category)=>{
            expect(category.hasOwnProperty("slug")).toBe(true)
            expect(category.hasOwnProperty("description")).toBe(true)

          })
        });
    });
    test("status 200, should responde withan array of category objects, each of which should have the following properties: slug & description properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result) => {
          const catArr = result.body.categories;
          catArr.forEach((category) => {
            expect(catArr[0]).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});
// "status 200, should responde withan array of category objects, each of which should have the following properties: slug & description properties"
