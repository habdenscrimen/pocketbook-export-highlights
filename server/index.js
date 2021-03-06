const path = require('path')
const fs = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')

const routes = require('./routes')
const { deleteFolder } = require('./helpers')

const app = express()
const publicPath = path.join(process.cwd(), 'public')
const port = process.env.PORT || 9000

// set ejs engine
app.set('view engine', 'ejs')

// middlewares
app.use(express.static(publicPath))
app.use(fileUpload())

// routes
app.use(routes)

app.listen(port, () => {
  deleteFolder('./server/db')
  fs.mkdirSync('./server/db', { recursive: true })
  console.log(`Go to http://localhost:${port}`)
})
