app.controller('FavoritesController', ['UserService', 'MovieService', '$http', function(UserService, MovieService, $http) {
    console.log('UserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.goToMoviePage = MovieService.goToMoviePage;
    
    self.favoriteMovies = {list: []}

    self.getFavoriteMovies = function(){
      $http.get('/movies/favorites')
      .then(function(response) {
          console.log('favorites movie call', response.data);
          let favoriteMovieArray = response.data;
          for (let movie of favoriteMovieArray){
            $http.get(`/movies/favorites/${movie.movie_id}`)
            .then(function(response) {
              console.log('favorites movie api call', response.data);
              self.favoriteMovies.list.push(response.data);
            })
            .catch(function(error){
              console.log('Error getting favorite movie', error);
            })
          }
          console.log(self.favoriteMovies.list);
      }).catch(function(error){
          console.log('Error getting favorite movies', error);
      })
    }
  
    self.getFavoriteMovies();
  }]);