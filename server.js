const express = require('express')
const path = require('path')
const api = require('./api/index.js')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', api)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, function () {
    console.log(`Listening at https://localhost:${PORT}`)
})