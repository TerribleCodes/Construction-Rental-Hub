BEGIN
  DELETE FROM customers
  WHERE customer_nic IN (
    :nic_numbers
  );
  COMMIT;
END;
