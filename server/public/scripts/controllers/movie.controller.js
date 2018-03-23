app.controller('MovieController', ['MovieService', 'UserService', '$routeParams', function(MovieService, UserService, $routeParams){
    console.log($routeParams);
    let self = this; 

    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.moviePage = MovieService.moviePage;
    self.rateMovie = MovieService.rateMovie;
    
    self.enteredRating = MovieService.enteredRating; 
    self.enteredRating.user_id = UserService.userObject.id;
    
    let id = $routeParams.id;

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
        let el = document.getElementById( 'line' );
        if( el ){
            chart.renderTo(el);
        } else{
            let el2 = document.getElementById( 'thingy' );
            console.log( 'couldn\'t find el', el2 );
        }
    }
}])