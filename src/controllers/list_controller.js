import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['source']

  copy() {
    const text = this.sourceTarget.innerText

    const tempInput = document.createElement('input')
    tempInput.value = text
    document.body.appendChild(tempInput)

    tempInput.select()
    document.execCommand('copy')
    tempInput.remove()
  }
}
