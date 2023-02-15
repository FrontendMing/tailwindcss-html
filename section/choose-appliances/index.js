import '../../index.css'

class Appliances {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        const fixedPopup = document.querySelector('#fixed-popup')
        const fixedHeight = fixedPopup.clientHeight
        const bodyWidth = document.body.clientWidth
        if (bodyWidth < 1024) {
            document.body.style.paddingBottom = fixedHeight + 'px'
        }
    }
}

const appliances = new Appliances()
export default appliances
