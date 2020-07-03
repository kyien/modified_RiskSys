'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RiskSchema extends Schema {
  up () {
    this.create('risks', (table) => {
      table.increments()
	table.string('category')
      table.timestamps()
    })
  }

  down () {
    this.drop('risks')
  }
}

module.exports = RiskSchema
