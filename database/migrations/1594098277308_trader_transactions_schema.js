'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TraderTransactionsSchema extends Schema {
  up () {
    this.create('trader_transactions', (table) => {
      table.increments()
	 table.integer('trader_id').unsigned().references('id').inTable('traders')
        table.string('transaction_type')
        table.decimal('Amount',10,2)

      table.timestamps()
    })
  }

  down () {
    this.drop('trader_transactions')
  }
}

module.exports = TraderTransactionsSchema
