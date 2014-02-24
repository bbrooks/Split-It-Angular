'use strict';

angular.module('apigee', [])
	.factory('apigeeService', function( APIGEE_CONFIG, $http, $q ) {

		var projectBaseUrl = APIGEE_CONFIG.baseUrl + APIGEE_CONFIG.orgName + '/' + APIGEE_CONFIG.appName + '/';

		return {
			token: null,
			projectBaseUrl: projectBaseUrl,
			authUrl: projectBaseUrl + 'token',

			/**
			 * Gets a user authentication token from Apigee if we haven't already gotten one
			 * @return {promise} Resolves to the token if successful
			 */
			getToken: function(){

				if( this.token ){
					//Todo: is there a more concise way of doing this?
					var tokenPromise = $q.defer();
					tokenPromise.resolve(this.token);
					return tokenPromise.promise;
				} else {
					return this.getNewToken();
				}

			}, // getToken()

			/**
			 * Gets a new token from Apigee
			 * @return {promise} Resolves to the token if the request is successful
			 */
			getNewToken:  function(){

				var authUrl = this.authUrl;

				// Setup POST data
				var authData = {
					grant_type: 'password',
					username: APIGEE_CONFIG.username,
					password: APIGEE_CONFIG.password
				};

				var authPromise = $q.defer();

				$http.post( authUrl, authData )
					.success(function( data ){
						this.token = data.access_token;
						authPromise.resolve( data.access_token );
					}.bind(this))
					.error(function( response){
						authPromise.reject('Failed to log you in to Apigee');
					});

				return authPromise.promise;

			} // getNewToken()
		};

	}) // apigeeService

	.factory('apigeeCollection', function ( $q, $http, apigeeService) {

		/**
		 * A factory for creating apigee collections with the methoda all, query, add, remove, update
		 * @param {str} collectionName The name of the apigee collection to interact with
		 */
		function CollectionFactory( collectionName ){

			var Collection = function (data) {
				angular.extend(this, data);
			};

			// Set the url that we'll base our AJAX calls off of
			Collection.baseUrl = apigeeService.projectBaseUrl + collectionName + '/';

			/**
			 * Takes an angular $http request config object and returns a function that will make
			 * the request once we're authenticated.
			 * @param  {obj} httpConfig Config object for the angular $http service
			 * @return {function} Angular $http request that will be made once we're authenticated
			 */
			Collection.authenticatedRequest = function( httpConfig ){
				
				var httpRequest = Collection.httpRequest( httpConfig );

				/**
				 * Makes sure we're authenticated and then makes an $http request
				 * @return {promise} A promise which will resolve to the request data
				 */
				var authenticatedRequest = function(){

					var authPromise = apigeeService.getToken();
					var requestPromise = $q.defer();

					authPromise.then(
						function(){
							httpRequest()
								.success(function(data){
									requestPromise.resolve(data);
								})
								.error(function(){
									requestPromise.reject('Request Error');
								});
						},
						function(){
							requestPromise.reject('Request Authorization Failed');
						}
					);

					return requestPromise.promise;
				};

				return authenticatedRequest;

			};

			/**
			 * Returns an $http request with our apigee access token baked in
			 * @param  {object} httpConfig Angular $http config object
			 * @return {function} Angular $http request
			 */
			Collection.httpRequest = function( httpConfig ){

				var defaultConfig = {
					method: 'GET',
					url: Collection.baseUrl,
					params: {}
				};

				var config = {};

				angular.extend(config, defaultConfig, httpConfig);

				var httpRequest = function(){
					// Add access token and return $http request
					config.params.access_token = apigeeService.token;
					return $http( config );
				};

				return httpRequest;

			};

			/**
			 * Get all the items in the collection
			 * @return {promise} A promise that resolves to an array of items
			 */
			Collection.all = function() {
				return Collection.query('');
			};

			/**
			 * Adds an item to the collection
			 * @param  {obj} item JSON object describing an item
			 * @return {promise} Promise that resolves if the add succeeded
			 */
			Collection.add = function( item ){

				var itemAddPromise = $q.defer();
				var requestConfig = {
					method: 'POST',
					data: item
				};
				
				var addRequest = Collection.authenticatedRequest( requestConfig );
				
				addRequest()
					.then(
						function( response ){
							itemAddPromise.resolve( response.entities[0] );
						},
						function(){
							itemAddPromise.reject('Apigee Error: failed to add entity');
						}
					);

				return itemAddPromise.promise;
			};

			/**
			 * Remove an item from the collection
			 * @param  {str} uuid The uuid of the entity in the collection to remove/
			 * @return {promise} A promise that resolves when the remove is complete
			 */
			Collection.remove = function( uuid ){

				var itemRemovePromise = $q.defer();
				var removeUrl = Collection.baseUrl + uuid;
				var requestConfig = {
					url: removeUrl,
					method: 'DELETE'
				};

				var removeRequest = Collection.authenticatedRequest( requestConfig );

				removeRequest()
					.then(
						function(){
							itemRemovePromise.resolve();
						},
						function(){
							itemRemovePromise.reject('Apigee Error: failed to delete entity: ' + uuid);
						}
					);

				return itemRemovePromise.promise;
			};

			/**
			 * Make an arbitrary query to on the collection
			 * @param  {str} queryStr Apigee query string
			 * @return {promise} A promise that resolves to an array of items that match the query
			 */
			Collection.query = function(queryStr){
				
				var requestConfig = {
					params:{
						ql: queryStr
					}
				};

				var queryRequest = Collection.authenticatedRequest( requestConfig );
				var queryPromise = $q.defer();

				queryRequest()
					.then(
						function(data){
							queryPromise.resolve(data.entities);
						},
						function(){
							queryPromise.reject('Query Failed');
						}
					);

				return queryPromise.promise;

			};

			/**
			 * Updates an item in the collection
			 * @param  {obj} updatedItem JSON describing the item to be updated. Must include a UUID.
			 * @return {promise} A promise that resolves successfully if the update completes
			 */
			Collection.update = function( updatedItem ){
				
				var updateUrl = Collection.baseUrl + updatedItem.uuid;
				var requestConfig = {
					url: updateUrl,
					method: 'PUT',
					data: updatedItem
				};

				var updateRequest = Collection.authenticatedRequest( requestConfig );
				var updatePromise = $q.defer();

				updateRequest()
					.then(
						function( response ){
							updatePromise.resolve( response.entities[0] );
						},
						function(){
							updatePromise.reject('Apigee Error: failed to update entity: ' + updatedItem.uuid );
						}
					);

				return updatePromise.promise;

			};

			return Collection;
		}

		return CollectionFactory;

	});
