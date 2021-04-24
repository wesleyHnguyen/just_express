// const bodyParser = require("body-parser")

// Networking - http and tcp/udp
//     - stateless - no state stored.
//     - connectionless
//     - flexible
//     - HTTP message 
//     -- start line
//         --- req: GET /blog http/1.1 
//         --- res: http/1.1 200 OK
//     -- headers
//         --- { key: value }
//         --- content-type: text/plain, text/html, application/json
//         --- cache-control: public, max-age=0
//     -- BLANK LINE
//     -- body
//         --- STUFF - HTML, 4k video (binary), image-base64 encoded


// Node server 
// - write headers
// - write body
// -- used the fs module
// -- close connection
// - server.listen
// -- 3000
// - req, res

// Express version 
// - Express IS Nodejs
// - app === express() === createApplication()
// - server.listen --> app.listen 
// -- app.get, app.post, app.all, etc. 
// -- served up static files, with express.static() middleware.  

// 201
// - Middleware = is any function that has access to req, res, and next
// -- networking on the outside, node/express development on the inside 
// -- app.use, anytime you see a callback/function (req, res, next) =>  
// --- next() is the way to move a piece of middleware forward
// -- express.json() -- works with bodyParser --> create req.body
// -- express.urlencoded() -- bodyParser --> create req.body
// -- helmet() -- 3rd party module.

// Request
// - req.ip - constains requesters ip 
// - req.path - contains the requested path 
// - req.body - parsed data
// Response
// - res.send(.end()) - send text/html
// - res.sendFile - send a file
// - res.locals - is available through the res
// - res.json(jsonp) - send json back as application/json