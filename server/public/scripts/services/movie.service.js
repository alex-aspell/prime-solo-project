app.service('MovieService', ['$http', '$location', function($http, $location){
    let self = this; 

    self.nowPlayingArray = {list: []};
    self.moviePage = {list: []};

    self.goToMoviePage = function($routeParams) {
        let id = $routeParams.id;
        $location.url(`/movie/${id}`);
        self.moviePage.list = $routeParams;
        console.log(self.moviePage.list);
    }

    self.getNowPlaying = function() {
        $http.get('/movies')
        .then(function(response) {
            console.log(response.data.results);
            self.nowPlayingArray.list = response.data.results;
        }).catch(function(error){
            console.log('Error getting new releases', error);
        })
    }

    self.getNowPlaying();
}])