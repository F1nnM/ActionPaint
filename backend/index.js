const express = require('express')
const app = express()
const port = 4000

// serve frontend in Docker image
app.use(express.static("built_frontend"))

app.get('/api', (req, res) => {
  // All the api handling goes here
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})