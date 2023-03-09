const express = require('express')
const fs = require('node:fs');
const path = require('node:path');
const app = express()
const dbsPath = path.join('../dbs/');
const dbs = fs.readdirSync(dbsPath).filter(file => file.endsWith('.json'));
console.log("")

function searchInfo(user) {
    let returnData = {};
    returnData.status = "OK";
    returnData.results = [];
    try {
        for (const db of dbs) {
            try {
                let rawdata = fs.readFileSync("../dbs/"+db)
                let jsondata = JSON.parse(rawdata);
                for (const dbuser of jsondata) {
                    if (dbuser.name.toLowerCase() === user.toLowerCase()) {
                        if (dbuser.salt) {
                            returnData.results.push({ name: dbuser.name, password: dbuser.password, salt: dbuser.salt })
                        } else {
                            returnData.results.push({ name: dbuser.name, password: dbuser.password })
                        }
                    }
                }
            } catch(e) {
                console.log("Error found on "+db+":")
                console.log(e)
            }
        }
        return returnData
    } catch(e) {
        console.log("Error: "+e)
    }
}

app.get('/', function (req, res) {
    res.send('Welcome to Redzone\'s api.')
})

app.get('/dbs', function (req, res) {
    res.send(dbs)
})

app.post('/search', function(req, res) {
    if (!req.get('user')) return res.send(JSON.stringify({ error: 'Missing headers' }))
    const nick = req.get('user')
    const nickSplitted = nick.split(" ")
    // const apiKey = req.get('apikey')
    if (nickSplitted.length > 1) {
        res.send(JSON.stringify({ error: 'Invalid username' }))
    } else {
        res.send(searchInfo(nick))
    }
})

app.listen(80)