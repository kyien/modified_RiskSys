'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminPaymentSchema extends Schema {
  up () {
    this.create('admin_payments', (table) => {
      table.increments()
	    table.integer('admin_id').unsigned().references('id').inTable('admins')
        table.string('transaction_type')
        table.decimal('Amount',10,2)

      table.timestamps()
    })
  }

  down () {
    this.drop('admin_payments')
  }
}

module.exports = AdminPaymentSchema
