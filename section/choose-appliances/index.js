import '../../index.css'

class Appliances {
    constructor({ el, clearBtn, fixedPopup, }) {
        this.DOM = (el && document.querySelector(el)) || {}
        
        this.checkboxes = this.DOM.querySelectorAll('input[type="checkbox"]') || []
        this.clearBtn = document.querySelector(clearBtn)
        this.fixedPopup = document.querySelector(fixedPopup)

        this.bodyWidth = document.body.clientWidth

        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        this.checkboxes.forEach(it => it.onclick = () => this.initFixedPopup())

        this.clearBtn.onclick = () => this.clearAll()
    }
    initFixedPopup() {
        this.fixedPopup.style.display = 'block'
        const fixedHeight = this.fixedPopup.clientHeight
        if (this.bodyWidth < 1024) {
            document.body.style.paddingBottom = fixedHeight + 'px'
        }
    }
    // 清空全部
    clearAll() {
        this.checkboxes.forEach(it => it.checked = false)
        if (this.bodyWidth < 1024) {
            this.fixedPopup.style.display = 'none'
            document.body.style.paddingBottom = '0px'
        }
    }
}

const appliances = new Appliances({
    el: '.choose-appliances-wrap',
    clearBtn: '#clear-all',
    fixedPopup: '#fixed-appliance-popup',
})
export default appliances
