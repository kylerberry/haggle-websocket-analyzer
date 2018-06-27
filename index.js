const app = require('express')()
const request = require('request')
const analyze = require('./analyzer')

let server = app.listen(process.env.PORT || 8080, () => {
    console.log(`server running at https://localhost:${server.address().port}/`)
    let myId = process.argv[2]

    request('https://hola.org/challenges/haggling/scores/standard', function (err, res, data) {
        if (err) {
            console.log('error:', err);
        }
        console.log(analyze(JSON.parse(data), myId))
        process.exit()
    })    
})