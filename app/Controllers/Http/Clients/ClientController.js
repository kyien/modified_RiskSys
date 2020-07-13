'use strict'
const CloudinaryService = use('App/Services/CloudinaryService')
const Client = use('App/Models/Client')
const const Database = use('Database')


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


	 async trader_verify({request,response}){

                const{id,phone,country,area,street,address,postal_code}=request.all()

                const poa=request.file('poa',{   types: ['image'],
                                 size: '2mb'
                        })
                const poi=request.file('poi')

                console.log(poa)
                       try {

                    const cr_poa = await CloudinaryService.v2.uploader.upload(poa.tmpPath, {folder: 'trader_poa'});
                     const cr_poi = await CloudinaryService.v2.uploader.upload(poi.tmpPath, {folder: 'trader_poi'})

                     let verify=await Database.table('trader_documents').insert({
                      trader_id:id,
                      phone:phone,
                     country:country,
                      area:area,
                     street:street,
                     address:address,
                      postal_code:postal_code,
                      poi:cr_poi.secure_url,
                      poa:cr_poa.secure_url
                             })      
            if(!verify){

          return response.status(417).send({"success":false,"":"error saving verification document"})
                      }

                      return response.status(201).send({"success":true,"message":"document saved successfully awaiting admin approval!"})

                   }
        catch(e){

              console.log(e)
            return response.status(412).json({"error":'error processing request',"success":false})
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


	async mamm({request,response}){

				try{

			const{id,amount,asset,risk}=request.all()

			const insert_option=await Database.table('mamm_clients').insert({

					client_id:id,
					amount:amount,
					asset:asset,
					risk:risk,
					
				})	


		if(!insert_option){

		return response.status(417).send({"success":true,"message":"Failed to insert investment  option"})

		}
		
		 return response.status(201).send({"success":false,"message":"successfully added the investment option"})

		}catch(err){
			console.log(err)
			return reponse.status(412).send({"success":false,"message":"error processing your request"})
			}
		
		}
	   async pamm({request,response}){

                                try{

                        const{id,amount}=request.all()

                        const insert_option=await Database.table('pamm_clients').insert({

                                        client_id:id,
                                        amount:amount,
                                       
                                })      


  if(!insert_option){

                return response.status(417).send({"success":true,"message":"Failed to insert investment  option"})

                }

                 return response.status(201).send({"success":false,"message":"successfully added the investment option"})

                }catch(err){
                        console.log(err)
                        return reponse.status(412).send({"success":false,"message":"error processing your request"})
                        }

                }
	
	       async hedge({request,response}){

                                try{

                        const{id,amount}=request.all()

                        const insert_option=await Database.table('hedge_clients').insert({

                                        client_id:id,
                                        amount:amount,
                                       
                                })      


  if(!insert_option){

                return response.status(417).send({"success":true,"message":"Failed to insert investment  option"})

                }

                 return response.status(201).send({"success":false,"message":"successfully added the investment option"})

                }catch(err){
                        console.log(err)
                        return reponse.status(412).send({"success":false,"message":"error processing your request"})
                        }

                }
	

}

module.exports = ClientController
