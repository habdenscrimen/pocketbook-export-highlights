import { Controller } from 'stimulus'

export default class extends Controller {
  _select(id, path, param) {
    const e = document.getElementById(id)
    const { value } = e.options[e.selectedIndex]

    const url = `http://localhost:9000/${path}?${param}=${value}`

    fetch(url).then(() => {
      location.reload() // to update highlights list according to filters
    })
  }

  selectAuthor() {
    this._select('author', 'select_author', 'author')
  }

  selectBook() {
    this._select('book', 'select_book', 'book')
  }
}
