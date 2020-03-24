'use strict'

const Schema = use('Schema')

class TraderSchema extends Schema {
  up () {
    this.create('traders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('traders')
  }
}

module.exports = TraderSchema
