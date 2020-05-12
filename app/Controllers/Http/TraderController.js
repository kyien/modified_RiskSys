'use strict'

const CloudinaryService = use('App/Services/CloudinaryService')
const Trader = use('App/Models/Trader')

class TraderController {

    async update({params,request,reponse}){
        let client =Trader.find(params.id)
        const{username,email,avatar,password}= request.all()
        const avatar = request.file('avatar')
        try {
    const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'trader_avatars'});
     
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
}

module.exports = TraderController
