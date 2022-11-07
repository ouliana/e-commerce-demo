import { useState } from 'react'

function Counter(props) {
    const {
        id,
        quantity,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;
    
    const [count, setCount] = useState(quantity);

    const increment = () => {
        incQuantity(id);
        setCount(() => (count + 1));
     }

    const decrement = () => {
        if (count) {
            decQuantity(id);
            setCount(count - 1);
        }
    }
    
    return <span className='counter'>
        <i className="material-icons" onClick={decrement}>remove</i> 
        <span>{count}</span>
        <i className="material-icons" onClick={increment}>add</i> 
    </span>
}

export {Counter}