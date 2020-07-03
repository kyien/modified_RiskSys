'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvestmentCategorySchema extends Schema {
  up () {
    this.create('investment_categories', (table) => {
      table.increments()
	table.string('name')
	table.float('category_return',4,2)
	table.string('period_of_return')
	table.float('revenue_share',8,2)
	table.string('category_class')
	table.decimal('allocation_amnt',8,2)
	table.string('risk_category') 
     table.timestamps()
    })
  }

  down () {
    this.drop('investment_categories')
  }
}

module.exports = InvestmentCategorySchema
