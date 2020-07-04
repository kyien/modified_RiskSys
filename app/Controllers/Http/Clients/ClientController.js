'use strict'
const CloudinaryService = use('App/Services/CloudinaryService')
const Client = use('App/Models/Client')


class ClientController {

    async update({params,request,reponse}){
        let client = Client.find(params.id)
        const{username,email,password}= request.all()
        const avatar = request.file('avatar')
        try {
    const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'client_avatars'});
     
        client.username = username
        client.email = email
        client.password = password
        client.avatar=cloudinaryResponse.secure_url
        await client.save()

        return response.json({"message":'profile updated successfully'})
        }
        catch(e){
            return response.json({"error":'error udating profile'})
        }
      }

	async check_mail({request,response}){

		const{email}=request.only(['email']);
		
		const email_exists=await Client.findBy('email',email);

		if(email_exists){

		return response.send({'exists':1});
		}

		return response.send({'exists':0})
	}

	     async check_uname({request,response}){

                const{username}=request.only(['username']);

                const uname_exists=await Client.findBy('username',username);

                if(uname_exists){

                return response.send({'exists':1});
                }

                return response.send({'exists':0})
        }
}

module.exports = ClientController
