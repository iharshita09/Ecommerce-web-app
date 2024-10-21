const express = require("express");
// Express: Used to create the server and handle routing.
const app = express();
const mongoose = require("mongoose");
// Mongoose: Used for MongoDB interaction, which helps in managing schemas and interacting with the database.
const jwt = require("jsonwebtoken");
// JWT (jsonwebtoken): Used for user authentication by creating and verifying tokens.

const multer = require("multer");
// Multer: Middleware for handling image uploads (specifically for handling multipart/form-data).
const path = require("path");
// Path: Provides utilities for working with file and directory paths.
const cors = require("cors");
// CORS: Middleware to enable cross-origin resource sharing, allowing the server to handle requests from different domains.
const port = process.env.PORT || 4000;

app.use(express.json());
// This middleware parses incoming JSON requests.
app.use(cors());
// : This allows the server to handle requests from different origins, essential for front-end and back-end communication.

// Database Connection With MongoDB
mongoose.connect (`mongodb+srv://harshitachouhanhm:qBTtXJiM04ntBJdK@clusterhm.1xvhyc4.mongodb.net/`)

// paste your mongoDB Connection string above with password
// password should not contain '@' special character


// DB_USERNAME=user
// DB_PASSWORD=qBTtXJiM04ntBJdK

//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
// Multer Disk Storage: The diskStorage function sets the destination folder to store uploaded images (./upload/images), and the filename is generated dynamically using the original file's extension and a timestamp.

// ----------------------------------------
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})
// Upload Route: app.post("/upload", upload.single('product'), ...) defines a POST endpoint that handles single image uploads. After successful upload, the server responds with the image URL.
// -----------------------------

// Route for Images folder
app.use('/images', express.static('upload/images'));

// app.use('/images', express.static('upload/images'));: This serves the uploaded images as static files so they can be accessed through URLs like /images/filename.
// -----------------------------


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
// The fetchuser middleware checks for a valid JWT token in the request header.
// If a valid token is found and verified, the user’s information is attached to the request, and the request proceeds.
// If no token or an invalid token is provided, the request is denied, and the user is asked to authenticate.
// ----------------------------------


// Schema for creating user model
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});
// The Users model defines the schema for storing user information in the MongoDB database. It includes fields for the user's name, email, password, cart data, and a default date for user creation.
// ---------------------------------------


// Schema for creating Product
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});
// The Product model defines the schema for storing product data. Each product includes an id, name, description, image, category, prices (new_price and old_price), availability status, and creation date.
// ----------------------------------------/

// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});
// Root API
// app.get("/"): A simple route for checking the API’s root by returning "Root" as a response.


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token });
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
})
// Login Endpoint (/login):

// Accepts an email and password.
// Verifies if the user exists and if the password matches. If successful, it generates and returns a JWT token.
// If the user credentials are incorrect, it returns an error.


//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token })
})

// Signup Endpoint (/signup):

// Accepts a username, email, and password to create a new user.
// Checks if the email is already in use. If not, it creates a new user with an empty cart and issues a JWT token.


// endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products");
  res.send(products);
});
// Get All Products (/allproducts):
// Retrieves all products from the database and sends them as a response


// endpoint for getting latest products data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0).slice(-8);
  console.log("New Collections");
  res.send(arr);
});
// Get New Collections (/newcollections):
// Retrieves the latest 8 products from the database (by slicing the last 8 entries) and sends them as a response.


// endpoint for getting womens products data
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  console.log("Popular In Women");
  res.send(arr);
});
// Get Popular Women Products (/popularinwomen):

// Retrieves the first 4 products in the "women" category from the database

// endpoint for getting womens products data
app.post("/relatedproducts", async (req, res) => {
  console.log("Related Products");
  const {category} = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);
  res.send(arr);
});
// Takes a category from the request body and returns the first 4 products that match that category.


// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})
// Protected by the fetchuser middleware to ensure the user is authenticated.
// Adds a product to the user's cart by increasing the quantity of that product (itemId) by 1.


// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})
// Similar to adding to cart, but it decreases the quantity of a product in the user's cart.


// Create an endpoint for getting cartdata of user
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})
// Returns the cart data of the authenticated user.


// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name })
});
// Adds a new product to the database. The id for the product is auto-incremented based on the last product’s ID.


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});
// Deletes a product from the database using its id.

// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});