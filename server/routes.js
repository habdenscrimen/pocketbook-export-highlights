const express = require('express')
const { jsonFromDb } = require('./helpers')

const dbPath = './server/db/books.db'
const router = express.Router()

let list = []

// render ejs pages
router.get('/', (_, res) => {
  res.render('../public/index')
})

router.get('/list', (_, res) => {
  res.render('../public/list', { list })
})

// handle api requests
router.post('/upload', async (req, res) => {
  const file = req.files.filepond

  await file.mv(dbPath)
  const json = await jsonFromDb(dbPath)

  list = JSON.parse(json)

  res.status(200).send('OK')
})

router.get('/get-list', (_, res) => {
  res.status(200).json(list)
})

router.post('/clear', (_, res) => {
  list = []
  res.status(200).send('OK')
})

module.exports = router
