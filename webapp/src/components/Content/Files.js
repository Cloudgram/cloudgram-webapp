import "./Files.css";

import {motion} from 'framer-motion'
import React, {useEffect, useRef, useState} from 'react';

import defaultImg from "../../images/Content/default.svg";
import fileImg from "../../images/Content/file.svg";
import folderImg from "../../images/Content/folder.svg";

import Image from "../UI/Image";


const FILES = [
    {
        id: 0,
        type: 'file',
        title: 'Hi'
    },
    {
        id: 1,
        type: 'folder',
        title: 'Hi my name'
    },
    {
        id: 2,
        type: 'file',
        title: 'Hi i am file'
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


function Files({toggleEditMenuVisible, toggleBgColor, setFilterFiles}) {
    const containerRef = useRef(null)
    const slidesRef = useRef(null)

    const [containerHeight, setContainerHeights] = useState(0)
    const [slidesHeight, setSlidesHeights] = useState(0)
    const [files, setFiles] = useState(FILES)
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

        const filterFiles = (filter) => {
            let filteredFiles = []

            for (const file of files) {
                if (!file.title.toLowerCase().includes(filter.toLowerCase())) {
                    continue
                }

                filteredFiles.push(file)
            }

            setFiles(filteredFiles)
        }

        measureSliderHeight()
        measureSlidesHeight()
        setFilterFiles(() => filterFiles)

        window.addEventListener("resize", measureSliderHeight)
        window.addEventListener("resize", measureSlidesHeight)

        return () => {
            window.removeEventListener("resize", measureSliderHeight)
            window.removeEventListener("resize", measureSlidesHeight)
        }
    }, [containerHeight, slidesHeight, setFilterFiles])

    const handleMouseDown = () => {
        mouseUpRef.current = false;

        setTimeout(() => {
            if (mouseUpRef.current === true) {
                return
            }

            toggleEditMenuVisible()
            toggleBgColor()
        }, 600)
    }

    const handleMouseUp = () => {
        mouseUpRef.current = true;
    }

    const handleRightClick = (event) => {
        event.preventDefault()
        toggleEditMenuVisible()
        toggleBgColor()
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
                className="files-slides"
            >
                {/*<div className="easter-egg code">1342</div>*/}
                {files.map(image => {
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
                                <Image
                                    className="file-icon-container"
                                    img={src}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleMouseDown}
                                    onTouchEnd={handleMouseUp}
                                    onTouchMove={handleMouseUp}
                                    onContextMenu={handleRightClick}
                                />
                                <div className="file-title-container">
                                    <text>{image.title}</text>
                                </div>
                            </div>
                        </li>
                    )
                })}

            </motion.ul>
        </div>
    )
}

export default Files;