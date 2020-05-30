'use strict'

const Schema = use('Schema')

class TraderSchema extends Schema {
  up () {
    this.create('traders', (table) => {
      table.increments()
      table.string('username',50).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('avatar').defaultTo('https://res.cloudinary.com/risksys20/image/upload/v1589297386/trader_avatars/blank_avatar3_jme31j.gif')
      table.boolean('approved').defaultTo(false)
      table.float('win_ratio',10,2)
      table.float('loss_ratio',10,2)
      table.float('profit_factor',10,2)
      table.timestamps()
    })
  }

  down () {
    this.drop('traders')
  }
}

module.exports = TraderSchema
