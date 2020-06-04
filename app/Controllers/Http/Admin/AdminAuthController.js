'use strict'

const Admin=use('App/Models/Admin');

class AdminAuthController {



async register({request,auth,response}){
 	const{username,email,password}=request.all()

	const avatar='https://res.cloudinary.com/risksys20/image/upload/v1590838735/admin/blank_avatar1-150x150_zopffz.gif'

	 let admin =await Admin.create({

        username:username,
        avatar:avatar,
        email:email ,
        password : password,
       avatar:avatar,
	role:'super'
        
        })

        let accessToken = await auth.authenticator('admin_jwt').generate(admin)
        return response.json({"user":admin, "access_token": accessToken})



}

async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.authenticator('admin_jwt').attempt(email, password)) {
        let admin_user = await Admin.findBy('email', email)
        let accessToken = await auth.authenticator('admin_jwt').generate(admin_user)
        return response.json({"user":admin_user, "access_token": accessToken,"code":200})
      }

      return response.json({"message":'invalid email or password',"code":417})

    }
    catch (e) {
      return response.json({"message": 'You first need to register!',"code":401})
    }
}


async logout({request,auth,response}){

  const token=request.input('token')
  try{
    await auth.authenticator('admin_jwt').revokeTokens([token], true)
    return response.json({"message":'successfully logged out',"code":200})

  }catch(e){
    return response.json({"message": 'failed logout!',"code":417})
  }
}

async change_password({request,response,params}){

	const {password,newPassword}=request.only(['password','newPassword'])
	const user =await Admin.findByOrFail('id',id)

	  // checking if old password informed is correct
    const passwordCheck = await Hash.verify(password, user.password)

    if (!passwordCheck) {
      return response
        .status(400)
        .send({ message: { error: 'Incorrect password provided' } })
    }

    // updating user password
    user.password = newPassword

    // persisting new data (saving)
    await user.save()

}



}

module.exports = AdminAuthController
