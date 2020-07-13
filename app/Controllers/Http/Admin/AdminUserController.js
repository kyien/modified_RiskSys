'use strict'

 const Mail = use('Mail') // Adonis' mail
 const nodemailer = require('nodemailer');
 const Admin=use('App/Models/Admin');
const Database = use('Database');
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


async create_user({request,response}){
		const{username,password,role,email}=request.all();
		        const avatar='https://res.cloudinary.com/risksys20/image/upload/v1590838735/admin/blank_avatar1-150x150_zopffz.gif';
		
	let user=await Admin.create({
		username:username,
		avatar:avatar,
		email:email,
		  password : password,
		      
			role:role
		});
		
	       // let accessToken = await auth.authenticator('admin_jwt').generate(user)

		 const mailbody=`<h1>Risksys Admin Login Credentials</h1>
                <p>Hello ${user.username}.Kindly use these credentials to login as a <strong> ${user.role} </strong>.
                </p>
                <p>
			<ul>
			<li>Email:${user.email}</li>
			<li>password:${password}</li>
			</ul>

		</p>
`;

		const mailOptions = {
         from: 'risksystem9@gmail.com', // sender address
         to:user.email, // list of receivers
         subject: 'Login Credentials', // Subject line
         html:mailbody
        };

		 if(this.send_mail(mailOptions)){

        return response.status(201).json({"success": true, "message": "Verifiation link sent to your email","info":user})
        }

        else{

        return response.status(203).json({"success":false,"message":"Encountered an error sending email verification"})
        }


		 //return response.status(201).send({"info":user,"status":200})

	}

async get_users({request,response}){

	let users=await Admin.all()

	return response.send({"info":users,"status":200})

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

async Delete_user({request,response}){

	  const { id } =request.only(['id'])
        const user = await Admin.find(id);
  

	 if (!user) {
          return response.send({"status":400})
        }

        await user.delete()

        return response.send({"status":200})  
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

module.exports = AdminUserController
