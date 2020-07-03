'use strict'

const Mail = use('Mail') // Adonis' mail
 const nodemailer = require('nodemailer');
 const Admin=use('App/Models/Admin');



class EmailTestController {

async test_email({request,response}){


	   try {
    const email = request.only(['email'])
   const user = {name:'kenny',age:26};


    await Mail.send('emails.test', {user},(message) => {
      message
        .to(email)
        .from('risksystem9@gmail.com')
        .subject('Birthday Reminder')
    })



 return response.send({"status":1})
    }
 catch (err) {
      console.log(err)

	return response.send(err)
    }
}


  async test_node_mailer({request,response}){

         try {

              const { email,name,message } = request.only(['email','name','message'])

        var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                         user: 'risksystem9@gmail.com',
                         pass: '@Risksys20'
                        }
                                });
	//console.log(email+' '+name+' '+message);

	const mailbody=`<h3>Hello,${name}</h3> <br> <p>${message}</p>`;



	const mailOptions = {
 	 from: 'risksystem9@gmail.com', // sender address
 	 to:email, // list of receivers
 	 subject: 'Happy BirthDay', // Subject line
 	// html: '<h3>Hello,{{name}}</h3> <br> <p>{{message}}</P>'// plain text body
	 html:mailbody
	};

        await transporter.sendMail(mailOptions, function (err, info,response) {
   	if(err)
    // console.log(err)
  
         return response.json(err)

 	else
    	// console.log(info);
         return response.json({"message":"email sent successfully","info":info})

	});
        return response.json({"message":"email sent successfully"});
		
         } catch (err) {
     return response.json(err)
    }
}

	
}

module.exports = EmailTestController
