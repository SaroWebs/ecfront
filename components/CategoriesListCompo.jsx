import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

const CategoriesListCompo = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.API_URL}/categories`).then(res => {
            setCategories(res.data.data);
        }).catch(err => {
            console.log("");
            setCategories([]);
        });
    }, [])

    if (categories.length < 1) return;

    return (
        <div className='m-4 py-4 shadow-sm'>
            <Swiper 
                slidesPerView={3.4} 
                autoplay={{
                    delay: 2000,
                }}
                loop={true}
                >
                {categories.map(cat => (
                    <SwiperSlide key={cat.id}>
                        <Link href={`/categories/${cat.id}`} className="text-center">
                            <div className="px-4 rounded-full overflow-hidden">
                                <img src="/core-images/product/noimage.png" alt="" className='w-full' />
                            </div>
                            <h3 className='text-[8px]'>{cat.name}</h3>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CategoriesListCompo