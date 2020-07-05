'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminAuditsSchema extends Schema {
  up () {
    this.create('admin_audits', (table) => {
      table.increments()
       table.integer('admin_id').unsigned().references('id').inTable('admins')
        table.string('ip', 45).notNullable()
        table.string('event').notNullable() //e.g login,logout
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_audits')
  }
}

module.exports = AdminAuditsSchema
