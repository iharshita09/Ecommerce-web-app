import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { backend_url, currency } from '../../App'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={backend_url+props.image} alt="products" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{currency}{props.new_price}</div>
        <div className="item-price-old">{currency}{props.old_price}</div>
      </div>
    </div>
  )
}

export default Item



// The Item component in React is used to display individual products in a list. This is often used in an e-commerce context where each item would represent a product with its name, image, and price details, and clicking on the item takes the user to the product's detail page.
// Props: The component receives product details via props, making it reusable for different items by simply passing in different data.
// Dynamic Routing: The Link component from react-router-dom enables navigation to a dynamic route based on the product's ID (/product/${props.id}).
// Currency Formatting: Both prices (new and old) are displayed with the appropriate currency symbol, using the currency constant.
// Separation of Concerns: Styling is handled in an external CSS file (Item.css), keeping the component focused on structure and behavior.