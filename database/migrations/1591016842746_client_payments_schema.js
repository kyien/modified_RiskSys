'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientPaymentSchema extends Schema {
  up () {
    this.create('client_payments', (table) => {
      table.increments()
	table.string('MerchantRequestID')
	table.string('CheckoutRequestID')
	table.integer('ResultCode')
	table.string('Mobile_No')
	table.integer('Amount_paid')
	table.string('Transaction_Date')
	table.string('Receipt_No')
	table.string('ResultDesc')
      table.timestamps()
    })
  }

  down () {
    this.drop('client_payments')
  }
}

module.exports = ClientPaymentSchema
