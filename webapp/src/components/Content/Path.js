import "./Path.css";

import {motion} from 'framer-motion'
import React, {useState, useRef, useEffect} from 'react';

import nextImage from "../../images/Content/next.svg";

import Image from "../UI/Image";
import Button from "../UI/Button";


let paths = [
    {
        id: 1,
        title: 'папка1'
    },
    {
        id: 2,
        title: 'папка2'
    },
    {
        id: 3,
        title: 'папка3'
    },
    {
        id: 4,
        title: 'папка4'
    },
    {
        id: 5,
        title: 'папка5'
    },
    {
        id: 6,
        title: 'папка6'
    },
    {
        id: 7,
        title: 'папка7'
    }
]

function Files({setPath}) {
    const containerRef = useRef(null)
    const slidesRef = useRef(null)

    const [containerWidth, setContainerWidth] = useState(0)
    const [slidesWidth, setSlidesWidth] = useState(0)

    useEffect(() => {
        const measureSliderHeight = () => {
            setContainerWidth(containerRef.current.clientWidth)
        }

        const measureSlidesHeight = () => {
            const slidesNode = slidesRef.current.childNodes
            const slidesArr = Array.from(slidesNode)
            const slidesSumHeight = slidesArr.reduce(
                (acc, node) => acc + node.clientWidth,
                0
            )
            setSlidesWidth(slidesSumHeight)
        }

        // const filterFiles = (filter) => {
        //     let filteredFiles = []
        //
        //     for (const file of files) {
        //         console.log('file', file)
        //         if (!file.title.toLowerCase().includes(filter.toLowerCase())) {
        //             continue
        //         }
        //
        //         filteredFiles.push(file)
        //     }
        //
        //     setFiles(filteredFiles)
        // }

        measureSliderHeight()
        measureSlidesHeight()
        // setFilterFiles(() => filterFiles)

        window.addEventListener("resize", measureSliderHeight)
        window.addEventListener("resize", measureSlidesHeight)

        return () => {
            window.removeEventListener("resize", measureSliderHeight)
            window.removeEventListener("resize", measureSlidesHeight)
        }
    }, [])

    let top = -((slidesWidth - containerWidth) - 10)

    let formattedPaths = []
     for (const path of paths) {
        formattedPaths.push(
            <li key={`path-${path.id}`} className="center-inside">
                <Button className="center-inside">
                    <text>{path.title}</text>
                </Button>
            </li>
        )

        formattedPaths.push(
            <li key={`sep-${path.id}`} className="center-inside">
                <text className="next-symbol">></text>
            </li>
        )
    }
    formattedPaths.splice(-1, 1)
    paths = formattedPaths

    return (
        <div ref={containerRef} className="path-container">
            <motion.ul
                ref={slidesRef}
                drag="x"
                dragConstraints={{
                    top: top > 0 ? 0 : top,
                    bottom: 0
                }}
                dragElastic={0.5}
                dragTransition={{bounceDamping: 100}}
                className="center-inside"
            >
                {formattedPaths}
            </motion.ul>
        </div>
    )
}

export default Files;