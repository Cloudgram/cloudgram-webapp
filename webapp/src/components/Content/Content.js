import "./Content.css";

import Files from './Files';
import ActionsButtons from './ActionsButtons';
import EditMenu from "../EditMenu/EditMenu";
import React, {useEffect, useState} from "react";


function Content({ toggleEditMenuState, toggleTopBgColor, editMenuOpacity, editMenuPointerEvents }) {
    const [contentContainerHeight, setContentContainerHeight] = useState("80%")

    useEffect(() => {
        if (window.innerHeight <= 650) {
            setContentContainerHeight("75%");
        }
    }, [])

    return(
        <div
            className="content-container"
            style={{height: contentContainerHeight}}
        >
            <EditMenu
                editMenuOpacity={editMenuOpacity}
                editMenuPointerEvents={editMenuPointerEvents}
                toggleEditMenuState={toggleEditMenuState}
                toggleTopBgColor={toggleTopBgColor}
            />
            <ActionsButtons/>
            <Files
                toggleEditMenuState={toggleEditMenuState}
                toggleBgColor={toggleTopBgColor}
            />
        </div>
    )
}

export default Content;