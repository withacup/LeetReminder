const auth = require('./actions/auth');
const actions = require('./actions/actions');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const settings = require('./config');
const configRouters = require('./routes/')
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

var exec = require('child_process').exec;
var cmd = '/usr/local/bin/phantomjs craw.js';

const crawer = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            exec(cmd, function(error, stdout, stderr) {
                fulfill(error || stdout || stderr);
            });
        }, 3000)
    })
}

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(rewriteUnsupportedBrowserMethods);

configRouters(app);

app.listen(settings.serverConfig.port, settings.serverConfig.hostname, () => {
    console.log('server successfully started!');
    console.log(`server running at: http://${settings.serverConfig.hostname}:${settings.serverConfig.port}`);
})


let prevNumProblems = 0;
let minutes = 0.5,
    the_interval = minutes * 60 * 1000;
setInterval(function() {
    console.log(`I am doing my ${minutes} minutes check`);
    crawer()
        .then(res => {
            console.log('this is the result from nodejs :', res);
            let curNumProblems = parseInt(res);
            if (curNumProblems > prevNumProblems) {
                prevNumProblems = curNumProblems;
                auth()
                .then(a => {
                    let email = {
                        from: 'yangtianxiao123@gmail.com',
                        to: 'yangtianxiao123@gmail.com',
                        subject: "This email is sent by server automaticlly!",
                        content: "Current Number of Problems: " + curNumProblems
                    }
                    actions.sendMessage(a, email)
                    .then(feedback => {
                        console.log(feedback);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
            }
        })
}, the_interval);