import { Counter } from './Counter'


function ItemInCart(props) {
    const {
        id,
        name,
        image,
        price,
        quantity,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
        removeFromCart = Function.prototype,
    } = props;

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    }

    return <li className="collection-item avatar">
                <img src={image} alt="" className="cart-content-item-image" />
        <span className="title">{name}</span>
                <p><span className="cart-content-item-price">{price} V-bucks</span> </p>
           
                
        <span className="secondary-content">
            <Counter
                id={id}
                quantity={quantity}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
            />
            <i className="material-icons delete-item" onClick={handleRemoveFromCart}>delete</i>
        </span>
            </li>
}

export {ItemInCart}