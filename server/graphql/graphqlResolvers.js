const loginResolver = require('./loginResolvers');
const signUpResolver = require('./signUpResolvers');
const detailsResolver = require('./detailsResolvers');
const tuneAlarmResolvers = require('./tuneAlarmResolver');

const rootResolver = {
  ...loginResolver,
  ...signUpResolver,
  ...detailsResolver,
  ...tuneAlarmResolvers
};

module.exports = rootResolver;