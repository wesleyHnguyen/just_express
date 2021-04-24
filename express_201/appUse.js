const express = require('express');
const app = express();


// Express = 2 things
// 1. Router
// 2. Middleware that comprises a websframework

// Req --Middleware--> Res
// Middleware function is ANY function that has access to the req, res, next object.

// Req --Middleware--> Res 
// 1. Request comes in. 
// 2. We need to validate the user, sometimes. 
// 3. We need to store some things in the DB. 
// 4. If there is data from the user we need to parse it and store it. 
// 5. Res

function validateUser(req, res, next) {
    // get info out of the req object
    // do some stuff with the DB 

    //res.locals --  contains response local variables scoped to the request
    // available only to the view(s) rendered during request/response cycle.

    //the property is useful for exposing request-level information: request path name, authenticated user, user settings.
    res.locals.validated = true;
    console.log('VALIDATED RAN!');
    next();
}

// This will run validateUser on All paths, all methods!
app.use(validateUser);

// This will run validateUser on /admin, all methods!
app.use('/admin', validateUser);

// this will run validateUser on /, only get methods! And by the way it lookds like this
app.get('/', validateUser);
app.get('/', (req, res, next) => { // last piece of middleware - just a fancy way of writing middleware
                                    // distinguish the request methods
                                    
    res.send('<h1> Main Page </h1>');

    console.log(res.locals.validated)

})

app.get('/admin', (req, res, next) => { // last piece of middleware

    res.send('<h1> Admin Page </h1>');

    console.log(res.locals.validated)

})

app.listen(3000);