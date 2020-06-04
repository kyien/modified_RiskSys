
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
Route.post('/client/login','ClientAuthController.login')
Route.post('/client/logout','ClientAuthController.logout')

Route.post('/client/register','ClientAuthController.register')

Route.put('/client/update_profile/:id','ClientController.update').middleware('auth:client_jwt')

//trader routes
Route.post('/trader/login','TradersAuthController.login')
Route.post('/trader/logout','TradersAuthController.logout')

Route.post('/trader/register','TradersAuthController.register')

Route.put('/trader/update_profile/:id','TraderController.update').middleware('auth:traders_jwt')
Route.post('/trader/myfx','TraderController.checkuser')
Route.post('/trader/myfx/history','TraderController.gethistory')
Route.post('/test','TraderController.diff_months')


//admin routes


Route.group(() => {

	Route.post('/admin/register','AdminAuthController.register')
	 Route.post('/admin/login','AdminAuthController.login')
	 Route.post('/admin/logout','AdminAuthController.logout')
	Route.put('/admin/update/profile/:id','AdminUserController.update').middleware('auth:admin_jwt')
	Route.put('/admin/change/password/:id','AdminAuthController.change_password').middleware('auth:admin_jwt')
	Route.post('/admin/test/mail','AdminUserController.test_mail')
}).namespace('Admin')


//payment routes
Route.group(() => {

Route.post('/payment/test','PaymentController.test_stk')
Route.post('/payment/callback','PaymentController.stk_callback')
Route.post('/payment/b2c','PaymentController.b2c_test')
Route.post('/payment/time_out','PaymentController.b2c_timeout')
Route.post('/payment/b2c_callback','PaymentController.b2c_callback')
}).namespace('Payments')

