function CartWindowToggler(props) {
    const { itemsInCart = 0, handleCartShow = Function.prototype } = props;

    return (
        <div
            className='cart z-depth-1 text-center'
            onClick={handleCartShow}
        >
            <i className='material-icons'>shopping_cart</i>
            {itemsInCart ? (
                <span className='cart-ammount'>{itemsInCart}</span>
            ) : null}
        </div>
    );
}

export { CartWindowToggler };
