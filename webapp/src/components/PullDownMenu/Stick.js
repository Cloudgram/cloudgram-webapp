import "./Stick.css";


function Stick(props) {
    const classes = 'stick ' + props.className
    return(
        <div
            className={classes}
            onClick={props.onClick}
        />
    )
}

export default Stick;