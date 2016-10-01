const dbConnection = require("./mongoConnection.js");
//Creating and using a collection
//In order to create, read, update, or delete documents you must first have a collection.
let _col = undefined;
let getCollectionFn = (collection) => {
	return () => {
		if (!_col) {
			_col = dbConnection().then(db => {
				return db.collection(collection);
			});
		}
		return _col;
	}
}

module.exports = {
	userDataCollection: getCollectionFn("userDataCollection")
}