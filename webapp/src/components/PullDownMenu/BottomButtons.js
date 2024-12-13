import "./BottomButtons.css";


function BottomButtons(props) {
    return(
        <div className="pull-down-menu-buttons">
            <button onClick={props.clickButtonAnimation}>
                Пригласить друзей
            </button>
            <button onClick={props.clickButtonAnimation}>
                Предложить идею
            </button>
            <div className="row-pull-down-menu-buttons">
                <button onClick={props.clickButtonAnimation}>
                    Спасибо
                </button>
                <button onClick={props.clickButtonAnimation}>
                    О нас
                </button>
            </div>
        </div>
    )
}

export default BottomButtons;