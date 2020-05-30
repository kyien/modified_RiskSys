'use strict'

const Client = use('App/Models/Client');
class ClientAuthController {


    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")
        const avatar='https://res.cloudinary.com/risksys20/image/upload/v1589297386/trader_avatars/blank_avatar3_jme31j.gif'

        let client = await  Client.create({

	username: username,
	avatar:avatar,
        email: email,
        password: password



	})

       // await client.save()
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
        return response.json({"user":client, "access_token": accessToken,"code":200})
      }

      return response.json({"message":'invalid email or password',"code":417})

    }
    catch (e) {
      return response.json({"message": 'You first need to register!'})
    }
}

async logout({request,auth,response}){

  const token=request.input('token')
  try{
    await auth.authenticator('client_jwt').revokeTokens([token], true)
    return response.json({"message":'successfully logged out',"code":200})

  }catch(e){
    return response.json({"message": 'failed logout!',"code":417})
  }
}



}

module.exports = ClientAuthController
