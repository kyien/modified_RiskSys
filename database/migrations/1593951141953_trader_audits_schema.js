'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TraderAuditsSchema extends Schema {
  up () {
    this.create('trader_audits', (table) => {
      table.increments()
	  table.integer('trader_id').unsigned().references('id').inTable('traders')
        table.string('ip', 45).notNullable()
        table.string('event').notNullable() //e.g login    
      table.timestamps()
    })
  }

  down () {
    this.drop('trader_audits')
  }
}

module.exports = TraderAuditsSchema
