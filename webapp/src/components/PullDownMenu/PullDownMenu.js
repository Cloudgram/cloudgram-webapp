import "./PullDownMenu.css";

import React, {useRef, useState, useEffect} from "react";
import {motion} from "framer-motion";

import PullDownMenuTop from "./Top"
import PullDownMenuBottom from "./Bottom"


function PullDownMenu({ toggleBgColor }) {
    const containerRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isButtonClick, setIsButtonClick] = useState(false)

    const oneVh = window.innerHeight / 100;
    const [toggleMenuDistance, setToggleMenuDistance] = useState((oneVh * 32) - (oneVh * 1))
    const [ButtonClickDistance, setButtonClickDistance] = useState((oneVh * 130) - (oneVh * 1))


    useEffect(() => {
        if (window.innerHeight <= 650) {
            setToggleMenuDistance((oneVh * 34) - (oneVh * 1))
            setButtonClickDistance((oneVh * 132) - (oneVh * 1))
        }
    }, [])

    const toggleMenuComeback = () => {
        setIsButtonClick(false);
    }

     const clickButtonAnimation = () => {
        setIsButtonClick(true);
     }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        toggleBgColor()
    }

    return (
        <div className="pull-down-menu-zone-container center-inside">
            <motion.div
                ref={containerRef}
                initial={{y: 0}}
                animate={
                    isOpen ? (isButtonClick ? {y: ButtonClickDistance} : {y: toggleMenuDistance}) : {y: 0}
                }
                transition={{type: 'spring', stiffness: 40}}
                className="pull-down-menu-container"
            >
                <PullDownMenuTop
                    toggleMenuComeback={toggleMenuComeback}
                />

                <PullDownMenuBottom
                    toggleMenu={toggleMenu}
                    clickButtonAnimation={clickButtonAnimation}
                />

            </motion.div>
        </div>
    )
}

export default PullDownMenu;