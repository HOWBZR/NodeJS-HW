const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')
const generateHTML = require('./generateHTML')
const client_id = 'a787d50654fa42da7c11'
const client_secret = '2f2e40aa3a38996b1993a4523047c1977d016f95'


inquirer
    .prompt([{
        type: 'list',
        message: 'What is your favorite color?',
        choices: [
            'Red',
            'Green',
            'Yellow',
            'Blue',
        ],
        name: 'color'
    },
    {
        type: 'input',
        message: 'what is your GitHub Username?',
        name: 'username',
    }
    ]).then(function (response) {
        let color = response.color
        let username = response.username

        console.log(username)
        console.log(color)
        const queryURL = `https://api.github.com/users/${username}`;

        axios.get(queryURL).then(function (data) {
            console.log(data.data)
        });



    })
