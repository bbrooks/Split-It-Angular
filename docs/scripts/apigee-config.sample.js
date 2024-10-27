'use strict';
/**
 * This is the sample apigee config file. Enter your credentials and rename it to
 * 'apigee-config.js' to wire up the app with an apigee backend!
 *
 * MAKE SURE TO HOST THIS APP BEHIND SOME FORM OF SERVER AUTHENTICATION. 
 * YOUR APIGEE CREDENTIALS WILL BE VISIBLE TO ANYONE USING THE APP!
 */

angular.module('splitItApp')

	.value('APIGEE_CONFIG', {
		orgName: '',
		appName: '',
		username: '',
		password: '',
		baseUrl: 'https://api.usergrid.com/'
	});