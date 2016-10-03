const UserDataAPI = require('./UserDataAPI');
UserDataAPI.removeOneUser("123")
.then(res => {
console.log('result: ',res.result);
})
.catch(err => {
console.log(err);
});
