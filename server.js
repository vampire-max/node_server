const express = require('express')
const app = express()

const PORT = 3000

app.use(bodyparser.json())

app.listen(PORT, () => console.log(`listening port ${PORT}`))

app.get('./api/welcome', (res, req) => {
  res.send('welcome')
})

app.post('./api/data', (res, req) => {
  res.json({ res: [{ success: 'welcome' }, { fail: 'Ooops' }] })
})
