'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientPaymentSchema extends Schema {
  up () {
    this.create('client_transactions', (table) => {
      table.increments()
 	 table.integer('client_id').unsigned().references('id').inTable('clients')
        table.string('transaction_type')
        table.decimal('Amount',10,2)

	
     table.timestamps()
    })
  }

  down () {
    this.drop('client_transactions')
  }
}

module.exports = ClientPaymentSchema
