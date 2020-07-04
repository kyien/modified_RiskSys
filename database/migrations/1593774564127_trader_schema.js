'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TraderSchema extends Schema {
  up () {
    this.table('traders', (table) => {
      // alter table
     table.string('token') // token
      table.timestamp('token_created_at') // date when token was created

    })
  }

  down () {
    this.table('traders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TraderSchema
