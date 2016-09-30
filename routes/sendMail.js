const express = require('express');
const router = express.Router();
const auth = require('../actions/auth');
const actions = require('../actions/actions');

let sendMailRoutes = exports = module.exports = router;

sendMailRoutes.get('/', (req, res) => {
	res.render('./sendmail/sendMail', {});
})


sendMailRoutes.post('/', (req, res) => {
	console.log(req.body.userEmailAddress);
	let email = {
		from: req.body.userEmailAddress,
		to: req.body.userEmailAddress,
		subject: "This email is sent by server automaticlly!",
		content: "如题"
	}

	auth().then(oauth2Client => {
		actions.sendMessage(oauth2Client, email)
			.then(message => {
				// message = JSON.stringify(message);
				res.render('./sendmail/sendMail', {
					feedback: JSON.stringify(message),
					message: `comfirmation email has been sent to ${req.body.userEmailAddress}`
				});
			})
			.catch(err => {
				res.render('./sendmail/sendMail', {
					error: err,
				});
			})
	})
})