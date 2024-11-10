import React from 'react'; 
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import usefetchData from '../../../coustomHook/usefetchData';
import style from './Categories.module.css';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

export default function Categories() {
    const { data, loading, err } = usefetchData(`https://ecommerce-node4.onrender.com/categories/active`);

    console.log("Fetched categories data:", data);

    if (loading) {
        return <LoadingSpinner/>;
    }
    if (err) {
        return <div className={style.error}>Error: {err}</div>;
    }

    return (
        <section className={style.categories}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {data?.categories?.map((category) => {
                    if (!category._id) {
                        console.log('Missing category ID:', category);
                        return null;
                    }
                    console.log(category._id);

                    return (
                        <section className={style.TheCategories}>
                        <SwiperSlide key={category._id} className={style.swiperSlide}>
                            <div className={` ${style.CategoryCard}`} >
                                <Link to={`/CategoryDetails/${category._id}`}>
                                    <img 
                                        src={category.image.secure_url} 
                                        alt={category.name} 
                                        className={style.categoryImage} 
                                    />
                                </Link>    
                            </div>
                        </SwiperSlide></section>
                    );
                })}
            </Swiper>
        </section>
    );
}
