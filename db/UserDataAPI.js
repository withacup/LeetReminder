const mongoCollections = require("./mongoCollenctions");
const uuid = require('node-uuid');
const userData = mongoCollections.userDataCollection;
// let user= {
// 		_id: yangtianxiao123@gmail.com,
// 		uuid: 'asdlfkjdsklj@!23',
// 		isUsing: true,
// 		timeToReceive: 10:00pm,
// 		receiver: ['yangtianxiao123@gmail.com'],
// }
let UserDataAPI = {
	getUserByEmail: (email) => {
		return new Promise((fulfill, reject) => {
			userData()
				.then(col => {
					return col.findOne({
						_id: email
					});
				})
				.then(doc => {
					fulfill(doc);
				})
				.catch(err => {
					reject(err);
				})
		})
	},
	addUser: (user) => {
		return new Promise((fulfill, reject) => {
			user.uuid = uuid.v1();
			userData()
				.then(col => {
					return col.insertOne(user);
				})
				.then(res => {
					fulfill(res);
				}).catch(err => {
					reject(err);
				})
		})
	},
	getAllUser: () => {
		return new Promise((fulfill, reject) => {
			userData()
				.then(col => {
					return col.find().toArray();
				})
				.then(docs => {
					fulfill(docs);
				})
				.catch(err => {
					reject(err);
				})
		})
	},
	cleanUpAllUserData: () => {
		console.log('warning: droping colllection');
		return new Promise((fulfill, reject) => {
			userData()
				.then(col => {
					return col.drop();
				})
				.then(res => {
					fulfil(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}
}
exports = module.exports = UserDataAPI;
UserDataAPI.getAllUser().then(res => {
	console.log('UserDataAPI.js says : all users {');
	console.log(res);
	console.log('}')
})
UserDataAPI.cleanUpAllUserData();
// 	.then((res) => {
// 		console.log(res);
// 		UserDataAPI.getAllUser().then(res => {
// 			console.log(res);
// 		})
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})
	// let user = {
	// 	_id: 'tyang8@stevens.edu',
	// 	uuid: uuid.v1(),
	// 	isUsing: true,
	// 	timeToReceive: undefined,
	// 	receivers: ['tyang8@stevens.edu']
	// };
	// UserDataAPI.addUser(user).then(e => {
	// 		console.log(e);
	// 	})
	// UserDataAPI.addUser(user).then(e => {
	// 	console.log(e);
	// UserDataAPI.getAllUser().then(res => {
	// 	console.log(res);
	// })
	// })