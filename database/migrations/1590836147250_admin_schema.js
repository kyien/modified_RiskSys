'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
	table.string('username',50).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
	table.string('avatar').defaultTo('https://res.cloudinary.com/risksys20/image/upload/v1590838735/admin/blank_avatar1-150x150_zopffz.gif')
	table.string('role',50).notNullable() 
     table.timestamps()
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
