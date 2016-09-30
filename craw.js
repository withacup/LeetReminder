const pageToVisit = "https://leetcode.com/problemset/algorithms/";
const page = require('webpage').create();
const fs = require('fs');
const path = 'theNumberOfProblems.txt';
// console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open(pageToVisit, function(status) {
	if (status !== 'success') {
		console.log('Unable to access network');
	} else {
		var ua = page.evaluate(function() {
			return document.getElementById('welcome').textContent;
		});
		var res = ua.split(' ');
		// fs.write(path, res[4], 'w');
		console.log(res[4]);
	}
	phantom.exit();
});
// var request = require('request');
// var cheerio = require('cheerio');
// var URL = require('url-parse');
// console.log("Visiting page " + pageToVisit);
// request(pageToVisit, function(error, response, body) {
//    if(error) {
//      console.log("Error: " + error);
//    }
//    // Check status code (200 is HTTP OK)
//    console.log("Status code: " + response.statusCode);
//    if(response.statusCode === 200) {
//      // Parse the document body
//      var $ = cheerio.load(body);
//      let tags = $('.content-wrapper').find('small').toArray();
//      for (let i = 0; i < tags.length; i++) {
//      	tags[i] = tags[i].children[0].data;
//      	// console.log(tags[i]);
//      }

//      console.log("Strong:  " + $('.content-wrapper').find($('#question-app')));
//    }
// });
