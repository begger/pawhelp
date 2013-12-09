/**
 * Module dependencies.
 */
var appPath = __dirname + '/app'
    , express = require('express')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , fs = require('fs')
    , mongoose = require('mongoose')
    ,LocalStrategy = require('passport-local').Strategy;


/** Connect to database and load models **/


var models_path = appPath + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file)
});
var UserModel = mongoose.model('UserModel');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('db-url', process.env.MONGOHQ_URL || 'mongodb://127.0.0.1/ph1206');
  app.set('views', appPath + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(app.get('db-url'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Routing to "controllers", seems important that we only include
 * our controllers at this point, or our models will not be passed
 * to them.
 */
var index = require(appPath + '/controllers/index');

app.get('/', index.login);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
passport.authenticate('facebook', { successRedirect: '/game/create',
                                      failureRedirect: '/' }));


passport.use(new LocalStrategy({
	clientID: "394752113969705",
	clientSecret: "0b89733727bfa43f009432d35f63ea2b",
	callbackURL: "http://localhost:3000/auth/facebook/callback"
 }, function(accessToken, refreshToken, profile, done) {
	   UserModel.findOne({facebook_id: profile.id}, function(err, user) {
			if (user) {
				done(null, user);
			} else {
				var newUser = new UserModel({
					name: profile.displayName,
					firstname: profile.first_name,
					lastname: profile.last_name,
					email: profile.emails[0].value,
					username: profile.username,
					gender: profile.gender,
					facebook_id: profile.id,
					token: accessToken,
					facebook: profile
				}).save(function(err, newUser) {
					if (err) throw err;
					done(null, newUser);
				});
			}
		});
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    UserModel.findById(id,function(err,user){
        if(err) done(err);
        if(user){
            done(null,user);
        }else{
            UserModel.findById(id, function(err,user){
                if(err) done(err);
                done(null,user);
            });
        }
    });
});


checkNull = function(value) {
	if(value == null || value == '')
	   return true ;
	return false ;
} 

/**
 * Start listening
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
