'use strict'
const Logger = use('Logger');
const Mpesa = require("mpesa-api").Mpesa;
const Database = use('Database')
const Payment=use('App/Models/ClientPayment')
const Wallet=use('App/Models/ClientWallet')

class PaymentController {

async test_stk({request,response}){

	
	try {


	const {phone,amount}=request.only(['phone','amount'])

	const credentials = {
    client_key: 'lJKCm77DSreze78TlW2ZVaoA9DSNp31n',
    client_secret: '67KGqmsFFeNsfLRT',
    initiator_password: 'Love0719',
	 certificatepath: null
   	};

	const environment = "production";
	 const accountRef = Math.random().toString(35).substr(2, 7)

	const mpesa = new Mpesa(credentials, environment);

	await    mpesa
  .lipaNaMpesaOnline({
    BusinessShortCode:287450,
    Amount: amount /* 1000 is an example amount */,
    PartyA:phone,
    PartyB:287450,
    PhoneNumber:phone,
    CallBackURL: "https://node.sortika.com/client/hooks/mpesa",
    AccountReference:accountRef,
    passKey: "de5f48c37e649d3dd7956281187b06b397fcfce602b0739db80afd898634e7a6",
    TransactionType: "CustomerPayBillOnline" /* OPTIONAL */,
    TransactionDesc: "payment for the service" /* OPTIONAL */
  })
  .then(resp => {
    //Do something with the response
    //eg
console.log(resp);

	return response.send(resp)
	//Logger.info('mpesa response',resp);
  })
  .catch(error => {
    //Do something with the error;
    //eg
   //  Logger.error('mpesa-error',error);
 
	console.log(error)
 });

	//return response.send({"message":"Transaction successful!"})
	}catch(e){

	console.log(e);
	//return response.send(e)
	}
}


	 async get_balance({request,response}){

                        const{id}=request.only(['id'])
                        const t_bal=await Wallet.findBy('client_id',id)

                        return response.status(201).send({"info":t_bal.balance,"success":true})

                }

  async deposit({request,response}){

                try{

        const{amount,id}=request.only(['amount','id'])
 
                const deposit=await Payment.create({
                        amount:amount,
                        client_id:id,
                        transaction_type:'deposit'

                })

                //let initial_balance;
                let current_wallet;
                let final_balance;
                let trader_wallet=await Wallet.findBy('client_id',id);

                if(trader_wallet){

                        final_balance=parseFloat(trader_wallet.balance)+parseFloat(deposit.amount);

                trader_wallet.balance=final_balance

                await trader_wallet.save()

                }
	                     else{


                        current_wallet=await Wallet.create({

                                client_id:id,
                                balance:amount

                        })
                final_balance=current_wallet.balance


                        }

		 return response.status(201).json({"info":deposit,"success":true,"balance":final_balance,"message":"successsfully inserted"})
                }
        catch(err){
                console.log(err)
                return response.status(412).send({"message":"Unable to deposit money","success":false})

                }  

	}

          async withdraw({request,response}){

                try{

        const{amount,id}=request.only(['amount','id'])
 
                const withdrawal=await Payment.create({
                        amount:amount,
                        client_id:id,
                        transaction_type:'withdrawal'

                })

	 let current_wallet;
                let final_balance;
                let trader_wallet=await Wallet.findBy('client_id',id);

                if(trader_wallet){

                        final_balance=parseFloat(trader_wallet.balance)-parseFloat(withdrawal.amount);

                trader_wallet.balance=final_balance

                await trader_wallet.save()

                }



        return response.status(201).json({"info":withdrawal,"success":true,"balance":final_balance,"message":"successsfully inserted"})
                }

	   catch(err){
                console.log(err)
                return response.status(412).send({"message":"Unable to deposit money","success":false})

                }  


        }

	 async get_transactions({request,response}){

                const{id}=request.only(['id'])

                const reports=await Payment.query().where('client_id',id).fetch()

                return response.status(201).send({"info":reports,"success":true})



                }


async query_amount({request,response}){
		const{id}=request.only(['id'])

	let amnt= await Database.select('Amount_paid').from('client_payments').where('MerchantRequestID',id);

		if(!amnt){

			return response.send({"status":400})		
		}

	return response.send({"info":amnt,"status":200})

	}

async stk_callback({request,response}){
		console.log(request.all());
	return response.send(request.all());
}



async b2c_test({request,response}){

		try {

	  const {phone}=request.only(['phone'])

        const credentials = {
   	  client_key: 'lwi5J03VlKtbxel9xcz13SWH4kFaCz0q',
	    client_secret: '9bif4W1BgmITsUD9',
   	 initiator_password: 'Love0719',
         certificatepath: null
        };
                
        const environment = "production";
         const accountRef = Math.random().toString(35).substr(2, 7)

        const mpesa = new Mpesa(credentials, environment);

	  await    mpesa
		  .b2c({
 		  Initiator:"Bundi",
   		 Amount: 10,
   		PartyA:193293,
	    	PartyB:phone,
		QueueTimeOutURL:"https://api.sortika.com/payment/time_out",
		ResultURL:"https://api.sortika.com/payment/b2c_callback",
		CommandID:"SalaryPayment",
		
 	 })
 	 .then(resp => {
  	  //Do something with the response
    	//eg
	console.log(resp);

        return response.send(resp)
        //Logger.info('mpesa response',resp);
 	 })
	.catch(error => {
    //Do something with the error;
    //eg
   //  Logger.error('mpesa-error',error);
 
        console.log(error)
 });

        //return response.send({"message":"Transaction successful!"})
        }catch(e){

        console.log(e);
        //return response.send(e)
        }


}

async b2c_timeout({request,response}){

 
    return response.send(request.all())

}
async b2c_callback({request,response}){


	console.log(request.all());
     return response.send(request.all());
}

}

module.exports = PaymentController
