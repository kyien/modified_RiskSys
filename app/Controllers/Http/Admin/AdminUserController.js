'use strict'

 const Mail = use('Mail') // Adonis' mail
 const nodemailer = require('nodemailer');

class AdminUserController {

async test_mail({request,response}){

	 try {

              const { email,name,message } = request.only(['email','name','message'])

	var transporter = nodemailer.createTransport({
 		service: 'gmail',
 		auth: {
       			 user: 'risksystem9@gmail.com',
       			 pass: '@Risksys20'
    			}
				});


const mailOptions = {
  from: 'risksystem9@gmail.com', // sender address
  to:email, // list of receivers
  subject: 'User Mail', // Subject line
  html: `<h3>Hello,{{name}}</h3> <br> <p>{{message}}</P>`// plain text body
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


 async update ({ request, response, params }) {

         const id = params.id
  

         const user = await Admin.findByOrFail('id', id)

         const{username,email}= request.all()
        const avatar = request.file('avatar')
        try {
    const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(avatar.tmpPath, {folder: 'admin'});

        user.username = username
        user.email = email
        user.avatar=cloudinaryResponse.secure_url
        await user.save()

        return response.status(201).send({"message":'profile updated successfully'})
        }
        catch(e){
            return response.status(417).send({"error":'error udating profile'})
        }


}

}

module.exports = AdminUserController
