import "./Image.css"

function Image({ img, className = '', children, ...rest }) {
    const classes = 'div-image ' + className;
    return (
        <div className={classes} style={{backgroundImage: `url(${img})`}} {...rest}>
            {children}
        </div>
    );
}


export default Image;