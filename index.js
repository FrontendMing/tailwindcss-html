// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class Base {
    constructor({prevEl, el, nextEl, btnConfig = {}}) {
        const { backBtn, backBtnCallback, nextBtn, nextBtnCallback, } = btnConfig

        this.prevDOM = this.prevDOM || this._$(prevEl)
        this.DOM = this.DOM || this._$(el)
        this.nextDOM = this.nextDOM || this._$(nextEl)
        this.backBtn = this.backBtn || this._$(backBtn)
        this.nextBtn = this.nextBtn || this._$(nextBtn)

        // 清楚全部 按钮
        this.clearAllBtn = this.clearAllBtn || this._$('[data-clear-all]')

        if (this.backBtn) {
            this.backBtn.onclick = () => this.btnClickHook('back', backBtnCallback)
        }
        if (this.nextBtn) {
            this.nextBtn.onclick = () => this.btnClickHook('next', nextBtnCallback)
        }
    }
    _$(entity) {
        return entity ? document.querySelector(entity) : null
    }
    btnClickHook(btnType, callback) {
        if (btnType === 'back') {
            this.prevDOM && (this.prevDOM.style.display = 'block')
            this.DOM && (this.DOM.style.display = 'none')
        }
        if (btnType === 'next') {
            this.nextDOM && (this.nextDOM.style.display = 'block')
            this.DOM && (this.DOM.style.display = 'none')
        }
        this.scrollToHelpMeDOM()

        callback && callback()
    }
    // 更新 step
    updateStep(direction) {
        const activeStep = this._$('[data-step-active]')
        if (direction === 'prev') {
            const prevEle = activeStep.previousElementSibling
            if (prevEle) {
                activeStep.classList.remove('active')
                activeStep.classList.remove('finish')
                activeStep.removeAttribute('data-step-active')
                prevEle.classList.add('active')
                prevEle.classList.remove('finish')
                prevEle.setAttribute('data-step-active', '')
            }
        }
        if (direction === 'next') {
            const nextEle = activeStep.nextElementSibling
            if (nextEle) {
                activeStep.classList.remove('active')
                activeStep.classList.add('finish')
                activeStep.removeAttribute('data-step-active')
                nextEle.classList.add('active')
                nextEle.setAttribute('data-step-active', '')
            }
        }
    }
    // 更新 页面 title
    updateTitle(title) {
        const titleDOM = this._$('[data-title]')
        titleDOM.innerHTML = title
    }
    // 滚动到 动态内容 DOM
    scrollToHelpMeDOM(callback) {
        const helpMeDOM = this._$('#shopify-section-page-help-me')
        window.scrollTo({
            top: helpMeDOM.offsetTop,
            behavior: 'smooth',
        })
        callback && callback()
    }
}

// 开始选择
class StartChoose extends Base {
    constructor({ ...props }) {
        super({ ...props })
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
        const tabContentDom = this._$('[data-tab-content]')
        tabContentDom.innerHTML = `
            <img class="block lg:hidden w-full object-cover" src="${mobileImg}" alt="">
            <img class="hidden lg:block w-full object-cover" src="${pcImg}" alt="">
        `

        const tab = it.dataset.tab
        const tabOthers = this._$('[data-tab-others]')
        tabOthers.style.display = tab === 'others' ? 'block' : 'none'
    }
}
const startchoose = new StartChoose({
    el: '#start',
    nextEl: '#question1',
    btnConfig: {
        nextBtn: '[data-start-next]',
        nextBtnCallback: () => {
            startchoose.updateTitle('What scenario will you choose a portable power solution for?')

            // 初始化 选择场景
            initChooseScenarios()
        },
    },
})



// 选择场景
class ChooseScenarios extends Base {
    constructor(props) {
        super(props)

        this.sceneCheckboxes = this.DOM.querySelectorAll('[data-scene-checkbox]') || []

        this.init()
    }
    init() {
        this.nextBtn.disabled = true
        this.sceneCheckboxes.forEach(it => {
            it.checked = false
            it.onclick = () => this.chooseScene(it)
        })
    }
    chooseScene(it) {
        const checkboxesArray = Array.from(this.sceneCheckboxes).map(it => it.checked)
        this.nextBtn.disabled = !checkboxesArray.includes(true)
    }
}
function initChooseScenarios() {
    const chooseScenarios = new ChooseScenarios({
        prevEl: '#start',
        el: '#question1',
        nextEl: '#question2',
    
        btnConfig: {
            backBtn: '[data-question1-back]',
            backBtnCallback: () => {
                chooseScenarios.updateStep('prev')
                chooseScenarios.updateTitle('What scenario will you choose a portable power solution for?')
            },
            nextBtn: '[data-question1-next]',
            nextBtnCallback: () => {
                chooseScenarios.updateStep('next')
                chooseScenarios.updateTitle('What appliances will you power?')
    
                // 初始化 选择电器
                initChooseAppliances()
            },
        },
    })
}


