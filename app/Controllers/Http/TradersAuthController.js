
'use strict'

const Trader = use('App/Models/Trader');

class TradersAuthController {

    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")
	const avatar='https://res.cloudinary.com/risksys20/image/upload/v1589297386/trader_avatars/blank_avatar3_jme31j.gif'
	const winratio=request.input("win_ratio")
	const lossratio=request.input("loss_ratio")
	const profit_factor=request.input("profit_factor")
	   

     let trader =await Trader.create({

	username:username,
	avatar:avatar,
        email:email ,
        password : password,
	win_ratio:winratio,
	loss_ratio:lossratio,
	profit_factor:profit_factor		
	})

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
