module.exports = 
{
	routeHome: function routeHome(app)
	{
		app.get('/',function(request,response)
		{
			response.render('index');
			response.end();
		})
	}
}