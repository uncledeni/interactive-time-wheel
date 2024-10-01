import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

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

const SC_NestSpan = styled.span`
    position: absolute;
    width: 10px; height: 10px;
    border: 1px solid #303E5880;
    transform-origin: 0 0;

    ${props => {
        return `transform: rotate(calc(${360 / props.$numIcons.length}deg * var(--i))) translate(${circleRadius}px) rotate(calc(${-360 / props.$numIcons.length}deg * var(--i)));`
    }}

    ${props => {
        return `&:nth-child(${props.$i + 1}) { --i: ${props.$i - 1};}`
    }}
    `

const SC_TimePoint = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px; height: 56px;
    border: 1px solid #303E5880;
    border-radius: 28px;
    position: absolute;
    top: -28px; left: -28px;
    cursor: pointer;
    // transform-origin: 0 0;
    background-color: #555f;

    & p {
        font-family: PT Sans;
        color: red;
    }
   
    & p:hover {
        color: green;
    }
`

// &:hover {
//     ${props => {
//     return `transform: scale(${scaleChange});`
// }}
//     background-color: revert;
// }

// ${props => {
//     return `transform: scale(${1 / scaleChange});`
// }}

function animateValue(start, end, fnc, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    // console.log(current, end, range, increment, stepTime);
    var timer = setInterval(function () {
        current += increment;
        fnc(current)
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

const InnerText = ({ e, i, activePosition, currentActive, textSubRef }) => {
    gsap.to(textSubRef.current, {
        duration: 0,
        // repeat: -1,
        rotation: -60 * (activePosition - currentActive + 1),
    })

    return (
        <p ref={textSubRef}>{i} - {e}</p>
    )
}

const Point = ({ e, i, currentActive, activePosition, func, numIcons }) => {
    const elemRef = useRef(null);
    const textSubRef = useRef(null);
    gsap.registerPlugin(Observer);

    //инициализация
    useEffect(() => {
        if (currentActive !== i) {
            gsap.to(elemRef.current, { scale: 1 / scaleChange });
            gsap.to(textSubRef.current, { display: "none", color: "white" });
        } else {
            gsap.to(elemRef.current, { scale: scaleChange });
            gsap.to(textSubRef.current, { color: "blue", display: "block" });
        }
    }, [])

    //обновление
    useEffect(() => {
        console.log(e, i, currentActive, activePosition)

        Observer.create({
            target: elemRef.current,
            type: "pointer",
            wheelSpeed: -1,
            onHover: () => {
                console.log(currentActive, i);
            },
            tolerance: 10,
            preventDefault: true
        });

        // console.log(elemRef.current)
        if (currentActive !== i) {

            Observer.create({
                target: elemRef.current,
                type: "pointer",
                wheelSpeed: -1,
                onHover: () => {
                    // console.log(currentActive, i);
                    gsap.to(elemRef.current, { scale: scaleChange });
                    gsap.to(textSubRef.current, { color: "orange", display: "block" });
                },
                onHoverEnd: () => {
                    gsap.to(elemRef.current, { scale: 1 / scaleChange });
                    gsap.to(textSubRef.current, { color: "white", display: "none" });
                },
                tolerance: 10,
                preventDefault: true
            });
        } else {
            gsap.to(elemRef.current, {
                scale: scaleChange
            })
        }
    }, [currentActive])

    useEffect(() => {
        if (currentActive === i) {
            gsap.to(elemRef.current, {
                scale: scaleChange
                // duration: 0,
                // // repeat: -1,
                // rotation: -60 * (activePosition - currentActive + 1),
            })
        } else {
            gsap.to(elemRef.current, {
                scale: 1 / scaleChange
                // duration: 0,
                // // repeat: -1,
                // rotation: -60 * (activePosition - currentActive + 1),
            })
        }
    }, [elemRef, currentActive])

    return (
        <SC_NestSpan
            $i={i}
            $currentActive={currentActive}
            onClick={func}
            $numIcons={numIcons}
        >
            <SC_TimePoint
                ref={elemRef}
                $i={i}
                $currentActive={currentActive}
                onClick={func}
                $numIcons={numIcons}
            >
                <InnerText e={e} i={i} activePosition={activePosition} currentActive={currentActive} textSubRef={textSubRef} />
            </SC_TimePoint>
        </SC_NestSpan>
    )
}

export const PeriodControl = ({ data, setPer }) => {
    const [numIcons, setNumIcons] = useState(data);
    const circleRef = useRef(null);
    const [activePosition, setActivePosition] = useState(numIcons.length - 1);
    const [currentActive, setCurrentActive] = useState(0);
    const [currentYears, setCurrentYears] = useState(numIcons[currentActive].years)
    const [val, setVal] = useState(numIcons[currentActive].years[0]);
    const [val1, setVal1] = useState(numIcons[currentActive].years[1]);
    const [tmp, setTmp] = useState(0);

    useEffect(() => {
        setPer(currentActive);
        // console.log(currentActive);
    }, [currentActive]);

    useEffect(() => {
        // console.log(currentYears, numIcons[currentActive].years);
        animateValue(currentYears[0], numIcons[currentActive].years[0], setVal, 2000);
        animateValue(currentYears[1], numIcons[currentActive].years[1], setVal1, 2000);

        setCurrentYears([numIcons[currentActive].years[0], numIcons[currentActive].years[1]])
    }, [currentActive]);

    return (
        <>
            <button onClick={() => setTmp(tmp + 1)}>CLICK {tmp}</button>
            <div>
                <button onClick={() => {
                    // setOffset(Math.abs(activePosition - currentActive - 1 + 1));
                    setCurrentActive(() => {
                        if (currentActive - 1 < 0) {
                            return 5;
                        }
                        return currentActive - 1;
                    });
                    // gsap.to(circleRef.current, {
                    //     duration: 2,
                    //     // repeat: -1,
                    //     rotation: 60 * Math.abs(activePosition - currentActive - 1 + 1)
                    // })
                }}>L</button>
                <button onClick={() => {
                    // setOffset(Math.abs(activePosition - currentActive + 1 + 1));
                    setCurrentActive(() => {
                        if (currentActive + 1 > 5) {
                            return 0;
                        }
                        return currentActive + 1;
                    });
                    // gsap.to(circleRef.current, {
                    //     duration: 2,
                    //     // repeat: -1,
                    //     rotation: 60 * Math.abs(activePosition - currentActive + 1 + 1)
                    // })
                }
                }>R</button>
            </div>
            <SC_CircleWrapper>
                <SC_PeriodCircle ref={circleRef}>
                    {numIcons.map((e, i) => {
                        return <Point key={i} e={i} i={i} activePosition={activePosition} currentActive={currentActive} numIcons={numIcons} func={() => {
                            if (i !== currentActive) {
                                setCurrentActive(i);
                                console.log(currentActive)
                                gsap.to(circleRef.current, {
                                    duration: 2,
                                    // repeat: -1,
                                    rotation: 60 * (Math.abs(activePosition - i) + 1)
                                })
                            }
                        }} />
                    })}
                </SC_PeriodCircle>
                <SC_YearsPeriod color="#3877EE">{`${val}`} <SC_OtherPeriod color='#EE7738'>{`${val1}`}</SC_OtherPeriod></SC_YearsPeriod>
            </SC_CircleWrapper>
        </>
    )
}