require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

console.log('using form.js');
console.log($)
$('#sendMail').on('click', () => {
	console.log('button clicked!');
});