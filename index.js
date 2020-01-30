const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')
const generateHTML = require('./generateHTML')
const convertFactory = require('electron-html-to')
const path = require('path')


inquirer
    .prompt([{
        type: 'list',
        message: 'What is your favorite color?',
        choices: [
            'red',
            'green',
            'pink',
            'blue',
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

        const queryURL = `https://api.github.com/users/${username}`;

        axios.get(queryURL).then(function (res) {

            let datas = { color, ...res.data }
            let html = generateHTML(datas)

            const conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
            })

            fs.writeFile('index.html', html, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                }
            });

            conversion({ html }, function (err, result) {
                if (err) {
                    return console.log(err)
                }
                result.stream.pipe(
                    fs.createWriteStream(path.join(__dirname, 'github.pdf'))
                )
                conversion.kill()
            })


        });





    })
