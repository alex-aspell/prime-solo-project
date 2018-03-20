app.controller('MovieController', ['MovieService', function(MovieService){
    let self = this; 

    self.moviePage = MovieService.moviePage;
    console.log('the movie', self.moviePage);
}])