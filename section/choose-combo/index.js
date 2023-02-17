// 必须得将 css 文件引入进来，这样才能打包进去
import '../../index.css'

class Combo {
    constructor({ el, fixedPopup }) {
        this.DOM = (el && document.querySelector(el)) || {}
        this.fixedPopup = document.querySelector(fixedPopup)

        this.portablePowers = this.DOM.querySelectorAll('[data-portable]') || []
        this.solarPanels = this.DOM.querySelectorAll('[data-solar]') || []

        this.bodyWidth = document.body.clientWidth
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        const fixedHeight = this.fixedPopup.clientHeight
        if (this.bodyWidth < 1024) {
            document.body.style.paddingBottom = fixedHeight + 'px'
        }

        this.portablePowers.forEach(it => it.onclick = () => this.initTab('portable', it))
        this.solarPanels.forEach(it => it.onclick = () => this.initTab('solar', it))
    }
    initTab(type, it) {
        if (type === 'portable') {
            this.portablePowers.forEach(v => v.classList.remove('active'))
            it.classList.add('active')
        }
        if (type === 'solar') {
            this.solarPanels.forEach(v => v.classList.remove('active'))
            it.classList.add('active')
        }
    }
}

const combo = new Combo({
    el: '.choose-product-combo-wrap',
    fixedPopup: '#fixed-combo-popup',
})
export default combo

