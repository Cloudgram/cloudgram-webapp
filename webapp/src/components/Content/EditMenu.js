import "./EditMenu.css";
import {useEffect, useRef} from "react";
import Image from "../UI/Image";
import Button from "../UI/Button";

import copyImage from "../../images/EditMenu/copy.svg";
import moveImage from "../../images/EditMenu/move.svg";
import privateImage from "../../images/EditMenu/private.svg";
import shareImage from "../../images/EditMenu/share.svg";
import favoriteImage from "../../images/EditMenu/favorite.svg";
import exitImage from "../../images/EditMenu/exit.svg";


function EditMenu({toggleBgColor, setToggleEditMenuVisible}) {
    const containerRef = useRef(null)

    const toggleVisible = () => {
        if (containerRef.current.classList.contains('invisible')) {
            containerRef.current.classList.remove('invisible')
        } else {
            containerRef.current.classList.add('invisible')
        }
    }

    useEffect(() => {
        setToggleEditMenuVisible(() => toggleVisible)
    }, [setToggleEditMenuVisible])

    return (
        <div
            className="edit-menu-container center-inside invisible"
            ref={containerRef}
        >
            <Button className="center-inside">
                <Image img={favoriteImage}/>
                <text>В Избранно</text>
            </Button>
            <Button className="center-inside">
                <Image img={shareImage}/>
                <text>Поделиться</text>
            </Button>
            <Button className="center-inside">
                <Image img={privateImage}/>
                <text>В Приватное</text>
            </Button>
            <Button className="center-inside">
                <Image img={moveImage}/>
                <text>Перемесить</text>
            </Button>
            <Button className="center-inside">
                <Image img={copyImage}/>
                <text>Копировать</text>
            </Button>
            <Button
                className="center-inside exit"
                onClick={() => {
                    toggleBgColor()
                    toggleVisible()
                }}
            >
                <Image img={exitImage}/>
                <text>Закрыть</text>
            </Button>
        </div>
    )
}

export default EditMenu;