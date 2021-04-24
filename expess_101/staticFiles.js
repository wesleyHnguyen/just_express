const express = require('express');
const app = express();

// app comes with a use method
//  use takes 1 args (this example) :
//1. the middleware we want to run

app.use(express.static('public'))

app.listen(3000, () => {
    console.log('The app is listening on port 3000');
});