let prevNumProblems = 0;
let minutes = 0.1,
    the_interval = minutes * 60 * 1000;
const userDataAPI = require('../db/UserDataAPI');
const auth = require('./auth');
const actions = require('./actions');
const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;
console.log(__dirname);
var childArgs = [
    path.join(__dirname, '/phantomjs_craw.js')
]

const crawer = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
                fulfill(err || stdout || stderr);
            })
        }, 3000)
    })
}

module.exports = () => {
    setInterval(function() {
        // console.log('actions:', actions);
        console.log(`I am doing my ${minutes} minutes check`);
        crawer()
            .then(num => {
                console.log('Current number of problems in leetcode [Algorithm] :' + num);
                let curNumProblems = parseInt(num);
                if (curNumProblems > prevNumProblems) {
                    prevNumProblems = curNumProblems;
                    console.log('Number of Problems has been updated!');
                    return auth();
                } else {
                    return Promise.reject('The number of problems is not changed');
                }
            })
            .then(oauth2Client => {
                userDataAPI.getAllUser()
                    .then(users => {
                        console.log('All users: ', users);
                        if (users.length) {
                            users.forEach((user) => {
                                user.receivers.forEach((receiver) => {
                                    console.log('receiver: ', receiver);
                                    const email = {
                                        from: receiver,
                                        to: receiver,
                                        subject: 'This email is sent by leetcode reminder!',
                                        content: `Current Number of Problems: ${prevNumProblems}`
                                    }
                                    actions.sendMessage(oauth2Client, email)
                                        .then(feedback => {
                                            console.log(feedback);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                });
                            });
                        } else {
                            console.log('No user found');
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }, the_interval);
}
