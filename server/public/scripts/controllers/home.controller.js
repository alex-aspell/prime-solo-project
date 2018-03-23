app.controller('HomeController', ['MovieService', function(MovieService){
    let self = this; 
 
    self.goToMoviePage = MovieService.goToMoviePage;
    
    self.nowPlayingArray = MovieService.nowPlayingArray;
    self.getNowPlaying = MovieService.getNowPlaying;
    // self.nowPlayingArray; 
    
}])