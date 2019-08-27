import { Controller } from 'stimulus'
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'

export default class extends Controller {
  static targets = ['input']

  connect() {
    FilePond.setOptions({
      server: {
        url: 'http://localhost:9000',
        process: {
          url: '/upload',
          onload: (res) => {
            console.log(JSON.parse(res))
            // this.element.innerHTML = res
            // window.location.pathname = '/list.html'
          },
        },
      },
    })
    FilePond.create(this.inputTarget)
  }
}
