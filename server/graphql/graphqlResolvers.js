const loginResolver = require('./loginResolvers');
const signUpResolver = require('./signUpResolvers');
const detailsResolver = require('./detailsResolvers');
const tuneAlarmResolvers = require('./tuneAlarmResolver');
const googleAuth = require('./googleAuthResolver');

const rootResolver = {
  ...googleAuth,
  ...loginResolver,
  ...signUpResolver,
  ...detailsResolver,
  ...tuneAlarmResolvers
};

module.exports = rootResolver;