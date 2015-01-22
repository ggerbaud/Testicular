(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.User#login
         * @methodOf lbServices.User
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Users/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#logout
         * @methodOf lbServices.User
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Users/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#confirm
         * @methodOf lbServices.User
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Users/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#resetPassword
         * @methodOf lbServices.User
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Users/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__findById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__destroyById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__updateById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__get__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Users/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__create__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__delete__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__count__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Counts accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#create
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Users",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#exists
         * @methodOf lbServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Users/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Users/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#find
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Users",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findOne
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Users/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#updateAll
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Users/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#deleteById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Users/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#count
         * @methodOf lbServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Users/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.User#modelName
    * @propertyOf lbServices.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Question
 * @header lbServices.Question
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Question` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Question",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Questions/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Question.answer() instead.
        "prototype$__get__answer": {
          url: urlBase + "/Questions/:id/answer",
          method: "GET"
        },

        // INTERNAL. Use Question.attempts.findById() instead.
        "prototype$__findById__attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.attempts.destroyById() instead.
        "prototype$__destroyById__attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.attempts.updateById() instead.
        "prototype$__updateById__attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.findById() instead.
        "prototype$__findById__themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.themes.destroyById() instead.
        "prototype$__destroyById__themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.updateById() instead.
        "prototype$__updateById__themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.link() instead.
        "prototype$__link__themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.unlink() instead.
        "prototype$__unlink__themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.exists() instead.
        "prototype$__exists__themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Question.quizzs.findById() instead.
        "prototype$__findById__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.quizzs.destroyById() instead.
        "prototype$__destroyById__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.updateById() instead.
        "prototype$__updateById__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.quizzs.link() instead.
        "prototype$__link__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.quizzs.unlink() instead.
        "prototype$__unlink__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.exists() instead.
        "prototype$__exists__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Question.attempts() instead.
        "prototype$__get__attempts": {
          isArray: true,
          url: urlBase + "/Questions/:id/attempts",
          method: "GET"
        },

        // INTERNAL. Use Question.attempts.create() instead.
        "prototype$__create__attempts": {
          url: urlBase + "/Questions/:id/attempts",
          method: "POST"
        },

        // INTERNAL. Use Question.attempts.destroyAll() instead.
        "prototype$__delete__attempts": {
          url: urlBase + "/Questions/:id/attempts",
          method: "DELETE"
        },

        // INTERNAL. Use Question.attempts.count() instead.
        "prototype$__count__attempts": {
          url: urlBase + "/Questions/:id/attempts/count",
          method: "GET"
        },

        // INTERNAL. Use Question.themes() instead.
        "prototype$__get__themes": {
          isArray: true,
          url: urlBase + "/Questions/:id/themes",
          method: "GET"
        },

        // INTERNAL. Use Question.themes.create() instead.
        "prototype$__create__themes": {
          url: urlBase + "/Questions/:id/themes",
          method: "POST"
        },

        // INTERNAL. Use Question.themes.destroyAll() instead.
        "prototype$__delete__themes": {
          url: urlBase + "/Questions/:id/themes",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.count() instead.
        "prototype$__count__themes": {
          url: urlBase + "/Questions/:id/themes/count",
          method: "GET"
        },

        // INTERNAL. Use Question.quizzs() instead.
        "prototype$__get__quizzs": {
          isArray: true,
          url: urlBase + "/Questions/:id/quizzs",
          method: "GET"
        },

        // INTERNAL. Use Question.quizzs.create() instead.
        "prototype$__create__quizzs": {
          url: urlBase + "/Questions/:id/quizzs",
          method: "POST"
        },

        // INTERNAL. Use Question.quizzs.destroyAll() instead.
        "prototype$__delete__quizzs": {
          url: urlBase + "/Questions/:id/quizzs",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.count() instead.
        "prototype$__count__quizzs": {
          url: urlBase + "/Questions/:id/quizzs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#create
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Questions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#upsert
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Questions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#exists
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Questions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#findById
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Questions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#find
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Questions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#findOne
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Questions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#updateAll
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Questions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#deleteById
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Questions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#count
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Questions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#prototype$updateAttributes
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Questions/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Question#unanswered
         * @methodOf lbServices.Question
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        "unanswered": {
          url: urlBase + "/Questions/unanswered",
          method: "GET"
        },

        // INTERNAL. Use Answer.question() instead.
        "::get::Answer::question": {
          url: urlBase + "/Answers/:id/question",
          method: "GET"
        },

        // INTERNAL. Use Attempt.question() instead.
        "::get::Attempt::question": {
          url: urlBase + "/Attempts/:id/question",
          method: "GET"
        },

        // INTERNAL. Use Theme.questions.findById() instead.
        "::findById::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Theme.questions.destroyById() instead.
        "::destroyById::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.updateById() instead.
        "::updateById::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Theme.questions.link() instead.
        "::link::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Theme.questions.unlink() instead.
        "::unlink::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.exists() instead.
        "::exists::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Theme.questions() instead.
        "::get::Theme::questions": {
          isArray: true,
          url: urlBase + "/Themes/:id/questions",
          method: "GET"
        },

        // INTERNAL. Use Theme.questions.create() instead.
        "::create::Theme::questions": {
          url: urlBase + "/Themes/:id/questions",
          method: "POST"
        },

        // INTERNAL. Use Theme.questions.destroyAll() instead.
        "::delete::Theme::questions": {
          url: urlBase + "/Themes/:id/questions",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.count() instead.
        "::count::Theme::questions": {
          url: urlBase + "/Themes/:id/questions/count",
          method: "GET"
        },

        // INTERNAL. Use Quizz.questions.findById() instead.
        "::findById::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Quizz.questions.destroyById() instead.
        "::destroyById::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.updateById() instead.
        "::updateById::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Quizz.questions.link() instead.
        "::link::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Quizz.questions.unlink() instead.
        "::unlink::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.exists() instead.
        "::exists::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Quizz.questions() instead.
        "::get::Quizz::questions": {
          isArray: true,
          url: urlBase + "/Quizz/:id/questions",
          method: "GET"
        },

        // INTERNAL. Use Quizz.questions.create() instead.
        "::create::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions",
          method: "POST"
        },

        // INTERNAL. Use Quizz.questions.destroyAll() instead.
        "::delete::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.count() instead.
        "::count::Quizz::questions": {
          url: urlBase + "/Quizz/:id/questions/count",
          method: "GET"
        },

        // INTERNAL. Use QuizzQuestion.question() instead.
        "::get::QuizzQuestion::question": {
          url: urlBase + "/QuizzQuestions/:id/question",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Question#updateOrCreate
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Question#update
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Question#destroyById
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Question#removeById
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Question#modelName
    * @propertyOf lbServices.Question
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Question`.
    */
    R.modelName = "Question";


        /**
         * @ngdoc method
         * @name lbServices.Question#answer
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Fetches hasOne relation answer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        R.answer = function() {
          var TargetResource = $injector.get("Answer");
          var action = TargetResource["::get::Question::answer"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Question.attempts
     * @header lbServices.Question.attempts
     * @object
     * @description
     *
     * The object `Question.attempts` groups methods
     * manipulating `Attempt` instances related to `Question`.
     *
     * Call {@link lbServices.Question#attempts Question.attempts()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Question#attempts
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Queries attempts of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::get::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#count
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Counts attempts of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.attempts.count = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::count::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#create
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Creates a new instance in attempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.create = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::create::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#destroyAll
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Deletes all attempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attempts.destroyAll = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::delete::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#destroyById
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Delete a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attempts.destroyById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::destroyById::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#findById
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Find a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.findById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::findById::Question::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.attempts#updateById
         * @methodOf lbServices.Question.attempts
         *
         * @description
         *
         * Update a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.updateById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::updateById::Question::attempts"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Question.themes
     * @header lbServices.Question.themes
     * @object
     * @description
     *
     * The object `Question.themes` groups methods
     * manipulating `Theme` instances related to `Question`.
     *
     * Call {@link lbServices.Question#themes Question.themes()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Question#themes
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Queries themes of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::get::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#count
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Counts themes of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.themes.count = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::count::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#create
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Creates a new instance in themes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes.create = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::create::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#destroyAll
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Deletes all themes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.themes.destroyAll = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::delete::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#destroyById
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Delete a related item by id for themes
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.themes.destroyById = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::destroyById::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#exists
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Check the existence of themes relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes.exists = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::exists::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#findById
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Find a related item by id for themes
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes.findById = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::findById::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#link
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Add a related item by id for themes
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes.link = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::link::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#unlink
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Remove the themes relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.themes.unlink = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::unlink::Question::themes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.themes#updateById
         * @methodOf lbServices.Question.themes
         *
         * @description
         *
         * Update a related item by id for themes
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for themes
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R.themes.updateById = function() {
          var TargetResource = $injector.get("Theme");
          var action = TargetResource["::updateById::Question::themes"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Question.quizzs
     * @header lbServices.Question.quizzs
     * @object
     * @description
     *
     * The object `Question.quizzs` groups methods
     * manipulating `Quizz` instances related to `Question`.
     *
     * Call {@link lbServices.Question#quizzs Question.quizzs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Question#quizzs
         * @methodOf lbServices.Question
         *
         * @description
         *
         * Queries quizzs of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::get::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#count
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Counts quizzs of Question.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.quizzs.count = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::count::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#create
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Creates a new instance in quizzs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs.create = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::create::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#destroyAll
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Deletes all quizzs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.quizzs.destroyAll = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::delete::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#destroyById
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Delete a related item by id for quizzs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.quizzs.destroyById = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::destroyById::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#exists
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Check the existence of quizzs relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs.exists = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::exists::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#findById
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Find a related item by id for quizzs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs.findById = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::findById::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#link
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Add a related item by id for quizzs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs.link = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::link::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#unlink
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Remove the quizzs relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.quizzs.unlink = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::unlink::Question::quizzs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Question.quizzs#updateById
         * @methodOf lbServices.Question.quizzs
         *
         * @description
         *
         * Update a related item by id for quizzs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizzs.updateById = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::updateById::Question::quizzs"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Answer
 * @header lbServices.Answer
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Answer` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Answer",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Answers/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Answer.question() instead.
        "prototype$__get__question": {
          url: urlBase + "/Answers/:id/question",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#create
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Answers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#upsert
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Answers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#exists
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Answers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#findById
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Answers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#find
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Answers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#findOne
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Answers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#updateAll
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Answers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#deleteById
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Answers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#count
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Answers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Answer#prototype$updateAttributes
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Answers/:id",
          method: "PUT"
        },

        // INTERNAL. Use Question.answer() instead.
        "::get::Question::answer": {
          url: urlBase + "/Questions/:id/answer",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Answer#updateOrCreate
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Answer` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Answer#update
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Answer#destroyById
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Answer#removeById
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Answer#modelName
    * @propertyOf lbServices.Answer
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Answer`.
    */
    R.modelName = "Answer";


        /**
         * @ngdoc method
         * @name lbServices.Answer#question
         * @methodOf lbServices.Answer
         *
         * @description
         *
         * Fetches belongsTo relation question
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.question = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::get::Answer::question"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Attempt
 * @header lbServices.Attempt
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Attempt` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Attempt",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Attempts/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Attempt.question() instead.
        "prototype$__get__question": {
          url: urlBase + "/Attempts/:id/question",
          method: "GET"
        },

        // INTERNAL. Use Attempt.evaluation() instead.
        "prototype$__get__evaluation": {
          url: urlBase + "/Attempts/:id/evaluation",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#create
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Attempts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#upsert
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Attempts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#exists
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Attempts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#findById
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Attempts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#find
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Attempts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#findOne
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Attempts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#updateAll
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Attempts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#deleteById
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Attempts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#count
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Attempts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attempt#prototype$updateAttributes
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Attempts/:id",
          method: "PUT"
        },

        // INTERNAL. Use Question.attempts.findById() instead.
        "::findById::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.attempts.destroyById() instead.
        "::destroyById::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.attempts.updateById() instead.
        "::updateById::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.attempts() instead.
        "::get::Question::attempts": {
          isArray: true,
          url: urlBase + "/Questions/:id/attempts",
          method: "GET"
        },

        // INTERNAL. Use Question.attempts.create() instead.
        "::create::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts",
          method: "POST"
        },

        // INTERNAL. Use Question.attempts.destroyAll() instead.
        "::delete::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts",
          method: "DELETE"
        },

        // INTERNAL. Use Question.attempts.count() instead.
        "::count::Question::attempts": {
          url: urlBase + "/Questions/:id/attempts/count",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts.findById() instead.
        "::findById::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts.destroyById() instead.
        "::destroyById::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use QuizzAttempt.attempts.updateById() instead.
        "::updateById::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use QuizzAttempt.attempts() instead.
        "::get::QuizzAttempt::attempts": {
          isArray: true,
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts.create() instead.
        "::create::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "POST"
        },

        // INTERNAL. Use QuizzAttempt.attempts.destroyAll() instead.
        "::delete::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "DELETE"
        },

        // INTERNAL. Use QuizzAttempt.attempts.count() instead.
        "::count::QuizzAttempt::attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Attempt#updateOrCreate
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Attempt#update
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Attempt#destroyById
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Attempt#removeById
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Attempt#modelName
    * @propertyOf lbServices.Attempt
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Attempt`.
    */
    R.modelName = "Attempt";


        /**
         * @ngdoc method
         * @name lbServices.Attempt#question
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Fetches belongsTo relation question
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.question = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::get::Attempt::question"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Attempt#evaluation
         * @methodOf lbServices.Attempt
         *
         * @description
         *
         * Fetches hasOne relation evaluation
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        R.evaluation = function() {
          var TargetResource = $injector.get("Evaluation");
          var action = TargetResource["::get::Attempt::evaluation"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Evaluation
 * @header lbServices.Evaluation
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Evaluation` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Evaluation",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Evaluations/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#create
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Evaluations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#upsert
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Evaluations",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#exists
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Evaluations/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#findById
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Evaluations/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#find
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Evaluations",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#findOne
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Evaluations/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#updateAll
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Evaluations/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#deleteById
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Evaluations/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#count
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Evaluations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#prototype$updateAttributes
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Evaluations/:id",
          method: "PUT"
        },

        // INTERNAL. Use Attempt.evaluation() instead.
        "::get::Attempt::evaluation": {
          url: urlBase + "/Attempts/:id/evaluation",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Evaluation#updateOrCreate
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evaluation` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#update
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#destroyById
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Evaluation#removeById
         * @methodOf lbServices.Evaluation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Evaluation#modelName
    * @propertyOf lbServices.Evaluation
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Evaluation`.
    */
    R.modelName = "Evaluation";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Theme
 * @header lbServices.Theme
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Theme` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Theme",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Themes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Theme.questions.findById() instead.
        "prototype$__findById__questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Theme.questions.destroyById() instead.
        "prototype$__destroyById__questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.updateById() instead.
        "prototype$__updateById__questions": {
          url: urlBase + "/Themes/:id/questions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Theme.questions.link() instead.
        "prototype$__link__questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Theme.questions.unlink() instead.
        "prototype$__unlink__questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.exists() instead.
        "prototype$__exists__questions": {
          url: urlBase + "/Themes/:id/questions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Theme.questions() instead.
        "prototype$__get__questions": {
          isArray: true,
          url: urlBase + "/Themes/:id/questions",
          method: "GET"
        },

        // INTERNAL. Use Theme.questions.create() instead.
        "prototype$__create__questions": {
          url: urlBase + "/Themes/:id/questions",
          method: "POST"
        },

        // INTERNAL. Use Theme.questions.destroyAll() instead.
        "prototype$__delete__questions": {
          url: urlBase + "/Themes/:id/questions",
          method: "DELETE"
        },

        // INTERNAL. Use Theme.questions.count() instead.
        "prototype$__count__questions": {
          url: urlBase + "/Themes/:id/questions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#create
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Themes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#upsert
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Themes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#exists
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Themes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#findById
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Themes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#find
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Themes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#findOne
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Themes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#updateAll
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Themes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#deleteById
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Themes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#count
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Themes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Theme#prototype$updateAttributes
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Themes/:id",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.findById() instead.
        "::findById::Question::themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.themes.destroyById() instead.
        "::destroyById::Question::themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.updateById() instead.
        "::updateById::Question::themes": {
          url: urlBase + "/Questions/:id/themes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.link() instead.
        "::link::Question::themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.themes.unlink() instead.
        "::unlink::Question::themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.exists() instead.
        "::exists::Question::themes": {
          url: urlBase + "/Questions/:id/themes/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Question.themes() instead.
        "::get::Question::themes": {
          isArray: true,
          url: urlBase + "/Questions/:id/themes",
          method: "GET"
        },

        // INTERNAL. Use Question.themes.create() instead.
        "::create::Question::themes": {
          url: urlBase + "/Questions/:id/themes",
          method: "POST"
        },

        // INTERNAL. Use Question.themes.destroyAll() instead.
        "::delete::Question::themes": {
          url: urlBase + "/Questions/:id/themes",
          method: "DELETE"
        },

        // INTERNAL. Use Question.themes.count() instead.
        "::count::Question::themes": {
          url: urlBase + "/Questions/:id/themes/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Theme#updateOrCreate
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Theme` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Theme#update
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Theme#destroyById
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Theme#removeById
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Theme#modelName
    * @propertyOf lbServices.Theme
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Theme`.
    */
    R.modelName = "Theme";

    /**
     * @ngdoc object
     * @name lbServices.Theme.questions
     * @header lbServices.Theme.questions
     * @object
     * @description
     *
     * The object `Theme.questions` groups methods
     * manipulating `Question` instances related to `Theme`.
     *
     * Call {@link lbServices.Theme#questions Theme.questions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Theme#questions
         * @methodOf lbServices.Theme
         *
         * @description
         *
         * Queries questions of Theme.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::get::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#count
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Counts questions of Theme.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.questions.count = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::count::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#create
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Creates a new instance in questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.create = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::create::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#destroyAll
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Deletes all questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.destroyAll = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::delete::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#destroyById
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Delete a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.destroyById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::destroyById::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#exists
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Check the existence of questions relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.exists = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::exists::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#findById
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Find a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.findById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::findById::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#link
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Add a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.link = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::link::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#unlink
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Remove the questions relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.unlink = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::unlink::Theme::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Theme.questions#updateById
         * @methodOf lbServices.Theme.questions
         *
         * @description
         *
         * Update a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.updateById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::updateById::Theme::questions"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Quizz
 * @header lbServices.Quizz
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Quizz` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Quizz",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Quizz/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Quizz.questions.findById() instead.
        "prototype$__findById__questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Quizz.questions.destroyById() instead.
        "prototype$__destroyById__questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.updateById() instead.
        "prototype$__updateById__questions": {
          url: urlBase + "/Quizz/:id/questions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Quizz.questions.link() instead.
        "prototype$__link__questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Quizz.questions.unlink() instead.
        "prototype$__unlink__questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.exists() instead.
        "prototype$__exists__questions": {
          url: urlBase + "/Quizz/:id/questions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Quizz.questions() instead.
        "prototype$__get__questions": {
          isArray: true,
          url: urlBase + "/Quizz/:id/questions",
          method: "GET"
        },

        // INTERNAL. Use Quizz.questions.create() instead.
        "prototype$__create__questions": {
          url: urlBase + "/Quizz/:id/questions",
          method: "POST"
        },

        // INTERNAL. Use Quizz.questions.destroyAll() instead.
        "prototype$__delete__questions": {
          url: urlBase + "/Quizz/:id/questions",
          method: "DELETE"
        },

        // INTERNAL. Use Quizz.questions.count() instead.
        "prototype$__count__questions": {
          url: urlBase + "/Quizz/:id/questions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#create
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Quizz",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#upsert
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Quizz",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#exists
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Quizz/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#findById
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Quizz/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#find
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Quizz",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#findOne
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Quizz/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#updateAll
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Quizz/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#deleteById
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Quizz/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#count
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Quizz/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#prototype$updateAttributes
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Quizz/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Quizz#prototype$safeDelete
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `deleted` – `{boolean=}` - 
         */
        "prototype$safeDelete": {
          url: urlBase + "/Quizz/:id/safeDeleteById",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.findById() instead.
        "::findById::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Question.quizzs.destroyById() instead.
        "::destroyById::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.updateById() instead.
        "::updateById::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.quizzs.link() instead.
        "::link::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Question.quizzs.unlink() instead.
        "::unlink::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.exists() instead.
        "::exists::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Question.quizzs() instead.
        "::get::Question::quizzs": {
          isArray: true,
          url: urlBase + "/Questions/:id/quizzs",
          method: "GET"
        },

        // INTERNAL. Use Question.quizzs.create() instead.
        "::create::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs",
          method: "POST"
        },

        // INTERNAL. Use Question.quizzs.destroyAll() instead.
        "::delete::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs",
          method: "DELETE"
        },

        // INTERNAL. Use Question.quizzs.count() instead.
        "::count::Question::quizzs": {
          url: urlBase + "/Questions/:id/quizzs/count",
          method: "GET"
        },

        // INTERNAL. Use QuizzQuestion.quizz() instead.
        "::get::QuizzQuestion::quizz": {
          url: urlBase + "/QuizzQuestions/:id/quizz",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.quizz() instead.
        "::get::QuizzAttempt::quizz": {
          url: urlBase + "/QuizzAttempts/:id/quizz",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Quizz#updateOrCreate
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Quizz#update
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Quizz#destroyById
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Quizz#removeById
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Quizz#modelName
    * @propertyOf lbServices.Quizz
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Quizz`.
    */
    R.modelName = "Quizz";

    /**
     * @ngdoc object
     * @name lbServices.Quizz.questions
     * @header lbServices.Quizz.questions
     * @object
     * @description
     *
     * The object `Quizz.questions` groups methods
     * manipulating `Question` instances related to `Quizz`.
     *
     * Call {@link lbServices.Quizz#questions Quizz.questions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Quizz#questions
         * @methodOf lbServices.Quizz
         *
         * @description
         *
         * Queries questions of Quizz.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::get::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#count
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Counts questions of Quizz.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.questions.count = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::count::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#create
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Creates a new instance in questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.create = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::create::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#destroyAll
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Deletes all questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.destroyAll = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::delete::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#destroyById
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Delete a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.destroyById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::destroyById::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#exists
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Check the existence of questions relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.exists = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::exists::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#findById
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Find a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.findById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::findById::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#link
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Add a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.link = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::link::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#unlink
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Remove the questions relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.questions.unlink = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::unlink::Quizz::questions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Quizz.questions#updateById
         * @methodOf lbServices.Quizz.questions
         *
         * @description
         *
         * Update a related item by id for questions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.questions.updateById = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::updateById::Quizz::questions"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Interview
 * @header lbServices.Interview
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Interview` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Interview",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Interviews/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Interview.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/Interviews/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.findById() instead.
        "prototype$__findById__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.destroyById() instead.
        "prototype$__destroyById__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Interview.quizzAttempts.updateById() instead.
        "prototype$__updateById__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Interview.quizzAttempts() instead.
        "prototype$__get__quizzAttempts": {
          isArray: true,
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.create() instead.
        "prototype$__create__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "POST"
        },

        // INTERNAL. Use Interview.quizzAttempts.destroyAll() instead.
        "prototype$__delete__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "DELETE"
        },

        // INTERNAL. Use Interview.quizzAttempts.count() instead.
        "prototype$__count__quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#create
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Interviews",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#upsert
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Interviews",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#exists
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Interviews/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#findById
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Interviews/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#find
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Interviews",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#findOne
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Interviews/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#updateAll
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Interviews/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#deleteById
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Interviews/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#count
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Interviews/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Interview#prototype$updateAttributes
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Interviews/:id",
          method: "PUT"
        },

        // INTERNAL. Use ZenUser.interviews.findById() instead.
        "::findById::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "GET"
        },

        // INTERNAL. Use ZenUser.interviews.destroyById() instead.
        "::destroyById::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ZenUser.interviews.updateById() instead.
        "::updateById::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ZenUser.interviews() instead.
        "::get::ZenUser::interviews": {
          isArray: true,
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "GET"
        },

        // INTERNAL. Use ZenUser.interviews.create() instead.
        "::create::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "POST"
        },

        // INTERNAL. Use ZenUser.interviews.destroyAll() instead.
        "::delete::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "DELETE"
        },

        // INTERNAL. Use ZenUser.interviews.count() instead.
        "::count::ZenUser::interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/count",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.interview() instead.
        "::get::QuizzAttempt::interview": {
          url: urlBase + "/QuizzAttempts/:id/interview",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Interview#updateOrCreate
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Interview#update
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Interview#destroyById
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Interview#removeById
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Interview#modelName
    * @propertyOf lbServices.Interview
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Interview`.
    */
    R.modelName = "Interview";


        /**
         * @ngdoc method
         * @name lbServices.Interview#user
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Fetches belongsTo relation user
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("ZenUser");
          var action = TargetResource["::get::Interview::user"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Interview.quizzAttempts
     * @header lbServices.Interview.quizzAttempts
     * @object
     * @description
     *
     * The object `Interview.quizzAttempts` groups methods
     * manipulating `QuizzAttempt` instances related to `Interview`.
     *
     * Call {@link lbServices.Interview#quizzAttempts Interview.quizzAttempts()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Interview#quizzAttempts
         * @methodOf lbServices.Interview
         *
         * @description
         *
         * Queries quizzAttempts of Interview.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        R.quizzAttempts = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::get::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#count
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Counts quizzAttempts of Interview.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.quizzAttempts.count = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::count::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#create
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Creates a new instance in quizzAttempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        R.quizzAttempts.create = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::create::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#destroyAll
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Deletes all quizzAttempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.quizzAttempts.destroyAll = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::delete::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#destroyById
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Delete a related item by id for quizzAttempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzAttempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.quizzAttempts.destroyById = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::destroyById::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#findById
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Find a related item by id for quizzAttempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzAttempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        R.quizzAttempts.findById = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::findById::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Interview.quizzAttempts#updateById
         * @methodOf lbServices.Interview.quizzAttempts
         *
         * @description
         *
         * Update a related item by id for quizzAttempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for quizzAttempts
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        R.quizzAttempts.updateById = function() {
          var TargetResource = $injector.get("QuizzAttempt");
          var action = TargetResource["::updateById::Interview::quizzAttempts"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.QuizzQuestion
 * @header lbServices.QuizzQuestion
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `QuizzQuestion` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "QuizzQuestion",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/QuizzQuestions/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use QuizzQuestion.question() instead.
        "prototype$__get__question": {
          url: urlBase + "/QuizzQuestions/:id/question",
          method: "GET"
        },

        // INTERNAL. Use QuizzQuestion.quizz() instead.
        "prototype$__get__quizz": {
          url: urlBase + "/QuizzQuestions/:id/quizz",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#create
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/QuizzQuestions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#upsert
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/QuizzQuestions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#exists
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/QuizzQuestions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#findById
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/QuizzQuestions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#find
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/QuizzQuestions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#findOne
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/QuizzQuestions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#updateAll
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/QuizzQuestions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#deleteById
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/QuizzQuestions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#count
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/QuizzQuestions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#prototype$updateAttributes
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/QuizzQuestions/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#updateOrCreate
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzQuestion` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#update
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#destroyById
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#removeById
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.QuizzQuestion#modelName
    * @propertyOf lbServices.QuizzQuestion
    * @description
    * The name of the model represented by this $resource,
    * i.e. `QuizzQuestion`.
    */
    R.modelName = "QuizzQuestion";


        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#question
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Fetches belongsTo relation question
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Question` object.)
         * </em>
         */
        R.question = function() {
          var TargetResource = $injector.get("Question");
          var action = TargetResource["::get::QuizzQuestion::question"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzQuestion#quizz
         * @methodOf lbServices.QuizzQuestion
         *
         * @description
         *
         * Fetches belongsTo relation quizz
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizz = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::get::QuizzQuestion::quizz"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.ZenUser
 * @header lbServices.ZenUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ZenUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ZenUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/ZenUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#login
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/ZenUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#logout
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/ZenUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#confirm
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/ZenUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#resetPassword
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/ZenUsers/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__findById__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__destroyById__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__updateById__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ZenUser.interviews.findById() instead.
        "prototype$__findById__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "GET"
        },

        // INTERNAL. Use ZenUser.interviews.destroyById() instead.
        "prototype$__destroyById__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ZenUser.interviews.updateById() instead.
        "prototype$__updateById__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__get__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Queries accessTokens of ZenUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/ZenUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__create__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__delete__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$__count__accessTokens
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Counts accessTokens of ZenUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/ZenUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use ZenUser.interviews() instead.
        "prototype$__get__interviews": {
          isArray: true,
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "GET"
        },

        // INTERNAL. Use ZenUser.interviews.create() instead.
        "prototype$__create__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "POST"
        },

        // INTERNAL. Use ZenUser.interviews.destroyAll() instead.
        "prototype$__delete__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews",
          method: "DELETE"
        },

        // INTERNAL. Use ZenUser.interviews.count() instead.
        "prototype$__count__interviews": {
          url: urlBase + "/ZenUsers/:id/interviews/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#create
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/ZenUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#upsert
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/ZenUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#exists
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/ZenUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#findById
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/ZenUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#find
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/ZenUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#findOne
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/ZenUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#updateAll
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/ZenUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#deleteById
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/ZenUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#count
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/ZenUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$updateAttributes
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/ZenUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#prototype$userInterview
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "prototype$userInterview": {
          url: urlBase + "/ZenUsers/:id/myInterview",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#newCandidat
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `email` – `{string}` - 
         *
         *  - `name` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "newCandidat": {
          url: urlBase + "/ZenUsers/createCandidat",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#newSpecialUser
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `email` – `{string}` - 
         *
         *  - `name` – `{string}` - 
         *
         *  - `role` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "newSpecialUser": {
          url: urlBase + "/ZenUsers/createSpecialUser",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#listCandidats
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "listCandidats": {
          isArray: true,
          url: urlBase + "/ZenUsers/candidats",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#getCandidat
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{number=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        "getCandidat": {
          url: urlBase + "/ZenUsers/candidat/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#hasRole
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `role` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `hasRole` – `{boolean=}` - 
         */
        "hasRole": {
          url: urlBase + "/ZenUsers/hasRole",
          method: "GET"
        },

        // INTERNAL. Use Interview.user() instead.
        "::get::Interview::user": {
          url: urlBase + "/Interviews/:id/user",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.owner() instead.
        "::get::QuizzAttempt::owner": {
          url: urlBase + "/QuizzAttempts/:id/owner",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#getCurrent
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/ZenUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.ZenUser#updateOrCreate
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#update
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#destroyById
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#removeById
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#getCachedCurrent
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.ZenUser#login} or
         * {@link lbServices.ZenUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A ZenUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#isAuthenticated
         * @methodOf lbServices.ZenUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser#getCurrentId
         * @methodOf lbServices.ZenUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.ZenUser#modelName
    * @propertyOf lbServices.ZenUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `ZenUser`.
    */
    R.modelName = "ZenUser";

    /**
     * @ngdoc object
     * @name lbServices.ZenUser.interviews
     * @header lbServices.ZenUser.interviews
     * @object
     * @description
     *
     * The object `ZenUser.interviews` groups methods
     * manipulating `Interview` instances related to `ZenUser`.
     *
     * Call {@link lbServices.ZenUser#interviews ZenUser.interviews()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.ZenUser#interviews
         * @methodOf lbServices.ZenUser
         *
         * @description
         *
         * Queries interviews of ZenUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R.interviews = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::get::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#count
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Counts interviews of ZenUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.interviews.count = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::count::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#create
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Creates a new instance in interviews of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R.interviews.create = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::create::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#destroyAll
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Deletes all interviews of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.interviews.destroyAll = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::delete::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#destroyById
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Delete a related item by id for interviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for interviews
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.interviews.destroyById = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::destroyById::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#findById
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Find a related item by id for interviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for interviews
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R.interviews.findById = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::findById::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ZenUser.interviews#updateById
         * @methodOf lbServices.ZenUser.interviews
         *
         * @description
         *
         * Update a related item by id for interviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for interviews
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R.interviews.updateById = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::updateById::ZenUser::interviews"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.QuizzAttempt
 * @header lbServices.QuizzAttempt
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `QuizzAttempt` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "QuizzAttempt",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/QuizzAttempts/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use QuizzAttempt.attempts.findById() instead.
        "prototype$__findById__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts.destroyById() instead.
        "prototype$__destroyById__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use QuizzAttempt.attempts.updateById() instead.
        "prototype$__updateById__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use QuizzAttempt.quizz() instead.
        "prototype$__get__quizz": {
          url: urlBase + "/QuizzAttempts/:id/quizz",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.interview() instead.
        "prototype$__get__interview": {
          url: urlBase + "/QuizzAttempts/:id/interview",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.owner() instead.
        "prototype$__get__owner": {
          url: urlBase + "/QuizzAttempts/:id/owner",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts() instead.
        "prototype$__get__attempts": {
          isArray: true,
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "GET"
        },

        // INTERNAL. Use QuizzAttempt.attempts.create() instead.
        "prototype$__create__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "POST"
        },

        // INTERNAL. Use QuizzAttempt.attempts.destroyAll() instead.
        "prototype$__delete__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts",
          method: "DELETE"
        },

        // INTERNAL. Use QuizzAttempt.attempts.count() instead.
        "prototype$__count__attempts": {
          url: urlBase + "/QuizzAttempts/:id/attempts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#create
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/QuizzAttempts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#upsert
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/QuizzAttempts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#exists
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/QuizzAttempts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#findById
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/QuizzAttempts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#find
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/QuizzAttempts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#findOne
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/QuizzAttempts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#updateAll
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/QuizzAttempts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#deleteById
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/QuizzAttempts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#count
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/QuizzAttempts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#prototype$updateAttributes
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/QuizzAttempts/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#prototype$quizzInfo
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "prototype$quizzInfo": {
          url: urlBase + "/QuizzAttempts/:id/infos",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#prototype$quizzQuestions
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `n` – `{number=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        "prototype$quizzQuestions": {
          url: urlBase + "/QuizzAttempts/:id/question/:n",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#prototype$validate
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `status` – `{number=}` - 
         */
        "prototype$validate": {
          url: urlBase + "/QuizzAttempts/:id/validate",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.findById() instead.
        "::findById::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.destroyById() instead.
        "::destroyById::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Interview.quizzAttempts.updateById() instead.
        "::updateById::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Interview.quizzAttempts() instead.
        "::get::Interview::quizzAttempts": {
          isArray: true,
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "GET"
        },

        // INTERNAL. Use Interview.quizzAttempts.create() instead.
        "::create::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "POST"
        },

        // INTERNAL. Use Interview.quizzAttempts.destroyAll() instead.
        "::delete::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts",
          method: "DELETE"
        },

        // INTERNAL. Use Interview.quizzAttempts.count() instead.
        "::count::Interview::quizzAttempts": {
          url: urlBase + "/Interviews/:id/quizzAttempts/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#updateOrCreate
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `QuizzAttempt` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#update
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#destroyById
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#removeById
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.QuizzAttempt#modelName
    * @propertyOf lbServices.QuizzAttempt
    * @description
    * The name of the model represented by this $resource,
    * i.e. `QuizzAttempt`.
    */
    R.modelName = "QuizzAttempt";

    /**
     * @ngdoc object
     * @name lbServices.QuizzAttempt.attempts
     * @header lbServices.QuizzAttempt.attempts
     * @object
     * @description
     *
     * The object `QuizzAttempt.attempts` groups methods
     * manipulating `Attempt` instances related to `QuizzAttempt`.
     *
     * Call {@link lbServices.QuizzAttempt#attempts QuizzAttempt.attempts()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#attempts
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Queries attempts of QuizzAttempt.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::get::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#count
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Counts attempts of QuizzAttempt.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.attempts.count = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::count::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#create
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Creates a new instance in attempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.create = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::create::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#destroyAll
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Deletes all attempts of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attempts.destroyAll = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::delete::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#destroyById
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Delete a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attempts.destroyById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::destroyById::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#findById
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Find a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.findById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::findById::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt.attempts#updateById
         * @methodOf lbServices.QuizzAttempt.attempts
         *
         * @description
         *
         * Update a related item by id for attempts
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attempts
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attempt` object.)
         * </em>
         */
        R.attempts.updateById = function() {
          var TargetResource = $injector.get("Attempt");
          var action = TargetResource["::updateById::QuizzAttempt::attempts"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#quizz
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Fetches belongsTo relation quizz
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Quizz` object.)
         * </em>
         */
        R.quizz = function() {
          var TargetResource = $injector.get("Quizz");
          var action = TargetResource["::get::QuizzAttempt::quizz"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#interview
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Fetches belongsTo relation interview
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Interview` object.)
         * </em>
         */
        R.interview = function() {
          var TargetResource = $injector.get("Interview");
          var action = TargetResource["::get::QuizzAttempt::interview"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.QuizzAttempt#owner
         * @methodOf lbServices.QuizzAttempt
         *
         * @description
         *
         * Fetches belongsTo relation owner
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ZenUser` object.)
         * </em>
         */
        R.owner = function() {
          var TargetResource = $injector.get("ZenUser");
          var action = TargetResource["::get::QuizzAttempt::owner"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
