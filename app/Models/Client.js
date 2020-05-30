'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Client extends Model {

    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (clientInstance) => {
          if (clientInstance.dirty.password) {
            clientInstance.password = await Hash.make(clientInstance.password)
          }
        })
      }

      static get primaryKey () {
        return 'id'
      }

      static get hidden () {
        return ['password']
      }
      /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
    
}

module.exports = Client
