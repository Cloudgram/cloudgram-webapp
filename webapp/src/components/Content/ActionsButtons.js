import "./ActionButtons.css";


function ActionsButtons() {
    return(
        <div className="buttons-container">
            <input type="text" placeholder="Поиск" className="button"/>
            <button className="button">
                <text>+</text>
            </button>
        </div>
    )
}

export default ActionsButtons;