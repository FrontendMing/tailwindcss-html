// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class HelpMeChoose{
    constructor({ el }) {
        this.DOM = (el && document.querySelector(el)) || {}
    }
    init() {
        
    }
}

const helpMeChoose = new HelpMeChoose({
    el: '.choose-scenarios-tabs'
})
export default helpMeChoose