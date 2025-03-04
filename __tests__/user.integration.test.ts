import request from "supertest";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `${process.env.BASE_URL}`;

describe("Integration Test", () => {
  let userId = 10;
  let postId: number;

  describe("[POST] /createUser", () => {
    it("should create a user.", async () => {
      const userData = {
        name: "test_user ",
        email: "test@example.com",
      };

      const response = await request(BASE_URL)
        .post(`/users/${userId}`)
        .send(userData);

      expect(response.body).toMatchObject({
        status: "success",
        message: "User inserted successfully.",
      });
    }, 10000);
  });

  describe("[GET] /getUsers", () => {
    it("should get all users", async () => {
      const response = await request(BASE_URL).get("/users");

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    }, 10000);
  });

  describe("[GET] /getUsersCount", () => {
    it("should get all users count", async () => {
      const response = await request(BASE_URL).get("/users/count");

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(
        typeof response.body.data === "number" &&
          Number.isFinite(response.body.data)
      ).toBe(true);
    }, 10000);
  });

  describe("[GET] /getUserById", () => {
    it("should get a user by id", async () => {
      const response = await request(BASE_URL).get(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(response.body.data.id).toEqual(userId);
    }, 10000);
  });

  describe("[POST] /createAddress", () => {
    it("should create an address.", async () => {
      const addressData = {
        userId: String(userId),
        street: "test_street",
        city: "test_city",
        state: "test_state",
        postal_code: "test_postal_code",
      };

      const response = await request(BASE_URL)
        .post("/addresses")
        .send(addressData);

      expect(response.body).toMatchObject({
        status: "success",
        message: "Address inserted successfully.",
      });
    }, 10000);
  });

  describe("[GET] /getUserAddress", () => {
    it("should get user address", async () => {
      const response = await request(BASE_URL).get(`/addresses/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(response.body.data.city).toEqual("test_city");
    }, 10000);
  });

  describe("[PATCH] /updateAddress", () => {
    it("should update user address", async () => {
      const response = await request(BASE_URL).patch(`/addresses/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(response.body.message).toEqual("Address updated successfully.");
      expect(
        typeof response.body.data === "number" &&
          Number.isFinite(response.body.data)
      ).toBe(true);
    }, 10000);
  });

  describe("[POST] /createPost", () => {
    it("should create a post.", async () => {
      const postData = {
        userId: String(userId),
        title: "test_title",
        body: "test_body",
      };

      const response = await request(BASE_URL).post("/posts").send(postData);

      postId = response.body.data;

      expect(response.body).toMatchObject({
        status: "success",
        message: "Post inserted successfully.",
      });
    }, 10000);
  });

  describe("[GET] /getPosts", () => {
    it("should get all posts for a user", async () => {
      const response = await request(BASE_URL).get(`/posts?userId=${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    }, 10000);
  });

  describe("[DELETE] /deletePost", () => {
    it("should delete post", async () => {
      const response = await request(BASE_URL).delete(`/posts/${postId}`);

      expect(response.status).toBe(204);
    }, 10000);
  });
});
