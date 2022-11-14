const router = require('express').Router()
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)

function readFile() {
    return readFileAsync('./db/db.json', 'utf8')
}
router.get('/notes', (req, res) => {
    readFile().then(data => {
        let allnotes = [].concat(JSON.parse(data))
        console.log(allnotes)
        res.json(allnotes)
    })

})




module.exports = router