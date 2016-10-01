let prevNumProblems = 0;
let minutes = 0.5,
    the_interval = minutes * 60 * 1000;
let exec = require('child_process').exec;
let cmd = '/usr/local/bin/phantomjs actions/craw.js';
const userDataAPI = require('../db/UserDataAPI');
const auth = require('./auth');

const crawer = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            exec(cmd, function(error, stdout, stderr) {
                fulfill(error || stdout || stderr);
            });
        }, 3000)
    })
}

module.exports = () => {
    setInterval(function() {
        console.log(`I am doing my ${minutes} minutes check`);
        crawer()
            .then(num => {
                console.log('Current number of problems in leetcode [Algorithm] :' + num);
                let curNumProblems = parseInt(num);
                if (curNumProblems > prevNumProblems) {
                    prevNumProblems = curNumProblems;
                    return auth();
                } else {
                    return Promise.reject('The number of problems is not changed');
                }
            })
            .then(a => {
                userDataAPI.getAllUser().then(users => {
                    console.log('All users: ', users);
                    users.forEach(function(user) {
                        user.receivers.forEach(function(receiver) {
                            console.log(receiver);
                            let email = {
                                from: receiver,
                                to: receiver,
                                subject: `This email is sent by ${user}!`,
                                content: `Current Number of Problems: ${curNumProblems}`
                            }
                            actions.sendMessage(a, email)
                                .then(feedback => {
                                    console.log(feedback);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        });
                    });
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, the_interval);
}