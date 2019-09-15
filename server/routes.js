const express = require('express')
const { jsonFromDb } = require('./helpers')

const dbPath = './server/db/books.db'
const router = express.Router()

// state
let list = []
let filteredHighlights = []
let selectedAuthor = '-'
let selectedBook = '-'
let isAuthorSelected = false

// render ejs pages
router.get('/', (_, res) => {
  res.render('../public/index')
})

router.get('/list', (_, res) => {
  const allAuthors = list.map((item) => item.Authors)
  const authors = ['-', ...new Set(allAuthors)].sort()

  const bookList = new Set(
    list
      .filter((item) => item.Authors === selectedAuthor)
      .map((item) => item.Title)
  )

  books = isAuthorSelected ? ['-', ...bookList].sort() : ['-']

  res.render('../public/list', {
    list: filteredHighlights,
    authors,
    books,
    selectedAuthor,
    selectedBook,
    isAuthorSelected,
  })
})

// handle api requests
router.post('/upload', async (req, res) => {
  const file = req.files.filepond

  await file.mv(dbPath)
  const json = await jsonFromDb(dbPath)

  filteredHighlights = list = JSON.parse(json)

  res.status(200).send('OK')
})

router.get('/select_author', (req, res) => {
  const { author } = req.query

  if (author !== '-') {
    isAuthorSelected = true
    selectedAuthor = author
    selectedBook = '-'

    filteredHighlights = list.filter((item) => item.Authors === author)
  } else {
    isAuthorSelected = false
    selectedAuthor = '-'
    filteredHighlights = list
  }

  res.status(200).send('OK')
})

router.get('/select_book', (req, res) => {
  const { book } = req.query

  if (book !== '-') {
    filteredHighlights = list.filter((item) => item.Title === book)
    selectedBook = book
  } else {
    filteredHighlights = list.filter((item) => item.Authors === selectedAuthor)
    selectedBook = '-'
  }

  res.status(200).send('OK')
})

// clear state
router.post('/clear', (_, res) => {
  list = []
  selectedBook = '-'
  selectedAuthor = '-'
  isAuthorSelected = false

  res.status(200).send('OK')
})

module.exports = router
