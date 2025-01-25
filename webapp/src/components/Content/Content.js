import "./Content.css";

import Files from './Files';
import ActionsButtons from './ActionsButtons';
import EditMenu from "./EditMenu";
import Path from "../Content/Path";
import React, {useEffect, useState} from "react";


function Content({ toggleBgColor }) {
    const [toggleEditMenuVisible, setToggleEditMenuVisible] = useState(null)
    const [filterFiles, setFilterFiles] = useState(null)

    return(
        <div className="content-container">
            <EditMenu
                toggleBgColor={toggleBgColor}
                setToggleEditMenuVisible={setToggleEditMenuVisible}
            />
            <Path/>
            <Files
                toggleEditMenuVisible={toggleEditMenuVisible}
                toggleBgColor={toggleBgColor}
                setFilterFiles={setFilterFiles}
            />
            <ActionsButtons
                filterFiles={filterFiles}
            />
        </div>
    )
}

export default Content;