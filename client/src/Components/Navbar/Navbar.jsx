import React, { useContext, useRef, useState } from 'react'
// React, useContext, useRef, useState: These hooks from React are used for managing component state (useState), referencing DOM elements (useRef), and accessing context data (useContext).
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
// ShopContext: Context providing global state and functions related to shopping (like the total number of items in the cart).
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

  let [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  // State: menu: The menu state holds the currently selected menu option (e.g., "shop", "mens", "womens", or "kids"). This state is updated when a different menu item is clicked, and it controls the rendering of the underline (<hr />) beneath the active menu item.

  const menuRef = useRef();
  // Ref: menuRef: A ref is used to reference the menu DOM element, allowing you to manipulate its visibility (toggle the menu dropdown).

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  // It toggles the nav-menu-visible class on the menuRef (the navigation menu), which likely controls the visibility of the dropdown menu.

  return (
    <div className='nav'>
      <Link to='/' onClick={()=>{setMenu("shop")}} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>TrendWaves Co.</p>
      </Link>
      {/* The logo and brand name are wrapped in a Link component to navigate back to the home page (/) when clicked.
setMenu("shop"): Clicking the logo also resets the menu state to "shop", ensuring that the "Shop" menu item is active. */}
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      {/* This is the main navigation menu, wrapped in an unordered list (<ul>), where each item (<li>) represents a different section of the site.
Each list item is wrapped in a Link to navigate to the respective routes (/, /mens, /womens, /kids).
When a menu item is clicked, the setMenu function updates the menu state to indicate the active section. If the current menu value matches the item, an <hr /> is displayed below the text to visually highlight the active section. */}
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="cart"/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
// Authentication Check: The component checks if an auth-token is stored in localStorage to determine whether the user is logged in:
// If the user is logged in (i.e., auth-token exists), a Logout button is shown, and clicking it removes the token and refreshes the page.
// If the user is not logged in, a Login button is shown, which navigates to the /login page.

export default Navbar



