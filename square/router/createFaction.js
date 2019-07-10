const mongoose = require('mongoose');
const session  = require('express-session');

module.exports = 
{
	routeCreateFaction: function routeCreateFaction(app,userSchema,factionSchema)
	{
		var user = mongoose.model('user',userSchema,'player');
		var faction = mongoose.model('party',factionSchema,'faction');

		app.post('/create-party',function(request,response)
		{
			request.session.user.faction = request.body.faction;
			var factionModel = new faction(
			{
				name: request.body.faction,
				logo: ''
			});
			factionModel.save();
			//update user's faction
			user.findOneAndUpdate({username: request.session.user.username}, {faction: request.session.user.faction},{useFindAndModify:false},function(err,result)
			{
				response.end()
			});
			response.redirect('/profile');
		})
	}
}