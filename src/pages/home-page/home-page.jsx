import React from "react";
import styled from "styled-components";
import { SwiperSlider } from "../../widgets/swiper-slider/swiper-slider.jsx";

import { PageTitle } from "../../shared/components/page-title/page-title.jsx";
import { PeriodControl } from "./components/period-control/period-control.jsx";

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #F4F5F9;
`

const PageContent = styled.div`
    width: 1440px;
    height: 100vh;
    position: relative;
    border: 1px solid #42567A1A;
    box-sizing: border-box;
`

const SwiperWrapper = styled.div`
    width: 100%;
    height: 135px;
    padding-left: 80px;
    padding-right: 40px;
    position: absolute;
    bottom: 104px;
`

export const HomePage = () => {
    const title = 'Исторические даты';

    return (
        <PageWrapper>
            <PageContent>
                <PageTitle title={title}/>
                <PeriodControl years={[2015, 2022]}/>
                <SwiperWrapper>
                    <SwiperSlider />
                </SwiperWrapper>
            </PageContent>
        </PageWrapper>
    )
}