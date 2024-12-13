import "./Files.css";

import {motion} from 'framer-motion'
import React, {useState, useRef, useEffect} from 'react';

import defaultImg from "../../images/Content/default.svg";
import fileImg from "../../images/Content/file.svg";
import folderImg from "../../images/Content/folder.svg";


const FILES = [
    {
        id: 0,
        type: 'file',
        title: 'Title'
    },
    {
        id: 1,
        type: 'folder',
        title: 'Title'
    },
    {
        id: 2,
        type: 'file',
        title: 'Title'
    },
    {
        id: 3,
        type: 'folder',
        title: 'Title'
    },
    {
        id: 4,
        type: 'file',
        title: 'Title'
    },
    {
        id: 5,
        type: 'folder',
        title: 'Title'
    },
    {
        id: 6,
        type: 'file',
        title: 'Title'
    },
    {
        id: 7,
        type: 'folder',
        title: 'Title'
    },
    {
        id: 8,
        type: 'file',
        title: 'Title'
    },
    {
        id: 9,
        type: 'folder',
        title: 'Title'
    }
]


function Files({ toggleEditMenuState, toggleBgColor}) {
    const containerRef = useRef(null)
    const slidesRef = useRef(null)

    const [containerHeight, setContainerHeights] = useState(0)
    const [slidesHeight, setSlidesHeights] = useState(0)
    const mouseUpRef = useRef(true);

    useEffect(() => {
        const measureSliderHeight = () => {
            setContainerHeights(containerRef.current.clientHeight)
        }

        const measureSlidesHeight = () => {
            const slidesNode = slidesRef.current.childNodes
            const slidesArr = Array.from(slidesNode)
            const slidesSumHeight = slidesArr.reduce(
                (acc, node) => acc + node.clientHeight,
                0
            )
            setSlidesHeights(slidesSumHeight)
        }

        measureSliderHeight()
        measureSlidesHeight()

        window.addEventListener("resize", measureSliderHeight)
        window.addEventListener("resize", measureSlidesHeight)

        return () => {
            window.removeEventListener("resize", measureSliderHeight)
            window.removeEventListener("resize", measureSlidesHeight)
        }
    }, [containerHeight, slidesHeight])

    const handleMouseDown = () => {
        mouseUpRef.current = false;
        console.log('click')

        setTimeout(() => {
            if (mouseUpRef.current === true) {
                return
            }
            console.log('Long click')

            toggleEditMenuState()
            toggleBgColor()
        }, 600)
    };

    const handleMouseUp = () => {
        mouseUpRef.current = true;
    }

    let top = -((slidesHeight - containerHeight) - 250)

    return (
        <div ref={containerRef} className="files-container">
            <motion.ul
                ref={slidesRef}
                drag="y"
                dragConstraints={{
                    top: top > 0 ? 0 : top,
                    bottom: 0
                }}
                dragElastic={0.5}
                dragTransition={{bounceDamping: 100}}
                className="slides"
            >
                {/*<div className="easter-egg why-so-sirious"/>*/}
                <div className="easter-egg code">1342</div>
                {FILES.map(image => {
                    let src

                    switch (image.type) {
                        case 'file':
                            src = fileImg
                            break;
                        case 'folder':
                            src = folderImg
                            break;
                        default:
                            src = defaultImg
                    }

                    return (
                        <li key={image.id}>
                            <div className="file-container">
                                <div
                                    className="file-icon-container"
                                    style={{backgroundImage: `url(${src})`}}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleMouseDown}
                                    onTouchEnd={handleMouseUp}
                                    onTouchMove={handleMouseUp}
                                />
                                <div className="file-title-container">
                                    <text>{image.title}</text>
                                </div>
                            </div>
                        </li>
                    );
                })}

            </motion.ul>
        </div>
    )
}

export default Files;