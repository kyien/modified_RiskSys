'use strict'

class Client {
  get rules () {
    return {
      // validation rules
	
	email: 'required|email|unique:clients',
	username:'required|unique:clients',
      password: 'required'

    }
  }
 
   get messages () {
    return {
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email already exists.',
       'username.required':'You must provide a username',
	'username.unique':'This username already exists',
      'password.required': 'You must provide a password'
    }
  }

	  async fails (errorMessages) {
    return this.ctx.response.send({errorMessages,'status':417})
  }
}

module.exports = Client
