'use strict'
const Logger = use('Logger');
const Mpesa = require("mpesa-api").Mpesa;

class PaymentController {

async test_stk({request,response}){

	
	try {


	const {phone}=request.only(['phone'])

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
    Amount: 1 /* 1000 is an example amount */,
    PartyA:phone,
    PartyB:287450,
    PhoneNumber:phone,
    CallBackURL: "https://node.sortika.com/trader/hooks/mpesa",
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
