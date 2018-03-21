app.controller('MovieController', ['MovieService', 'UserService', function(MovieService, UserService){
    let self = this; 

    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.moviePage = MovieService.moviePage;
    self.rateMovie = MovieService.rateMovie;
    
    self.enteredRating = MovieService.enteredRating; 
    self.enteredRating.user_id = UserService.userObject.id;
    console.log(self.enteredRating.user_id);
    
}])