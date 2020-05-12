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