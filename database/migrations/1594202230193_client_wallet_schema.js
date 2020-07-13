'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientWalletSchema extends Schema {
  up () {
    this.create('client_wallets', (table) => {
      table.increments()
	 table.integer('client_id').unsigned().references('id').inTable('clients')
        table.decimal('balance',10,2)

      table.timestamps()
    })
  }

  down () {
    this.drop('client_wallets')
  }
}

module.exports = ClientWalletSchema
