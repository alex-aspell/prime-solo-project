const express = require('express');
const router = express.Router();
const axios = require('axios');

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

module.exports = router; 