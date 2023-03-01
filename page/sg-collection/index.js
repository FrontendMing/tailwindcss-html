// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class SGCollection {
    constructor({infiniteScrollContainer1, infiniteScrollContainer2, swiperSgProductContainer, swiperSgProductsPagination, }) {
        this.infiniteScrollContainer1 = infiniteScrollContainer1
        this.infiniteScrollContainer2 = infiniteScrollContainer2
        this.swiperSgProductContainer = swiperSgProductContainer
        this.swiperSgProductsPagination = swiperSgProductsPagination

        // tab 锚点
        this.tabs = document.querySelectorAll('[data-tab-id]')

        this.init();
    }
    init() {
        this.tabs.forEach(it => it.onclick = () => this.handleTabClick(it))

        // blur 按钮
        const blurBtns = document.querySelectorAll('[data-blur-btn]')
        blurBtns.forEach(it => it.onclick = (e) => this.blurImageBlock(e))

        // window.addEventListener('scroll', this.watchScrollEvent, false)

        this.initInfiniteScroll()
        this.initProductSwiper()
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
    // 毛玻璃效果
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
    // 无缝滚动
    initInfiniteScroll() {
        new Swiper(this.infiniteScrollContainer1, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            speed: 30000, //滚动速度
            freeMode: true,
            loop: true,
            direction: 'vertical',
            centeredSlides: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false, //就算触摸了也继续滚动
                loopPreventsSlide: true,
            },
        })
        new Swiper(this.infiniteScrollContainer2, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            speed: 30000, //滚动速度
            freeMode: true,
            centeredSlides: true,
            loop: true,
            direction: 'vertical',
            autoplay: {
                delay: 0,
                disableOnInteraction: false, //就算触摸了也继续滚动
                loopPreventsSlide: true,
                reverseDirection: true, // 反向
            },
        })
    }
    // SG 产品 swiper
    initProductSwiper() {
        const bodyWidth = document.body.clientWidth
        const isMobile = bodyWidth < 1024
        new Swiper(this.swiperSgProductContainer, {
            slidesPerView: 'auto',
            spaceBetween: isMobile ? 60 : -60,
            speed: 500,
            centeredSlides: true,
            loop: true,
            on: {
                resize: function(){
                    this.update()
                }, 
            },
            pagination: {
                el: this.swiperSgProductsPagination,
                clickable: true,
                bulletClass: 'swiper-sg-product-pagination-item',
                bulletActiveClass: 'active swiper-sg-product-pagination-item-active',
                clickableClass: 'swiper-sg-product-pagination-clickable',
                modifierClass: 'swiper-sg-product-pagination-',
                renderBullet: function (index, className) {
                    const sgProductsDOM = document.querySelector('[data-sg-products]')
                    const productsArray = sgProductsDOM.dataset.sgProducts.split(',')
                    const text = productsArray[index]
                    return `
                        <div class="${className}">
                            <span>${text}</span>
                        </div>
                    `
                },
            },
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SGCollection({
        infiniteScrollContainer1: '.swiper-infinite-scroll-1',
        infiniteScrollContainer2: '.swiper-infinite-scroll-2',
        swiperSgProductContainer: '.swiper-sg-products',
        swiperSgProductsPagination: '.swiper-sg-products-pagination',
    });
})

