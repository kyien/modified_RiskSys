'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminWalletSchema extends Schema {
  up () {
    this.create('admin_wallets', (table) => {
      table.increments()
	 table.integer('admin_id').unsigned().references('id').inTable('admins')
        table.decimal('balance',10,2)

      table.timestamps()
    })
  }

  down () {
    this.drop('admin_wallets')
  }
}

module.exports = AdminWalletSchema
