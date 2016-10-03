const express = require('express');
const router = express.Router();
const auth = require('../actions/auth');
const actions = require('../actions/actions');
const userDataAPI = require('../db/UserDataAPI');
const uuid = require('node-uuid');

let sendMailRoutes = exports = module.exports = router;

sendMailRoutes.get('/', (req, res) => {
	res.render('./sendMail/sendMail.handlebars', {});
})


sendMailRoutes.post('/', (req, res) => {
	console.log(req.body.userEmailAddress);
	let user = {
		_id: req.body.userEmailAddress,
		uuid: uuid.v1(),
		isUsing: true,
		timeToReceive: undefined,
		receivers: [req.body.userEmailAddress]
	};
	
	auth()
		.then(oauth2Client => {
                        let email = {
                                from: req.body.userEmailAddress,
                                to: req.body.userEmailAddress,
                                subject: "Confirmation email by Leetcode Reminder",
                                content: "You have successfully subscribed Leetcode Reminder"
                        }
                        return actions.sendMessage(oauth2Client, email);
                })
                .then(message => {
                        console.log('sending comfirm email');
                        res.render('./sendMail/sendMail.handlebars', {
                                feedback: JSON.stringify(message),
                                message: `comfirmation email has been sent to ${req.body.userEmailAddress}`
                        });
			return userDataAPI.addUser(user);
                })
		.then(feedback => {
                        console.log('successfully added user: ', (feedback.ops)[0]._id);
                        console.log('sending comfirm email');
                })
                .catch(err => {
                        res.render('./sendMail/sendMail.handlebars', {
                                error: err,
                        });
                })
})
