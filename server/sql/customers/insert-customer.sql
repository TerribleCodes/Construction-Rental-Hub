-- Teammate 1:  <Your Name>

BEGIN
  INSERT INTO customers (customer_nic, customer_name, customer_phone, customer_email, customer_address)
  VALUES (:customer_nic, :customer_name, :customer_phone, :customer_email, :customer_address);
  COMMIT;
END;
