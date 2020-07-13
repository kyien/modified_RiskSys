'use strict'

const CloudinaryService = use('App/Services/CloudinaryService')
const Trader = use('App/Models/Trader')
const Logger = use('Logger')
const Database = use('Database')

const { MyfxbookApi } = require('myfxbook-api-client');


class TraderController {

    async update({request,reponse}){

		const{trader_id}=request.only(['id'])
        let client =Trader.find(trader_id)
        const{username,email,password}= request.all()
        const avatar = request.file('avatar')
        try {
    const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(avatar.tmpPath, {folder: 'trader_avatars'});
     
        client.username = username
        client.email = email
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

                const poa=request.file('poa')
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
            return response.status(412).json({"error":'error processing request ',"success":false})		

		}
	
	}


		 async checkuser({request,response}){

                const{email,password}= request.all()
                const client = new MyfxbookApi({ email: email, password:password})

                try{

                        let myAcc=await client.getMyAccounts()

                        if(myAcc.accounts.length>0 )
                                        {
                                let ids=[]
                                let history=[]

				let mm=await myAcc.accounts.filter(async (account)=>{

					return  await this.diff_months(new Date(account.lastUpdateDate)) < 7

						})

                               if(mm.length > 0){

                             for(let i=0;i<mm.length;i++){

                        	     await ids.push(mm[i].id)

                                       }
                                 for (let  k=0;k<ids.length;k++){

                                       try{

                                               let myhistory=await client.getHistory(ids[k])

                                               await history.push(myhistory)

                                               }

                                        catch(e){

                                              return response.json(e)
                                               }

                                        }

                                }
                                else {

                                   return response.json({"status":419,"info":"Trade information found is older than 6 months"})
                                }
                                       
                                       
                                        return response.json({"status":200,"history":history,"acc":mm})


                                        }

                                        else {

                                        return response.json({"status":417,"info":'No trade data found from your MyfxBook.com'})

                                                }
                         }

                catch(e) {
                 return response.json( e);
        }


        }





		async diff_months(dt){

			
			//const dt1=new Date(dt)
			const dt2=new Date()
		var diff = await (dt2.getTime() - dt.getTime()) / 1000;
   			diff /= (60 * 60 * 24 * 7 * 4);
  		return  Math.abs(Math.round(diff));




			}





		async  gethistory({request,response}){

				const{id,email,password}=request.all()
				const client = new MyfxbookApi({ email: email, password:password})
				try{

					let  history=await client.getHistory(id)

						return response.send(history)
				
					}
				catch(e){

						return response.json(e)
					}

				}






		 async check_mail({request,response}){

                const{email}=request.only(['email']);

                const email_exists=await Trader.findBy('email',email);

                if(email_exists){

                return response.send({'exists':1});
                }

                return response.send({'exists':0})
        }

	async check_uname({request,response}){

                const{username}=request.only(['username']);

                const uname_exists=await Trader.findBy('username',username);

                if(uname_exists){

                return response.send({'exists':1});
                }

                return response.send({'exists':0})
        }







}

module.exports = TraderController
