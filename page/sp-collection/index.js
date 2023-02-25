// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class SPCollection {
    constructor({ swiperContainer, swiperPagination, }) {
        this.swiperContainer = swiperContainer
        this.swiperPagination = swiperPagination
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SPCollection({
        swiperContainer: '.swiper-work',
        swiperPagination: '.swiper-work-pagination',
    });
})

