'use client'
import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './sliceshow.css';
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSliceshow = ({ images, title, className } : Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (

    <div className={className}>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
    } 
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >s
        {
            images.map ( image => (
                <SwiperSlide key={image}>
                    <Image src={`/products/${image}`} alt={title} className="rounded-lg object-fill" width={1024} height={800} />
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
};
