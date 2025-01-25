import "./NavigationBar.css";
import Button from "../UI/Button";
import Image from "../UI/Image";
import React, {useState} from "react";
import favoritesImg from "../../images/NavigationBar/favorites.svg";
import filledHomeImg from "../../images/NavigationBar/filledHome.svg";
import homeImg from "../../images/NavigationBar/home.svg";
import filledFavoritesImg from "../../images/NavigationBar/filledFavorite.svg";
import profileImgMask from "../../images/NavigationBar/profileMask.svg";
import sharedImgMask from "../../images/NavigationBar/sharedMask.svg";
import filledProfileMask from "../../images/NavigationBar/filledProfileMask.svg";
import filledSharedMask from "../../images/NavigationBar/filledSharedMask.svg";

import profileImgBase from '../../images/NavigationBar/profile.svg';
import sharedImgBase from '../../images/NavigationBar/shared.svg';
import filledProfileBase from '../../images/NavigationBar/filledProfile.svg';
import filledSharedBase from '../../images/NavigationBar/filledShared.svg';

let clickedButtons = []
let profileImg = profileImgBase
let sharedImg = sharedImgBase
let filledProfileImg = filledProfileBase
let filledSharedImg = filledSharedBase


function NavigationBar() {
    const [profile, setProfile] = useState(profileImg)
    const [favorites, setFavorites] = useState(favoritesImg)
    const [shared, setShared] = useState(sharedImg)
    const [home, setHome] = useState(filledHomeImg)

    const setUnfilledImages = () => {
        setProfile(profileImg)
        setFavorites(favoritesImg)
        setShared(sharedImg)
        setHome(homeImg)
    }

    const clickProfile = () => {
        setProfile(filledProfileImg)
        clickedButtons.unshift(0)
    }

    const clickFavorites = () => {
        setFavorites(filledFavoritesImg)
        clickedButtons.unshift(1)
    }

    const clickShared = () => {
        setShared(filledSharedImg)
        clickedButtons.unshift(2)
    }

    const clickHome = () => {
        setHome(filledHomeImg)
        clickedButtons.unshift(3)
    }

    if (clickedButtons.length === 4) {
        console.log('clickedButtons', clickedButtons)
        if (
            clickedButtons[0] === 0 && clickedButtons[1] === 2 &&
            clickedButtons[2] === 0 && clickedButtons[3] === 2
        ) {
            console.log('Сработало')
            profileImg = profileImgMask
            sharedImg = sharedImgMask
            filledProfileImg = filledProfileMask
            filledSharedImg = filledSharedMask

            setProfile(filledProfileMask)
            setShared(sharedImgMask)
        }

        clickedButtons = []
    }

    return(
        <div className="navigation-bar-container center-inside">
            <Button className="center-inside" onClick={() => {setUnfilledImages(); clickProfile()}}>
                <Image img={profile}/>
                <text>Профиль</text>
            </Button>

            <Button className="center-inside" onClick={() => {setUnfilledImages(); clickFavorites()}}>
                <Image img={favorites}/>
                <text>Избранное</text>
            </Button>

            <Button className="center-inside" onClick={() => {setUnfilledImages(); clickShared()}}>
                <Image img={shared}/>
                <text>Общее</text>
            </Button>

            <Button className="center-inside" onClick={() => {setUnfilledImages(); clickHome()}}>
                <Image img={home}/>
                <text>Главная</text>
            </Button>
        </div>
    )
}

export default NavigationBar;