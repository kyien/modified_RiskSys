'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TTransactionsSchema extends Schema {
  up () {
    this.create('t_transactions', (table) => {
      table.increments()
      table.integer('trader_id').unsigned().references('id').inTable('traders')
	table.integer('amount')
	table.string('transaction_type')
      table.timestamps()
    })
  }

  down () {
    this.drop('t_transactions')
  }
}

module.exports = TTransactionsSchema
