'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserFieldToThreadsSchema extends Schema {
  up() {
    this.table('threads', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.table('threads', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserFieldToThreadsSchema
