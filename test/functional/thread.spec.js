'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Thread')
const Factory = use('Factory')
const Thread = use('App/Models/Thread')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Thread.query().delete()
})

test('Ensure authorized user can create a thread if correct data is provided', async ({
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/threads')
    .loginVia(user)
    .send({
      title: 'test title',
      body: 'body'
    })
    .end()

  response.assertStatus(200)

  const thread = await Thread.firstOrFail()
  response.assertJSON({ thread: thread.toJSON() })
})

test('Ensure authorized users can delete a thread', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const thread = await Factory.model('App/Models/Thread').create()
  const response = await client.delete(thread.url()).send().loginVia(user).end()
  response.assertStatus(204)

  assert.equal(await Thread.getCount(), 0)
})

test('Should have url property', async ({ assert }) => {
  const thread = await Factory.model('App/Models/Thread').create()

  assert.equal(thread.url(), `threads/${thread.id}`)
})

test('Ensure unauthenticated users cannot create threads', async ({ client }) => {
  const response = await client
    .post('/threads')
    .send({
      title: 'test title',
      body: 'body'
    })
    .end()

  response.assertStatus(401)
})
