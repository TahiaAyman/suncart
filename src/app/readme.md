# SunCart - Summer Essentials Store
## Project Overview

SunCart is a simple online store where users can register, login, browse summer products, view product details, add products to cart, and manage their profile information.
The main theme of the website is summer products such as sunglasses, sunscreen, hats, shirts, water bottles, and beach accessories.

## Main Features
1. Authentication System

The website has a simple demo authentication system.

Users can:

Register with name, email, and password
Login using registered email and password
Login with Google demo button
Logout from the website
Access protected pages only after login

The authentication data is stored in browser localStorage for demo purposes.

2. Protected Routes

Some routes are protected. A user must login before accessing these pages:

Home page
Products page
Product details page
My Profile page
Update Profile page
Cart page

If a user is not logged in, they are redirected to the login page.

3. Navbar

The navbar includes:

SunCart logo
Home link
Products link
My Profile link
Cart button with item count
User avatar after login
Logout button after login
Login/Register buttons when logged out

4. Footer

The footer includes:

Website short description
Contact information
Quick links
Social links
Privacy policy link

5. Home Page

The home page includes:

Summer sale hero section
“Summer Sale 50% OFF” offer
“Hot Deals” section
Popular products section
Summer care tips section
Top brands section

The popular products and hot deals use product data from the JSON file.

6. Product Data

Product data is stored in a static JSON file.

File location:

src/app/data/products.json

Each product includes:

id
name
brand
price
rating
stock
description
image
category

The project contains at least 6 summer products.

7. Products Page

The products page displays all products from the JSON file.

Each product card shows:

Product image
Product category
Product brand
Product name
Rating
Price
Add button
Details button

The Details button takes the user to the product details page.

8. Product Details Page

The product details page shows full product information.

It includes:

Product image
Category
Brand
Product name
Rating
Stock
Price
Description
Add to Cart button

The Add to Cart button adds the selected product to the cart.

9. Cart System

The cart system is handled using localStorage.

Users can:

Add products to cart
See cart item count in the navbar
View selected products on the cart page
See total items
See total price
Remove individual products
Clear the full cart

When a product is removed, the total item count and total price update automatically.

10. My Profile Page

The My Profile page displays logged-in user information.

It shows:

User name
User email
User avatar
Update information button
11. Update Profile Feature

The update profile page allows the user to update profile information.

Users can update:

Name
Email
Avatar/Image URL
Password

After updating, the new email and password can be used for login.

12. Toast Notifications

The project uses toast notifications for user feedback.

Examples:

Registration successful
Login successful
Logout successful
Product added to cart
Item removed from cart
Profile updated successfully
Error messages
Technologies Used
Frontend
Next.js
React
JavaScript
Tailwind CSS
DaisyUI
Packages
lucide-react
react-hot-toast
lottie-react
better-auth
mongodb
Storage
Browser localStorage is used for demo authentication and cart data.
Language Used

## The project is built using:

JavaScript
JSX
HTML
CSS through Tailwind CSS
JSON