import {Article} from './Article'

function Articles(props) {
    const {
        items = [],
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    if (!items.length) {
        return <h3>Nothing was found</h3>
    }

    return <div className="items">
        {
            items.map(item => (
                item.mainId && <Article key={item.mainId} {...item} incQuantity={incQuantity} decQuantity={decQuantity}/>
            ))
        }
    </div>    
}

export { Articles }