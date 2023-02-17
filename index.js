// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class HelpMeChoose{
    constructor({ el }) {
        this.DOM = (el && document.querySelector(el)) || {}
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

const helpMeChoose = new HelpMeChoose({
    el: '.choose-scenarios-tabs'
})
export default helpMeChoose
