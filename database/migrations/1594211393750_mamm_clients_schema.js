'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MammClientsSchema extends Schema {
  up () {
    this.create('mamm_clients', (table) => {
      table.increments()
	table.integer('client_id').unsigned().references('id').on('clients')
	table.string('asset')
	table.float('risk')
	table.decimal('amount',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('mamm_clients')
  }
}

module.exports = MammClientsSchema