// 选择电器
class ChooseAppliances extends Base {
    constructor({ fixedChoosedPopup, fixedEditPopup, editPopupConfig, ...props }) {
        super(props)

        this.applianceCheckBoxes = this.DOM.querySelectorAll('[data-appliance-checkbox]') || []
        this.fixedChoosedPopup = this._$(fixedChoosedPopup)

        // edit popup
        this.editBtns = this.DOM.querySelectorAll('[data-edit]') || []
        this.fixedEditPopup = this._$(fixedEditPopup)
        
        const { addApplianceBtn, powerInput, hoursInput, minsInput, confirmEditBtn, } = editPopupConfig
        this.addApplianceBtn = this._$(addApplianceBtn)
        this.powerInput = this._$(powerInput)
        this.hoursInput = this._$(hoursInput)
        this.minsInput = this._$(minsInput)
        this.confirmEditBtn = this._$(confirmEditBtn)

        this.appliancesInitData = []
        this.bodyWidth = document.body.clientWidth

        this.init()
    }
    init() {
        this.clearAllBtn.style.display = 'block'
        this.nextBtn.disabled = true

        this.applianceCheckBoxes.forEach(it => {
            it.checked = false
            const { name, power, hours, mins, } = it.parentNode.parentNode.dataset
            this.appliancesInitData.push({
                name,
                power,
                hours,
                mins,
            })
            it.onclick = () => this.handleChoosed(it)
        })

        this.clearAllBtn.onclick = () => this.clearAll()

        this.editBtns.forEach(it => it.onclick = () => this.handleEditBtn('edit', it))

        this.addApplianceBtn.onclick = () => this.handleEditBtn('add', this.addApplianceBtn)

        this.confirmEditBtn.onclick = () => this.confirmPopupData()
    }
    handleChoosed(it) {
        // const { name, } = it.parentNode.parentNode.dataset
        this.applianceCheckBoxes.forEach(item => {
            item.checked = false
        })
        it.checked = true
        

        this.nextBtn.disabled = false
        
        // 移动端
        if (this.bodyWidth < 1024) {
            this.fixedChoosedPopup.style.display = 'block'
            const fixedHeight = this.fixedChoosedPopup.clientHeight
            document.body.style.paddingBottom = fixedHeight + 'px'
        }
    }
    handleEditBtn(action, it) {
        this.fixedEditPopup.style.display = 'block'

        const mask = this.fixedEditPopup.querySelector('[data-mask]')
        const closeBtn = this.fixedEditPopup.querySelector('[data-close]')
        mask.onclick = () => this.fixedEditPopup.style.display = 'none'
        closeBtn.onclick = () => this.fixedEditPopup.style.display = 'none'

        const popupTitleDOM = this._$('[data-edit-popup-title]')
        const { name, power, hours, mins, } = it.parentNode.parentNode.dataset
        this.editPopupName = name
        this.powerInput.value = power
        this.hoursInput.value = hours
        this.minsInput.value = mins

        this.popupAction = action
        if (action === 'edit' && name !== 'Custom Appliance') {
            popupTitleDOM.innerHTML = `
                <img
                    class="w-[10.8vw] h-[10.8vw] lg:w-[68px] lg:h-[68px]"
                    src="/img/icons/Laptop.png" alt=""
                />
                <span class="text-xl font-bold text-main">${name}</span>
            `
        } else {
            popupTitleDOM.innerHTML = `
                <span class="text-xl font-bold text-main">Custom Appliance</span>
            `
        }
    }
    // 新增
    initAddAppliancePopup() {

    }
    // 清空全部
    clearAll() {
        this.applianceCheckBoxes.forEach(it => {
            it.checked = false
            const { name, } = it.parentNode.parentNode.dataset
            const { power, hours, mins, } = this.appliancesInitData.find(it => it.name === name)
            const applianceInfoDom = it.parentNode.parentNode.querySelector('[data-appliance-info]')
            applianceInfoDom.innerHTML = this.renderPowerInfo(power, hours, mins)
        })

        this.addApplianceBtn.style.display = 'block'
        this.addApplianceBtn.parentNode.nextElementSibling.style.display = 'none'

        this.nextBtn.disabled = true
        if (this.bodyWidth < 1024) {
            this.fixedChoosedPopup.style.display = 'none'
            document.body.style.paddingBottom = '0px'
        }
    }
    renderPowerInfo(power, hours, mins) {
        const w = +power ? `${power}W` : ''
        const h = +hours ? `${hours}h` : ''
        const m = +mins ? `${mins}m` : ''
        return w ? [w, h, m, 'day'].filter(it => it.length > 0).join('/') : null
    }
    confirmPopupData() {
        const [ power, hours, mins, ] = [ this.powerInput.value, this.hoursInput.value, this.minsInput.value, ]
        this.applianceCheckBoxes.forEach(it => {
            const { name, } = it.parentNode.parentNode.dataset
            if (name === this.editPopupName) {
                it.checked = true
                const applianceInfoDom = it.parentNode.parentNode.querySelector('[data-appliance-info]')
                applianceInfoDom.innerHTML = this.renderPowerInfo(power, hours, mins)
            } else {
                it.checked = false
            }
        })
        this.fixedEditPopup.style.display = 'none'

        if (this.popupAction === 'add') {
            this.addApplianceBtn.style.display = 'none'

            const parentNode = this.addApplianceBtn.parentNode.parentNode
            const nextElementSibling = this.addApplianceBtn.parentNode.nextElementSibling
            nextElementSibling.style.display = 'flex'
            parentNode.setAttribute('data-power', power)
            parentNode.setAttribute('data-hours', hours)
            parentNode.setAttribute('data-mins', mins)
        }
    }
}
function initChooseAppliances() {
    const chooseAppliances =  new ChooseAppliances({
        prevEl: '#question1',
        el: '#question2',
        nextEl: '#question3',
    
        btnConfig: {
            backBtn: '[data-question2-back]',
            backBtnCallback: () => {
                chooseAppliances.updateStep('prev')
                chooseAppliances.updateTitle('What scenario will you choose a portable power solution for?')
            
                chooseAppliances.clearAllBtn.style.display = 'none'
            },
            nextBtn: '[data-question2-next]',
            nextBtnCallback: () => {
                chooseAppliances.updateStep('next')
                chooseAppliances.updateTitle('What Advantages of the power solution would you like?')

                chooseAppliances.clearAllBtn.style.display = 'none'
                // 初始化 选择优点
                initChooseAdvantages()
            }
        },

        fixedEditPopup: '#fixed-edit-popup',
        fixedChoosedPopup: '#fixed-choosed-popup',

        editPopupConfig: {
            addApplianceBtn: '[data-appliance-add]',

            powerInput: '[data-power-input]',
            hoursInput: '[data-hours-input]',
            minsInput: '[data-mins-input]',

            confirmEditBtn: '[data-confirm-edit]',
        }
    })
}



