// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import './swiper.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            speed={800}
            effect={'fade'}
            loop={true}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            autoplay={{
                delay: 2500,
                stopOnLastSlide: true,
                disableOnInteraction: false
            }}
            modules={[Pagination, Autoplay, EffectFade]}>
            <SwiperSlide><img src="https://www.erdemdavetiye.com//images/home-banner/banner-3.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://www.erdemdavetiye.com//images/home-banner/banner-5.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://www.erdemdavetiye.com//images/home-banner/banner-7.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://www.erdemdavetiye.com//images/home-banner/banner-8.jpg" alt="" /></SwiperSlide>
            <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination">
                </div>
            </div>
        </Swiper>

    );
};
export default Slider