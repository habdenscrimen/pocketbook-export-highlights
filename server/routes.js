const express = require('express')
const { jsonFromDb } = require('./helpers')

const dbPath = './db/books.db'
const router = express.Router()

router.post('/upload', async (req, res) => {
  const file = req.files.filepond

  await file.mv(dbPath)
  const json = await jsonFromDb(dbPath)

  res.status(200).json(json)
})

module.exports = router
