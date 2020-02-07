const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

//name, location, bio, LinkedIn URL, and GitHub URL

inquirer
    .prompt([
        {
            message: "What is your name?",
            name: "username"
        },
        {
            message: "Where are you from?",
            name: "location"
        },
        {
            message: "Tell me about yourself",
            name: "bio"
        },
        {
            message: "What is your LinkedIn url?",
            name: "linkedin"
        },
        {
            message: "What is your github url?",
            name: "github"
        }
    ])
    .then(response => {
        const markup = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <header>
                <h1>Hi! My name is ${response.username}</h1>
                <p>I am from ${response.location}</p>
            </header>
            <h2>About Me</h2> 
            <p>${response.bio}</p>
            <h2>Contact me!</h2>
            <div>
                Here is my 
                <a href="${response.linkedin}">LinkedIn</a>
            </div>
            <div>
                This is my 
                <a href="${response.github}">GitHub</a>
            </div>        
        </body>
        </html>
        `
        writeFileAsync(`profile-${response.username}.html`, markup)
            .then(() => {
                console.log(`${response.username}! Check out your profile.`)
            })
            .catch(err => {throw err});
    });