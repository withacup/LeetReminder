var actions = exports = module.exports;
const gmail = require('googleapis').gmail('v1');
// const Base64 = require('/Users/yang/Dropbox/computer\ science/myProjects/nodejs/sendEmailUsingGmailApi/node_modules/js-base64/base64.js').Base64;
// const gapi = require('googleapis');
// console.log(google)

actions.listLabels = (auth) => {
    gmail.users.labels.list({
        auth: auth,
        userId: 'me',
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var labels = response.labels;
        if (labels.length == 0) {
            console.log('No labels found.');
        } else {
            console.log('Labels:');
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                console.log('- %s', label.name);
            }
        }
    });
}

/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}
//http://stackoverflow.com/questions/34546142/gmail-api-for-sending-mails-in-node-js
actions.sendMessage = (auth, email) => {
    return new Promise((fulfill, reject) => {
        if (email === undefined) {
            console.log('email is not defined')
            email = {
                from: 'tyang8@stevens.edu',
                to: 'yangtianxiao123@gmail.com',
                subject: "untitled",
                content: "This is the default message from Tianxiao Yang's gmail"
            }
        }
        var raw = makeBody(email.from, email.to, email.subject, email.content);
        gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            resource: {
                raw: raw
            }
        }, function(err, response) {
            if (err) reject(err);
            fulfill(response);
        });
    })
}