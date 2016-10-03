const userDataAPI = require('../db/UserDataAPI');
userDataAPI.getAllUser()
.then(users => {
	console.log(users);
});

