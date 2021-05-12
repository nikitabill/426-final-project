// Importing necessary JS libraries like React
//import React, { useState } from 'react'; 
//const { authUser } = require('./authUser').default
//const { users } = require('./data')
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')

//import axios from "axios"

// Connecting my database to this file
// mongoose.connect('https://github.com/nikitabill/426-final-project/blob/main/data.js', { useNewUrlParser : true } )
// const db = mongoose.connectiondb.on('open', () => console.log('Connected to database!'))
// app.use(express.json())

// Vars needed for user login form
const name = document.getElementById('name')
const password = document.getElementById('password')
const login_form = document.getElementById('login')

// Vars needed for account registration
const name1 = document.getElementById('name1')
const password1 = document.getElementById('password1')
const register_form = document.getElementById('createAccount')

// Vars needed for loveCalc
const loveCalc_form = document.getElementById('loveCalc')
const name_1 = document.getElementById("name_1"); 
const name_2 = document.getElementById("name_2"); 
var guess = document.getElementById("guess"); 
var score = document.getElementById("score"); 
var chemistryCalc = 0; 
var running_score = 0; 
var round_num_out_of_five = 0; 

// Vars needed for discovering dates (Boring API)
const date_form = document.getElementById('boring'); 
const bored_data = document.getElementById('date_info')

// Var(s) for errors
const errorElement = document.getElementById('error')

//   -This is a filler between values we initialize and our event listeners-   //

// Setting up our document
document.addEventListener("DOMContentLoaded", () => { // our default page will be the register user page
    console.log("dom event listener created");

    // Handles Login button press; pulls up Login form; makes AccRegistration form disappear
    document.getElementById("login").addEventListener("click", (e) => { // toggle display createAccount form
        e.preventDefault(); 
        login_form.classList.add("form-hidden"); 
        register_form.classList.remove("form-hidden");
        date_form.classList.add("form-hidden"); 

        console.log("login clicked"); 
    }); 

    console.log("this code has run"); 

    // Handles createAccount button press; pulls up AccRegistration form; makes Login form disappear
    document.getElementById("btn_createAcc").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.remove("form-hidden");
        login_form.classList.add("form-hidden"); 
        date_form.classList.add("form-hidden"); 

        console.log("createAccount clicked"); 
    }); 

    // Handles game instance button press
    document.getElementById("btn_game").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.add("form-hidden");
        login_form.classList.add("form-hidden"); 
        loveCalc_form.classList.remove("form-hidden"); 
        date_form.classList.add("form-hidden"); 
        // document.getElementById('btn_loginOnBanner').classList.remove("navbar-item is-active"); 
        // document.getElementById('btn_loginOnBanner').classList.add("navbar-item"); 
        // document.getElementById('btn_game').classList.add("is-active"); 


        console.log("Game button clicked"); 
    }); 

    // Handles "Calculate Match!" button press
    document.getElementById("btn_assessMatch").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.add("form-hidden");
        login_form.classList.add("form-hidden"); 
        loveCalc_form.classList.remove("form-hidden"); 
        date_form.classList.add("form-hidden"); 

        // Add listeners for loveCalc Game page
        const name_1_obj = document.getElementById('name_1');  // input
        const name_2_obj = document.getElementById('name_2');  // input
        const name_1_val = document.getElementById('name_1').value;  // log 
        const name_2_val = document.getElementById('name_2').value;  // log 
        name_1_obj.addEventListener("click", updateValue1);
        name_2_obj.addEventListener("click", updateValue2); 
        function updateValue1(e) {
            name_1_val.textContent = e.target.value; // this works
            console.log(name_1_val);
            console.log('name_1_val reached');
        }
        function updateValue2(e) {
            name_2_val.textContent = e.target.value; // this works
            console.log(name_2_val);
            console.log('name_2_val reached');
        }

        // Change the score based on the 
        var score_val = score.value;  
       

        // Change value of "score" with axios request from "Love Calculator"
        const options = {
            method: 'GET',
            url: 'https://love-calculator.p.rapidapi.com/getPercentage',
            


            params: { fname: name_1_val, sname: name_2_val },
            headers: {
                'x-rapidapi-key': '739b9df380msh1816be226e8fc1cp12c848jsn6d84e15d23d4',
                'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
            }
        };
        
        axios.request(options).then(function (response) {
                console.log(response.data);
                console.log(response.data.percentage);

                // set values for calculating score based on this round's input
                const chemistryCalc = response.data.percentage; 
                var difference = chemistryCalc - document.getElementById('guess').value; 
                // feedback from Nikita
                if (difference > 0) {
                    document.getElementById('nikita_feedback').innerHTML = "Nikita's feedback on your guess: You're not giving these two enough credit, try higher next time!"; 
                } if (difference < 0) {
                    document.getElementById('nikita_feedback').innerHTML = "Nikita's feedback on your guess: Sheeeesh! Please don't be so hopeful. These folks may not have as much chemistry as you'd think..."; 
                } if ((difference == 0) && !(guess == 0)) {
                    document.getElementById('nikita_feedback').innerHTML = "Nikita's feedback on your guess: Nice! Perfect guess. What a great match-maker. :)"
                }


                score_val = 100 - Math.abs(difference); 
                console.log(score); 
                console.log(score_val); 
                console.log(document.getElementById('score').innerHTML); 

                // if score is 150 within 5 rounds then you win!
                // if not final round
                if (round_num_out_of_five < 5) {  
                    document.getElementById('score_this_round').innerHTML = score_val; 
                    running_score += score_val; 
                    document.getElementById('score').innerHTML = running_score; 
    
                    round_num_out_of_five++; 
                    document.getElementById('round_num').innerHTML = round_num_out_of_five;
                    score.text = score_val; // update the score 

                    // providing feedback to game player about they score 
                    document.getElementById('feedback').innerHTML = "Love Calculator's feedback on your match's potential chemistry: " + response.data.result; 
                }

                // if final round
                if (round_num_out_of_five == 5) {
                    // if you won the game (score 150), alert
                    if ( running_score => 426 ) {
                        alert("Congrats! You won because your score, " + running_score + ", is greater than 426 after 5 rounds!\n\nYou can reload this page to play again! :)"); 
                    }
                    // if you lost, alert
                    if ( running_score < 426 ) {
                        alert("I'm sorry :( You lost the chemistry guessing game this time because your score, " + running_score + ", was less than 426 in 5 rounds. Reload the page the play again! \n\nHappy match-making. :)")
                    }
                }



                console.log("newScore code was run and the  % calculated from loveCalc is:"); 
                console.log(chemistryCalc); 

        }).catch(function (error) {
                console.error(error);
        });
     
        // set val for score
        document.getElementById('score').text = score_val; 

        console.log("Calculate match button clicked"); 
    }); 

    // Boring API page: discovering activities to do with your significant other
    document.getElementById("btn_dates").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.add("form-hidden");
        login_form.classList.add("form-hidden"); 
        loveCalc_form.classList.add("form-hidden"); 
        date_form.classList.remove("form-hidden");
    }); 

    
    document.getElementById("btn_findDate").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.add("form-hidden");
        login_form.classList.add("form-hidden"); 
        loveCalc_form.classList.add("form-hidden"); 
        date_form.classList.remove("form-hidden");

        // Axios API function grabs output from Bored API
        getBoredData(); 

        console.log("Find date button clicked"); 
    
    }); 

    async function getBoredData() {
        console.log("inside asynz function that will handle axios request");

        const res = await axios({ 
            method: 'get', 
            url: 'http://www.boredapi.com/api/activity?type=recreational'
        }); 

        console.log("res reached in axios function!"); 
        console.log(res); 

        document.getElementById('date_info').innerHTML = res.data['activity'];
        console.log("bored data is,,,"); 
        console.log(document.getElementById('date_info').innerHTML); 
    }; 

    


})




