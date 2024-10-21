import React, { useContext } from "react";
// useContext: This React hook allows access to the values from ShopContext
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
// ShopContext: A context (likely defined in another file) providing state and functions related to the shop, such as products, cart items, and actions for modifying the cart.
import { backend_url, currency } from "../../App";
// backend_url and currency: Values imported from App.js to handle the backend API URL for product images and the currency symbol, respectively.

const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
//   products: List of products available in the store.
// cartItems: An object where the keys represent product IDs and the values represent the quantities of those products in the cart.
// removeFromCart: A function to remove an item from the cart.
// getTotalCartAmount: A function that returns the total amount for the items in the cart.

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={backend_url+e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>{currency}{e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>{currency}{e.new_price*cartItems[e.id]}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;



// This React component, CartItems, is designed to display the products that a user has added to their shopping cart, along with relevant details like product name, price, quantity, and total amount per product. Additionally, it shows the cart totals, including the subtotal and total amount, and provides the option to apply a promo code.

// Conditional Rendering: Products are only shown in the cart if their quantity in cartItems is greater than 0.
// Mapping through Products: The component iterates over the entire list of products, even if only a few are in the cart, using an if condition to determine whether to render each product.
// Event Handling: The removeFromCart function is called when a user clicks the remove icon.
