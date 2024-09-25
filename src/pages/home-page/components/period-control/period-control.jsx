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

    ${props => {
        return `&:nth-child(${props.$tmp + 1}) { --i: ${props.$tmp - 1};}`
    }}
    
    & p {
        font-family: PT Sans;
        color: red;
    }

    &: {

    }
`
const InnerText = ({ e, i, activePosition, currentActive }) => {
    const textRef = useRef(null);
    console.log(textRef.current, i, activePosition - i)

    gsap.to(textRef.current, {
        duration: 2,
        // repeat: -1,
        rotation: -60 * (activePosition - currentActive + 1),
    })

    return (
        <p ref={textRef}>{i} - {e}</p>
    )
}

const Point = ({ e, i, offset, currentActive, activePosition, func }) => {
    const elemRef = useRef(null);

    gsap.to(elemRef.current, {
        duration: 2,
        // repeat: -1,
        // scale: 5.6,
        // xPercent: 25,
        // yPercent: 25
    })

    return (
        <TimePoint
        ref={elemRef}
            $tmp={i}
            $offset={offset}
            onClick={func}
        >
            <InnerText e={e} i={i} activePosition={activePosition} currentActive={currentActive} />
        </TimePoint>
    )
}

export const PeriodControl = ({ years }) => {
    const circleRef = useRef(null);
    const [activePosition, setActivePosition] = useState(numIcons.length - 1);
    const [currentActive, setCurrentActive] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        // alert(offset)
    }, [offset])


    return (
        <PeriodCircle ref={circleRef}>
            {numIcons.map((e, i) => {
                return <Point key={e} e={e} i={i} activePosition={activePosition} currentActive={currentActive} func={() => {
                        if (i !== currentActive) {
                            setOffset(Math.abs(activePosition - i + 1));
                            setCurrentActive(i);
                            gsap.to(circleRef.current, {
                                duration: 2,
                                // repeat: -1,
                                rotation: 60 * (activePosition - i + 1)
                            })
                        }
                    }} />
            })}
            {/* <YearsPeriod>{`${years[0]} ${years[1]}`}</YearsPeriod> */}
        </PeriodCircle>
    )
}