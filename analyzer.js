const forEach = require('lodash/forEach')
const keys = require('lodash/keys')
const reduce = require('lodash/reduce')
const moment = require('moment')
const pickBy = require('lodash/pickBy')

let defaults = {
    participants: null,
    averageAgreements: null,
    averageScore: null,
    me: {
        "sessions": null,
        "agreements": null,
        "score": null,
        averageScore: null,
        averageAgreements: null,
    }
}

let dataSlice = 'all'

const getAvgScore = (data) => {
    let itemLength = keys(data).length
    return reduce(data, (acc, item) => {
        let val = acc + (item[dataSlice].score / item[dataSlice].sessions)
        return isNaN(val) ? acc : val;
    }, 0) / itemLength
}

const getAvgAgreements = (data) => {
    let itemLength = keys(data).length
    return reduce(data, (acc, item) => {
        let val = acc + (item[dataSlice].agreements / item[dataSlice].sessions)
        return isNaN(val) ? acc : val
    }, 0) / itemLength
}

module.exports = (data, myId, date = null) => {
    let output = Object.assign({}, defaults)
    let myData = data[myId]

    if (date) {
        output.date = dataSlice = moment(date).format('YYYY-MM-DD')
        // filter data for participants who have data for provided date)
        data = pickBy(data, item => {
            return typeof item[dataSlice] !== 'undefined'
        })
    }

    output.participants = keys(data).length
    output.averageAgreements = getAvgAgreements(data)
    output.averageScore = getAvgScore(data)
    if (typeof myData[dataSlice] !== 'undefined') {
        output.me = Object.assign({}, output.me, myData[dataSlice])
        output.me.averageScore = myData[dataSlice].score / myData[dataSlice].sessions
        output.me.averageAgreements = myData[dataSlice].agreements / myData[dataSlice].sessions
    } else {
        delete output.me
        console.log(`No data found for ${myId} for ${date}.`)
    } 

    return output
}