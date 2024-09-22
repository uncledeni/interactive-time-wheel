import React from "react";
import styled from "styled-components";

// font-family: Bebas Neue;
const EventContent = styled.div`

`

const Year = styled.h1`
    font-size: 25px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
    color: #3877EE;
`

// font-family: PT Sans;
const EventText = styled.p`
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
    color: #42567A;
`

export const Event = ({year, eventText}) => {
    return(
        <EventContent>
            <Year>{year}</Year>
            <EventText>{eventText}</EventText>
        </EventContent>
    )
}