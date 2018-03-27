const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

const apiKey = '4a5d31bd9f16d5c8d4ac776d630c9bc1';

router.get('/', (request, response) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`

    axios.get(url)
    .then( res => {
        response.send(res.data)
    })
    .catch( error => {
        console.log('Error on now playing request', error);
    })
})

router.get('/individual/:id', (request, response) => {
    let id = request.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios.get(url)
    .then( res => {
        response.send(res.data)
    })
    .catch( error => {
        console.log('Error on now playing request', error);
    })
})

router.post('/', (request, response) => {
    if (request.isAuthenticated()){
    let newRating = request.body; 
    console.log('new rating added', request.body);
    const sqlText = `INSERT INTO ratings (rating, movie_id, user_id)
    VALUES ($1, $2, $3);`;
    pool.query(sqlText, [newRating.rating, newRating.movie_id, request.user.id])
    .then((result) => {
        console.log('new rating added');
        response.sendStatus(201);
    })
    .catch((error) => {
        console.log('did not add');
        response.sendStatus(500);
    })
    } else {
        response.sendStatus(403);
    }
})

router.get('/average/:id', (request, response) => {
    const id = request.params.id;
    console.log('get id', id);
    const sqlText = 'SELECT AVG(rating) FROM ratings WHERE movie_id=$1;';
    pool.query(sqlText, [id])
    .then(result => {
        console.log('Get average of', id);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Avg error', error);
        response.sendStatus(500); 
    })
})

router.get('/chart/:id', (request, response) => {
    const id = request.params.id;
    console.log('get id', id);
    const sqlText = 'SELECT rating FROM ratings WHERE movie_id=$1;';
    pool.query(sqlText, [id])
    .then(result => {
        console.log('Get average of', id);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Avg error', error);
        response.sendStatus(500); 
    })
})

router.get('/heat/:id', (request, response) => {
    const id = request.params.id;
    console.log('get id', id);
    const sqlText = 'SELECT rating FROM ratings WHERE movie_id=$1;';
    pool.query(sqlText, [id])
    .then(result => {
        console.log('Get average of', id);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Avg error', error);
        response.sendStatus(500); 
    })
})

router.post('/demographics', (request, response) => {
    //THIS IS NOT A POST. I NEEDED TO GET AN OBJECT 
    const demographicGet = request.body;
    console.log('demographic get', demographicGet);
    const sqlText = 'SELECT ratings.rating FROM ratings JOIN users ON users.id=ratings.user_id WHERE ratings.movie_id=$1 and users.age=$2 and users.gender=$3;';
    pool.query(sqlText, [demographicGet.movie_id, demographicGet.age, demographicGet.gender])
    .then(result => {
        console.log('get demographic info', result.rows);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Demographics error', error);
        response.sendStatus(500);
    })
})

router.get('/user', (request, response) => {
    if (request.isAuthenticated()){
    const sqlText = 'SELECT ratings.movie_id FROM ratings WHERE user_id=$1;';
    pool.query(sqlText, [request.user.id])
    .then(result => {
        console.log('Get average of', request.user.id);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Avg error', error);
        response.sendStatus(500); 
    })
} 
})

router.get('/user/:id', (request, response) => {
    let id = request.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios.get(url)
    .then( res => {
        response.send(res.data)
    })
    .catch( error => {
        console.log('Error on now playing request', error);
    })
})

router.get('/favorites', (request, response) => {
    if (request.isAuthenticated()){
    const sqlText = 'SELECT ratings.movie_id FROM ratings WHERE user_id=$1 AND rating>=70;';
    pool.query(sqlText, [request.user.id])
    .then(result => {
        console.log('Get average of', request.user.id);
        response.send(result.rows);
    })
    .catch(error => {
        console.log('Avg error', error);
        response.sendStatus(500); 
    })
} 
})

router.get('/favorites/:id', (request, response) => {
    let id = request.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios.get(url)
    .then( res => {
        response.send(res.data)
    })
    .catch( error => {
        console.log('Error on now playing request', error);
    })
})

module.exports = router; 