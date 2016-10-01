const auth = require('./actions/auth');
const actions = require('./actions/actions');

auth().then(a => {
    let email = {
        from: 'newproblemreminder@gmail.com',
        to: 'newproblemreminder@gmail.com',
        subject: "This email is sent by server automaticlly!",
        content: "testing this email(developer)"
    }
    console.log('email: ', email);
    actions.sendMessage(a, email).then(res => {
    	console.log(res);
    })
    .catch(err => {
    	console.log(err);
    })
})
.catch(err => {
	console.log(err);
})
