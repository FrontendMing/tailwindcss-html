// 必须得将 css 文件引入进来，这样才能打包进去
import '../../base.css'
import './index.css'

class SPCollection {
    constructor({ swiperContainer, swiperPagination, }) {
        this.swiperContainer = swiperContainer
        this.swiperPagination = swiperPagination

        // tab 锚点
        this.tabs = document.querySelectorAll('[data-tab-id]')

        this.init();
    }
    init() {
        const _autoplay = true
        const _speed =  8

        this.swiper = new Swiper(this.swiperContainer, {
            slidesPerView: 'auto',
            clickable: true,
            spaceBetween: 0,
            loop: true,
            followFinger: false,
            on: {
                resize: function () {
                    setTimeout(() => {
                        this.update()
                    }, 500);
                }
            },
            pagination: {
                el: this.swiperPagination,
                clickable: true,
                bulletClass: 'swiper-work-pagination-item',
                bulletActiveClass: 'active swiper-work-pagination-item-active',
                clickableClass: 'swiper-work-pagination-clickable',
                modifierClass: 'swiper-work-pagination-',
                renderBullet: function (index, className) {
                    const workDOM = document.querySelector('[data-work]')
                    const workArray = workDOM.dataset.work.split(',')
                    const text = workArray[index]
                    return `
                        <div class="${className}">
                            <span>${index + 1}</span>
                            <span>${text}</span>
                        </div>
                    `
                },
            },
            autoplay: _autoplay ? {
                delay: _speed * 1000,
                disableOnInteraction: false,
            } : false,
        });


        this.tabs.forEach(it => it.onclick = () => this.handleTabClick(it))

        // blur 按钮
        const blurBtns = document.querySelectorAll('[data-blur-btn]')
        blurBtns.forEach(it => it.onclick = (e) => this.blurImageBlock(e))

        // window.addEventListener('scroll', this.watchScrollEvent, false)
    }
    handleTabClick(it) {
        this.tabs.forEach(v => v.classList.remove('active'))
        it.classList.add('active')

        this.scrollToBlock(it)
    }
    // 滚动到 对应的 DOM
    scrollToBlock(it) {
        const parentHeight = it.parentNode.offsetHeight
        const tab = it.dataset.tabId
        const offsetTop = tab && document.querySelector(`#${tab}`)?.offsetTop

        window.scrollTo({
            top: offsetTop - parentHeight,
            behavior: 'smooth',
        })
    }
    blurImageBlock(e) {
        const blurParentDOM = e.target.parentNode
        const blurShowText = blurParentDOM.querySelector('[data-blur-show-text]')
        const blurMask = blurParentDOM.querySelector('[data-blur-mask]')
        const blurImages = blurParentDOM.querySelectorAll('[data-blur-img]')
        
        blurShowText.style.opacity = blurShowText.style.opacity === '1' ? '0' : '1'
        blurShowText.style.transform = blurShowText.style.transform === 'translateY(0px)' ? 'translateY(20px)' : 'translateY(0px)'
        blurMask.style.opacity = blurMask.style.opacity === '0.5' ? '0' : '0.5'
        blurImages.forEach(it => {
            it.style.filter = it.style.filter === 'blur(10px)' ? 'blur(0)' : 'blur(10px)'
        })
    }
    watchScrollEvent() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SPCollection({
        swiperContainer: '.swiper-work',
        swiperPagination: '.swiper-work-pagination',
    });
})

