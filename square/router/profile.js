const mongoose = require('mongoose');
const session  = require('express-session');
var mapRender;
var mapUrl;
function generateMap(mapModel)
{
	return new Promise(function(resolve,response)
	{
		mapModel.find({},function(err,result)
		{
			mapRender = result;
			resolve(mapRender);
		})
	})
}

module.exports = 
{
	routeProfile: function routeProfile(app,tileSchema,user)
	{
		var mapModel = mongoose.model('map',tileSchema,'tile');
		app.get('/profile', async function(request,response)
		{
			await generateMap(mapModel);
			if(request.session.user != undefined)
			{
				response.render('profile',
				{
					user: request.session.user,
					tile   : mapRender
				})
			}
			else
			{
				console.log('invalid login')
			}
			response.end();
		})

		app.get('/map/:id',function(request,response)
		{
			mapModel.find({_id: request.params.id},function(err,result)
			{
				mapUrl = result[0].name;
				user.findOneAndUpdate({username: request.session.user.username},{location: result[0].name},{useFindAndModify:false},function(err,result){});
				request.session.user.location = mapUrl;
				response.redirect('/profile');
				response.end();
			})	
		})
	}
}