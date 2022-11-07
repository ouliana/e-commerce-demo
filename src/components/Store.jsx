import { useState, useEffect } from 'react'
import { API_KEY, API_URL } from '../config'
import { Preloader } from './Preloader'
import { Articles } from './Articles'
import { CartWindowToggler } from './CartWindowToggler'
import { Cart } from './Cart'

function Store() {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCartShow, setIsCartShow] = useState(false);

    const updateItem = (id, newQuantity) => {
        const itemIndex = items.findIndex(item => item.mainId === id);
        return items.map((item, index) => (
            (index === itemIndex) ? {...item, quantity: newQuantity} : item
        ))
    }

    const addToCart = (itemId) => {
        const itemToAdd = items.filter(item => item.mainId === itemId)[0];
        setOrder([...order, {
            id: itemToAdd.mainId,
            name: itemToAdd.displayName,
            image: itemToAdd.displayAssets[0].background,
            price: itemToAdd.price.regularPrice,
            quantity: 1
        }]);
       setItems(updateItem(itemId, 1));
    }

    const incQuantity = (itemId) => {
        const isInCart = order.filter(item => item.id === itemId).length;
        if (isInCart) {
            const newOrder = order.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                    }
                } else {
                    return item;
                }
            });
            setOrder(newOrder);
           } else {
           addToCart(itemId);
       }
    }
    
    const decQuantity = (itemId) => {
        let newQuantity = 0;
        const newOrder = order.map(item => {
            if (item.id === itemId) {
                newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            } else {
                return item;
            }
        });
        
        newQuantity ? setOrder(newOrder) : removeFromCart(itemId)
        setItems(updateItem(itemId, newQuantity));
    }

    const removeFromCart = (itemId) => {
        const newOrder = order.filter(item => item.id !== itemId);
        setOrder(newOrder);
        setItems(updateItem(itemId, 0));
    }
    
    const handleCartShow = () => {
        setIsCartShow(!isCartShow);
    }

    useEffect(function getItems() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(response => response.json()).then(data => {
            data.shop && setItems(data.shop.map((item) => ({...item, quantity:0})));
            setLoading(false);
        })
    }, []);

    return (
        <main className="container content">
            <CartWindowToggler itemsInCart={order.length} handleCartShow={handleCartShow} />
            {loading ? (
                <Preloader />
            ) : (
                    <Articles items={items} incQuantity={incQuantity} decQuantity={decQuantity}/>
            )}
            {
                isCartShow &&
                <Cart order={order}
                    handleCartShow={handleCartShow}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                    removeFromCart={removeFromCart}
                />
            }
        </main>
    )
}

export default Store;