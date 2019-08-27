import { Controller } from 'stimulus'
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'

export default class extends Controller {
  static targets = ['input']

  connect() {
    fetch('http://localhost:9000/clear', {
      method: 'POST',
    }).then(this.initFilePond)
  }

  initFilePond = () => {
    FilePond.setOptions({
      server: {
        url: 'http://localhost:9000',
        process: {
          url: '/upload',
          onload: () => {
            window.location.pathname = '/list'
          },
        },
      },
    })
    FilePond.create(this.inputTarget)
  }
}
