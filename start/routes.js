
'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


//client routes

Route.group(() => {

Route.post('/client/login','ClientAuthController.login')
Route.post('/client/logout','ClientAuthController.logout')

Route.post('/client/register','ClientAuthController.register').validator('Client')

Route.put('/client/update_profile/:id','ClientController.update').middleware('auth:client_jwt')
Route.post('/client/check_mail','ClientController.check_mail')
Route.post('/client/check_uname','ClientController.check_uname')
Route.post('client/forgot_password','ClientAuthController.forgot_password')
Route.post('client/recover_password','ClientAuthController.recover')
Route.post('client/email/verify','ClientAuthController.verify_email')
Route.post('/client/documents/verify','ClientController.client_verify')

	//Reports
Route.post('client/report/mamm','ReportController.get_mamm')
Route.post('client/report/pamm','ReportController.get_pamm')
Route.post('Client/report/hedge','ReportController.get_hedge')



	//investment routes
Route.post('client/invest/mamm','ClientController.mamm')
Route.post('client/invest/pamm','ClientController.pamm')
Route.post('Client/invest/hedge','ClientController.hedge')

	//payment routes
	
Route.post('client/payment/test','PaymentController.test_stk')  //initiate stk push
Route.post('client/payment/b2c','PaymentController.b2c_test') //b2c initiate
Route.post('client/payment/query','PaymentController.query_amount')
Route.post('client/deposit','PaymentController.deposit')
Route.post('client/withdraw','PaymentController.withdraw')
Route.post('client/balance','PaymentController.get_balance')
Route.post('client/payments/reports','PaymentController.get_transactions')

}).namespace('Clients')










