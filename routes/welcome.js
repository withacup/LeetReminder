const express = require('express');
const router = express.Router();

let welcomeRoutes = exports = module.exports = router;

welcomeRoutes.get('/', (req, res) => {
	res.render('sendMail/welcome', {message: 'greeting!'});
})
