const auth = require('./actions/auth');
const actions = require('./actions/actions');

auth().then(a => {
    let email = {
        from: 'yangtianxiao123@gmail.com',
        to: 'yangtianxiao123@gmail.com',
        subject: "This email is sent by server automaticlly!",
        content: "Current Number of Problems: " + 0
    }
    actions.sendMessage(a, email)
})