// 选择优点
class ChooseAdvantages extends Base {
    constructor({ fixedModelsPopup, ...props }) {
        super(props)

        this.advantageCheckboxes = this.DOM.querySelectorAll('[data-advantage-checkbox]') || []

        this.fixedModelsPopup = this._$(fixedModelsPopup)

        this.init()
    }
    init() {
        this.advantageCheckboxes.forEach(it => it.onclick = () => this.chooseAdvantage(it))

        const openModlesBtn = this._$('[data-open-models]')
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

        const checkboxesArray = Array.from(this.advantageCheckboxes).map(it => it.checked)
        this.nextBtn.disabled = !checkboxesArray.includes(true)
    }
}
function initChooseAdvantages() {
    const chooseAdvantages = new ChooseAdvantages({
        prevEl: '#question2',
        el: '#question3',
        nextEl: '#question4',
    
        btnConfig: {
            backBtn: '[data-question3-back]',
            backBtnCallback: () => {
                chooseAdvantages.updateStep('prev')
                chooseAdvantages.updateTitle('What appliances will you power?')

                chooseAdvantages.clearAllBtn.style.display = 'block'
            },
            nextBtn: '[data-question3-next]',
            nextBtnCallback: () => {
                chooseAdvantages.updateStep('next')
                chooseAdvantages.updateTitle('Choose Solar Panels for Sustainable-cycle-charging?')

                // 初始化 选择太阳能板
                initChooseSolarPanel()
            },
        },
    
        fixedModelsPopup: '#fixed-two-models-popup',
    })
}




// 选择太阳能板
class ChooseSolarPanel extends Base {
    constructor({ fixedPopup, ...props }) {
        super(props)

        this.fixedPopup = this._$(fixedPopup)

        this.portablePowers = this.DOM.querySelectorAll('[data-portable]') || []
        this.solarPanels = this.DOM.querySelectorAll('[data-solar]') || []

        this.bodyWidth = document.body.clientWidth
        this.init()
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
function initChooseSolarPanel() {
    const chooseSolarPanel =  new ChooseSolarPanel({
        prevEl: '#question3',
        el: '#question4',
        nextEl: '#end',
    
        btnConfig: {
            backBtn: '[data-question4-back]',
            backBtnCallback: () => {
                chooseSolarPanel.updateStep('prev')
                chooseSolarPanel.updateTitle('What Advantages of the power solution would you like?')
            },
            nextBtn: '[data-question4-next]',
            nextBtnCallback: () => {
                chooseSolarPanel.updateStep('next')
                chooseSolarPanel.updateTitle('Meet your Portable Power Solution!')

                // 初始化 End Choose
                initEndChoose()
            },
        },
    
        fixedPopup: '#fixed-combo-popup',
    })
}




class EndChoose extends Base {
    constructor({ tryAgainBtn, ...props }) {
        super(props)

        this.tryAgainDOM = this._$(tryAgainBtn)

        this.init()
    }
    init() {
        this.tryAgainDOM.onclick = () => {
            this.scrollToHelpMeDOM(() => {
                setTimeout(() => location.reload(), 700);
            })
        }
    }
}
function initEndChoose() {
    new EndChoose({
        tryAgainBtn: '[data-end-try-again]',
    })
}
