app.controller('UserController', ['UserService', 'MovieService', '$http', function(UserService, MovieService, $http) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.userMovies = {list: []}
  self.getUserMovies = function(){
    $http.get('/movies/user')
    .then(function(response) {
        console.log('user movie call', response.data);
        let userMovieArray = response.data;
        for (let movie of userMovieArray){
          $http.get(`/movies/user/${movie.movie_id}`)
          .then(function(response) {
            console.log('user movie api call', response.data);
            self.userMovies.list.push(response.data);
          })
          .catch(function(error){
            console.log('Error getting user movie', error);
          })
        }
        console.log(self.userMovies.list);
    }).catch(function(error){
        console.log('Error getting user movies', error);
    })
  }

  self.getUserMovies();
}]);
