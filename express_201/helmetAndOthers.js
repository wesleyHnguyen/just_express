const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());

app.use(express.static('public'));

// these 2 pieces of middleware create request body -- which express by itself does not do
// the body property inside of the request only exists as result of these middlewares.
// collect any type of submitted data pass it for us and give it to us in json format.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. static
// 2. json
// 3. urlencoded


app.post('/ajax', (req, res) => {
    console.log(req.headers);
    console.log(req.body);

    // Automatically set mime to text/html and send the content as html
    // res.send('Test') -> ajax - jquey don't understand 

    // this function will set mime type to application/json, and send the response content as json
    res.json('Test')
});

app.listen(3000);

