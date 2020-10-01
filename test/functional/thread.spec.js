"use strict";

const { test, trait } = use("Test/Suite")("Thread");
const Factory = use("Factory");

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

test("should delete a thread", async ({ assert, client }) => {
  const thread = await await Factory.model("App/Models/Thread").create();

  const response = await client.delete(`threads/${thread.id}`).send().end();
  console.log(response);
  response.assertStatus(204);
});
