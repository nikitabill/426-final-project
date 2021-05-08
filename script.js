// Importing necessary JS libraries like React
import React, { useState } from 'react'; 
const { authUser } = require('./authUser').default
const { users } = require('./data')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Connecting my database to this file
mongoose.connect('https://github.com/nikitabill/426-final-project/blob/main/data.js', { useNewUrlParser : true } )
const db = mongoose.connectiondb.on('open', () => console.log('Connected to database!'))
app.use(express.json())

// Vars needed for user login form
const name = document.getElementById('name')
const password = document.getElementById('password')
const login_form = document.getElementById('login')

// Vars needed for account registration
const name1 = document.getElementById('name1')
const password1 = document.getElementById('password1')
const register_form = document.getElementById('createAccount')

// Var(s) for errors
const errorElement = document.getElementById('error')

//   -This is a filler beteen values we initialize and our event listeners-   //

// Setting up our document
document.addEventListener("DOMContentLoaded", () => { // our default page will be the register user page
    const loginForm = document.querySelector("#login"); 
    const createAccountForm = document.querySelector("#createAccount"); 

    console.log("dom event listener created");

    document.querySelector("#login").addEventListener("click", (e) => { // toggle display to c
        e.preventDefault(); 
        loginForm.classList.add("form-hidden"); 
        createAccountForm.classList.remove("form-hidden");
    }); 

    document.querySelector("#createAccount").addEventListener("click", (e) => {
        e.preventDefault(); 
        createAccountForm.classList.add("form-hidden");
        loginForm.classList.remove("form-hidden"); 
    }); 

    console.log("this code has run"); 


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