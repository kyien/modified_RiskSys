'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TraderDocumentsSchema extends Schema {
  up () {
    this.create('trader_documents', (table) => {
      table.increments()
	table.integer('trader_id').unsigned().references('id').on('traders')
	table.string('phone')
	table.string('country')
	table.string('area')
	table.string('street')
	table.integer('address')
	table.string('postal_code')
	table.string('poi')
	table.string('poa')
      table.timestamps()
    })
  }

  down () {
    this.drop('trader_documents')
  }
}

module.exports = TraderDocumentsSchema
