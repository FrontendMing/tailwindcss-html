import '../../index.css'

class Appliances {
    constructor({ el, clearBtn, fixedChoosedPopup, fixedEditPopup, }) {
        this.DOM = (el && document.querySelector(el)) || {}
        
        this.checkboxes = this.DOM.querySelectorAll('input[type="checkbox"]') || []
        this.clearBtn = document.querySelector(clearBtn)
        this.fixedChoosedPopup = document.querySelector(fixedChoosedPopup)

        this.editBtns = this.DOM.querySelectorAll('[data-edit]') || []
        this.fixedEditPopup = document.querySelector(fixedEditPopup)

        this.bodyWidth = document.body.clientWidth

        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        this.checkboxes.forEach(it => it.onclick = () => this.handleChoosed())

        this.clearBtn.onclick = () => this.clearAll()

        this.editBtns.forEach(it => it.onclick = () => this.handleEditBtn(it))
    }
    handleChoosed() {
        this.fixedChoosedPopup.style.display = 'block'
        const fixedHeight = this.fixedChoosedPopup.clientHeight
        if (this.bodyWidth < 1024) {
            document.body.style.paddingBottom = fixedHeight + 'px'
        }
    }
    handleEditBtn(it) {
        const { power, hours } = it.dataset
        this.fixedEditPopup.style.display = 'block'

        const mask = this.fixedEditPopup.querySelector('[data-mask]')
        const closeBtn = this.fixedEditPopup.querySelector('[data-close]')
        mask.onclick = () => this.fixedEditPopup.style.display = 'none'
        closeBtn.onclick = () => this.fixedEditPopup.style.display = 'none'
    }
    // 清空全部
    clearAll() {
        this.checkboxes.forEach(it => it.checked = false)
        if (this.bodyWidth < 1024) {
            this.fixedChoosedPopup.style.display = 'none'
            document.body.style.paddingBottom = '0px'
        }
    }
}

const appliances = new Appliances({
    el: '.choose-appliances-wrap',
    clearBtn: '#clear-all',
    fixedEditPopup: '#fixed-edit-popup',
    fixedChoosedPopup: '#fixed-choosed-popup',
    
})
export default appliances
