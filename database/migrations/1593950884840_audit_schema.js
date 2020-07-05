'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditSchema extends Schema {
  up () {
    this.create('client_audits', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
	table.string('ip', 45).notNullable()
	table.string('event').notNullable() //e.g login     
	table.timestamps()
    })
  }

  down () {
    this.drop('client_audits')
  }
}

module.exports = AuditSchema
