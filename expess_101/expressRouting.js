const express = require('express');
const app = express();

// app object has a few methods:
// HTTP verbs! REST verbs!
// CRUD app corespondence
// 1. get
// -- Default for all browsers is get
// 2. post
// 3. delete
// 4. put
// 5. all - i will accept any method

// take 2 arrs:
// 1. path
// 2. callback to run if an HTTP request that matches this verb
// is made to the path in #1

// app.all('/', (req, res) => {

// })

app.get('/', (req, res) => {

    console.log(req);
    res.send(`<h1> Welcome to the home GET page! </h1>`);
});
app.post('/', (req, res) => {

    console.log(req);
    res.send(`<h1> Welcome to the home POST page! </h1>`);

});
app.put('/', (req, res) => {

});
app.delete('/', (req, res) => {

});

app.listen(3000, () => {
    console.log('The app is listening on port 3000');
});

