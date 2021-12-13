const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3001

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`listening port ${PORT}`))

app.get('/api/welcome', (req, res) => {
  res.send('welcome!')
})

app.get('/api/data', (req, res) => {
  res.json({ data: [{ success: 'welcome' }, { fail: 'Ooops' }] })
})
