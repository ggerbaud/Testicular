var loopback = require('loopback');
var boot = require('loopback-boot');
var _ = require('lodash');

var app = module.exports = loopback();

// Passport for third-party OAuth
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

var config = require('./providers.json');
var credentials = require('./credentials.json');

// Passport init
passportConfigurator.init(false);

// set up related models
passportConfigurator.setupModels({
  userModel: app.models.ZenUser,
  userCredentialModel: app.models.ZenUserCredential,
  userIdentityModel: app.models.ZenUserIdentity
});

for(var strategy in config) {
  var conf = _.assign(config[strategy], credentials);
  conf.session = conf.session !== false;
  conf.profileToUser = app.models.ZenUser.googleProfileToUser;
  passportConfigurator.configureProvider(strategy, conf);
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
