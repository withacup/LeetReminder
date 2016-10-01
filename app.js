const startCrawing = require('./actions/leetcodeCraw');
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

startCrawing();
