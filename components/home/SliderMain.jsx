import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SliderMain = () => {

    return (
        <div className='m-4 rounded-lg overflow-hidden'>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide><img src="/core-images/sliders/121525.png" alt="" loading="lazy" /></SwiperSlide>
                <SwiperSlide><img src="/core-images/sliders/178306.png" alt="" loading="lazy" /></SwiperSlide>
                <SwiperSlide><img src="/core-images/sliders/468293.png" alt="" loading="lazy" /></SwiperSlide>
                <SwiperSlide><img src="/core-images/sliders/633530.png" alt="" loading="lazy" /></SwiperSlide>
                <SwiperSlide><img src="/core-images/sliders/971974.jpg" alt="" loading="lazy" /></SwiperSlide>
            </Swiper>

        </div>
    )
}

export default SliderMain