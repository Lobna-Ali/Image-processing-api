import supertest from "supertest";
import app from "../server";

describe("Router", () => {
  it("should return the resized image successfully", async () => {
    await supertest(app)
      .get("/api/resize/sea.jpg")
      .query({ height: 300, width: 500 })
      .expect(200);
  });

  it("should return error for invalid sizing", async () => {
    await supertest(app)
      .get("/api/resize/sea.jpg")
      .query({ height: "u", width: 500 })
      .expect(400);
  });

  it("should return error for not found image", async () => {
    await supertest(app)
      .get("/api/resize/sea1.jpg")
      .query({ height: 300, width: 500 })
      .expect(404);
  });
});
