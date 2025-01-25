import "./App.css"

import {useRef, useState} from "react";

import NavigationBar from './components/NavigationBar/NavigationBar';
import Content from "./components/Content/Content";
import PullDownMenu from "./components/PullDownMenu/PullDownMenu";


function App() {
    const BgColorRef = useRef(null)

    const toggleBgColor = (layer = '2') => {
        if (BgColorRef.current.classList.contains('invisible')) {
            BgColorRef.current.style.zIndex = layer
            BgColorRef.current.classList.remove('invisible')
        } else {
            BgColorRef.current.classList.add('invisible')
        }
    }

    return (
        <div id='root-div'>
            <div
                className="bg-color-container invisible"
                ref={BgColorRef}
            />
            <PullDownMenu toggleBgColor={toggleBgColor}/>
            <Content toggleBgColor={() => {toggleBgColor('3')}}/>
            <NavigationBar/>
        </div>
    );
}

export default App;
