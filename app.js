const express = require("express")
const app = express()
const port = 8000

const fetch = require('node-fetch')

app.use(express.static('files'))

//Template
// app.get('/test', async (req, res) =>
//   await fetch('https://www.metaweather.com/api/location/search/?query=' + 'San Francisco')
//     .then((response) => response.json())
//     .then((json) => {res.send(json); console.log(json)})
// )

app.get('/search', async (req, res) =>
  {
    await fetch(`https://www.metaweather.com/api/location/search/?query=${req.query.location}`)
      .then((response) => response.json())
      .then((json) => res.send(json))
  }
)

app.get('/info', async (req, res) =>
  {
    await fetch(`https://www.metaweather.com/api/location/${req.query.id}`)
      .then((response) => response.json())
      .then((json) => res.send(json))
  }
)

app.listen(port, () => console.log(`Listening at port:${port}`))