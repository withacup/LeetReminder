const sendMail = require('./sendMail');
// const subscribe = require('./subscribe');
const welcome = require('./welcome');

const construcMethod = (app) => {
	app.use('/sendMail', sendMail);
	// app.use('/sendMail', subscribe);
	app.use('/*', welcome);
	// app.use('/public', (req, res) => {
	// 	res.redirect('/public');
	// })
}

exports = module.exports = construcMethod;