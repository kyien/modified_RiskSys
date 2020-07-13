'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TraderWalletSchema extends Schema {
  up () {
    this.create('trader_wallets', (table) => {
      table.increments()
	 table.integer('trader_id').unsigned().references('id').inTable('traders')
	table.decimal('balance',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('trader_wallets')
  }
}

module.exports = TraderWalletSchema
