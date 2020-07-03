'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      // alter table

	  table.string('token') // token
      table.timestamp('token_created_at') // date when token was created
    })
  }

  down () {
    this.table('clients', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ClientSchema
