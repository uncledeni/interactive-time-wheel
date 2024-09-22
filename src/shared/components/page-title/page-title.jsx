import React from "react";
import styled from "styled-components";

import sideLine from '../../images/side-line.svg'

const PageTitleWrapper = styled.div`
    display: flex;
    width: 353px;
    height: 134px;
    position: absolute;
    top: 170px;
`
const SideLine = styled.img`
    margin-top: 7px;
    margin-bottom: 7px;
    margin-right: 78px;
`

// font-family: PT Sans;
const TitleText = styled.h1`
    font-size: 56px;
    font-weight: 700;
    line-height: 67.2px;
    text-align: left;
    color: #42567A;
    margin: 0;
`

export const PageTitle = ({ title }) => {
    return (
        <PageTitleWrapper>
            <SideLine src={sideLine} alt="sideLine" />
            <TitleText>{title}</TitleText>
        </PageTitleWrapper>
    )
}