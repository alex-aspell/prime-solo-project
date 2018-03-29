app.controller('HomeController', ['MovieService', 'UserService', function(MovieService, UserService){
    let self = this; 
    self.userObject = UserService.userObject;
    self.userService = UserService;
    self.getuser = UserService.getuser;
    self.getuser();

    self.goToMoviePage = MovieService.goToMoviePage;
    
    self.homePageArray = MovieService.homePageArray;
    self.getNowPlaying = MovieService.getNowPlaying;
    self.searchMovies = MovieService.searchMovies;
    self.getTopRated = MovieService.getTopRated;
    self.getPopular = MovieService.getPopular;
}])