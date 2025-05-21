import app from "./app";
import { calculateDiscount } from "./utils";
import request from "supertest";
describe("Auth Service", () => {
  it("should be return correct discount amount", () => {
    const discount = calculateDiscount(100, 10);
    expect(discount).toBe(10);
  });

  it("should return 200 status code", async () => {
    const response = await request(app).get("/").send();
    expect(response.status).toBe(200);
  });
});
