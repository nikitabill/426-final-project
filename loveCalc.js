var unirest = require("unirest");

var req = unirest("GET", "https://love-calculator.p.rapidapi.com/getPercentage");

req.query({
	"fname": "kmp",
	"sname": "chris"
});

req.headers({
	"x-rapidapi-key": "739b9df380msh1816be226e8fc1cp12c848jsn6d84e15d23d4",
	"x-rapidapi-host": "love-calculator.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});