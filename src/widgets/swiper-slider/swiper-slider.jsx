import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { testData } from '../../shared/utils/data';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css'

import { Event } from './components/event/event.jsx';

// import required modules

export function SwiperSlider() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={80}
        navigation={true}
        modules={[Navigation]}
        injectStyles = {[`
          .swiper-button-next,
          .swiper-button-prev {
            background-color: white;
            padding: 8px 16px;
            border-radius: 100%;
            border: 2px solid black;
            color: red;
          }
          `]}
      >
        {testData.map((event) => {
          return (
            <SwiperSlide key={event.id}>
              <Event year={event.year} eventText={event.eventText} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
};