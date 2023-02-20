// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class Base{
    constructor({prevEl, el, nextEl, backBtn, nextBtn} = {}) {
        this.prevDOM = prevEl && document.querySelector(prevEl)
        this.DOM = el && document.querySelector(el)
        this.nextDOM = nextEl && document.querySelector(nextEl)
        this.backBtn = nextEl && document.querySelector(backBtn)
        this.nextBtn = nextEl && document.querySelector(nextBtn)

        document.addEventListener('DOMContentLoaded', () => {
            if (this.backBtn) {
                this.backBtn.onclick = () => {
                    this.prevDOM && (this.prevDOM.style.display = 'block')
                    this.DOM && (this.DOM.style.display = 'none')
                    this.scrollToHelpMeDOM()
                }
            }
            if (this.nextBtn) {
                this.nextBtn.onclick = () => {
                    this.nextDOM && (this.nextDOM.style.display = 'block')
                    this.DOM && (this.DOM.style.display = 'none')
                    this.scrollToHelpMeDOM()
                }
            }
        })
    }
    // 滚动到 动态内容 DOM
    scrollToHelpMeDOM(callback) {
        const helpMeDOM = document.querySelector('#shopify-section-page-help-me')
        window.scrollTo({
            top: helpMeDOM.offsetTop,
            behavior: 'smooth',
        })
        callback && callback()
    }
    // 更新 页面 title
    updateTitle(content) {
        const title = document.querySelector('[data-title]')
        title.innerHTML = content
    }
}

// 开始选择
class StartChoose extends Base{
    constructor({ el, nextBtn, nextEl }) {
        super({ el, nextBtn, nextEl})
        this.tabs = this.DOM.querySelectorAll('[data-tab]') || []

        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {
        this.tabs.forEach(it => it.onclick = () => this.handleTabClick(it))
    }
    handleTabClick(it) {
        this.tabs.forEach(v => v.classList.remove('active'))
        it.classList.add('active')

        const mobileImg = it.getAttribute('data-mb-img')
        const pcImg = it.getAttribute('data-pc-img')
        const tabContentDom = document.querySelector('[data-tab-content]')
        tabContentDom.innerHTML = `
            <img class="block lg:hidden w-full object-cover" src="${mobileImg}" alt="">
            <img class="hidden lg:block w-full object-cover" src="${pcImg}" alt="">
        `

        const tab = it.dataset.tab
        const tabOthers = document.querySelector('[data-tab-others]')
        tabOthers.style.display = tab === 'others' ? 'block' : 'none'
    }
}
new StartChoose({
    el: '#start',
    nextEl: '#question1',
    nextBtn: '[data-start-next]',
})



// 选择场景
class ChooseScenarios extends Base {
    constructor({ el, prevEl, backBtn, nextBtn, nextEl, }) {
        super({ el, prevEl, backBtn, nextBtn, nextEl, })
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
        })
    }
    init() {

    }
}
new ChooseScenarios({
    prevEl: '#start',
    el: '#question1',
    nextEl: '#question2',
    backBtn: '[data-question1-back]',
    nextBtn: '[data-question1-next]',
})

// 选择电器
class ChooseAppliances extends Base {
    constructor({ el, prevEl, backBtn, nextBtn, nextEl, clearBtn, fixedChoosedPopup, fixedEditPopup, }) {
        super({ el, prevEl, backBtn, nextBtn, nextEl, })
        
        this.checkboxes = this.DOM.querySelectorAll('input[type="checkbox"]') || []
        this.clearBtn = document.querySelector(clearBtn)
        this.fixedChoosedPopup = document.querySelector(fixedChoosedPopup)

        this.editBtns = this.DOM.querySelectorAll('[data-edit]') || []
        this.fixedEditPopup = document.querySelector(fixedEditPopup)

        this.bodyWidth = document.body.clientWidth

        document.addEventListener('DOMContentLoaded', () => {
            this.init()
            this.updateTitle('What appliances will you power?')
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
new ChooseAppliances({
    prevEl: '#question1',
    el: '#question2',
    nextEl: '#question3',
    backBtn: '[data-question2-back]',
    nextBtn: '[data-question2-next]',

    clearBtn: '[data-clear-all]',
    fixedEditPopup: '#fixed-edit-popup',
    fixedChoosedPopup: '#fixed-choosed-popup',
})


// 选择优点
class ChooseAdvantages extends Base {
    constructor ({ el, prevEl, backBtn, nextBtn, nextEl, fixedModelsPopup }) {
        super({ el, prevEl, backBtn, nextBtn, nextEl, })

        this.checkboxes = this.DOM.querySelectorAll('[type="checkbox"]') || []

        this.fixedModelsPopup = document.querySelector(fixedModelsPopup)
        
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
            this.updateTitle('What Advantages of the power solution would you like?')
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

new ChooseAdvantages({
    prevEl: '#question2',
    el: '#question3',
    nextEl: '#question4',
    backBtn: '[data-question3-back]',
    nextBtn: '[data-question3-next]',

    fixedModelsPopup: '#fixed-two-models-popup',
})



// 选择太阳能板
class ChooseSolarPanel extends Base {
    constructor({ el, prevEl, backBtn, nextBtn, nextEl, fixedPopup }) {
        super({ el, prevEl, backBtn, nextBtn, nextEl, })

        this.fixedPopup = document.querySelector(fixedPopup)

        this.portablePowers = this.DOM.querySelectorAll('[data-portable]') || []
        this.solarPanels = this.DOM.querySelectorAll('[data-solar]') || []

        this.bodyWidth = document.body.clientWidth
        document.addEventListener('DOMContentLoaded', () => {
            this.init()
            this.updateTitle('Choose Solar Panels for Sustainable-cycle-charging?')
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

new ChooseSolarPanel({
    prevEl: '#question3',
    el: '#question4',
    nextEl: '#end',
    backBtn: '[data-question4-back]',
    nextBtn: '[data-question4-next]',

    fixedPopup: '#fixed-combo-popup',
})


class EndChoose extends Base {
    constructor({ endBtn, }) {
        super()

        this.endBtnDOM = document.querySelector(endBtn)

        document.addEventListener('DOMContentLoaded', () => {
            this.init()
            this.updateTitle('Meet your Portable Power Solution!')
        })
    }
    init() {
        this.endBtnDOM.onclick = () => {
            this.scrollToHelpMeDOM(() => {
                setTimeout(() => {
                    location.reload()
                }, 700);
            })
        }
    }
}
new EndChoose({
    endBtn: '[data-end-try-again]',
})
