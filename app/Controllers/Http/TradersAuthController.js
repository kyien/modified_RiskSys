'use strict'

const Trader = use('App/Models/Trader');

class TradersAuthController {

    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let trader = new Trader()
        trader.username = username
        trader.email = email
        trader.password = password

        await trader.save()
        let accessToken = await auth.authenticator('traders_jwt').generate(trader)
        return response.json({"user": trader, "access_token": accessToken})
}

async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.authenticator('traders_jwt').attempt(email, password)) {
        let trader = await Trader.findBy('email', email)
        let accessToken = await auth.authenticator('traders_jwt').generate(trader)
        return response.json({"user":trader, "access_token": accessToken,"code":200})
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
    await auth.authenticator('traders_jwt').revokeTokens([token], true)
    return response.json({"message":'successfully logged out',"code":200})

  }catch(e){
    return response.json({"message": 'failed logout!',"code":417})
  }
}
}

module.exports = TradersAuthController
