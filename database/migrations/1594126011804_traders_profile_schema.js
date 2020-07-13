'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TradersProfileSchema extends Schema {
  up () {
    this.create('traders_profiles', (table) => {
      table.increments()
	table.integer('trader_id').unsigned().references('id').inTable('traders')
	table.float('success_rate',4,2)
	table.float('loss_rate',4,2)
	table.integer('signals_issued')
      table.timestamps()
    })
  }

  down () {
    this.drop('traders_profiles')
  }
}

module.exports = TradersProfileSchema
