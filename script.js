// Importing necessary JS libraries like React
//import React, { useState } from 'react'; 
//const { authUser } = require('./authUser').default
//const { users } = require('./data')
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')

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
//var unirest = require("unirest"); // installed browserify for this to work AND unirest
//import axios from "../node_modules/axios";
var name_1 = document.getElementById("name_1"); 
var name_2 = document.getElementById("name_2"); 
var guess = document.getElementById("guess"); 
var score = document.getElementById("score"); 

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

        console.log("login clicked"); 
    }); 

    console.log("this code has run"); 

    // Handles createAccount button press; pulls up AccRegistration form; makes Login form disappear
    document.getElementById("btn_createAcc").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.remove("form-hidden");
        login_form.classList.add("form-hidden"); 

        console.log("createAccount clicked"); 
    }); 

    // Handles game instance button press
    document.getElementById("btn_game").addEventListener("click", (e) => {
        e.preventDefault(); 
        register_form.classList.add("form-hidden");
        login_form.classList.add("form-hidden"); 
        loveCalc_form.classList.remove("form-hidden"); 
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

        // Change value of "score"
        score += calcLove(name_1, name_2); // add the result of 
     
        console.log("Calculate match button clicked"); 
    }); 



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

// Create a user with POST


// // This JS file helps to assess the score for who gets 
// window.addEventListener("beforeunload", "click", (e) => {
// 	document.getElementById("assess_match").addEventListener("click", (e) => {
//         e.preventDefault(); 
//         console.log("assess_match clicked"); 

// 		// calc love calculator val
// 		var apiRes = calcLove(name_1, name_2); 

// 		// find diff between input 
// 		var diff = abs( document.getElementById("guess") - apiRes ); 

//         score += ( 100 - diff );


//     }); 
// }) 
	
//         BREAK IN CODE: BEGINNING OF LOVECALC.JS GAME           //

// For doing the chemistry calculations
function calcLove(namea, nameb) {
    const options = {
    method: 'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    params: {fname: namea, sname: nameb},
    headers: {
        'x-rapidapi-key': '739b9df380msh1816be226e8fc1cp12c848jsn6d84e15d23d4',
        'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        console.log(response.data.percentage);
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