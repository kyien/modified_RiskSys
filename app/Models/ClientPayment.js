'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientPayment extends Model {
		
	static get table () {
    return 'client_transactions'
  }


}

module.exports = ClientPayment
