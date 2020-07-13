'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HedgeClientsSchema extends Schema {
  up () {
    this.create('hedge_clients', (table) => {
      table.increments()
	table.integer('client_id').unsigned().references('id').on('clients')
	table.decimal('amount',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('hedge_clients')
  }
}

module.exports = HedgeClientsSchema
