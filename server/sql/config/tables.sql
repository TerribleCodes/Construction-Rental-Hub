CREATE TABLE products (
    product_id VARCHAR2(20) PRIMARY KEY,
    name VARCHAR2(255),
    rent NUMBER,
    stock NUMBER
);

CREATE TABLE customers (
    customer_nic NUMBER PRIMARY KEY,
    name VARCHAR2(255),
    address VARCHAR2(255),
    phone NUMBER
);

CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    nic NUMBER,
    purchase_date DATE,
    FOREIGN KEY (nic) REFERENCES customers(customer_nic)
);

-- INSERT INTO orders (order_id, nic, purchase_date)
-- VALUES (1, 12345, TO_DATE('2023-10-30', 'YYYY-MM-DD'));
--
-- SELECT TO_CHAR(purchase_date, 'DD-MON-YYYY') AS formatted_date
-- FROM orders;

CREATE TABLE rented_items (
    order_id NUMBER,
    product_id VARCHAR2(20),
    stock NUMBER,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE history (
    order_id NUMBER,
    customer_nic NUMBER,
    rent NUMBER,
    purchase_date DATE,
    return_date DATE,
    PRIMARY KEY (order_id, customer_nic)
);
