'use client'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import Image from "next/image";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import './sliceshow.css';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSliceshow = ({ images, title, className } : Props) => {
    

  return (

    <div className={className}>
        <Swiper
        style={{
          width: '100vw',
          height: '700px',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
            images.map ( image => (
                <SwiperSlide key={image}>
                    <Image 
                      src={`/products/${image}`} 
                      alt={title} 
                      width={600} 
                      height={500} 
                      className="object-fill" 
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>

    </div>
  );
};
