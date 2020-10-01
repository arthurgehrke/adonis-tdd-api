"use strict";

const { test, trait } = use("Test/Suite")("Thread");

trait("Test/ApiClient");

test("Should create a thread if correct data is provided", async ({
  client,
}) => {
  const response = await client
    .post("/threads")
    .send({
      title: "test title",
      body: "body",
    })
    .end();

  response.assertStatus(200);
});
