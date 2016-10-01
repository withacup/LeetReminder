const MongoClient = require("mongodb").MongoClient;
const mongoConfig = require("../config").mongoConfig;

let fullMongoUrl = mongoConfig.serverUrl + mongoConfig.database;
let _connection = undefined;

let connectDb = () => {
	if (!_connection) {
		_connection = MongoClient.connect(fullMongoUrl)
			.then(db => {
				return db;
			});
	}
	return _connection;
}

module.exports = connectDb;