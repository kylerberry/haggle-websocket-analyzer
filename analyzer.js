const forEach = require('lodash/forEach')
const keys = require('lodash/keys')
const reduce = require('lodash/reduce')

let defaults = {
    participants: null,
    averageAgreements: null,
    averageScorePerAgreement: null,
    me: {
        "sessions": null,
        "agreements": null,
        "score": null,
        averageScorePerAgreement: null,
        averageAgreements: null,
    }
}

const getAvgScore = (data) => {
    let itemLength = keys(data).length
    return reduce(data, (acc, item) => {
        let val = acc + (item.all.score / item.all.agreements)
        return isNaN(val) ? acc : val;
    }, 0) / itemLength
}

const getAvgAgreements = (data) => {
    let itemLength = keys(data).length
    return reduce(data, (acc, item) => {
        let val = acc + (item.all.agreements / item.all.sessions)
        return isNaN(val) ? acc : val
    }, 0) / itemLength
}

module.exports = (data, myId) => {
    let output = Object.assign({}, defaults)
    let myData = data[myId]

    output.participants = keys(data).length
    output.averageAgreements = getAvgAgreements(data)
    output.averageScorePerAgreement = getAvgScore(data)
    output.me = Object.assign({}, output.me, myData.all)
    output.me.averageScorePerAgreement = myData.all.score / myData.all.agreements
    output.me.averageAgreements = myData.all.agreements / myData.all.sessions

    return output
}