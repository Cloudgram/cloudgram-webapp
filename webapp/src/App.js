import "./App.css"

import {useState} from "react";

import NavigationBar from './components/NavigationBar/NavigationBar';
import Content from "./components/Content/Content";
import PullDownMenu from "./components/PullDownMenu/PullDownMenu";


function App() {
    const [bgOpacity, setBgOpacity] = useState(0)
    const [bgPointEvents, setBgPointEvents] = useState('none')

    const [topBgOpacity, setTopBgOpacity] = useState(0)
    const [topBgPointEvents, setTopBgPointEvents] = useState('none')

    const [editMenuOpacity, setEditMenuOpacity] = useState(0)
    const [editMenuPointerEvents, setEditMenuPointerEvents] = useState('none')

    const toggleTopBgColor = () => {
        const newTopBgOpacity = topBgOpacity === 1 ? 0 : 1
        setTopBgOpacity(newTopBgOpacity)
        setTopBgPointEvents(newTopBgOpacity === 0 ? 'none' : 'auto');
    }

    const toggleBgColor = () => {
        const newBgOpacity = bgOpacity === 1 ? 0 : 1
        setBgOpacity(newBgOpacity)
        setBgPointEvents(newBgOpacity === 0 ? 'none' : 'auto');
    }

    const toggleEditMenuState = () => {
        setEditMenuOpacity(editMenuOpacity === 0 ? 1 : 0)
        setEditMenuPointerEvents(editMenuPointerEvents === 'none' ? 'auto' : 'none')
    }

    return (
        <div id={'root-div'}>
            <div
                style={{
                    opacity: topBgOpacity,
                    pointerEvents: topBgPointEvents
                }}
                className="bg-color-container top"
                onClick={() => {toggleTopBgColor(); toggleEditMenuState();}}
            />
            <div
                style={{
                    opacity: bgOpacity,
                    pointerEvents: bgPointEvents
                }}
                className="bg-color-container"
            />
            <PullDownMenu
                toggleBgColor={toggleBgColor}
            />
            <Content
                toggleEditMenuState={toggleEditMenuState}
                toggleTopBgColor={toggleTopBgColor}
                editMenuPointerEvents={editMenuPointerEvents}
                editMenuOpacity={editMenuOpacity}
            />
            <NavigationBar/>
        </div>
    );
}

export default App;
