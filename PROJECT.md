# E-Commerce platform project

## Description

The project will be split into a few backend services:

1. E-Commerce Platform
2. Resources service that handles asset management for the E-Commerce platform users
3. API gateway that proxies requests to the E-Commerce Platform

## Resource service

This will be a simple API that will act like a store for user uploaded images, and also serve them.

## API gateway

The API gateway should handle external requests and route them to instances of the E-Commerce application based on the instance's load and also rate limit requests based on user's IP (for unauthenticated users).

The strategy for load balancing can be a simple round-robin implementation so keeping count of the load of the instances is not required.

In addition the API gateway should also route to the resource service in case a resource is requested by the E-Commerce website, it should also route in case a user would like to upload a new resource

## E-Commerce backend

As an E-Commerce backend we need to manage users, handle authentication and authorization on said users and allow a selection of features based on the users' role.

Users can be of three types:

- **buyers**: the primary users of the website, they can search for products based on the keywords they provide, they can buy products as long as they are in stock, they can also view user reviews and details of a product, users also have the ability to add items to their cart and checkout, they can also review products once retrieved and see their own order history, they can mark retrieved items for a return, buyers can also set products to favorite in case they would like to purchase them later
- **sellers**: sellers have the ability to mark reviews as malicious on products they own, they can increase the stock of products and accept purchases, they can also create or remove products from their listing and update existing products
- **store admins**: can remove reviews from products, can remove products, can manage all users (remove buyers, create or remove sellers, update seller data)

Users should be secured using an authentication method such as [OAuth2](https://auth0.com/intro-to-iam/what-is-oauth-2) each user type should be a separate role which would allow for authorization of specific functions (ex. a user with buyer role should not be allowed to remove products but a seller should be able to)

Buyers should be able to create their own accounts, add an avatar and personal information, billing and shipping information and credit card information.

Products can have some generic data like a summary, description and price, they should belong to a category and have a number of ratings, they should display an average for all rating on their main page, in addition sellers have the capability to upload images for their product that can be displayed, products can also have offers which cut the price of it by a percentage, products can also have a recommended tag

Products should be searchable using a keyword, a buyer might also set filters such as "seller", "category", "price range" and whether the product is in stock or not and the products should be sortable by, "listing date", "price", "discount", "review count", and "popularity" (rating)

The main page should list our top products based on offer as well as recommended products

Products should be split into pages so we do not show too many.

Reviews for products follow [CSAT](https://delighted.com/what-is-customer-satisfaction-score) (the 5 star rating score system) and show an average for the rating

For buyers when they checkout they need to provide billing information and credit card information they will then receive a receipt via e-mail detailing the purchase details and billing information

Products can be either in stock or out of stock, this depends on the quantity of the items, when a purchase is made the quantity is reduced by one

Buyers should be able to create a support ticket to the seller based on the product it is for

Sellers can respond to said ticket and/or mark it as done or close it

The API needs to be fully documented and testable using [Swagger](https://swagger.io) as an alternative a demo can be made using a poc frontend

Business critical parts of the application need to be tested (10 tests, testing 2 services)

Keep in mind:

- Some of the requirements might or might not change in order to simulate an enterprise project
- Not everything needs to be done, it is more important to understand what you have implemented so far than to implement everything but no be able to present it

Bonus points (with levels E-easy, M-medium, H-hard):

- (E) Maintaining good code structure (layered architecture)
- (E) Creating a monorepo friendly tool-set (setting every tool on root, not repeating configs, creating CLI scripts that make use of NX etc.)
- (E) Managing multiple instances of the e-commerce backend (using docker or pm) and managing the API gateway and resource
- (E) Implementing full-text search when querying via keyword
- (M) Input validation, sanitization
- (M) Setting up a nice CI/CD that automatically runs tests, eslint and prettier on merge requests
- (H) Implementing payment for buyers using [Stripe](https://stripe.com/en-gb-ro)
- (H) Creation of a matching frontend proof of concept
