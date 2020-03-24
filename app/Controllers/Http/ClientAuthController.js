'use strict'

const Client = use('App/Models/Client');
class ClientAuthController {


    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let client = new Client()
        client.username = username
        client.email = email
        client.password = password

        await client.save()
        let accessToken = await auth.authenticator('client_jwt').generate(client)
        return response.json({"user": client, "access_token": accessToken})
}

async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.authenticator('client_jwt').attempt(email, password)) {
        let client = await Client.findBy('email', email)
        let accessToken = await auth.authenticator('client_jwt').generate(client)
        return response.json({"user":client, "access_token": accessToken})
      }

      return response.json({"message":'invalid email or password'})

    }
    catch (e) {
      return response.json({"message": 'You first need to register!'})
    }
}



}

module.exports = ClientAuthController
