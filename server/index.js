const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('../client'));


const port = 5000;

server.get('./bundle.js/:3000', (req, res) => {
  request('http://localhost:3000/bundle.js', (error, response, body) => {
    res.status(200).send(body);
  })
})

server.get('./bundle.js/:3001', (req, res) => {
  request('http://localhost:3001/bundle.js', (error, response, body) => {
    res.status(200).send(body);
  })
})

server.use('/api/cities', (req, res) => {
  request(`http://localhost:3001/api/cities`, (error, response, body) => {
    // console.log(body)
    if (response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})

server.use('/restaurant', (req, res) => {
  console.log(req.query.name)
  request(`http://localhost:3001/restaurant?name=${req.query.name}`, (error, response, body) => {
    console.log(error)
    if (response.statusCode === 200) {
      // console.log(response)
      res.status(200).send(body);
    }
  })
})

server.listen(port, () => {
  console.log(`listening on port ${port}`);
})
