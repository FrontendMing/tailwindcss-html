import '../../index.css'

class Advantages {
    constructor ({ el, fixedModelsPopup }) {
        this.DOM = (el && document.querySelector(el)) || {}
        this.checkboxes = this.DOM.querySelectorAll('[type="checkbox"]') || []

        this.fixedModelsPopup = document.querySelector(fixedModelsPopup)
        
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        this.checkboxes.forEach(it => it.onclick = () => this.chooseAdvantage(it))

        const openModlesBtn = document.querySelector('[data-open-models]')
        openModlesBtn.onclick = () => this.handleOpenModelsBtn()
    }
    handleOpenModelsBtn() {
        this.fixedModelsPopup.style.display = 'block'

        const mask = this.fixedModelsPopup.querySelector('[data-mask]')
        const closeBtn = this.fixedModelsPopup.querySelector('[data-close]')
        mask.onclick = () => this.fixedModelsPopup.style.display = 'none'
        closeBtn.onclick = () => this.fixedModelsPopup.style.display = 'none'
    }
    chooseAdvantage(it) {
        const check = it.dataset.check
        if (check === '1') {
            it.checked = false
            it.dataset.check = '0'
        } else {
            it.checked = true
            it.dataset.check = '1'
        }
    }
}

const advantages = new Advantages({
    el: '.choose-advantages-wrap',
    fixedModelsPopup: '#fixed-two-models-popup',
})
export default advantages
