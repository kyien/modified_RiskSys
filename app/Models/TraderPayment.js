'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TraderPayment extends Model {

	  static get table () {
    return 'trader_transactions'
  }

}

module.exports = TraderPayment
