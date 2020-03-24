'use strict'

const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('username',50).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('avatar').defaultTo('https://res.cloudinary.com/risksys20/image/upload/v1584448708/client_avatars/avatar_default_wju2g0.jpg')
      table.boolean('approved').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
