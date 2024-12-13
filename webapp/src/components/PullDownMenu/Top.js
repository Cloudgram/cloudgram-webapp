import "./Top.css";

import {motion, useAnimation} from 'framer-motion'

import React, {useEffect, useRef, useState} from "react";
import Stick from "./Stick";

const starManAudio = new Audio('/audio/starman.mp3')


function PullDownMenuTop(props) {
    const [starMan] = useState(starManAudio);
    starMan.volume = 0.1
    const contentRef = useRef(null)
    const moonIntervalRef = useRef(null);
    const [contentHeight, setContentHeights] = useState(0)
    const [moonRotate, setMoonRotate] = useState(0);
    const moonControls = useAnimation();

    useEffect(() => {
        const handleStarManEnded = () => {
            starMan.currentTime = 0
            starMan.play()
        }

        const measureContentHeight = () => {
            setContentHeights(contentRef.current.clientHeight)
        }

        measureContentHeight()

        moonControls.start({
            y: [-3, 3, -3],
            transition: {
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity
            }
        })

        starMan.addEventListener('ended', handleStarManEnded);
        window.addEventListener("resize", measureContentHeight)

        return () => {
            window.removeEventListener("resize", measureContentHeight)
            starMan.removeEventListener('ended', handleStarManEnded);
            clearInterval(moonIntervalRef.current)
        }
    }, [contentHeight, moonControls, starMan])

    const handleMouseDown = () => {
        starMan.play()

        moonIntervalRef.current = setInterval(() => {
            setMoonRotate((prev) => prev + 0.1);
        }, 5);
    }

    const handleMouseUp = () => {
        starMan.pause()
        clearInterval(moonIntervalRef.current);
    }

    return (
        <div className="pull-down-menu-top-container">
            <div className="pull-down-menu-top-inner-container">
                <div className="pull-down-menu-top-content-bg-container">
                    <motion.div
                        drag="y"
                        dragConstraints={{
                            top: -(contentHeight) + (contentHeight / 2),
                            bottom: 0
                        }}
                        dragElastic={0.5}
                        dragTransition={{bounceDamping: 100}}
                        ref={contentRef}
                        className="pull-down-menu-top-content-container"
                    >
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                        <text>
                            <b>Lorem ipsum dolor</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque et expedita
                                fuga in iure, optio quam qui saepe voluptatem. Aliquid dignissimos enim incidunt, minima
                                natus omnis voluptatibus. Adipisci, quis!</p>
                        </text>
                    </motion.div>
                </div>

                <Stick
                    onClick={props.toggleMenuComeback}
                    className="pull-down-menu-top-stick"
                />
            </div>

            <motion.div
                drag
                dragConstraints={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
                dragElastic={0.05}
                dragTransition={{
                    power: 0.2,
                    timeConstant: 200,
                    bounceStiffness: 100
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                animate={moonControls}
                style={{rotate: moonRotate}}
                className="moon-container"
            />
            <div className="sky-container"/>
            <div
                className="clouds"
                id="cloud-4"
            />
        </div>
    )
}

export default PullDownMenuTop;