app.service('MovieService', ['$http', '$location', function($http, $location){
    let self = this; 

    self.nowPlayingArray = {list: []};
    self.moviePage = {list: []};
    self.enteredRating = {};

    self.goToMoviePage = function($routeParams) {
        let id = $routeParams.id;
        self.enteredRating.movie_id = $routeParams.id;
        console.log('Movie id', self.enteredRating.movie_id);
        $location.url(`/movie/${id}`);
        self.getMovieAverage(id);
        self.getRatingsForChart(id);
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
        })
    }
    
    self.getMovieAverage = function(id) {
        $http({
            method: 'GET',
            url: `/movies/average/${id}`
        })
        .then(function(response) {
            console.log('get avg', response.data[0]);
            self.moviePage.list.averageRating = Math.floor(response.data[0].avg);
        })
        .catch(function(error) {
            console.log('get avg error', error);
        })
    }
    
    self.getRatingsForChart = function(id){
        $http({
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
                let yAxis = []; 
                let xAxis = []; 
                let prev;
            
                ratingArray.sort();
                for ( var i = 0; i < ratingArray.length; i++ ) {
                    if ( ratingArray[i] !== prev ) {
                        yAxis.push(ratingArray[i]);
                        xAxis.push(1);
                    } else {
                        xAxis[xAxis.length-1]++;
                    }
                    prev = ratingArray[i];
                }
                console.log(yAxis, xAxis);
            
        })
        .catch(function(error) {
            console.log('get avg error', error);
        })
    }

    self.getNowPlaying();
}])