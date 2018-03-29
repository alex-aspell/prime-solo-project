const app = angular.module('movieApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

/// Routes ///
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('movieApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController as hc'
    })
    .when('/movie/:id', {
      templateUrl: '/views/templates/movie.html',
      controller: 'MovieController as mc'
    })
    .when('/favorites', {
      templateUrl: '/views/templates/favorites.html',
      controller: 'FavoritesController as fc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
      .when('/login', {
        templateUrl: '/views/templates/login.html',
        controller: 'LoginController as vm'
    })
    .when('/random', {
      templateUrl: '/views/templates/random.html',
      controller: 'RandomController as rc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    // .otherwise({
    //   template: '<h1>404</h1>'
    // });
}]);
