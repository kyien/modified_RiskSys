'use strict'

const Trader = use('App/Models/Trader');
const nodemailer = require('nodemailer');
const moment = require('moment'); // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto


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


async recover({request,response}){


	try{

	const {token,email,new_password}=request.only(['email','token','new_password'])

	 const trader = await Trader.findBy('email', email);

	  const sameToken = token === trader.token;

	if (!sameToken) {
      return response
        .status(203)
        .send({"message": 'Old token provided or token already used'})
    }


const tokenExpired = moment().subtract(2, 'days').isAfter(trader.token_created_at)

   	 if (tokenExpired) {
      		return response.status(203).send({"message":'Token expired'})
    		}

	 // saving new password
    trader.password = new_password

	 // deleting current token
   trader.token = null
  // trader.token_created_at = 0

    // persisting data (saving)
    await trader.save()


	return response.status(201).send({"success":true})	

	}catch(err){

	console.log(err)
	}

}





	
async forgot_password({request,response}){

	try {
      // account request password recovery
      const { email } = request.only(['email']);

      // checking if email is registered
      const trader = await Trader.findBy('email', email);

      // generating token
      const token = await crypto.randomBytes(10).toString('hex');
	const user_type='trader';

      // registering when token was created and saving token
	if(trader){
      trader.token_created_at = new Date();
      trader.token = token;

      // persisting data (saving)
      await trader.save();
	

	

	   const mailbody=`<h1>Password recovery request</h1>
                <p>Hello ${ trader.username }, it seems someone requested a password recovery for your account
                 registered with the email ${ trader.email}.
                </p>
                <p>
  If it was you, just click this <a href="https://risksys.sortika.com/password/recover/${user_type}/${token}/${trader.email}">link</a>
                </p>
        <p>
  If it wasn't you then we recommend you to change your password. Someone may
  have had access to it.
                </p>
<p>This link will not be valid after 48hours.</p>`;

	const mailOptions = {
         from: 'risksystem9@gmail.com', // sender address
         to:email, // list of receivers
         subject: 'Password Change', // Subject line
         html:mailbody
        };

	if(!this.send_mail(mailOptions)){  
                  return response.status(401).send({"message":"error encountered during sending recovery link via email"})

                }

      
	return response.status(201).send({"message":"email sent successfully"})
	}
	else{
		return response.status(203).send({"message":"email does not exist"})

	}
     
    } catch (err) {
      console.log(err)
    }	
}

 

async send_mail(mailOptions){

         var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                         user: 'risksystem9@gmail.com',
                         pass: '@Risksys20'
                        }
                                });

         await transporter.sendMail(mailOptions, function (err, info,response) {
        if(err){
     console.log(err)
  
         return false
        }
        else{
         console.log(info);
         return true
                }
        });

}


}

module.exports = TradersAuthController
