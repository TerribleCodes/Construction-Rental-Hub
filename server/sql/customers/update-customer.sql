BEGIN
  UPDATE customers
  SET
    customer_name = :customer_name,
    customer_phone = :customer_phone,
    customer_email = :customer_email,
    customer_address = :customer_address
  WHERE customer_nic = :customer_nic;
  COMMIT;
END;
