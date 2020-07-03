'use strict'


const Risk=use('App/Models/Risk');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with risks
 */
class RiskController {
  /**
   * Show a list of all risks.
   * GET risks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
  
	let risks=Risk.all();

	return response.send({"info":risks});
}

  /**
   * Render a form to be used for creating a new risk.
   * GET risks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new risk.
   * POST risks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

	const{category}=request.only(['category'])

	let new_category=Risk.create({category:category});

	return response.send({"info":new_category,"status":200});
  }

  /**
   * Display a single risk.
   * GET risks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing risk.
   * GET risks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update risk details.
   * PUT or PATCH risks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a risk with id.
   * DELETE risks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  
		
const { id } = params
const risk = await Risk.find(id)

await risk.delete();

return response.send({"status":200})
}
}

module.exports = RiskController
