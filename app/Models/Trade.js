'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Trade extends Model {


	trader(){
	
	return this.belongsTo('App/Models/Trader')
	}

	 static get table () {
    return 'trades'
  }




}

module.exports = Trade
