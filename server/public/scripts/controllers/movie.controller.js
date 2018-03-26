app.controller('MovieController', ['MovieService', 'UserService', '$routeParams','$http', function(MovieService, UserService, $routeParams, $http){
    console.log($routeParams);
    let self = this; 

    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.moviePage = MovieService.moviePage;
    self.rateMovie = MovieService.rateMovie;
    
    self.enteredRating = MovieService.enteredRating; 
    self.enteredRating.user_id = UserService.userObject.id;

    let id = $routeParams.id;
    //
    //Need to do a get using route params id that will get movie info from the API
    
    //
    MovieService.getMovieAverage(id);
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
        moviePage.list.demographicRating = demographicRating; 
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
}])