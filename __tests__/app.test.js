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

describe("Categories TESTS", () => {
  describe("Get/categories", () => {
    test("status 200, should responde withan array of categories ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result) => {
          const catArr = result.body.categories;
          expect(catArr).toBeInstanceOf(Array);
          expect(catArr.length).toBe(4);
          catArr.forEach((category) => {
            expect(category.hasOwnProperty("slug")).toBe(true);
            expect(category.hasOwnProperty("description")).toBe(true);
          });
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

describe("Reviews TESTS", () => {
  describe("Get/reviews", () => {
    test("status 200, responds with object which should have the following properties ", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body: { review } }) => {
          expect(review).toBeInstanceOf(Object);
          expect(review).toEqual(
            expect.objectContaining({
              review_id: 2,
              title: "Jenga",
              review_body: "Fiddly fun for all the family",
              designer: "Leslie Scott",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              votes: 5,
              category: "dexterity",
              owner: "philippaclaire9",
              created_at: expect.any(String),
              comment_count: "3",
            })
          );
        });
    });
   
  describe('PATCH/reviews', () => {  
      test("status 200: should update votes on selected review and return updated object ", () => {
        return request(app)
        .patch("/api/reviews/1")
        .send({inc_votes: 5})
        .expect(200)
        .then(({body:{ review }})=>{ expect(review).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: expect.any(String),
          votes: 6,
            })
      })
    });
  });
});

describe('Users TESTS', () => {
  describe('GET/users', () => {
    test('Status 200, responds with  an array of objects, each object should have the following properties: username, name, avatar_url ', () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((result) => {
          const userArr = result.body.users;
          expect(userArr).toBeInstanceOf(Array);
          expect(userArr.length).toBe(4);
          userArr.forEach((category) => {
            expect(category.hasOwnProperty("username")).toBe(true);
            expect(category.hasOwnProperty("name")).toBe(true);
            expect(category.hasOwnProperty("avatar_url")).toBe(true);
          });
        });
    });
  });
});
describe("ERROR's", () => {
  describe('GET error handling', () => {
    test("status: 400, Bad Request", () => {
      return request(app)
        .get("/api/reviews/not an ID")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("wrong input");
        });
    });
    test("status: 404, Not Found", () => {
      return request(app)
        .get("/api/reviews/10000000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID NOT FOUND");
        });
    });
  });
  describe('PATCH error handling', () => {
    test("status: 400, when property is  missing", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("wrong input");
        });
    });
    test("status: 400, when property is not a number", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({ inc_votes: "something that's NaN" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("wrong input");
        });
    });
    test("status: 404, when no id exists", () => {
      return request(app)
        .patch("/api/reviews/123")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID NOT FOUND");
        });
    });
    test("status: 400, Bad Request", () => {
      return request(app)
        .patch("/api/reviews/not an ID")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("wrong input");
        });
    });

  });
  
});
});