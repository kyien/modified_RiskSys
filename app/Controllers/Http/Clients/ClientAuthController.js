'use strict'

const Client = use('App/Models/Client');
 const nodemailer = require('nodemailer');
const moment = require('moment'); // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto

class ClientAuthController {


    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")
        const avatar='https://res.cloudinary.com/risksys20/image/upload/v1589297386/trader_avatars/blank_avatar3_jme31j.gif'
	//const approved=false
	//const email_approved=false
	const token = await crypto.randomBytes(10).toString('hex');
	
        let client = await  Client.create({

	username: username,
	avatar:avatar,
        email: email,
        password: password,
	approved:false,
	email_approved:false,
	token:token,
	token_created_at:new Date()


	})
	
	

	const mailbody=`
	<h1>Email Verificaton</h1>
                <p>Hello ${ client.username }.Welcome to Risksys wealth management platform.
                </p>
		<p>Click on this <a href="http://127.0.0.1:3000/client/email/verify/${token}/${client.email}">link</a>
		to complete the signup process.</p>

		<p>Thank You.</p>
`;


	const mailOptions = {
         from: 'risksystem9@gmail.com', // sender address
         to:client.email, // list of receivers
         subject: 'Email Verification', // Subject line
         html:mailbody
        };

	if(this.send_mail(mailOptions)){
	
        return response.status(201).json({"success": true, "message": "Verifiation link sent to your email"})
	}

	else{

	return response.status(203).json({"success":false,"message":"Encountered an error sending email verification"})
	}
}

	async verify_email({request,response}){
		try{
		const {email,token}=request.only(['email','token'])

		const client = await Client.findBy('email', email);

          const sameToken = token === client.token;

		if(!sameToken){
			 return response
        .status(203)
        .send({"message": 'Invalid token provided'})

		}

		client.email_approved=true
		client.token=null

		await client.save()

		 return response.status(201).send({"success":true});

		


		}catch(err){

			console.log(err)
		}

	}

async login({request, auth, response}) {

	try{
    const email = request.input("email")
    const password = request.input("password");

      if (await auth.authenticator('client_jwt').attempt(email, password)) {
        let client = await Client.findBy('email', email)
	if(!client.email_approved){

	return response.status(401).send({"message":"You need to verify your email"})
	} 

       let accessToken = await auth.authenticator('client_jwt').generate(client)
        return response.status(201).json({"user":client, "access_token": accessToken})
      }
//	else{
      //return response.status(417).json({"message":"invalid email and or password"})

	
   }
  catch (e) {
	    return response.status(417).json({"message":"invalid email and or password"})
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


async recover({request,response}){


	try{

	const {token,email,new_password}=request.only(['email','token','new_password'])

	console.log(token+' '+email)
	 const client = await Client.findBy('email', email);

	  const sameToken = token === client.token;

	if (!sameToken) {
      return response
        .status(203)
        .send({"message": 'Old token provided or token already used'})
    }


	const tokenExpired = moment().subtract(2, 'days').isAfter(client.token_created_at)

   	 if (tokenExpired) {
      		return response.status(203).send({"message":'Token expired'})
    		}

	 // saving new password
    client.password = new_password

	 // deleting current token
    client.token = null
    //client.token_created_at = 0

    // persisting data (saving)
    await client.save()


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
      const client = await Client.findBy('email', email);

      // generating token
      const token = await crypto.randomBytes(10).toString('hex');
	const user_type='client';

      // registering when token was created and saving token
	if(client){
      client.token_created_at = new Date();
      client.token = token;

      // persisting data (saving)
      await client.save();
	

	   const mailbody=`<h1>Password recovery request</h1>
                <p>Hello ${ client.username }, it seems someone requested a password recovery for your account
                 registered with the email ${ client.email}.
                </p>
                <p>
  If it was you, just click this <a href="http://127.0.0.1:3000/password/recover/${user_type}/${token}/${client.email}">link</a>
                </p>
        <p>
  If it wasn't you then we recommend you to change your password. Someone may
  have had access to it.
                </p>

<p>This link will not be valid after 48hours.</p>`;

	const mailOptions = {
         from: 'risksystem9@gmail.com', // sender address
         to:email, // list of receivers
         subject: 'Lapasa de change', // Subject line
         html:mailbody
        };

	 if(!this.send_mail(mailOptions)){  
    		  return response.status(203).send({"message":"error encountered during sending recovery link via email"})

		}
	
	return response.status(201).send({"message":"email sent successfully"})
	}
	else{
		return response.status(203).send({"message":"sorry this email does not exist"})

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

module.exports = ClientAuthController
