const express  = require('express');
const app      = express();
const session  = require('express-session');
const path     = require('path');
const PORT     = process.env.PORT || 5000;
const database = 'mongodb://localhost:27017/user';
const routeHome  = require('./router/home.js');
const routeLogin = require('./router/login.js');
const routeCreateFaction = require('./router/createFaction.js');

const mongoose  = require('mongoose');
const tileSchema= mongoose.Schema(
{
	x: Number,
	y: Number,
	owner: String,
	color: String,
	name : String
});

const factionSchema = mongoose.Schema(
{
	name: String,
	logo: String
});

const userSchema = mongoose.Schema(
{
	username: String,
	pfp     : String,
	rank    : String,
	level   : Number,
	gold    : Number,
	faction : String,
	location: String,
	residency: String,
	money    : Number
});

mongoose.connect(database,{useNewUrlParser:true});
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(session({secret:"bsfskdchis2231jksdbfk",resave:false,saveUninitialized:true}));

routeHome.routeHome(app);
routeLogin.routeLogin(app,userSchema,tileSchema);
routeCreateFaction.routeCreateFaction(app,userSchema,factionSchema);
app.listen(PORT);
