import "./Buttons.css";

import profileImgBase from '../../images/NavigationBar/profile.svg';
import profileImgMask from '../../images/NavigationBar/profileMask.svg';
import favoritesImg from '../../images/NavigationBar/favorites.svg';
import sharedImgBase from '../../images/NavigationBar/shared.svg';
import sharedImgMask from '../../images/NavigationBar/sharedMask.svg';
import homeImg from '../../images/NavigationBar/home.svg';
import filledProfileBase from '../../images/NavigationBar/filledProfile.svg';
import filledProfileMask from '../../images/NavigationBar/filledProfileMask.svg';
import filledFavoritesImg from '../../images/NavigationBar/filledFavorite.svg';
import filledSharedBase from '../../images/NavigationBar/filledShared.svg';
import filledSharedMask from '../../images/NavigationBar/filledSharedMask.svg';
import filledHomeImg from '../../images/NavigationBar/filledHome.svg';

import React, {useState} from "react";

let clickedButtons = []
let profileImg = profileImgBase
let sharedImg = sharedImgBase
let filledProfileImg = filledProfileBase
let filledSharedImg = filledSharedBase

function Buttons() {
    const [profile, setProfile] = useState(profileImg)
    const [favorites, setFavorites] = useState(favoritesImg)
    const [shared, setShared] = useState(sharedImg)
    const [home, setHome] = useState(filledHomeImg)

    const setUnfillImages = () => {
        setProfile(profileImg)
        setFavorites(favoritesImg)
        setShared(sharedImg)
        setHome(homeImg)
    };

    const clickProfile = () => {
        setUnfillImages()
        setProfile(filledProfileImg)
        clickedButtons.unshift(0)
    };

    const clickFavorites = () => {
        setUnfillImages()
        setFavorites(filledFavoritesImg)
        clickedButtons.unshift(1)
    };

    const clickShared = () => {
        setUnfillImages()
        setShared(filledSharedImg)
        clickedButtons.unshift(2)
    };

    const clickHome = () => {
        setUnfillImages()
        setHome(filledHomeImg)
        clickedButtons.unshift(3)
    };

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
        <div className="menu-buttons">
            <button onClick={clickProfile}>
                <div style={{backgroundImage: `url(${profile})`}}/>
                <text>Профиль</text>
            </button>

            <button onClick={clickFavorites}>
                <div style={{backgroundImage: `url(${favorites})`}}/>
                <text>Избранное</text>
            </button>

            <button onClick={clickShared}>
                <div style={{backgroundImage: `url(${shared})`}}/>
                <text>Общее</text>
            </button>

            <button onClick={clickHome}>
                <div style={{backgroundImage: `url(${home})`}}/>
                <text>Главная</text>
            </button>
        </div>
    )
}

export default Buttons;