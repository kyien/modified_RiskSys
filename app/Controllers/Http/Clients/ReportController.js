'use strict'
const Database = use('Database')


class ReportController {




	 async get_mamm({request,response}){

                const{id}=request.only(['id'])

                const reports=await Database.from('mamm_clients').where('client_id',id).fetch()

                return response.status(201).send({"info":reports,"success":true})

                }



	 async get_hedge({request,response}){

                const{id}=request.only(['id'])

                const reports=await Database.from('hedge_clients').where('client_id',id)

                return response.status(201).send({"info":reports,"success":true})


                }


	 async get_pamm({request,response}){

                const{id}=request.only(['id'])

                const reports=await Database.from('pamm_clients').where('client_id',id)

                return response.status(201).send({"info":reports,"success":true})


                }


}

module.exports = ReportController
