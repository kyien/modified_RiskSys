'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PammClientsSchema extends Schema {
  up () {
    this.create('pamm_clients', (table) => {
      table.increments()
	table.integer('client_id').unsigned().references('id').on('clients')
	table.decimal('amount',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('pamm_clients')
  }
}

module.exports = PammClientsSchema
