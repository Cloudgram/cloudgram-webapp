import "./Bottom.css";

import React from "react";
import Stick from "./Stick";
import BottomButtons from "./BottomButtons";

function PullDownMenuBottom(props) {
    return (
        <div className="pull-down-menu-bottom-container">
            <BottomButtons
                clickButtonAnimation={props.clickButtonAnimation}
            />
            <div
                className="clouds"
                id="cloud-3"
            />
            <div
                className="clouds"
                id="cloud-2"
            />
            <div
                className="clouds"
                id="cloud-1"
            />
            <Stick
                onClick={props.toggleMenu}
                className="pull-down-menu-bottom-stick"
            />
        </div>
    )
}

export default PullDownMenuBottom;