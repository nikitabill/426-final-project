var unirest = require("unirest");
var name_1 = document.getElementById("name_1"); 
var name_2 = document.getElementById("name_2"); 
var guess = document.getElementById("guess"); 
var score = document.getElementById("score"); 


// This JS file helps to assess the score for who gets 
window.addEventListener("beforeunload", "click", (e) => {
	document.getElementById("assess_match").addEventListener("click", (e) => {
        e.preventDefault(); 
        console.log("assess_match clicked"); 

		// calc love calculator val
		var apiRes = calcLove(name_1, name_2); 

		// find diff between input 
		var diff = abs( document.getElementById("guess") - apiRes ); 

        score += ( 100 - diff );
    }); 
}) 
	


// For doing the chemistry calculations
function calcLove(name1, name2) {
	var req = unirest("GET", "https://love-calculator.p.rapidapi.com/getPercentage");

	req.query({
		"fname": name1,
		"sname": name2
	});

	req.headers({
		"x-rapidapi-key": "739b9df380msh1816be226e8fc1cp12c848jsn6d84e15d23d4",
		"x-rapidapi-host": "love-calculator.p.rapidapi.com",
		"useQueryString": true
	});


	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
		console.log(res.body.percentage);

	});

	return res.body.percentage; 

	// Update the score to be the difference between the expected chemistry 
	// and the chemistry that the user "guess"ed (input)

	// Users should shoot for the least distance between their guess of chemistry 
	// and that that's provided by the API
	
	// Points will be added to a user's score (up to 5 rounds) on a scale from 0-100 
	// (100 being the distance of the user's ~chemistry~ guess to the value the API provided)

	// A game will be over once the user has played the game 5 times
		// The highest score a user can get is 500 (exact chemistry guesses each time)
		// The lowest possible score will be 0 (guessing 0 chemistry and it's 100 each time, for eg)


}
