// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

document.addEventListener("DOMContentLoaded", () => {
    initStartChoose()
})

class BaseChoose {
    constructor({prevEl, el, nextEl, btnConfig = {}}) {
        const { backBtn, backBtnCallback, nextBtn, nextBtnCallback, } = btnConfig

        this.prevDOM = this.prevDOM || this.$$(prevEl)
        this.DOM = this.DOM || this.$$(el)
        this.nextDOM = this.nextDOM || this.$$(nextEl)
        this.backBtn = this.backBtn || this.$$(backBtn)
        this.nextBtn = this.nextBtn || this.$$(nextBtn)

        // 清楚全部 按钮
        this.clearAllBtn = this.clearAllBtn || this.$$('[data-clear-all]')

        if (this.backBtn) {
            this.backBtn.onclick = () => this.btnClickHook('back', backBtnCallback)
        }
        if (this.nextBtn) {
            this.nextBtn.onclick = () => this.btnClickHook('next', nextBtnCallback)
        }
    }
    $$(entity) {
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
        const activeStep = this.$$('[data-step-active]')
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
        const titleDOM = this.$$('[data-title]')
        titleDOM.innerHTML = title
    }
    // 滚动到 动态内容 DOM
    scrollToHelpMeDOM(callback) {
        const helpMeDOM = this.$$('#shopify-section-page-help-me')
        window.scrollTo({
            top: helpMeDOM.offsetTop,
            behavior: 'smooth',
        })
        callback && callback()
    }
    // 注册监听事件
    addEventListener(el, event, func) {
        document.querySelector(el).addEventListener(event, func.bind(this))
    }
    // 移除监听事件
    removeEventListener(el, event, func) {
        document.querySelector(el).removeEventListener(event, func.bind(this))
    }
}

// 开始选择
class StartChoose extends BaseChoose {
    constructor({ ...props }) {
        super({ ...props })
        
        this.tabs = this.DOM.querySelectorAll('[data-tab]') || []
        this.currentTab = 'Outdoor' // 默认 Outdoor

        this.init()
    }
    init() {
        this.tabs.forEach(it => it.onclick = () => this.handleTabClick(it))
    }
    handleTabClick(it) {
        this.tabs.forEach(v => v.classList.remove('active'))
        it.classList.add('active')

        const mobileImg = it.getAttribute('data-mb-img')
        const pcImg = it.getAttribute('data-pc-img')
        const tabContentDom = this.$$('[data-tab-content]')
        tabContentDom.innerHTML = `
            <img class="block lg:hidden w-full object-cover" src="${mobileImg}" alt="">
            <img class="hidden lg:block w-full object-cover" src="${pcImg}" alt="">
        `

        this.currentTab = it.dataset.tab
        const tabOthers = this.$$('[data-tab-others]')
        tabOthers.style.display = this.currentTab === 'Others' ? 'block' : 'none'
    }
}
function initStartChoose(){
    const startchoose = new StartChoose({
        el: '#start',
        nextEl: '#question1',
        btnConfig: {
            nextBtn: '[data-start-next]',
            nextBtnCallback: () => {
                startchoose.updateTitle('What scenario will you choose a portable power solution for?')

                // 初始化 选择场景
                initChooseScenarios(startchoose.currentTab)
            },
        },
    })
}



