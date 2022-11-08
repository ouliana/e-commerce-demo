import { useState, useEffect} from 'react'
import { ItemInCart } from './ItemInCart'

function Cart(props) {
    const {
        order = [],
        handleCartShow = Function.prototype,
        removeFromCart = Function.prototype,  
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    const updateSubtotal = () => {
        return order.reduce((sum, item) => {
            return sum += item.price * item.quantity
        }, 0)
    }

    const updateNumber = () => {
        return order.reduce((sum, item) => {
            return sum += item.quantity
        }, 0)
    }

    const [subtotal, setSubtotal] = useState(updateSubtotal());
    const [numberOfItems, setnumberOfItems] = useState(updateSubtotal());
    const msg = order.length === 1 ? 'item' : 'items';

    useEffect(() => {
        setSubtotal(updateSubtotal());
        setnumberOfItems(updateNumber());
        // eslint-disable-next-line
    }, [order]);

    

    return <div className="cart-container z-depth-3">
    <div className="cart-header">
            <span className="header-item"><i className="material-icons title-icon">shopping_cart</i></span>
            {
                    order.length ? (<span className="header-item">{numberOfItems} {msg}</span>) : ''
            }
            <span className="header-item right close-button" onClick={handleCartShow}><i className="material-icons">close</i></span>
            {
                order.length ? (
                    <><span className="header-item right">V-bucks</span>
                    <span className="header-item subtotal right">{subtotal}</span></>
                    ) : ''
            }
            
    </div>
    <div className="cart-content">
        <ul className="collection">
            {
                order.length ? order.map(item => (
                    <ItemInCart
                        key={item.id}
                        {...item}
                        incQuantity={incQuantity}
                        decQuantity={decQuantity}
                        removeFromCart={removeFromCart}
                    />
                )) : (
                    <li className="collection-item ">
                       <span className="title">Your cart is empty</span>
                    </li>
                )
            }
        </ul>
        </div>
        <div className='checkOut'>
            <button className='btn'>Proceed to checkout</button>
        </div>
    </div>
}

export { Cart }