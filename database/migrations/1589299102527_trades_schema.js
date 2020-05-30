'use strict'

const Schema = use('Schema')

class TradesSchema extends Schema {
  up () {
    this.create('trades', (table) => {
      table.increments()
      table.integer('trader_id').unsigned().references('id')
      .inTable('traders')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table.json('signal_info')
       table.decimal('entry_price',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('trades')
  }
}

module.exports = TradesSchema
