app.service('MovieService', ['$http', '$location', function($http, $location){
    let self = this; 

    self.nowPlayingArray = {list: []};
    // self.moviePage = {list: []};
    self.enteredRating = {};
    

    self.goToMoviePage = function(movie) {
        //let id = $routeParams.id;
        // self.moviePage.list = movie;
        // console.log('Clicking movie page', moviePage.list);
        // console.log('Clicked movie', movie);
        self.enteredRating.movie_id = movie.id;
        //console.log('Movie id', self.enteredRating.movie_id);
        $location.url(`/movie/${movie.id}`);

    }

    self.getNowPlaying = function($routeParams) {
        $http.get('/movies')
        .then(function(response) {
            console.log('movie call', response.data.results);
            self.nowPlayingArray.list = response.data.results;
        }).catch(function(error){
            console.log('Error getting new releases', error);
        })
    }

    self.rateMovie = function() {
        console.log('rating to post', self.enteredRating)
        $http({
            method: 'POST',
            url: '/movies',
            data: self.enteredRating
        }).then(function(response) {
            console.log('rating added', response);
            self.enteredRating.rating = '';
        }).catch(function(error) {
            console.log('add rating error', error);
            $location.url('register');
        })
    }
    
    // self.getMovieAverage = function(id) {
    //     $http({
    //         method: 'GET',
    //         url: `/movies/average/${id}`
    //     })
    //     .then(function(response) {
    //         console.log('get avg', response.data[0]);
    //         self.moviePage.list.averageRating = Math.floor(response.data[0].avg);
    //     })
    //     // .then(function(response) {
    //     //     $location.url(`/movie/${id}`);
    //     // })
    //     .catch(function(error) {
    //         console.log('get avg error', error);
    //     })
    // }
    
    self.getRatingsForChart = function(id){
        //function runs in self.goToMoviePage at line 14
        return $http({
            method: 'GET',
            url: `/movies/chart/${id}`
        })
        .then(function(response) {
            console.log('get chart ratings', response.data);
            let responseArray = response.data;
            let ratingArray = [];
            for (let i = 0; i<responseArray.length; i++) {
                ratingArray.push(responseArray[i].rating);
            }
            return ratingArray;
            //self.createChartArrays(ratingArray);
            
        })
        // .then(function(response) {
        //     $location.url(`/movie/${id}`);
        // })
        .catch(function(error) {
            console.log('get chart rating error', error);
        })
    }

    
    self.getNowPlaying();
}])