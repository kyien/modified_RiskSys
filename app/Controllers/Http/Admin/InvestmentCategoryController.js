'use strict'

  const Investment=use('App/Models/InvestmentCategory');

class InvestmentCategoryController {
  /**
   * Show a list of all investmentcategories.
   * GET investmentcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
  	 
	let categories= await Investment.all();

	return response.send({"info":categories,"status":200})

}

  /**
   * Render a form to be used for creating a new investmentcategory.
   * GET investmentcategories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {

}
  /**
   * Create/save a new investmentcategory.
   * POST investmentcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  
	   const {name,cReturn,period,share,C_class,amount,risk_category}=request.all();
 
                try{
        let icategory= await Investment.create({
                name:name,
                category_return:cReturn,
                period_of_return:period,
                revenue_share:share,
                category_class:C_class,
		allocation_amnt:amount,
		risk_category:risk_category
        });

        return response.status(200).send({"info":icategory,"status":200});
        }
	 catch(e){
                        console.log(e);
                return response.send(e);
        }


}

  /**
   * Display a single investmentcategory.
   * GET investmentcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing investmentcategory.
   * GET investmentcategories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response }) {
 
}

  /**
   * Update investmentcategory details.
   * PUT or PATCH investmentcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  	
	 const id=params.id
        const{name,cReturn,period,share,C_class}=request.only(['name','cReturn','period','share','C_class'])

        const category=await Investment.findByOrFail('id',id);

        category.name=name
        category.category_return=cReturn
        category.period_of_return=period
        category.revenue_share=share
        category.category_class=C_class

        await category.save();

        return response.send({"info":category});

}

  /**
   * Delete a investmentcategory with id.
   * DELETE investmentcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

	const { id } = params
	const icategory = await Investment.find(id);

	await icategory.delete()
	
	return response.send({"status":200})	

  }
}

module.exports = InvestmentCategoryController
