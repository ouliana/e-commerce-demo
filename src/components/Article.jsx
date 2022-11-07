import { Counter } from './Counter'
import M from "materialize-css";

function Article(props) {
    const {
        mainId,
        displayName,
        displayDescription,
        displayAssets,
        price,
        quantity,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    const handleOnClick = () => {
        incQuantity(mainId);
        M.toast({html: `${displayName} was added to your card`})
    }

    return (
        <div
            className='card'
            id={mainId}
        >
            <div className='card-image'>
                <img
                    src={displayAssets[0].background}
                    alt={displayName}
                />
            </div>
            <div className='card-content'>
                <span className='card-title'>{displayName}</span>
                <p>{displayDescription}</p>
            </div>
            <div className='card-action'>
                {
                    quantity ? (
                        <Counter
                            id={mainId}
                            quantity={quantity}
                            incQuantity={incQuantity}
                            decQuantity={decQuantity}
                        />
                    ) : (
                        <button
                           className='btn-small'
                           onClick={handleOnClick}
                        >
                           Buy
                       </button>    
                    )
                }
                
                <span className='right price'>
                    {price.regularPrice} V-bucks
                </span>
            </div>
        </div>
    );
}

export { Article };