document.addEventListener("DOMContentLoaded", () => { // our default page will be the register user page
    
})


// User login
login_form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required!')
    }

    if (password.value.length === 'password') {
        messages.push('Password cannot be password!')
    }

    if (password.value.length === 'Password') {
        messages.push('Password cannot be Password!')
    } 

    if (password.value.length >= 25) {
        messages.push('Password must be shorter than 25 characters!')
    }

    if (password.value.length <= 8) {
        messages.push('Password must be longer than 8 characters!')
    }
    
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }

    else { // Check if user is in database 

    }

    
})

// Check if user is in database
//function authenticateUserCheck()

// If user 

// Create User Account  
register_form.addEventListener('submitCreateAccount', (e) => {
    let messages = []
    if (name1.value === '' || name1.value == null) {
        messages.push('Name is required!')
    }

    if (password1.value.length === 'password') {
        messages.push('Password cannot be password!')
    }

    if (password1.value.length === 'Password') {
        messages.push('Password cannot be Password!')
    } 

    if (password1.value.length >= 25) {
        messages.push('Password must be shorter than 25 characters!')
    }

    if (password1.value.length <= 8) {
        messages.push('Password must be longer than 8 characters!')
    }
    
    if (password1.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }

    // ERROR: if one of the syntax errors above exist, give some error message
    // ERROR: if user already exists in database, throw error

    else { // Check if user is in database 

    }

    // If successfully registered, then change page to "Logged In!

    
})

// Create a user with POST - TBD


//         BREAK IN CODE: BEGINNING OF LOVECALC.JS GAME           //

// For doing the chemistry calculations
function calcLove(namea, nameb) {
    const options = {
    method: 'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    params: {fname: 'namea', sname: 'nameb'},
    headers: {
        'x-rapidapi-key': '739b9df380msh1816be226e8fc1cp12c848jsn6d84e15d23d4',
        'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        console.log(response.data.percentage);
        chemistryCalc = response.data.percentage; 
        return response.data.percentage; 
    }).catch(function (error) {
        console.error(error);
    });




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