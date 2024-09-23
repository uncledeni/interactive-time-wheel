import React from "react";
import styled from "styled-components";

const PeriodCircle = styled.div`
    width: 536px;
    height: 530px;
    position: absolute;
    top: 19%;
    left: calc(50% - 265px);
    border: 1px solid #42567A1A;
    box-sizing: border-box;
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const YearsPeriod = styled.p`
    position: absolute;
    width: max-content;
    height: 160px;

    font-family: PT Sans;
    font-size: 200px;
    font-weight: 700;
    line-height: 160px;
    letter-spacing: -0.02em;
    text-align: center;
`

export const PeriodControl = ({years}) => {
    return (
        <PeriodCircle>
            <YearsPeriod>{`${years[0]} ${years[1]}`}</YearsPeriod>
        </PeriodCircle>
    )
}