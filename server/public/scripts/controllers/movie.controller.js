app.controller('MovieController', ['MovieService', 'UserService', '$routeParams','$http', function(MovieService, UserService, $routeParams, $http){
    console.log($routeParams);
    let self = this; 

    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.moviePage = {list: []}
    self.rateMovie = MovieService.rateMovie;
    
    self.enteredRating = MovieService.enteredRating; 
    self.enteredRating.user_id = UserService.userObject.id;

    let id = $routeParams.id;
    //
    //Need to do a get using route params id that will get movie info from the API
    self.getMovieByID = function(id) {
        $http.get(`/movies/individual/${id}`)
        .then(function(response) {
            console.log('get movie by id', response.data);
            self.moviePage.list = response.data;
            self.getMovieAverage(id);
            self.getHeatRatings(id);
        }).catch(function(error){
            console.log('Error getting movie by id', error);
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
            console.log('average rating', self.moviePage.list.averageRating);
        })
        // .then(function(response) {
        //     $location.url(`/movie/${id}`);
        // })
        .catch(function(error) {
            console.log('get avg error', error);
        })
    }
    
    
    self.getMovieByID(id);
    
    //
    
    MovieService.getRatingsForChart(id).then(function(ratingArray){
        self.createChartArrays(ratingArray);
    });
    // self.moviePage.list = MovieService.selectedMovie;
    console.log('moviepage', self.moviePage.list);

    self.createChartArrays = function(ratingArray){ 
        //function runs in .then of self.getRatingsForChart at line 70
            let xAxis = []; 
            let yAxis = []; 
            let prev;
            let dataset = [];
            
            
            ratingArray.sort();
            for ( let i = 0; i < ratingArray.length; i++ ) {
                if ( ratingArray[i] !== prev ) {
                    xAxis.push(ratingArray[i]);
                    yAxis.push(1);
                } else {
                    yAxis[yAxis.length-1]++;
                }
                prev = ratingArray[i];
                }
            
            for (let i = 0; i < xAxis.length; i++ ){
                dataset.push({type: 'rating', x: xAxis[i], y: yAxis[i]})
            }
            console.log('dataset', dataset);
            self.createChart(dataset);
            
    } 
    self.createChart = function(dataset){
        let chart = new tauCharts.Chart({
            guide: {
                y: {label: {text: '# of Ratings'}},
                x: { min: 0, max: 100, tickFormat: 's', label:{text: 'Rating Scale'}},
                showGridLines: 'y',
                interpolate: 'smooth-keep-extremum'
            },
            data: dataset,
            type: 'line',
            x: 'x',
            y: 'y',
            color: 'red',
            settings: {
                fitModel: 'fit-width'
            }
        });
        chart.renderTo('#line');
        
    }

    self.getDemographicInfo = function(demographics) {
        //THIS IS NOT A POST. I HAD TO USE POST TO PASS UP ALL THE INFO IN DEMOGRAPHICS
        self.demographics.movie_id = $routeParams.id
        console.log(demographics);
        $http({
            method: 'POST', 
            url: `/movies/demographics`,
            data: demographics
        }).then(function(response) {
            console.log('demographics response', response.data);
            let responseArray = response.data;
            let ratingArray = [];
            for (let i = 0; i<responseArray.length; i++) {
                ratingArray.push(responseArray[i].rating);
            }
            self.createDemographicChartArrays(ratingArray);
            self.createDemographicAverages(ratingArray);
        }).catch(function(error) {
            console.log('demographics error', error);
        })
    }

    self.createDemographicAverages = function(ratingArray){
        function getSum(total, num){
            return total + num;
        }
        let totalRating = ratingArray.reduce(getSum);
        let demographicRating = Math.floor(totalRating/ratingArray.length);
        self.moviePage.list.demographicRating = demographicRating; 
    }

    self.createDemographicChartArrays = function(ratingArray){ 
        //function runs in .then of self.getRatingsForChart at line 70
            let xAxis = []; 
            let yAxis = []; 
            let prev;
            let dataset = [];
            
            
            ratingArray.sort();
            for ( let i = 0; i < ratingArray.length; i++ ) {
                if ( ratingArray[i] !== prev ) {
                    xAxis.push(ratingArray[i]);
                    yAxis.push(1);
                } else {
                    yAxis[yAxis.length-1]++;
                }
                prev = ratingArray[i];
                }
            
            for (let i = 0; i < xAxis.length; i++ ){
                dataset.push({type: 'rating', x: xAxis[i], y: yAxis[i]})
            }
            console.log('dataset', dataset);
            self.createDemographicChart(dataset);
            
    } 
    self.createDemographicChart = function(dataset){
        let chart = new tauCharts.Chart({
            guide: {
                y: {label: {text: '# of Ratings'}},
                x: { min: 0, max: 100, tickFormat: 's', label:{text: 'Rating Scale'}},
                showGridLines: 'y',
                interpolate: 'smooth-keep-extremum'
            },
            data: dataset,
            type: 'line',
            x: 'x',
            y: 'y',
            color: 'red',
            settings: {
                fitModel: 'fit-width'
            }
        });
        chart.renderTo('#line2');
    }
    
    self.getHeatRatings = function(id){
        //function runs in self.goToMoviePage at line 14
        $http({
            method: 'GET',
            url: `/movies/heat/${id}`
        })
        .then(function(response) {
            console.log('get chart ratings', response.data);
            let responseArray = response.data;
            let heatArray = [];
            for (let i = 0; i<responseArray.length; i++) {
                heatArray.push(responseArray[i].rating);
            }
            self.createHeatRating(heatArray);
            //self.createChartArrays(ratingArray);
            
        })
        // .then(function(response) {
        //     $location.url(`/movie/${id}`);
        // })
        .catch(function(error) {
            console.log('get chart rating error', error);
        })
    }

    self.createHeatRating = function(heatArray){
        function getSum(total, num){
            return total + num;
        }
        let totalRating = heatArray.reduce(getSum);
        let mean = Math.floor(totalRating/heatArray.length);
         let sumArray = [];
         for (let i=0; i<heatArray.length; i++) {
             let squared = Math.pow((heatArray[i]-mean), 2)
             sumArray.push(squared);
         }
         let totalSum = sumArray.reduce(getSum);
         let squareRoot = Math.floor(Math.sqrt(totalSum/(heatArray.length)));
         console.log('square root', squareRoot);
         if (squareRoot == 0){
            self.moviePage.list.heatRating = 0;
         }
         else if ( squareRoot > 0 && squareRoot <= 10){
            self.moviePage.list.heatRating = 1;
         }
         else if ( squareRoot > 10 && squareRoot <= 25){
            self.moviePage.list.heatRating = 2;
         }
         else if ( squareRoot > 25 && squareRoot <= 50){ 
            self.moviePage.list.heatRating = 3;
         }
         else {
            self.moviePage.list.heatRating = 4;
         }
         console.log('heat rating', self.moviePage.list.heatRating);
         console.log('movie', self.moviePage.list);
    }
    
    
    
}])