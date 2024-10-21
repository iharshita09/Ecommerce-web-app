import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))

    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => { setCartItems(data) });
    }
  }, [])

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalItem += itemInfo ? cartItems[item] : 0 ;
        } catch (error) {}
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
    }
  };

  const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;




// import React, { createContext, useEffect, useState } from "react";
// // React and Hooks: React and hooks like createContext, useEffect, and useState are imported for creating context and managing state and side effects.

// import { backend_url } from "../App";
// // Backend URL: The URL for the backend server is imported, which will be used for API requests.

// export const ShopContext = createContext(null);
// // Creating Context: A new context named ShopContext is created to share state and functions related to the shopping cart and products.

// const ShopContextProvider = (props) => {
//   // Provider Definition: This is a functional component that acts as a provider for the ShopContext, allowing its child components to access the context.

//   const [products, setProducts] = useState([]);
// //   Products State: Initializes products as an empty array to hold the product data fetched from the backend.
// // javascript

//   const getDefaultCart = () => {
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//       cart[i] = 0;
//     }
//     return cart;
//   };
//   // Default Cart Function: A function that initializes a cart object with 300 items, each set to a quantity of 0. This is useful for managing a predefined number of products.

//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   // Cart Items State: Initializes cartItems using the getDefaultCart function, creating a cart where all items have an initial quantity of 0.

//   useEffect(() => {
//     // Fetch all products from the backend
//     fetch(`${backend_url}/allproducts`)
//       .then((res) => res.json()) // Parse the response as JSON
//       .then((data) => setProducts(data)); // Update the products state with the fetched data
//       // Fetch Products: On component mount, it fetches all products from the backend and updates the products state with the fetched data.

//       if (localStorage.getItem("auth-token")) {
//         // Fetch cart data for the authenticated user
//         fetch(`${backend_url}/getcart`, {
//           method: 'POST', // Use POST method
//           headers: {
//             Accept: 'application/form-data',
//             'auth-token': `${localStorage.getItem("auth-token")}`, // Include the auth token in headers
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(), // Send an empty body
//         })
//           .then((resp) => resp.json()) // Parse the response as JSON
//           .then((data) => { setCartItems(data); }); // Update the cartItems state with the fetched data
//       }
//     }, []); 
//   // Fetch Cart Data: If an authentication token is found in local storage, it fetches the user's cart from the backend and updates the cartItems state with the data.

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         try {
//           let itemInfo = products.find((product) => product.id === Number(item));
//           totalAmount += cartItems[item] * itemInfo.new_price;
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };
//   // Calculate Total Amount: This function calculates the total amount of all items in the cart by iterating over cartItems, checking their quantities, and multiplying by their prices. It uses the products array to find the corresponding product information.

//   // Calculate Total Cart Items: Similar to the previous function, this one calculates the total number of items in the cart by iterating through cartItems and summing the quantities.

//   const addToCart = (itemId) => {
//     if (!localStorage.getItem("auth-token")) {
//       alert("Please Login");
//       return;
//     }
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     if (localStorage.getItem("auth-token")) {
//       fetch(`${backend_url}/addtocart`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem("auth-token")}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "itemId": itemId }),
//       })
//     }
//   };
//   // Add Item to Cart: This function adds an item to the cart. It checks if the user is logged in, updates the cart in the state, and sends a request to the server to update the cart in the database.

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (localStorage.getItem("auth-token")) {
//       fetch(`${backend_url}/removefromcart`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem("auth-token")}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "itemId": itemId }),
//       })
//     }
//   };
//   // Remove Item from Cart: This function removes an item from the cart by decrementing its count in the state and updating the server if the user is authenticated.

//   const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
//   // Context Value Object: This object holds all the states and functions that will be shared with components consuming the context.
//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };
// // Context Provider: The ShopContext.Provider component is used to pass down the context value to any child components wrapped in ShopContextProvider, allowing them to access the state and functions.

// export default ShopContextProvider;
