const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3001

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`listening port ${PORT}`))

app.use((req, res, next) => {
  const tunnel = req.body ? req.body.tunnel : null
  if (tunnel) {
    next()
  } else {
    res.send({ message: 'Unathorised' })
  }
})

app.get('/', (res, req) => {
  res.send('Congratilation!')
})

app.get('/api/welcome', (req, res) => {
  res.send('welcome!')
})

app.get('/api/data', (req, res) => {
  res.json({ data: [{ success: 'welcome' }, { fail: 'Ooops' }] })
})