// 选择场景
class ChooseScenarios extends BaseChoose {
    constructor({ currentTab, ...props }) {
        super(props)

        this.sceneCheckboxes = this.DOM.querySelectorAll('[data-scene-checkbox]') || []

        const choosedScenarios = this.DOM.querySelector('[data-scenarios]')
        choosedScenarios.innerHTML = currentTab

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
function initChooseScenarios(currentTab) {
    const chooseScenarios = new ChooseScenarios({
        currentTab,

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
class ChooseAppliances extends BaseChoose {
    constructor({ fixedEditPopup, editPopupConfig, totalEnergyEl, ...props }) {
        super(props)

        this.applianceCheckBoxes = this.DOM.querySelectorAll('[data-appliance-checkbox]') || []

        // edit popup
        this.editBtns = this.DOM.querySelectorAll('[data-edit]') || []
        this.fixedEditPopup = this.$$(fixedEditPopup)
        
        const { addApplianceBtn, powerInput, hoursInput, minsInput, confirmEditBtn, } = editPopupConfig
        this.addApplianceBtn = this.$$(addApplianceBtn)
        this.powerInput = this.$$(powerInput)
        this.hoursInput = this.$$(hoursInput)
        this.minsInput = this.$$(minsInput)
        this.confirmEditBtn = this.$$(confirmEditBtn)

        this.appliancesInitData = []
        
        this.totalEnergy = 0
        this.totalEnergyDOM = this.$$(totalEnergyEl)
        this.updateTotalEnergy(this.totalEnergy)

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
        const { name, power, hours, mins, } = it.parentNode.parentNode.dataset
        const addApplianceBtnDisplay = this.addApplianceBtn.style.display
        if (name === 'Custom Appliance' && addApplianceBtnDisplay !== 'none') {
            it.checked = false
        }

        if (it.checked) {
            this.totalEnergy += this.calcChoosedPower(power, hours, mins)
            this.updateTotalEnergy(this.totalEnergy)
        } else {
            this.totalEnergy -= this.calcChoosedPower(power, hours, mins)
            this.updateTotalEnergy(this.totalEnergy)
        }

        const checkboxesArray = Array.from(this.applianceCheckBoxes).map(it => it.checked)
        this.nextBtn.disabled = !checkboxesArray.includes(true)
    }
    // 编辑 或 新增
    handleEditBtn(action, it) {
        this.fixedEditPopup.style.display = 'block'

        const mask = this.fixedEditPopup.querySelector('[data-mask]')
        const closeBtn = this.fixedEditPopup.querySelector('[data-close]')
        mask.onclick = () => this.hideFixedEditPopup()
        closeBtn.onclick = () => this.hideFixedEditPopup()

        const popupTitleDOM = this.$$('[data-edit-popup-title]')
        const { name, icon, power, hours, mins, } = it.parentNode.parentNode.dataset
        this.editPopupName = name
        this.powerInput.value = power
        this.hoursInput.value = hours
        this.minsInput.value = mins

        this.popupAction = action
        popupTitleDOM.innerHTML = `
            <img class="w-80 h-80 lg:w-[68px] lg:h-[68px]" src="${icon}" alt="" />
            <span class="text-xl font-bold text-main">${name}</span>
        `

        this.updateConfirmBtnStatus()

        this.addEventListener("[data-power-input]", "input", this.updateConfirmBtnStatus)
        this.addEventListener("[data-hours-input]", "input", this.updateConfirmBtnStatus)
        this.addEventListener("[data-mins-input]", "input", this.updateConfirmBtnStatus)
    }
    updateConfirmBtnStatus() {
        if (+this.powerInput.value && (+this.hoursInput.value || +this.minsInput.value)) {
            this.confirmEditBtn.disabled = false
        } else {
            this.confirmEditBtn.disabled = true
        }

        if (+this.hoursInput.value === 24) {
            this.minsInput.value = 0
        }
    }
    hideFixedEditPopup() {
        this.fixedEditPopup.style.display = 'none'
        this.removeEventListener("[data-power-input]", "input", this.updateConfirmBtnStatus)
        this.removeEventListener("[data-hours-input]", "input", this.updateConfirmBtnStatus)
        this.removeEventListener("[data-mins-input]", "input", this.updateConfirmBtnStatus)
    }
    // 计算选中的电器瓦数
    calcChoosedPower(power, hours, mins) {
        console.log(power, hours, mins)
        const time = +hours + +mins/60
        return Math.round(+power * time)
    }
    updateTotalEnergy(energy) {
        this.totalEnergyDOM.innerHTML = `${energy} Wh/day`
    }
    renderPowerInfo(power, hours, mins) {
        const w = +power ? `${power}W` : ''
        const h = +hours ? `${hours}h` : ''
        const m = +mins ? `${mins}m` : ''
        return w ? [w, h, m, 'day'].filter(it => it.length > 0).join('/') : null
    }
    // 提交
    confirmPopupData() {
        const [ power, hours, mins, ] = [ this.powerInput.value, this.hoursInput.value, this.minsInput.value, ]
        this.applianceCheckBoxes.forEach(it => {
            const parentNodeLi = it.parentNode.parentNode

            const { name, power: oldPower, hours: oldHours, mins: oldMins, } = parentNodeLi.dataset
            if (name === this.editPopupName) {
                if (it.checked) {
                    this.totalEnergy -= this.calcChoosedPower(oldPower, oldHours, oldMins)
                    this.totalEnergy += this.calcChoosedPower(power, hours, mins)
                    this.updateTotalEnergy(this.totalEnergy)
                } else {
                    it.checked = true
                    this.totalEnergy += this.calcChoosedPower(power, hours, mins)
                    this.updateTotalEnergy(this.totalEnergy)
                }
                

                const applianceInfoDom = parentNodeLi.querySelector('[data-appliance-info]')
                applianceInfoDom.innerHTML = this.renderPowerInfo(power, hours, mins)

                parentNodeLi.setAttribute('data-power', power)
                parentNodeLi.setAttribute('data-hours', hours)
                parentNodeLi.setAttribute('data-mins', mins)

                if (this.popupAction === 'add') {
                    this.addApplianceBtn.style.display = 'none'
        
                    const nextElementSibling = this.addApplianceBtn.parentNode.nextElementSibling
                    nextElementSibling.style.display = 'flex'
                }
            }
        })
        this.nextBtn.disabled = false
        this.hideFixedEditPopup()
    }
    // 清空全部
    clearAll() {
        this.applianceCheckBoxes.forEach(it => {
            it.checked = false

            const parentNodeLi = it.parentNode.parentNode
            const { name, } = parentNodeLi.dataset
            const { power, hours, mins, } = this.appliancesInitData.find(it => it.name === name)
            const applianceInfoDom = parentNodeLi.querySelector('[data-appliance-info]')
            applianceInfoDom.innerHTML = this.renderPowerInfo(power, hours, mins)

            parentNodeLi.setAttribute('data-power', power)
            parentNodeLi.setAttribute('data-hours', hours)
            parentNodeLi.setAttribute('data-mins', mins)
        })

        this.addApplianceBtn.style.display = 'block'
        this.addApplianceBtn.parentNode.nextElementSibling.style.display = 'none'

        this.totalEnergy = 0
        this.updateTotalEnergy(this.totalEnergy)

        this.nextBtn.disabled = true
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

        editPopupConfig: {
            addApplianceBtn: '[data-appliance-add]',

            powerInput: '[data-power-input]',
            hoursInput: '[data-hours-input]',
            minsInput: '[data-mins-input]',

            confirmEditBtn: '[data-confirm-edit]',
        },

        totalEnergyEl: '[data-total-energy]',
    })
}



// 选择优点
class ChooseAdvantages extends BaseChoose {
    constructor({ fixedModelsPopup, ...props }) {
        super(props)

        this.advantageCheckboxes = this.DOM.querySelectorAll('[data-advantage-checkbox]') || []

        this.fixedModelsPopup = this.$$(fixedModelsPopup)

        this.init()
    }
    init() {
        this.advantageCheckboxes.forEach(it => it.onclick = () => this.chooseAdvantage(it))

        const openModlesBtn = this.$$('[data-open-models]')
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
class ChooseSolarPanel extends BaseChoose {
    constructor({ ...props }) {
        super(props)

        this.portablePowers = this.DOM.querySelectorAll('[data-portable]') || []
        this.solarPanels = this.DOM.querySelectorAll('[data-solar]') || []

        this.init()
    }
    init() {
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
    })
}




class EndChoose extends BaseChoose {
    constructor({ tryAgainBtn, ...props }) {
        super(props)

        this.tryAgainDOM = this.$$(tryAgainBtn)

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
