# Tasks

## Products

1. ~~Add product ⁉ - Data won't pass from frontend to backend. But works fine with postman~~
2. ~~Fetch products~~

## Customers

1. ~~Add customer~~
2. ~~Fetch customers~~

## Orders

1. Insert data to orders
2. When inserting to `orders` table:
   i. Check the availability of the customer in `customers` table
   ii. Update products table
   iii. Insert the data to `order information table`
3. Display the orders with a `delete` `update` and a `checkout` button

## Finishing the process

1. Once `checkout` clicked:
   i. Customer associated with the order ➡️ `delete`
   ii. Product details ➡️ `update`
   iii. Generate the return date. if possible use PL/SQL to get the rent duration.
   iv. Remove the order info from `orders` and `order information` tables
   v. Insert the data to `history` table
