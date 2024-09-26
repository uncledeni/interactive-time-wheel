import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const circleRadius = 265;
const scaleChange = 1.5;

const SC_CircleWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SC_PeriodCircle = styled.div`
    width: ${circleRadius * 2}px;
    height: ${circleRadius * 2}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #42567A1A;
    border-radius: 1000px;
    box-sizing: border-box;
    z-index: 1;
`

const SC_YearsPeriod = styled.p`
    position: absolute;
    font-family: PT Sans;
    font-size: 200px;
    font-weight: 700;
    line-height: 160px;
    letter-spacing: -0.02em;
    z-index: 0;
    ${props => {
        return `color: ${props.color}`
    }}
`

const SC_OtherPeriod = styled.span`
    ${props => {
        return `color: ${props.color}`
    }}
`

const SC_TimePoint = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px; height: 56px;
    border: 1px solid #303E5880;
    border-radius: 28px;
    position: absolute; top: 50%; left: 50%;
    cursor: pointer;
    transform-origin: 0 0;
    background-color: #555f;

    ${props => {
        return `transform: scale(${1 / scaleChange}) translate(-50%, -50%) rotate(calc(${360 / props.$numIcons.length}deg * var(--i))) translate(${circleRadius * scaleChange}px) rotate(calc(${-360 / props.$numIcons.length}deg * var(--i)));`
    }}
    

    ${props => {
        return `&:nth-child(${props.$tmp + 1}) { --i: ${props.$tmp - 1};}`
    }}

    &:hover {
        ${props => {
        return `transform: scale(${scaleChange}) translate(-50%, -50%) rotate(calc(${360 / props.$numIcons.length}deg * var(--i))) translate(${circleRadius / scaleChange}px) rotate(calc(${-360 / props.$numIcons.length}deg * var(--i)));`
    }}
        background-color: revert;
    }

    & p {
        font-family: PT Sans;
        color: red;
        }

        & p:hover {
            color: green;
    }
`
const InnerText = ({ e, i, activePosition, currentActive }) => {
    const textRef = useRef(null);
    // console.log(textRef.current, i, activePosition - i)

    gsap.to(textRef.current, {
        duration: 2,
        // repeat: -1,
        rotation: -60 * (activePosition - currentActive + 1),
    })

    return (
        <p ref={textRef}>{i} - {e}</p>
    )
}

const Point = ({ e, i, offset, currentActive, activePosition, func, numIcons }) => {
    const elemRef = useRef(null);

    // if (i === currentActive) {
    //     // setTimeout(() => {
    //     gsap.to(elemRef.current, {
    //         duration: 2,
    //         // repeat: -1,
    //         // scale: scaleChange,
    //         // x: circleRadius / scaleChange,
    //         // y: circleRadius / scaleChange
    //         // xPercent: 25,
    //         // yPercent: 25
    //     })
    //     // }, 2000)
    // } else {
    //     gsap.to(elemRef.current, {
    //         duration: 2,
    //         // repeat: -1,
    //         scale: 1 / scaleChange,
    //         // x: circleRadius / scaleChange,
    //         // y: circleRadius / scaleChange
    //         // xPercent: 25,
    //         // yPercent: 25
    //     })
    // }

    return (
        <SC_TimePoint
            ref={elemRef}
            $tmp={i}
            $offset={offset}
            $currentActive={currentActive}
            onClick={func}
            $numIcons={numIcons}
        >
            <InnerText e={e} i={i} activePosition={activePosition} currentActive={currentActive} />
        </SC_TimePoint>
    )
}

export const PeriodControl = ({ data, setPer }) => {
    const [numIcons, setNumIcons] = useState(data);


    const circleRef = useRef(null);
    const [activePosition, setActivePosition] = useState(numIcons.length - 1);
    const [currentActive, setCurrentActive] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setPer(currentActive)
    }, [currentActive]);

    // useEffect(() => {
    // console.log(circleRef.current.style.transform)
    // }, [circleRef, activePosition, currentActive])

    return (
        <SC_CircleWrapper>
            {/* <div>
                <button onClick={() => {
                    setOffset(Math.abs(activePosition - currentActive - 1 + 1));
                    setCurrentActive(currentActive - 1);
                    gsap.to(circleRef.current, {
                        duration: 2,
                        // repeat: -1,
                        rotation: 60 * Math.abs(activePosition - currentActive - 1 + 1)
                    })
                }}>L</button>
                <button onClick={() => {
                    setOffset(Math.abs(activePosition - currentActive + 1 + 1));
                    setCurrentActive(currentActive + 1);
                    gsap.to(circleRef.current, {
                        duration: 2,
                        // repeat: -1,
                        rotation: 60 * Math.abs(activePosition - currentActive + 1 + 1)
                    })
                }
                }>R</button>
            </div> */}

            <SC_PeriodCircle ref={circleRef}>
                {numIcons.map((e, i) => {
                    return <Point key={i} e={i} i={i} activePosition={activePosition} currentActive={currentActive} numIcons={numIcons} func={() => {
                        if (i !== currentActive) {
                            setOffset(Math.abs(activePosition - i) + 1);

                            setCurrentActive(i);
                            gsap.to(circleRef.current, {
                                duration: 2,
                                // repeat: -1,
                                rotation: 60 * (Math.abs(activePosition - i) + 1)
                            })
                        }
                    }} />
                })}
            </SC_PeriodCircle>
            <SC_YearsPeriod color="#3877EE">{`${numIcons[currentActive].years[0]}`} <SC_OtherPeriod color='#EE7738'>{`${numIcons[currentActive].years[1]}`}</SC_OtherPeriod></SC_YearsPeriod>
        </SC_CircleWrapper>
    )
}