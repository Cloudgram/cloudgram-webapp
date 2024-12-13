import "./EditMenu.css";


function EditMenu({ editMenuPointerEvents, editMenuOpacity, toggleEditMenuState, toggleTopBgColor}) {
    return(
        <div
            className="edit-menu-container"
            style={{
                pointerEvents: editMenuPointerEvents,
                opacity: editMenuOpacity
            }}
        >
            <button className="edit-menu-button favorite">
                <div/>
                <text>В Избранно</text>
            </button>
            <button className="edit-menu-button share">
                <div/>
                <text>Поделиться</text>
            </button>
            <button className="edit-menu-button private">
                <div/>
                <text>В Приватное</text>
            </button>
            <button className="edit-menu-button move">
                <div/>
                <text>Перемесить</text>
            </button>
            <button className="edit-menu-button copy">
                <div/>
                <text>Копировать</text>
            </button>
            <button
                className="edit-menu-button exit"
                onClick={() => {toggleTopBgColor(); toggleEditMenuState()}}
            >
                <div/>
                <text>Закрыть</text>
            </button>
        </div>
    )
}

export default EditMenu;