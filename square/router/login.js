const mongoose    = require('mongoose');
const session     = require('express-session');
const routeProfile= require('./profile.js');
module.exports =
{
	routeLogin: function routeLogin(app,userSchema,tileSchema)
	{
		var user = mongoose.model('user',userSchema,'player');
		app.post('/login', async function(request,response)
		{
			
			await user.find({username: request.body.user}, function(err,result)
			{
				return new Promise(function(resolve,reject)
				{
					resolve(request.session.user = result[0]);
				});
			})
			routeProfile.routeProfile(app,tileSchema,user);
			response.redirect('/profile');
			response.end();
		});

		//register 
		app.post('/',function(request,response)
		{
			var userModel = new user(
			{
				username: request.body.user,
				pfp: '',
				rank: 'Civilian',
				level: 1,
				gold: 100,
				faction: 'None',
				location: 'Wilderness',
				residency: 'None',
				money: 100
			})
			userModel.save();
			response.end();
		})

		//gen map
		app.post('/gen-map',function(request,response)
		{
			var tileModel = mongoose.model('map',tileSchema,'tile')
			
			for(x=0;x<20;x++)
			{
				for(y=0;y<20;y++)
				{
					var xpos = x*30;
					var ypos = y*30;
					var tileData = new tileModel(
					{
						x: xpos,
						y: ypos,
						owner: 'Neutral',
						color: 'white',
						name : 'Wilderness'
					});
					tileData.save();
				}
		}
		response.end();
	});
	}
}