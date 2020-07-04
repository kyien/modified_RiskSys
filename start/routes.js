
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

	//payment routes
	
Route.post('client/payment/test','PaymentController.test_stk')  //initiate stk push
Route.post('client/payment/b2c','PaymentController.b2c_test') //b2c initiate
Route.post('client/payment/query','PaymentController.query_amount')

}).namespace('Clients')


//trader routes
Route.group(() => {

Route.post('/trader/login','TradersAuthController.login')
Route.post('/trader/logout','TradersAuthController.logout')
Route.post('trader/forgot_password','TradersAuthController.forgot_password')
Route.post('trader/recover_password','TradersAuthController.recover')
Route.post('/trader/check_mail','TraderController.check_mail')
Route.post('/trader/check_uname','TraderController.check_uname')

Route.post('/trader/register','TradersAuthController.register')

Route.put('/trader/update_profile/:id','TraderController.update').middleware('auth:traders_jwt')
Route.post('/trader/myfx','TraderController.checkuser')
Route.post('/trader/myfx/history','TraderController.gethistory')
Route.post('/test','TraderController.diff_months')


	      //payment routes
        
Route.post('trader/payment/test','PaymentController.test_stk')  //initiate stk push
Route.post('trader/payment/b2c','PaymentController.b2c_test') //b2c initiate

}).namespace('Traders')

//admin routes


Route.group(() => {

	Route.post('/admin/register','AdminAuthController.register')
	 Route.post('/admin/login','AdminAuthController.login')
	 Route.post('/admin/logout','AdminAuthController.logout')
	Route.put('/admin/update/profile/:id','AdminUserController.update').middleware('auth:admin_jwt')
	Route.put('/admin/change/password/:id','AdminAuthController.change_password').middleware('auth:admin_jwt')
	Route.delete('/admin/user/delete','AdminUserController.Delete_user').middleware('auth:admin_jwt')
	Route.get('/admin/users','AdminUserController.get_users').middleware('auth:admin_jwt')
	 Route.post('/admin/create/user','AdminUserController.create_user').middleware('auth:admin_jwt')
	Route.post('/admin/test/mail','AdminUserController.test_mail')

	//investment routes
	Route.resource('admin/investment','InvestmentCategoryController').except(['show','create','edit'])

	//Risk routes
	Route.resource('admin/risk',' RiskController').only(['index','store','destroy'])

}).namespace('Admin')




//payment routes
Route.group(() => {

Route.post('/payment/test','PaymentController.test_stk')  //initiate stk push
Route.post('/payment/callback','PaymentController.stk_callback') //stk callback
Route.post('/payment/b2c','PaymentController.b2c_test') //b2c initiate
Route.post('/payment/time_out','PaymentController.b2c_timeout') //b2c timeout
Route.post('/payment/b2c_callback','PaymentController.b2c_callback') //b2c callback

}).namespace('Payments')

 ///Testing routes
Route.group(() => {

Route.post('/test/email','EmailTestController.test_email')
Route.post('/test/mailer','EmailTestController.test_node_mailer')

}).namespace('Tests')

