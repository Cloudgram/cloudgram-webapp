import "./ActionButtons.css";
import searchImage from '../../images/NavigationBar/search.svg';
import createImage from '../../images/NavigationBar/plus.svg';
import {useRef} from "react";
import Button from "../UI/Button";
import Image from "../UI/Image";


function ActionsButtons({filterFiles}) {
    const searchButton = useRef(null)
    const createButton = useRef(null)
    const searchInput = useRef(null)

    const toggleButton = () => {
        setTimeout(() => {
            if (searchButton.current.classList.contains('invisible')) {
                createButton.current.classList.add('invisible')
                searchButton.current.classList.remove('invisible')
            } else {
                createButton.current.classList.remove('invisible')
                searchButton.current.classList.add('invisible')
            }
        }, 10)
    }

    const createElement = () => {
        console.log('createElement')
    }

    const searchElement = () => {
        const searchValue = searchInput.current.value
        filterFiles(searchValue)

        searchInput.current.value = ''
    }

    return (
        <div className="buttons-container">
            <input
                type="text"
                placeholder="Поиск"
                className="button"
                ref={searchInput}
                onFocus={() => toggleButton()}
                onBlur={() => toggleButton()}
            />
            <Button
                className="button-card center-inside"
                ref={createButton}
                onClick={createElement}
            >
                <Image img={createImage}/>
            </Button>
            <Button
                className="button-card invisible"
                ref={searchButton}
                onClick={searchElement}
            >
                <Image img={searchImage}/>
            </Button>
        </div>
    )
}

export default ActionsButtons;