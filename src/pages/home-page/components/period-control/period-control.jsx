import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const numIcons = [1, 2, 3, 4, 5, 6];

const PeriodCircle = styled.div`
    width: 530px;
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

export const PeriodControl = ({ years }) => {
    const elemRef = useRef(null);
    const circleRef = useRef(null);
    const activePosition = numIcons.length;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        // alert(offset)
    }, [offset])

    const TimePoint = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px; height: 56px;
    border: 1px solid #303E5880;
    border-radius: 28px;
    position: absolute; top: 50%; left: 50%;
    cursor: pointer;
    transform-origin: 0 0;
    // scale: .2;
    transform: translate(-50%, -50%) rotate(calc(${360 / numIcons.length}deg * var(--i))) translate(265px) rotate(calc(${-360 / numIcons.length}deg * var(--i)));

    ${numIcons.map((e, i) => { return `&:nth-child(${i + 1}) { --i: ${i + offset};}` })}

    & p {
        font-family: PT Sans;
        color: red;
    }

    &: {

    }
`

    useGSAP(() => {
        gsap.to(circleRef.current, {
            duration: 2,
            // repeat: -1,
            rotation: 60
        })
    })

    useGSAP(() => {
        gsap.to(elemRef.current, {
            duration: 2,
            // repeat: -1,
            rotation: 360
        })
    })

    return (
        <PeriodCircle>
            {numIcons.map((e, i) => {
                return <TimePoint key={e} onClick={() => { setOffset(i + 5) }}>
                    <p>{i} - {e}</p>
                </TimePoint>
            })}
            {/* <YearsPeriod>{`${years[0]} ${years[1]}`}</YearsPeriod> */}
        </PeriodCircle>
    )
}