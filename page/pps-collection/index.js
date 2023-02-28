// 必须得将 css 文件引入进来，这样才能打包进去
import './index.css'

class PPSCollection {
    constructor({ swiperContainer1, swiperContainer2, }) {
        this.swiperContainer1 = swiperContainer1
        this.swiperContainer2 = swiperContainer2

        this.init();
    }
    init() {
        new Swiper(this.swiperContainer1, {
            slidesPerView: 3.3,
            spaceBetween: 18,
            speed: 10000, //滚动速度
            freeMode: true,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false, //就算触摸了也继续滚动
                loopPreventsSlide: true,
            },
        })

        // $(this.swiperContainer1).on('mouseenter', function(e){
        //     mySwiper.stopAutoplay();
        // })
        // $(this.swiperContainer1).on('mouseleave', function(e){      
        //     mySwiper.startAutoplay();
        // });


        new Swiper(this.swiperContainer2, {
            slidesPerView: 3.3,
            spaceBetween: 18,
            speed: 10000, //滚动速度
            freeMode: true,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false, //就算触摸了也继续滚动
                loopPreventsSlide: true,
                reverseDirection: true,
            },
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new PPSCollection({
        swiperContainer1: '.swiper-work1',
        swiperContainer2: '.swiper-work2',
    });
})
