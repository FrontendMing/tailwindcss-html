import '../../index.css'

class Advantages {
    constructor ({ el }) {
        this.DOM = (el && document.querySelector(el)) || {}
        this.checkboxes = this.DOM.querySelectorAll('[type="checkbox"]') || []
        
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        this.checkboxes.forEach(it => it.onclick = () => this.chooseAdvantage(it))
    }
    chooseAdvantage(it) {
        this.checkboxes.forEach(v => {
            v.checked = false
            it.checked = true
        })
    }
}

const advantages = new Advantages({
    el: '.choose-advantages-wrap'
})
export default advantages
