# Fullstack Comp 3006

### Target Audience
The application is designed for a broad audience, where anyone who wants to can buy or sell products. While selling products is available to everyone, it is specifically targeted towards individuals and small businesses who handle inventory that can change and be restocked frequently.

### Key Functionality
Key features of the application include:

***Registration and Login***

The application has user registration and login functionality using bcryptjs for password salting and hashing as well as JSON Web Tokens (JWT) for authentication. This is essential for an e-commerce application as sensitive data should only be accessed by an authenticated and authorised user.


***Adding Products***

Any user is able to add products to be sold on the store page by imputing details such as the products name, an image, the price and how much of the product is in stock.

***Product Preview***

When the user is adding a product, they are given a preview of how the product would look before finalising. This feature allows sellers to easily verify how the products details will appear to other users ensuring that the user has everything exactly as desired, making the application friendlier and easier to use.
 


***Stock Management***

The user can update the stock levels of the products they are selling as needed. This can be critical for business or individuals which sell products limited in stock such as handmade items.

***Product Management***

Users can easily see the products they are selling and are able to delete products they no longer wish to sell.

***Cart Storage***

Users can add products to their cart no matter their stock availability. These products are stored within local storage so that they are persistent across sessions. This allows users to select the items they wish to buy by adding it to the cart and buy them at any time in the future. The user can at any time remove an item from the cart that they no longer wish to buy.
 
***Buying System***

From the cart page users can see the total cost of all available items inside their cart and buy them. Any item successfully bought will be removed from the cart, however in the case that the user has an out-of-stock item inside the cart it will not be bought but instead will remain inside the cart for purchase at a later date. This ensures that items can only be bought if stock is available while also allowing users to keep items they want to buy for later when they are restocked.
 
***Cart Display***

A total count of how many items is inside of the cart at any time is shown to the user next to the cart page link, making it easier for users to keep track of how much they are purchasing.
  
***Real-Time Updates***

The application utilises Web Sockets to enable real time updates on stock levels and product removal. This is to prevent users from attempting to purchase items which no longer have stock or no longer exist, ensuring that the shopping experience is easier.


### System Architecture

The system architecture consists of three parts, the frontend, backend and the database.
-	Frontend: The frontend server consists of a React application allowing for real time updates, for the user, using reacts state management.
-	Backend: A Node.js server manages communication logic between the database and the client/frontend. APIs are routed using Express.js with middleware to authenticate requests and Cross-Origin Resource Sharing (CORS) policies are configured to enable secure communication between the frontend and backend, for both the APIs and web sockets.
-	Database: MongoDB is the database used to store the user’s login details and products.

### Setup Instructions

Navigate to the Fullstack folder inside the Project Directory.

Execute the up.sh script:
```bash
. up.sh
```

Once setup the website should be available at http://localhost:81. Accessible on port 81.


### Video Link
[![Demo](https://i3.ytimg.com/vi/D0VSEjfihhk/maxresdefault.jpg)](https://youtu.be/D0VSEjfihhk)
